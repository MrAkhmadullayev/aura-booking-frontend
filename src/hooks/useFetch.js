import api from '@/lib/api'
import useSWR from 'swr'

// Axios fetcher compatible with the global keepAlive and Retry configurations
const fetcher = url => api.get(url).then(res => res.data)

/**
 * Premium data-fetching hook with caching, revalidation, and loading states.
 * Replaces manual useEffect + useState blocks.
 */
export default function useFetch(url, options = {}) {
	const { data, error, isLoading, isValidating, mutate } = useSWR(
		url,
		fetcher,
		{
			revalidateOnFocus: false, // Prevents excessive backend calls simply by switching tabs
			shouldRetryOnError: true,
			errorRetryCount: 3,
			...options,
		},
	)

	return {
		data,
		error,
		isLoading,
		isValidating, // Used for background refreshing UI indicators
		mutate, // Used for optimistic UI updates
	}
}
