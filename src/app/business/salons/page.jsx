'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'
import { MapPin, Plus, Store, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function SalonsPage() {
	const { user } = useAuth()
	const [salons, setSalons] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetchSalons()
	}, [user])

	const fetchSalons = async () => {
		try {
			setIsLoading(true)
			const res = await api.get('/salons/mine')
			setSalons(res.data)
		} catch (error) {
			toast.error('Filiallarni yuklashda xatolik yuz berdi')
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = async id => {
		if (confirm("Haqiqatan ham bu filialni o'chirmoqchimisiz?")) {
			try {
				await api.delete(`/salons/${id}`)
				setSalons(salons.filter(s => s._id !== id))
				toast.success("Filial o'chirildi")
			} catch (error) {
				toast.error("O'chirishda xatolik yuz berdi")
			}
		}
	}

	return (
		<DashboardLayout role='business'>
			<div className='space-y-6'>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Filiallar (Salonlar)
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							O'z filial va salonlaringizni boshqaring
						</p>
					</div>
					<Link href='/business/salons/new'>
						<Button className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-sm px-6 font-medium'>
							<Plus className='w-4 h-4 mr-2' />
							Yangi Filial
						</Button>
					</Link>
				</div>

				{isLoading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[...Array(3)].map((_, i) => (
							<Card
								key={i}
								className='rounded-2xl border-none shadow-sm overflow-hidden'
							>
								<Skeleton className='h-48 w-full rounded-none' />
								<CardContent className='p-5 space-y-4'>
									<div className='flex justify-between items-start'>
										<Skeleton className='h-6 w-32' />
										<Skeleton className='h-5 w-16 rounded-md' />
									</div>
									<Skeleton className='h-4 w-full' />
									<Skeleton className='h-10 w-full rounded-xl mt-4' />
								</CardContent>
							</Card>
						))}
					</div>
				) : salons.length === 0 ? (
					<div className='text-center py-20 bg-white rounded-2xl border border-zinc-100'>
						<Store className='w-12 h-12 mx-auto text-zinc-300 mb-4' />
						<h3 className='text-lg font-medium text-zinc-900 mb-1'>
							Filiallar yo'q
						</h3>
						<p className='text-zinc-500 mb-4'>
							Yangi filial qo'shish bilan boshlang
						</p>
						<Link href='/business/salons/new'>
							<Button variant='outline' className='rounded-xl'>
								<Plus className='w-4 h-4 mr-2' />
								Qo'shish
							</Button>
						</Link>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{salons.map(salon => (
							<Card
								key={salon._id}
								className='rounded-2xl border-none shadow-sm bg-white overflow-hidden group'
							>
								<div className='relative h-48 w-full bg-zinc-100'>
									<Image
										src={salon.coverImage || '/images/hero.png'}
										alt={salon.name}
										fill
										className='object-cover'
									/>
									<div className='absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
										<Button
											size='icon'
											variant='destructive'
											className='h-8 w-8 rounded-full'
											onClick={() => handleDelete(salon._id)}
										>
											<Trash2 className='h-4 w-4' />
										</Button>
									</div>
								</div>
								<CardContent className='p-5'>
									<div className='flex justify-between items-start mb-2'>
										<h3 className='font-bold text-lg text-zinc-900 truncate pr-2'>
											{salon.name}
										</h3>
										<div className='bg-zinc-100 text-zinc-600 text-xs px-2 py-1 rounded-md font-medium shrink-0'>
											{salon.type}
										</div>
									</div>
									<div className='flex items-start text-zinc-500 text-sm mb-4'>
										<MapPin className='w-4 h-4 mr-1 shrink-0 mt-0.5 text-zinc-400' />
										<span className='line-clamp-2'>{salon.address}</span>
									</div>
									<Link href={`/business/salons/${salon._id}`}>
										<Button
											variant='outline'
											className='w-full rounded-xl hover:bg-zinc-50'
										>
											Tahrirlash
										</Button>
									</Link>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</DashboardLayout>
	)
}
