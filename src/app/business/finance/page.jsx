'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { isSameDay, isSameMonth, isSameWeek, isSameYear } from 'date-fns'
import {
	ArrowDownRight,
	Calendar as CalendarIcon,
	DollarSign,
	TrendingUp,
	Wallet,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function BusinessFinance() {
	const [bookings, setBookings] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [period, setPeriod] = useState('week') // 'day' | 'week' | 'month' | 'year'

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				setIsLoading(true)
				const res = await api.get('/bookings/salon')
				setBookings(res.data)
			} catch (error) {
				toast.error("Moliyaviy ma'lumotlarni yuklashda xatolik yuz berdi")
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

	// 1. FILTER BOOKINGS BY PERIOD
	const today = new Date()
	const filteredBookings = bookings.filter(b => {
		const bDate = new Date(b.date)
		if (period === 'day') return isSameDay(bDate, today)
		if (period === 'week') return isSameWeek(bDate, today, { weekStartsOn: 1 })
		if (period === 'month') return isSameMonth(bDate, today)
		if (period === 'year') return isSameYear(bDate, today)
		return true
	})

	// 2. COMPUTE STATS
	const totalBookings = filteredBookings.length
	const completedBookings = filteredBookings.filter(
		b => b.status === 'confirmed' || b.status === 'completed',
	)
	const pendingBookings = filteredBookings.filter(b => b.status === 'pending')
	const cancelledBookings = filteredBookings.filter(
		b => b.status === 'cancelled',
	)

	const totalRevenue = completedBookings.reduce(
		(sum, b) => sum + (b.totalPrice || 0),
		0,
	)

	const averageTicket =
		completedBookings.length > 0 ? totalRevenue / completedBookings.length : 0

	// 3. EMPLOYEE PERFORMANCE
	const employeeStats = {}
	completedBookings.forEach(b => {
		const empId = b.employeeId?._id || 'unknown'
		if (!employeeStats[empId]) {
			employeeStats[empId] = {
				name: b.employeeId?.name || "Noma'lum Usta",
				revenue: 0,
				count: 0,
			}
		}
		employeeStats[empId].revenue += b.totalPrice || 0
		employeeStats[empId].count += 1
	})

	const topEmployees = Object.values(employeeStats).sort(
		(a, b) => b.revenue - a.revenue,
	)

	// 4. CHART DATA GENERATION
	const getChartData = () => {
		let labels = []
		let data = []

		if (period === 'day') {
			labels = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00']
			data = [0, 0, 0, 0, 0, 0]
			completedBookings.forEach(b => {
				const hour = parseInt(b.time.split(':')[0])
				if (hour >= 9 && hour < 11) data[0] += b.totalPrice
				else if (hour >= 11 && hour < 13) data[1] += b.totalPrice
				else if (hour >= 13 && hour < 15) data[2] += b.totalPrice
				else if (hour >= 15 && hour < 17) data[3] += b.totalPrice
				else if (hour >= 17 && hour < 19) data[4] += b.totalPrice
				else if (hour >= 19) data[5] += b.totalPrice
			})
		} else if (period === 'week') {
			labels = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya']
			data = [0, 0, 0, 0, 0, 0, 0]
			completedBookings.forEach(b => {
				let dayIndex = new Date(b.date).getDay() - 1 // 0 is Monday
				if (dayIndex === -1) dayIndex = 6 // Sunday
				data[dayIndex] += b.totalPrice
			})
		} else if (period === 'month') {
			labels = ['1-hafta', '2-hafta', '3-hafta', '4-hafta']
			data = [0, 0, 0, 0]
			completedBookings.forEach(b => {
				const date = new Date(b.date).getDate()
				if (date <= 7) data[0] += b.totalPrice
				else if (date <= 14) data[1] += b.totalPrice
				else if (date <= 21) data[2] += b.totalPrice
				else data[3] += b.totalPrice
			})
		} else if (period === 'year') {
			labels = [
				'Yan',
				'Fev',
				'Mar',
				'Apr',
				'May',
				'Iyun',
				'Iyul',
				'Avg',
				'Sen',
				'Okt',
				'Noy',
				'Dek',
			]
			data = new Array(12).fill(0)
			completedBookings.forEach(b => {
				const month = new Date(b.date).getMonth()
				data[month] += b.totalPrice
			})
		}

		const maxData = Math.max(...data, 1) // Prevent division by zero
		return { labels, data, maxData }
	}

	const chartData = getChartData()

	const getPeriodLabel = () => {
		switch (period) {
			case 'day':
				return 'Bugungi'
			case 'week':
				return 'Haftalik'
			case 'month':
				return 'Oylik'
			case 'year':
				return 'Yillik'
			default:
				return ''
		}
	}

	return (
		<DashboardLayout role='business'>
			<div className='space-y-6 pb-20'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Moliya va Hisobot
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Daromad va xarajatlar statistikasi. Barcha ma'lumotlar real
							bronlar asosida hisoblanadi.
						</p>
					</div>

					{/* Period Filter */}
					<div className='flex bg-white p-1 rounded-xl shadow-sm border border-zinc-100'>
						<button
							onClick={() => setPeriod('day')}
							className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${period === 'day' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
						>
							Kun
						</button>
						<button
							onClick={() => setPeriod('week')}
							className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${period === 'week' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
						>
							Hafta
						</button>
						<button
							onClick={() => setPeriod('month')}
							className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${period === 'month' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
						>
							Oy
						</button>
						<button
							onClick={() => setPeriod('year')}
							className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${period === 'year' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
						>
							Yil
						</button>
					</div>
				</div>

				{isLoading ? (
					<div className='space-y-6'>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
							{[...Array(4)].map((_, i) => (
								<Card
									key={i}
									className='border-none shadow-sm bg-white rounded-2xl'
								>
									<CardContent className='p-6 space-y-4 text-center'>
										<div className='flex justify-between items-center'>
											<Skeleton className='h-10 w-10 rounded-full' />
										</div>
										<Skeleton className='h-4 w-32' />
										<Skeleton className='h-8 w-1/2' />
									</CardContent>
								</Card>
							))}
						</div>
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
							<Skeleton className='lg:col-span-2 h-96 w-full rounded-2xl' />
							<Skeleton className='h-96 w-full rounded-2xl' />
						</div>
					</div>
				) : (
					<>
						{/* Finance Overview Cards */}
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
							{/* Total Revenue */}
							<Card className='border-none shadow-sm bg-zinc-900 text-white rounded-2xl overflow-hidden relative'>
								<div className='absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl -mr-10 -mt-10'></div>
								<CardContent className='p-6 relative z-10'>
									<p className='text-sm font-medium text-zinc-400 mb-1'>
										{getPeriodLabel()} Daromad
									</p>
									<h2 className='text-3xl font-bold text-white mb-4'>
										{formatPrice(totalRevenue)}{' '}
										<span className='text-lg font-medium text-zinc-500'>
											UZS
										</span>
									</h2>
									<div className='flex items-center gap-2'>
										<Wallet className='h-5 w-5 text-emerald-400' />
										<span className='text-sm text-zinc-300'>
											Kutilayotgan:{' '}
											{formatPrice(
												pendingBookings.reduce(
													(s, b) => s + (b.totalPrice || 0),
													0,
												),
											)}
										</span>
									</div>
								</CardContent>
							</Card>

							{/* Total Bookings */}
							<Card className='border-none shadow-sm bg-white rounded-2xl'>
								<CardContent className='p-6'>
									<div className='flex items-center justify-between mb-4'>
										<div className='h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600'>
											<CalendarIcon className='h-5 w-5' />
										</div>
									</div>
									<p className='text-sm font-medium text-zinc-500 mb-1'>
										{getPeriodLabel()} Yozuvlar (Jami: {totalBookings} /
										Bajrilgan: {completedBookings.length})
									</p>
									<div className='flex gap-4 mt-2'>
										<div>
											<span className='text-xl font-bold text-zinc-900'>
												{totalBookings}
											</span>
											<p className='text-xs text-zinc-500 mt-1'>Jami Mijoz</p>
										</div>
										<div className='border-l border-zinc-100 pl-4'>
											<span className='text-xl font-bold text-emerald-600'>
												{completedBookings.length}
											</span>
											<p className='text-xs text-zinc-500 mt-1'>Bajarildi</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Uncompleted/Cancelled */}
							<Card className='border-none shadow-sm bg-white rounded-2xl'>
								<CardContent className='p-6'>
									<div className='flex items-center justify-between mb-4'>
										<div className='h-10 w-10 bg-red-50 rounded-full flex items-center justify-center text-red-600'>
											<ArrowDownRight className='h-5 w-5' />
										</div>
									</div>
									<p className='text-sm font-medium text-zinc-500 mb-1'>
										{getPeriodLabel()} Amalga oshmagan
									</p>
									<div className='flex gap-4 mt-2'>
										<div>
											<span className='text-xl font-bold text-amber-600'>
												{pendingBookings.length}
											</span>
											<p className='text-xs text-zinc-500 mt-1'>Kutilmoqda</p>
										</div>
										<div className='border-l border-zinc-100 pl-4'>
											<span className='text-xl font-bold text-red-600'>
												{cancelledBookings.length}
											</span>
											<p className='text-xs text-zinc-500 mt-1'>
												Bekor qilingan
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Average Check */}
							<Card className='border-none shadow-sm bg-white rounded-2xl'>
								<CardContent className='p-6'>
									<div className='flex items-center justify-between mb-4'>
										<div className='h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600'>
											<DollarSign className='h-5 w-5' />
										</div>
									</div>
									<p className='text-sm font-medium text-zinc-500 mb-1'>
										{getPeriodLabel()} O'rtacha Chek
									</p>
									<h3 className='text-2xl font-bold text-zinc-900 mt-2'>
										{formatPrice(averageTicket)}{' '}
										<span className='text-sm font-medium text-zinc-500'>
											UZS
										</span>
									</h3>
								</CardContent>
							</Card>
						</div>

						{/* Charts and Lists */}
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
							{/* Dynamic Chart Area */}
							<Card className='border-none shadow-sm rounded-2xl bg-white lg:col-span-2'>
								<CardHeader className='border-b border-zinc-100 px-6 py-5 flex flex-row items-center justify-between'>
									<CardTitle className='text-base font-semibold text-zinc-900'>
										{getPeriodLabel()} Daromad Grafikasi
									</CardTitle>
								</CardHeader>
								<CardContent className='p-6 pt-10 flex flex-col justify-end min-h-[300px] relative overflow-x-auto'>
									{/* Horizontal Lines */}
									<div className='absolute inset-x-6 inset-y-10 flex flex-col-reverse justify-between pb-8 z-0 min-w-[500px]'>
										<div className='border-t border-dashed border-zinc-200 w-full h-0'></div>
										<div className='border-t border-dashed border-zinc-200 w-full h-0'></div>
										<div className='border-t border-dashed border-zinc-200 w-full h-0'></div>
										<div className='border-t border-dashed border-zinc-200 w-full h-0'></div>
									</div>

									{/* Bars */}
									<div className='relative z-10 flex items-end justify-between gap-4 h-56 mt-auto px-2 min-w-[500px]'>
										{chartData.data.map((amount, i) => {
											const height = (amount / chartData.maxData) * 100
											const isMax =
												amount === Math.max(...chartData.data) && amount > 0

											return (
												<div
													key={i}
													className='flex flex-col items-center gap-3 group w-full'
												>
													<div className='w-full max-w-[40px] bg-zinc-50 rounded-t-lg rounded-b-none relative overflow-hidden h-full flex items-end justify-center transition-all group-hover:bg-zinc-100 cursor-pointer'>
														<div
															className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${isMax ? 'bg-zinc-900' : 'bg-zinc-300 group-hover:bg-zinc-400'}`}
															style={{ height: `${height}%` }}
														></div>
														{amount > 0 && (
															<div className='absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] font-bold py-1 px-2 rounded-md whitespace-nowrap shadow-md pointer-events-none z-20'>
																{formatPrice(amount)}
															</div>
														)}
													</div>
													<span
														className={`text-[11px] font-medium ${isMax ? 'text-zinc-900' : 'text-zinc-400'} uppercase`}
													>
														{chartData.labels[i]}
													</span>
												</div>
											)
										})}
									</div>
								</CardContent>
							</Card>

							{/* Employee Breakdown */}
							<Card className='border-none shadow-sm rounded-2xl bg-white flex flex-col h-full'>
								<CardHeader className='border-b border-zinc-100 px-6 py-5 flex flex-row items-center justify-between pb-4'>
									<CardTitle className='text-base font-semibold text-zinc-900'>
										Ustalar Reytingi ({getPeriodLabel()})
									</CardTitle>
									<TrendingUp className='w-4 h-4 text-emerald-500' />
								</CardHeader>
								<CardContent className='p-0 flex-1 overflow-auto bg-zinc-50/30'>
									{topEmployees.length > 0 ? (
										<ul className='divide-y divide-zinc-100'>
											{topEmployees.map((emp, index) => (
												<li
													key={emp.name}
													className='px-6 py-4 flex items-center justify-between hover:bg-white transition-colors cursor-pointer group'
												>
													<div className='flex items-center gap-4'>
														<div
															className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${index === 0 ? 'bg-amber-100 text-amber-600' : index === 1 ? 'bg-zinc-200 text-zinc-600' : index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-zinc-100 text-zinc-400'}`}
														>
															#{index + 1}
														</div>
														<div>
															<p className='text-sm font-bold text-zinc-900'>
																{emp.name}
															</p>
															<p className='text-xs text-zinc-500 mt-0.5'>
																{emp.count} ta xizmat
															</p>
														</div>
													</div>
													<div className='text-right'>
														<p className='text-sm font-bold text-emerald-600'>
															{formatPrice(emp.revenue)}
														</p>
													</div>
												</li>
											))}
										</ul>
									) : (
										<div className='flex items-center justify-center p-8 text-sm text-zinc-400 font-medium'>
											Tushumlar mavjud emas
										</div>
									)}
								</CardContent>
							</Card>
						</div>
					</>
				)}
			</div>
		</DashboardLayout>
	)
}
