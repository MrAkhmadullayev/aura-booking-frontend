'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { format } from 'date-fns'
import { Calendar, MapPin, Scissors, Search, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function BusinessClientsPage() {
	const [bookings, setBookings] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		const fetchClients = async () => {
			try {
				const res = await api.get('/bookings/salon')
				setBookings(res.data)
			} catch (error) {
				toast.error('Mijozlarni yuklashda xatolik yuz berdi')
			} finally {
				setIsLoading(false)
			}
		}

		fetchClients()
	}, [])

	const filteredBookings = bookings.filter(b => {
		const clientName = b.clientId?.name?.toLowerCase() || ''
		const clientPhone = b.clientId?.phone?.toLowerCase() || ''
		const serviceName = b.serviceId?.name?.toLowerCase() || ''
		const employeeName = b.employeeId?.name?.toLowerCase() || ''
		const q = searchQuery.toLowerCase()

		return (
			clientName.includes(q) ||
			clientPhone.includes(q) ||
			serviceName.includes(q) ||
			employeeName.includes(q)
		)
	})

	const formatPrice = price => {
		if (!price) return '0 UZS'
		return parseInt(price).toLocaleString('en-US').replace(/,/g, ' ') + ' UZS'
	}

	const getStatusColor = status => {
		switch (status) {
			case 'pending':
				return 'bg-amber-100 text-amber-700 border-amber-200'
			case 'confirmed':
				return 'bg-blue-100 text-blue-700 border-blue-200'
			case 'completed':
				return 'bg-emerald-100 text-emerald-700 border-emerald-200'
			case 'cancelled':
				return 'bg-red-100 text-red-700 border-red-200'
			default:
				return 'bg-zinc-100 text-zinc-700 border-zinc-200'
		}
	}

	const getStatusText = status => {
		switch (status) {
			case 'pending':
				return 'Kutilmoqda'
			case 'confirmed':
				return 'Tasdiqlangan'
			case 'completed':
				return 'Yakunlangan'
			case 'cancelled':
				return 'Bekor qilingan'
			default:
				return status
		}
	}

	return (
		<DashboardLayout role='business'>
			<div className='space-y-6'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Barcha Mijozlar
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Filiallaringizga yozilgan barcha mijozlar tarixi. Faqat o'qish
							uchun.
						</p>
					</div>
					<div className='w-full md:w-auto relative'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400' />
						<Input
							placeholder='Ism, tel, usta yoki xizmat...'
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							className='pl-10 w-full md:w-80 rounded-xl h-10 border-zinc-200 focus:ring-zinc-900 focus:border-zinc-900'
						/>
					</div>
				</div>

				<Card className='border-none shadow-sm rounded-2xl overflow-hidden bg-white'>
					{isLoading ? (
						<div className='p-6 space-y-4'>
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className='flex items-center gap-4 py-2 border-b border-zinc-50 last:border-0'
								>
									<Skeleton className='h-12 w-12 rounded-full' />
									<div className='flex-1 space-y-2'>
										<Skeleton className='h-4 w-48' />
										<Skeleton className='h-3 w-32' />
									</div>
									<div className='hidden md:block flex-1 space-y-2'>
										<Skeleton className='h-4 w-32' />
										<Skeleton className='h-3 w-24' />
									</div>
									<Skeleton className='h-6 w-24 rounded-full' />
								</div>
							))}
						</div>
					) : (
						<div className='overflow-x-auto'>
							<table className='w-full text-sm text-left'>
								<thead className='text-xs text-zinc-500 uppercase bg-zinc-50/80 border-b border-zinc-100'>
									<tr>
										<th className='px-6 py-4 font-semibold'>Mijoz</th>
										<th className='px-6 py-4 font-semibold'>Xizmat</th>
										<th className='px-6 py-4 font-semibold'>Usta (Xodim)</th>
										<th className='px-6 py-4 font-semibold'>Sana va Vaqt</th>
										<th className='px-6 py-4 font-semibold'>Holati</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-zinc-50'>
									{filteredBookings.length > 0 ? (
										filteredBookings.map(booking => (
											<tr
												key={booking._id}
												className='hover:bg-zinc-50/50 transition-colors'
											>
												<td className='px-6 py-4'>
													<div className='flex flex-col'>
														<span className='font-semibold text-zinc-900'>
															{booking.clientId?.name || 'Nomaʼlum mijoz'}
														</span>
														<span className='text-zinc-500 text-xs mt-0.5'>
															{booking.clientId?.phone || "Tel ko'rsatilmagan"}
														</span>
													</div>
												</td>
												<td className='px-6 py-4'>
													<div className='flex flex-col'>
														<span className='font-medium text-zinc-900 flex items-center gap-1.5'>
															<Scissors className='w-3 h-3 text-zinc-400' />
															{booking.serviceId?.name || 'O‘chirilgan xizmat'}
														</span>
														{booking.serviceId && (
															<span className='text-zinc-500 text-xs mt-0.5 ml-4.5'>
																{formatPrice(booking.serviceId.price)} •{' '}
																{booking.serviceId.duration} daq
															</span>
														)}
													</div>
												</td>
												<td className='px-6 py-4'>
													<div className='flex items-center gap-2'>
														<div className='h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden border border-zinc-200'>
															{booking.employeeId?.image ? (
																<img
																	src={booking.employeeId.image}
																	alt={booking.employeeId.name}
																	className='h-full w-full object-cover'
																/>
															) : (
																<User className='w-4 h-4 text-zinc-400' />
															)}
														</div>
														<div className='flex flex-col'>
															<span className='font-medium text-zinc-900'>
																{booking.employeeId?.name ||
																	'Usta qoldirilmagan'}
															</span>
															{booking.salonId && (
																<span className='text-xs text-zinc-500 flex items-center gap-1 mt-0.5'>
																	<MapPin className='w-3 h-3' />
																	{booking.salonId.name}
																</span>
															)}
														</div>
													</div>
												</td>
												<td className='px-6 py-4'>
													<div className='flex flex-col text-sm'>
														<span className='font-medium text-zinc-900 flex items-center gap-1.5'>
															<Calendar className='w-3.5 h-3.5 text-zinc-400' />
															{booking.date
																? format(new Date(booking.date), 'dd.MM.yyyy')
																: '—'}
														</span>
														<span className='text-zinc-500 ml-5 mt-0.5'>
															{booking.time || '—'}
														</span>
													</div>
												</td>
												<td className='px-6 py-4'>
													<span
														className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
															booking.status,
														)}`}
													>
														{getStatusText(booking.status)}
													</span>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td
												colSpan='5'
												className='px-6 py-12 text-center text-zinc-500'
											>
												Hech qanday ma'lumot topilmadi.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					)}
				</Card>
			</div>
		</DashboardLayout>
	)
}
