'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { isSameDay, isSameMonth, isSameWeek, isSameYear } from 'date-fns'
import {
	BarChart3,
	Calendar as CalendarIcon,
	Scissors,
	TrendingUp,
	Wallet,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ClientFinance() {
	const [isLoading, setIsLoading] = useState(true)
	const [bookings, setBookings] = useState([])

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				setIsLoading(true)
				const res = await api.get('/bookings/client')
				// Faqat tugatilgan bronlarni hisoblaymiz (pul to'langan deya faraz qilamiz)
				const completedBookings = (res.data || []).filter(
					b => b.status === 'completed',
				)
				setBookings(completedBookings)
			} catch (error) {
				toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi")
			} finally {
				setIsLoading(false)
			}
		}

		fetchBookings()
	}, [])

	const formatPrice = price => {
		return parseInt(price || 0)
			.toLocaleString('en-US')
			.replace(/,/g, ' ')
	}

	const today = new Date()

	// Daromad / Xarajat statistikalari
	const stats = {
		bugun: 0,
		hafta: 0,
		oy: 0,
		yil: 0,
		jami: 0,
	}

	bookings.forEach(b => {
		const d = new Date(b.date)
		const price = b.totalPrice || 0

		stats.jami += price
		if (isSameDay(d, today)) stats.bugun += price
		if (isSameWeek(d, today, { weekStartsOn: 1 })) stats.hafta += price
		if (isSameMonth(d, today)) stats.oy += price
		if (isSameYear(d, today)) stats.yil += price
	})

	const statCards = [
		{
			title: 'Bugun Sarflandi',
			value: stats.bugun,
			icon: <Wallet className='h-5 w-5 text-emerald-600' />,
			bgColor: 'bg-emerald-50',
		},
		{
			title: 'Shu Hafta',
			value: stats.hafta,
			icon: <TrendingUp className='h-5 w-5 text-blue-600' />,
			bgColor: 'bg-blue-50',
		},
		{
			title: 'Shu Oy',
			value: stats.oy,
			icon: <CalendarIcon className='h-5 w-5 text-indigo-600' />,
			bgColor: 'bg-indigo-50',
		},
		{
			title: 'Shu Yil',
			value: stats.yil,
			icon: <BarChart3 className='h-5 w-5 text-purple-600' />,
			bgColor: 'bg-purple-50',
		},
	]

	return (
		<DashboardLayout role='client'>
			<div className='max-w-7xl mx-auto space-y-8 pb-10'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<div>
						<h1 className='text-3xl font-bold text-zinc-900 tracking-tight'>
							Sarflangan Mablag'lar (Moliya)
						</h1>
						<p className='text-zinc-500 mt-1'>
							Platforma orqali qabul qilingan xizmatlarga sarflangan
							mablag'laringiz statistikasi.
						</p>
					</div>
				</div>

				{/* Asosiy Jami Xarajat */}
				<Card className='border-none shadow-sm rounded-[2rem] bg-gradient-to-br from-zinc-900 to-zinc-800 text-white relative overflow-hidden'>
					<div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-10 -mt-20 pointer-events-none'></div>
					<CardContent className='p-8 sm:p-10 relative z-10'>
						<div className='flex items-center gap-4 mb-2'>
							<div className='p-3 bg-white/10 rounded-2xl'>
								<Wallet className='h-6 w-6 text-emerald-400' />
							</div>
							<p className='text-zinc-300 font-medium'>
								Jami Sarflangan Mablag'
							</p>
						</div>
						<div className='mt-4'>
							{isLoading ? (
								<Skeleton className='h-12 w-48 bg-white/10' />
							) : (
								<h2 className='text-5xl sm:text-6xl font-bold tracking-tight'>
									{formatPrice(stats.jami)}{' '}
									<span className='text-2xl font-semibold text-zinc-400'>
										UZS
									</span>
								</h2>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Kichik qismlar */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
					{statCards.map((stat, idx) => (
						<Card
							key={idx}
							className='border-none shadow-sm rounded-2xl bg-white hover:shadow-md transition-shadow'
						>
							<CardContent className='p-6'>
								<div className='flex items-center justify-between mb-4'>
									<div
										className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bgColor}`}
									>
										{stat.icon}
									</div>
								</div>
								<p className='text-sm font-medium text-zinc-500 mb-1'>
									{stat.title}
								</p>
								{isLoading ? (
									<Skeleton className='h-8 w-24 rounded-lg' />
								) : (
									<h3 className='text-2xl font-bold text-zinc-900'>
										{formatPrice(stat.value)}
									</h3>
								)}
							</CardContent>
						</Card>
					))}
				</div>

				{/* So'nggi tranzaksiyalar tarixini shu yerdan olish mumkin */}
				<div className='mt-8'>
					<h3 className='text-xl font-bold text-zinc-900 mb-6'>
						So'nggi Xizmatlar Xujjati
					</h3>
					{isLoading ? (
						<div className='space-y-4'>
							{[1, 2, 3].map(i => (
								<Skeleton key={i} className='h-20 w-full rounded-2xl' />
							))}
						</div>
					) : bookings.length > 0 ? (
						<div className='space-y-4 max-h-[500px] overflow-y-auto pr-2'>
							{bookings
								.sort((a, b) => new Date(b.date) - new Date(a.date))
								.map(b => (
									<Card
										key={b._id}
										className='border-none shadow-sm rounded-2xl bg-white'
									>
										<CardContent className='p-5 flex items-center justify-between'>
											<div className='flex items-center gap-4'>
												<div className='h-12 w-12 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-center text-zinc-400'>
													<Scissors className='h-5 w-5' />
												</div>
												<div>
													<p className='font-bold text-zinc-900'>
														{b.salonId?.name || 'Aura Saloni'}
													</p>
													<p className='text-xs text-zinc-500'>
														{b.serviceId?.name} •{' '}
														{new Date(b.date).toLocaleDateString('uz-UZ')}
													</p>
												</div>
											</div>
											<div className='text-right'>
												<p className='font-bold text-zinc-900'>
													{formatPrice(b.totalPrice)} UZS
												</p>
												<span className='text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium mt-1 inline-block'>
													To'langan
												</span>
											</div>
										</CardContent>
									</Card>
								))}
						</div>
					) : (
						<Card className='border-dashed border-2 bg-transparent shadow-none border-zinc-200'>
							<CardContent className='p-10 text-center text-zinc-500'>
								Hozircha moliyaviy tarix mavjud emas.
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</DashboardLayout>
	)
}
