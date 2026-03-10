'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import api from '@/lib/api'
import {
	Calendar,
	CheckCircle2,
	Loader2,
	MapPin,
	Scissors,
	Star,
	XCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ClientBookings() {
	const [bookings, setBookings] = useState([])
	const [filter, setFilter] = useState('all')
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const res = await api.get('/bookings/client')
				setBookings(res.data)
			} catch (error) {
				toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi")
			} finally {
				setIsLoading(false)
			}
		}
		fetchBookings()
	}, [])

	const filteredBookings = bookings.filter(b => {
		if (filter === 'all') return true
		if (filter === 'upcoming')
			return b.status === 'pending' || b.status === 'confirmed'
		if (filter === 'history')
			return b.status === 'completed' || b.status === 'cancelled'
		return true
	})

	const cancelBooking = async id => {
		if (window.confirm('Rostdan ham bu yozuvni bekor qilmoqchimisiz?')) {
			try {
				await api.patch(`/bookings/${id}/status`, { status: 'cancelled' })
				setBookings(
					bookings.map(b => (b._id === id ? { ...b, status: 'cancelled' } : b)),
				)
				toast.success('Yozuv muvaffaqiyatli bekor qilindi')
			} catch (error) {
				toast.error('Xatolik yuz berdi')
			}
		}
	}

	const formatPrice = price => {
		return parseInt(price).toLocaleString('en-US').replace(/,/g, ' ') + ' UZS'
	}

	const formatDate = (dateString, timeString) => {
		const d = new Date(dateString)
		return d.toLocaleDateString('uz-UZ', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		})
	}

	return (
		<DashboardLayout role='client'>
			<div className='space-y-6'>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Mening Yozuvlarim
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Barcha joriy va o'tmishdagi yozuvlaringiz tarixi.
						</p>
					</div>
					<div className='flex bg-zinc-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto'>
						<button
							onClick={() => setFilter('all')}
							className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filter === 'all' ? 'font-medium bg-white text-zinc-900 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Barchasi
						</button>
						<button
							onClick={() => setFilter('upcoming')}
							className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filter === 'upcoming' ? 'font-medium bg-white text-zinc-900 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Yaqinlashayotgan
						</button>
						<button
							onClick={() => setFilter('history')}
							className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filter === 'history' ? 'font-medium bg-white text-zinc-900 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Tarix
						</button>
					</div>
				</div>

				{isLoading ? (
					<div className='flex justify-center items-center py-20'>
						<Loader2 className='w-8 h-8 animate-spin text-zinc-400' />
					</div>
				) : (
					<div className='flex flex-col gap-4'>
						{filteredBookings.map(booking => (
							<Card
								key={booking._id}
								className='border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200'
							>
								<CardContent className='p-0 flex flex-col sm:flex-row'>
									{/* Left side (Date/Time info) */}
									<div className='w-full sm:w-48 bg-zinc-50 border-r border-zinc-100 p-6 flex flex-col justify-center items-center text-center'>
										<Calendar
											className='h-6 w-6 text-zinc-400 mb-2'
											strokeWidth={1.5}
										/>
										<p className='text-sm font-medium text-zinc-900'>
											{formatDate(booking.date)}
										</p>
										<p className='text-xl font-bold font-mono text-zinc-700 mt-1'>
											{booking.time}
										</p>
										{(booking.status === 'pending' ||
											booking.status === 'confirmed') && (
											<span className='mt-3 inline-block px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-semibold border border-amber-100'>
												{booking.status === 'pending'
													? 'Kutilmoqda'
													: 'Tasdiqlangan'}
											</span>
										)}
										{booking.status === 'completed' && (
											<span className='mt-3 inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold border border-emerald-100 flex items-center gap-1'>
												<CheckCircle2 className='w-3 h-3' /> Bajarildi
											</span>
										)}
										{booking.status === 'cancelled' && (
											<span className='mt-3 inline-block px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold border border-red-100 flex items-center gap-1'>
												<XCircle className='w-3 h-3' /> Bekor qilingan
											</span>
										)}
									</div>

									{/* Right side (Details) */}
									<div className='flex-1 p-6 flex flex-col sm:flex-row justify-between gap-6'>
										<div className='space-y-4'>
											<div>
												<h3 className='text-lg font-bold text-zinc-900'>
													{booking.salonId?.name || "O'chirilgan salon"}
												</h3>
												<p className='text-sm text-zinc-500 flex items-center gap-1.5 mt-1'>
													<MapPin className='h-3.5 w-3.5' />{' '}
													{booking.salonId?.address || "Hozircha noma'lum"}
												</p>
											</div>
											<div className='flex flex-wrap items-center gap-x-6 gap-y-2'>
												<div className='flex items-center gap-2'>
													<Scissors className='h-4 w-4 text-zinc-400' />
													<span className='text-sm font-medium text-zinc-700'>
														{booking.serviceId?.name || "O'chirilgan xizmat"}
													</span>
												</div>
												<div className='flex items-center gap-2'>
													<Star className='h-4 w-4 text-zinc-400' />
													<span className='text-sm font-medium text-zinc-700'>
														Usta: Belgilanmagan
													</span>
												</div>
											</div>
										</div>

										<div className='flex flex-col justify-between sm:items-end gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-zinc-100'>
											<p className='text-lg font-bold text-zinc-900'>
												{formatPrice(booking.totalPrice)}
											</p>

											{booking.status === 'pending' ||
											booking.status === 'confirmed' ? (
												<div className='flex flex-wrap items-center gap-2'>
													<Button
														onClick={() => cancelBooking(booking._id)}
														variant='outline'
														className='text-sm text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100 rounded-xl'
													>
														Bekor qilish
													</Button>
												</div>
											) : (
												<Button className='text-sm bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl'>
													Qayta yozilish
												</Button>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						))}

						{filteredBookings.length === 0 && (
							<div className='text-center py-20 bg-white rounded-2xl border-none shadow-sm'>
								<p className='text-zinc-500 font-medium'>
									Sizda bunday yozuvlar yo'q.
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</DashboardLayout>
	)
}
