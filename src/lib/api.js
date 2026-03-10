import axios from 'axios'
import axiosRetry from 'axios-retry'
import http from 'http'
import https from 'https'

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2026/api',
	withCredentials: true,
	// Premium Speed: Keep-Alive Agent reuses TCP connections to skip handshake latency
	httpAgent: new http.Agent({ keepAlive: true }),
	httpsAgent: new https.Agent({ keepAlive: true }),
})

// Robustness: Auto-retry on network failures or server glitches (5xx)
axiosRetry(api, {
	retries: 3,
	retryDelay: retryCount => {
		return retryCount * 500 // 500ms, 1000ms, 1500ms
	},
	retryCondition: error => {
		return (
			axiosRetry.isNetworkOrIdempotentRequestError(error) ||
			error.response?.status >= 500
		)
	},
})

// Security & UX: Global Interceptor
api.interceptors.response.use(
	response => response,
	error => {
		// Centralized 401 handling - Only redirect if on a protected route
		if (error.response?.status === 401 && typeof window !== 'undefined') {
			const path = window.location.pathname
			const isProtected = ['/admin', '/business', '/client', '/employee'].some(
				route => path.startsWith(route),
			)

			if (isProtected) {
				window.location.href = '/login'
			}
		}
		return Promise.reject(error)
	},
)

export default api
