'use client'

import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	const fetchUser = async () => {
		try {
			const { data } = await api.get('/auth/me')
			setUser(data)
		} catch (err) {
			setUser(null)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUser()
	}, [])

	const login = async (phone, password) => {
		const { data } = await api.post('/auth/login', { phone, password })
		setUser(data)
		return data
	}

	const logout = async () => {
		try {
			await api.post('/auth/logout')
			setUser(null)
			router.push('/login')
		} catch (err) {
			console.error('Logout failed:', err)
		}
	}

	return (
		<AuthContext.Provider
			value={{ user, loading, login, logout, refreshUser: fetchUser }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
