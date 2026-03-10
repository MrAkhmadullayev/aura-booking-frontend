'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'
import { format, isSameDay } from 'date-fns'
import { uz } from 'date-fns/locale'
import {
	Calendar as CalendarIcon,
	Loader2,
	MapPin,
	Scissors,
	Users,
	Wallet,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function EmployeeDashboard() {
	const { user: session } = useAuth()
	const [bookings, setBookings] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				setIsLoading(true)
				const res = await api.get('/bookings/mine')
				setBookings(res.data || [])
			} catch (error) {
				toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi")
			} finally {
				setIsLoading(false)
			}
		}

		fetchDashboardData()
	}, [])

	const formatPrice = price => {
		return parseInt(price || 0)
			.toLocaleString('en-US')
			.replace(/,/g, ' ')
	}

	const today = new Date()

	// 1. Bugungi yozuvlar
	const todaysBookings = bookings.filter(b =>
		isSameDay(new Date(b.date), today),
	)

	// 2. Daromadni hisoblash (Faqat bajarilgan va tasdiqlangandan tushgan daromad)
	const successfulBookings = bookings.filter(
		b => b.status === 'completed' || b.status === 'confirmed',
	)
	const totalRevenue = successfulBookings.reduce(
		(sum, b) => sum + (b.totalPrice || 0),
		0,
	)

	// 3. Jami mijozlarni hisoblash
	const clientsMap = {}
	bookings.forEach(b => {
		let identifier = 'unknown'
		let name = "Noma'lum"

		if (b.clientId) {
			identifier = b.clientId._id
			name = b.clientId.name || "Noma'lum"
		} else if (b.guestPhone) {
			identifier = b.guestPhone
			name = b.guestName || "Mijoz (Qo'lda qo'shilgan)"
		}

		if (!clientsMap[identifier]) {
			clientsMap[identifier] = {
				name,
				phone: b.clientId?.phone || b.guestPhone || '',
				visits: 0,
				spent: 0,
			}
		}

		clientsMap[identifier].visits += 1
		if (b.status === 'completed' || b.status === 'confirmed') {
			clientsMap[identifier].spent += b.totalPrice || 0
		}
	})

	const uniqueClients = Object.values(clientsMap).sort(
		(a, b) => b.visits - a.visits,
	)

	const statusConfig = {
		pending: {
			label: 'Kutilmoqda',
			color: 'text-amber-600 bg-amber-50 border-amber-100',
		},
		confirmed: {
			label: 'Tasdiqlangan',
			color: 'text-blue-600 bg-blue-50 border-blue-100',
		},
		completed: {
			label: 'Bajarildi',
			color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
		},
		cancelled: {
			label: 'Bekor',
			color: 'text-red-600 bg-red-50 border-red-100',
		},
	}

	if (isLoading) {
		return (
			<DashboardLayout role='employee'>
				<div className='flex items-center justify-center min-h-[400px]'>
					<Loader2 className='w-8 h-8 animate-spin text-zinc-400' />
				</div>
			</DashboardLayout>
		)
	}

	return (
		<DashboardLayout role='employee'>
			<div className='space-y-6 pb-20 pt-4'>
				<div>
					<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
						Xush kelibsiz, {session?.name}!
					</h1>
					<p className='text-zinc-500 text-sm mt-1'>
						Bugungi jadvalingiz va daromadlar statistikasi.
					</p>
				</div>

				{/* 1. Kichik Statistika KARTALARI */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<Card className='border-none shadow-sm rounded-2xl bg-zinc-900 text-white relative overflow-hidden'>
						<div className='absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl -mr-6 -mt-6'></div>
						<CardContent className='p-6 relative z-10'>
							<div className='flex items-center justify-between mb-4'>
								<div className='h-10 w-10 bg-white/10 rounded-full flex items-center justify-center text-emerald-400'>
									<Wallet className='w-5 h-5' />
								</div>
							</div>
							<p className='text-zinc-400 text-sm font-medium mb-1'>
								Jami Tushumim
							</p>
							<h3 className='text-2xl font-bold'>
								{formatPrice(totalRevenue)}{' '}
								<span className='text-sm font-medium text-zinc-500'>UZS</span>
							</h3>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<div className='h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600'>
									<CalendarIcon className='w-5 h-5' />
								</div>
							</div>
							<p className='text-zinc-500 text-sm font-medium mb-1'>
								Bugungi Yozuvlar
							</p>
							<h3 className='text-2xl font-bold text-zinc-900'>
								{todaysBookings.length} ta
							</h3>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<div className='h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600'>
									<Users className='w-5 h-5' />
								</div>
							</div>
							<p className='text-zinc-500 text-sm font-medium mb-1'>
								Mening Mijozlarim
							</p>
							<h3 className='text-2xl font-bold text-zinc-900'>
								{uniqueClients.length} kishi
							</h3>
						</CardContent>
					</Card>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Mijozlar Ro'yxati */}
					<div className='lg:col-span-1 space-y-4'>
						<h2 className='text-lg font-bold text-zinc-900'>Doimiy Mijozlar</h2>
						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<CardContent className='p-0'>
								{uniqueClients.length > 0 ? (
									<ul className='divide-y divide-zinc-100 max-h-[400px] overflow-y-auto'>
										{uniqueClients.map((client, idx) => (
											<li
												key={idx}
												className='p-4 hover:bg-zinc-50 transition-colors flex items-center justify-between'
											>
												<div className='flex items-center gap-3'>
													<div className='w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-bold shrink-0'>
														{client.name.charAt(0).toUpperCase()}
													</div>
													<div>
														<p className='font-bold text-sm text-zinc-900 truncate max-w-[120px]'>
															{client.name}
														</p>
														<p className='text-xs text-zinc-500'>
															{client.visits} marta kelgan
														</p>
													</div>
												</div>
												<div className='text-right'>
													<p className='text-xs font-bold text-emerald-600'>
														+{formatPrice(client.spent)}
													</p>
												</div>
											</li>
										))}
									</ul>
								) : (
									<div className='p-6 text-center text-zinc-500 text-sm'>
										Hali mijozlar qabul qilinmagan.
									</div>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Barcha Yozuvlar (Bronlar) qismi */}
					<div className='lg:col-span-2 space-y-4'>
						<h2 className='text-lg font-bold text-zinc-900'>
							Barcha Yozuvlarim
						</h2>

						<div className='flex flex-col gap-3'>
							{bookings.length > 0 ? (
								bookings.map(booking => (
									<Card
										key={booking._id}
										className='border-none shadow-sm rounded-2xl bg-white hover:shadow-md transition-all duration-200'
									>
										<CardContent className='p-4 sm:p-5'>
											<div className='flex flex-col sm:flex-row gap-4 sm:items-center justify-between'>
												<div className='flex items-start sm:items-center gap-4'>
													{/* Time */}
													<div className='bg-zinc-50 px-3 py-2 rounded-xl text-center border border-zinc-100 w-24 flex-shrink-0'>
														<p className='text-xs font-medium text-zinc-500 mb-0.5'>
															{format(new Date(booking.date), 'dd MMM', {
																locale: uz,
															})}
														</p>
														<p className='text-lg font-bold font-mono text-zinc-900'>
															{booking.time}
														</p>
													</div>

													{/* Client Info */}
													<div className='flex items-center gap-3'>
														<div className='h-10 w-10 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center font-bold text-zinc-500 flex-shrink-0 hidden sm:flex'>
															{(
																booking.guestName ||
																booking.clientId?.name ||
																'M'
															)
																.charAt(0)
																.toUpperCase()}
														</div>
														<div>
															<h3 className='font-bold text-zinc-900 flex flex-wrap items-center gap-2 line-clamp-1'>
																{booking.guestName ? (
																	<span className='flex items-center gap-1'>
																		{booking.guestName}{' '}
																		<span className='text-[9px] bg-zinc-100 px-1 rounded text-zinc-500'>
																			Qo'lda
																		</span>
																	</span>
																) : booking.clientId?.name ? (
																	booking.clientId.name
																) : (
																	'Noma`lum'
																)}
															</h3>
															<p className='text-sm text-zinc-500'>
																{booking.guestPhone || booking.clientId?.phone}
															</p>
														</div>
													</div>
												</div>

												{/* Service & Price */}
												<div className='flex flex-col sm:items-end gap-1 sm:ml-auto ml-16 border-l-2 sm:border-l-0 pl-4 sm:pl-0 border-zinc-100'>
													<div className='flex items-center gap-2 justify-start sm:justify-end w-full mb-1'>
														<span
															className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${statusConfig[booking.status]?.color || ''}`}
														>
															{statusConfig[booking.status]?.label ||
																booking.status}
														</span>
													</div>
													<p className='font-semibold text-sm text-zinc-900 flex items-center gap-1.5'>
														<Scissors className='h-3.5 w-3.5 text-zinc-400' />{' '}
														{booking.serviceId?.name || "O'chirilgan xizmat"}
													</p>
													<div className='flex items-center gap-3'>
														<p className='text-xs text-zinc-500 flex items-center gap-1'>
															<MapPin className='w-3 h-3' />{' '}
															{booking.salonId?.name}
														</p>
														<p className='font-bold text-zinc-900 text-sm whitespace-nowrap ml-auto'>
															{formatPrice(booking.totalPrice)} UZS
														</p>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								))
							) : (
								<Card className='border-none shadow-sm rounded-2xl bg-white'>
									<CardContent className='p-8 text-center text-zinc-500'>
										Sizda hali belgilan yozuvlar mavjud emas
									</CardContent>
								</Card>
							)}
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	)
}
