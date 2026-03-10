'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import api from '@/lib/api'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import BranchForm from '../components/BranchForm'

export default function EditBranchPage() {
	const params = useParams()
	const [salon, setSalon] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchSalon = async () => {
			try {
				const res = await api.get(`/salons/${params.id}`)
				setSalon(res.data)
			} catch (error) {
				toast.error('Filialni yuklashda xatolik yuz berdi')
			} finally {
				setIsLoading(false)
			}
		}
		if (params?.id) fetchSalon()
	}, [params?.id])

	if (isLoading) {
		return (
			<DashboardLayout role='business'>
				<div className='flex items-center justify-center min-h-[60vh]'>
					<Loader2 className='w-8 h-8 animate-spin text-zinc-400' />
				</div>
			</DashboardLayout>
		)
	}

	if (!salon) {
		return (
			<DashboardLayout role='business'>
				<div className='flex items-center justify-center min-h-[60vh]'>
					<p className='text-zinc-500'>Topilmadi.</p>
				</div>
			</DashboardLayout>
		)
	}

	return (
		<DashboardLayout role='business'>
			<BranchForm initialData={salon} isEdit={true} />
		</DashboardLayout>
	)
}
