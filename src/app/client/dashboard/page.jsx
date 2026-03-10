'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import api from '@/lib/api'
import {
	Calendar,
	CalendarCheck,
	Clock,
	Loader2,
	MapPin,
	Scissors,
	Star,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ClientDashboard() {
	const [isLoading, setIsLoading] = useState(true)
	const [bookings, setBookings] = useState([])

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				setIsLoading(true)
				const res = await api.get('/bookings/client')
				setBookings(res.data || [])
			} catch (error) {
				toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi")
			} finally {
				setIsLoading(false)
			}
		}
		fetchBookings()
	}, [])

	if (isLoading) {
		return (
			<DashboardLayout role='client'>
				<div className='flex items-center justify-center min-h-[500px]'>
					<Loader2 className='w-8 h-8 animate-spin text-zinc-400' />
				</div>
			</DashboardLayout>
		)
	}

	// 1. Process Bookings
	const today = new Date()
	today.setHours(0, 0, 0, 0)

	// Upcoming Booking (Next one in the future that is not cancelled)
	const upcomingBookings = bookings
		.filter(b => {
			const bDate = new Date(b.date)
			return bDate >= today && b.status !== 'cancelled'
		})
		.sort((a, b) => {
			const dateA = new Date(a.date + 'T' + a.time)
			const dateB = new Date(b.date + 'T' + b.time)
			return dateA - dateB
		})

	const nextBooking = upcomingBookings.length > 0 ? upcomingBookings[0] : null

	// Stats
	const completedBookings = bookings.filter(b => b.status === 'completed')
	const totalVisits = completedBookings.length

	let frequentVisitText = 'Hali yetarli emas'
	if (totalVisits >= 2) {
		const sortedCompleted = [...completedBookings].sort(
			(a, b) => new Date(b.date) - new Date(a.date),
		)
		const oldest = new Date(sortedCompleted[sortedCompleted.length - 1].date)
		const newest = new Date(sortedCompleted[0].date)
		const diffDays = (newest - oldest) / (1000 * 60 * 60 * 24)
		const avgDays = diffDays / (totalVisits - 1)

		if (avgDays <= 7) frequentVisitText = 'Har hafta'
		else if (avgDays <= 30) frequentVisitText = 'Har oy'
		else frequentVisitText = 'Vaqti-vaqti bilan'
	} else if (totalVisits === 1) {
		frequentVisitText = 'Yangi mijoz'
	}

	// Past Visits
	const pastBookings = bookings
		.filter(b => {
			if (b._id === nextBooking?._id) return false
			return true
		})
		.sort((a, b) => {
			const dateA = new Date(a.date + 'T' + (a.time || '00:00'))
			const dateB = new Date(b.date + 'T' + (b.time || '00:00'))
			return dateB - dateA // newest first
		})
		.slice(0, 10) // Show last 10

	const formatPrice = price => {
		return parseInt(price || 0)
			.toLocaleString('en-US')
			.replace(/,/g, ' ')
	}

	// Formatting "Ertaga", "Bugun" etc. for next booking
	const getRelativeDateLabel = dateString => {
		const d = new Date(dateString)
		d.setHours(0, 0, 0, 0)

		const diffTime = d - today
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

		if (diffDays === 0) return 'Bugun'
		if (diffDays === 1) return 'Ertaga'
		if (diffDays === 2) return 'Indinga'

		return d.toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric' })
	}

	return (
		<DashboardLayout role='client'>
			<div className='space-y-6 pb-20'>
				<div>
					<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
						Xush kelibsiz!
					</h1>
					<p className='text-zinc-500 text-sm mt-1'>
						Yaqinlashib kelayotgan yozuvlaringiz va sevimli salonlaringiz.
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Upcoming Appointment */}
					<Card
						className={`border-none shadow-sm rounded-3xl overflow-hidden lg:col-span-2 ${nextBooking ? 'bg-gradient-to-br from-zinc-900 to-zinc-800' : 'bg-zinc-100'} text-white relative`}
					>
						{nextBooking ? (
							<>
								<div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-10 -mt-20 pointer-events-none'></div>
								<CardContent className='p-8 sm:p-10 relative z-10 flex flex-col md:flex-row gap-8 justify-between'>
									<div className='space-y-6'>
										<div>
											<span className='inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-zinc-200 mb-4 border border-white/20'>
												Yaqinlashib kelayotgan
											</span>
											<h2 className='text-3xl font-bold'>
												{nextBooking.salonId?.name || 'Aura Salon'}
											</h2>
											<p className='text-zinc-400 mt-2 flex items-center gap-2'>
												<MapPin className='h-4 w-4' />{' '}
												{nextBooking.salonId?.address ||
													"Manzil ko'rsatilmagan"}
											</p>
										</div>

										<div className='flex items-center gap-6'>
											<div>
												<p className='text-zinc-400 text-sm mb-1'>Xizmat</p>
												<p className='font-semibold flex items-center gap-2'>
													<Scissors className='h-4 w-4' />{' '}
													{nextBooking.serviceId?.name || "No'malum xizmat"}
												</p>
											</div>
											<div className='w-[1px] h-10 bg-white/10'></div>
											<div>
												<p className='text-zinc-400 text-sm mb-1'>Usta</p>
												<p className='font-semibold flex items-center gap-2'>
													<Star className='h-4 w-4 text-amber-400 fill-amber-400' />{' '}
													{nextBooking.employeeId?.name || 'Farqi yoq'}
												</p>
											</div>
										</div>
									</div>

									<div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 text-center min-w-[180px]'>
										<div>
											<p className='text-sm font-medium text-zinc-300 mb-2 flex items-center justify-center gap-2'>
												<Calendar className='h-4 w-4' />{' '}
												{getRelativeDateLabel(nextBooking.date)}
											</p>
											<p className='text-4xl font-bold font-mono'>
												{nextBooking.time}
											</p>
										</div>
										<div className='w-10 h-[1px] md:h-10 md:w-[1px] bg-white/10 hidden md:block'></div>
										<span className='px-4 py-2 bg-white text-zinc-900 rounded-xl font-medium w-full md:w-auto text-sm'>
											{nextBooking.status === 'confirmed'
												? 'Tasdiqlangan'
												: 'Kutilayotgan'}
										</span>
									</div>
								</CardContent>
							</>
						) : (
							<CardContent className='p-10 flex flex-col items-center justify-center text-center h-full min-h-[250px]'>
								<div className='w-16 h-16 bg-zinc-200 text-zinc-400 rounded-full flex items-center justify-center mb-4'>
									<Calendar className='w-8 h-8' />
								</div>
								<h3 className='text-xl font-bold text-zinc-900 mb-2'>
									Hozirda yozuvlaringiz yo'q
								</h3>
								<p className='text-zinc-500 max-w-sm mb-6'>
									Kelgusi tashrifingizni hoziroq bron qiling va jozibador
									bo'ling.
								</p>
								<Button
									className='bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 px-6 font-medium shadow-md'
									onClick={() => (window.location.href = '/salons')}
								>
									Yozilish
								</Button>
							</CardContent>
						)}
					</Card>

					{/* Stats / Actions */}
					<div className='space-y-4'>
						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<CardContent className='p-6 flex items-center gap-4'>
								<div className='h-12 w-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-700'>
									<CalendarCheck className='h-6 w-6' strokeWidth={1.5} />
								</div>
								<div>
									<p className='text-sm text-zinc-500 font-medium font-sans mb-0.5'>
										Jami tashriflar
									</p>
									<p className='text-2xl font-bold text-zinc-900'>
										{totalVisits}
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<CardContent className='p-6 flex items-center gap-4'>
								<div className='h-12 w-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-700'>
									<Clock className='h-6 w-6' strokeWidth={1.5} />
								</div>
								<div>
									<p className='text-sm text-zinc-500 font-medium font-sans mb-0.5'>
										Tez-tez tashrif
									</p>
									<p className='text-lg font-bold text-zinc-900 leading-tight'>
										{frequentVisitText}
									</p>
								</div>
							</CardContent>
						</Card>

						<Button
							className='w-full h-14 bg-zinc-900 text-white rounded-2xl text-base font-medium hover:bg-zinc-800 shadow-lg shadow-zinc-200'
							onClick={() => (window.location.href = '/salons')}
						>
							Yangi ustaga yozilish
						</Button>
					</div>
				</div>

				{/* Previous Visits */}
				<div className='mt-8 max-w-4xl'>
					<h3 className='text-lg font-bold text-zinc-900 mb-4 px-1'>
						O'tgan tashriflar tarixi
					</h3>

					{pastBookings.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{pastBookings.map((b, idx) => (
								<Card
									key={b._id || idx}
									className='border-none shadow-sm rounded-xl hover:shadow-md transition-shadow'
								>
									<CardContent className='p-5 flex items-center justify-between'>
										<div className='flex items-center gap-4'>
											<div
												className={`h-10 w-10 ${b.status === 'cancelled' ? 'bg-red-50 text-red-500' : 'bg-zinc-100 text-zinc-500'} rounded-xl flex items-center justify-center font-medium uppercase font-serif flex-shrink-0`}
											>
												{(b.salonId?.name || '?').charAt(0)}
											</div>
											<div>
												<p className='text-sm font-semibold text-zinc-900 truncate max-w-[150px] sm:max-w-[200px]'>
													{b.salonId?.name || "Noma'lum salon"}
												</p>
												<p className='text-[11px] text-zinc-500 mt-0.5'>
													{b.serviceId?.name || 'Xizmat'} •{' '}
													{new Date(b.date).toLocaleDateString('uz-UZ', {
														day: 'numeric',
														month: 'short',
														year: 'numeric',
													})}
												</p>
											</div>
										</div>
										<div className='text-right'>
											<p className='text-sm font-bold text-zinc-900'>
												{formatPrice(b.totalPrice)} UZS
											</p>
											{b.status === 'completed' && (
												<p className='text-[10px] text-emerald-600 font-medium mt-1 uppercase tracking-wider'>
													Bajarilgan
												</p>
											)}
											{b.status === 'cancelled' && (
												<p className='text-[10px] text-red-500 font-medium mt-1 uppercase tracking-wider'>
													Bekor qilingan
												</p>
											)}
											{b.status === 'pending' && (
												<p className='text-[10px] text-amber-500 font-medium mt-1 uppercase tracking-wider'>
													Kutilmoqda
												</p>
											)}
											{b.status === 'confirmed' && (
												<p className='text-[10px] text-blue-500 font-medium mt-1 uppercase tracking-wider'>
													Tasdiqlangan
												</p>
											)}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					) : (
						<div className='bg-white rounded-2xl p-10 text-center border border-zinc-50 shadow-sm'>
							<p className='text-zinc-500 font-medium'>
								Boshqa tashriflar tarixi mavjud emas.
							</p>
						</div>
					)}
				</div>
			</div>
		</DashboardLayout>
	)
}
