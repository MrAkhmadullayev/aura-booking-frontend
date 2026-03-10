'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import api from '@/lib/api'
import { Activity, Loader2, Scissors, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

export default function AdminStats() {
	const [isLoading, setIsLoading] = useState(true)
	const [stats, setStats] = useState(null)
	const [period, setPeriod] = useState('all') // 'month' | 'year' | 'all'

	useEffect(() => {
		const fetchAdminStats = async () => {
			try {
				setIsLoading(true)
				const res = await api.get('/dashboard/admin')
				setStats(res.data)
			} catch (error) {
				console.error('Error fetching admin stats', error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchAdminStats()
	}, [])

	const formatPrice = price => {
		if (price >= 1000000) {
			return (price / 1000000).toFixed(1) + 'M'
		}
		if (price >= 1000) {
			return (price / 1000).toFixed(1) + 'k'
		}
		return parseInt(price || 0)
			.toLocaleString('en-US')
			.replace(/,/g, ' ')
	}

	const filterByPeriod = dateString => {
		if (period === 'all') return true
		const date = new Date(dateString)
		const today = new Date()
		if (period === 'month') {
			return (
				date.getMonth() === today.getMonth() &&
				date.getFullYear() === today.getFullYear()
			)
		}
		if (period === 'year') {
			return date.getFullYear() === today.getFullYear()
		}
		return true
	}

	if (isLoading) {
		return (
			<DashboardLayout role='admin'>
				<div className='flex items-center justify-center min-h-[500px]'>
					<Loader2 className='w-8 h-8 animate-spin text-zinc-400' />
				</div>
			</DashboardLayout>
		)
	}

	// Calculate Dynamic Stats
	const users = stats?.users || []
	const bookings = stats?.bookings || []

	const filteredUsers = users.filter(u => filterByPeriod(u.createdAt))
	const filteredBookings = bookings.filter(b => filterByPeriod(b.date))
	const completedFilteredBookings = filteredBookings.filter(
		b => b.status === 'confirmed' || b.status === 'completed',
	)

	const totalActiveBookings = filteredBookings.length
	const totalRevenue = completedFilteredBookings.reduce(
		(sum, b) => sum + (b.totalPrice || 0),
		0,
	)

	// Calculate new salons (role: business) in period
	const newSalons = filteredUsers.filter(u => u.role === 'business').length
	const newClients = filteredUsers.filter(
		u => u.role === 'client' || u.role === 'user',
	).length

	// ----------------------------------------
	// Chart 1: Growth Chart (AreaChart Users)
	// ----------------------------------------
	const getGrowthData = () => {
		let rawData = []

		if (period === 'month') {
			const daysInMonth = new Date(
				new Date().getFullYear(),
				new Date().getMonth() + 1,
				0,
			).getDate()

			for (let i = 1; i <= daysInMonth; i++) {
				rawData.push({ name: `${i}-kun`, count: 0 })
			}

			filteredUsers.forEach(u => {
				const day = new Date(u.createdAt).getDate() - 1
				if (day >= 0 && day < daysInMonth) rawData[day].count += 1
			})
		} else {
			const months = [
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
			rawData = months.map(m => ({ name: m, count: 0 }))

			let lookupUsers = period === 'all' ? users : filteredUsers
			lookupUsers.forEach(u => {
				const m = new Date(u.createdAt).getMonth()
				rawData[m].count += 1
			})
		}
		return rawData
	}
	const growthData = getGrowthData()

	// ----------------------------------------
	// Chart 2: Revenue Chart (BarChart)
	// ----------------------------------------
	const getRevenueData = () => {
		let rawData = []

		if (period === 'month') {
			const daysInMonth = new Date(
				new Date().getFullYear(),
				new Date().getMonth() + 1,
				0,
			).getDate()

			for (let i = 1; i <= daysInMonth; i++) {
				rawData.push({ name: `${i}-kun`, income: 0 })
			}

			completedFilteredBookings.forEach(b => {
				const day = new Date(b.date).getDate() - 1
				if (day >= 0 && day < daysInMonth) {
					rawData[day].income += b.totalPrice || 0
				}
			})
		} else {
			const months = [
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
			rawData = months.map(m => ({ name: m, income: 0 }))

			let lookupBookings =
				period === 'all'
					? bookings.filter(
							b => b.status === 'confirmed' || b.status === 'completed',
						)
					: completedFilteredBookings

			lookupBookings.forEach(b => {
				const m = new Date(b.date).getMonth()
				rawData[m].income += b.totalPrice || 0
			})
		}
		return rawData
	}
	const revenueData = getRevenueData()

	// ----------------------------------------
	// Chart 3: Popular Services (PieChart)
	// ----------------------------------------
	const getPopularServices = () => {
		const serviceCounts = {}
		completedFilteredBookings.forEach(b => {
			if (b.serviceId && b.serviceId.name) {
				const name = b.serviceId.name
				serviceCounts[name] = (serviceCounts[name] || 0) + 1
			}
		})

		const sorted = Object.entries(serviceCounts)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5)
			.map(([name, value]) => ({ name, value }))

		return sorted
	}
	const popularServices = getPopularServices()
	const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#f43f5e', '#3b82f6']

	// Tooltip components
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className='bg-zinc-900 text-white p-3 rounded-xl shadow-xl border border-white/10 text-xs font-semibold z-50'>
					<p className='mb-1 opacity-80'>{label}</p>
					<p className='text-sm flex items-center gap-1.5'>
						<span
							className='w-2 h-2 rounded-full'
							style={{ backgroundColor: payload[0].color }}
						></span>
						{payload[0].name === 'income'
							? `${payload[0].value.toLocaleString()} so'm`
							: `${payload[0].value} ta foydalanuvchi`}
					</p>
				</div>
			)
		}
		return null
	}

	return (
		<DashboardLayout role='admin'>
			<div className='space-y-6 pb-20'>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Umumiy Statistika
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Platformaning o'sishi va moliyaviy aylanmasi haqida real
							hisobotlar.
						</p>
					</div>
					<div className='flex bg-white shadow-sm border border-zinc-100 p-1 rounded-xl'>
						<button
							onClick={() => setPeriod('month')}
							className={`px-4 py-2 text-sm rounded-lg transition-colors ${period === 'month' ? 'font-bold bg-zinc-900 text-white' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Oylik
						</button>
						<button
							onClick={() => setPeriod('year')}
							className={`px-4 py-2 text-sm rounded-lg transition-colors ${period === 'year' ? 'font-bold bg-zinc-900 text-white' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Yillik
						</button>
						<button
							onClick={() => setPeriod('all')}
							className={`px-4 py-2 text-sm rounded-lg transition-colors ${period === 'all' ? 'font-bold bg-zinc-900 text-white' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Barcha vaqt
						</button>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardContent className='p-6'>
							<div className='flex justify-between items-start mb-4'>
								<div className='h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center'>
									<Activity className='h-5 w-5' />
								</div>
							</div>
							<p className='text-sm font-medium text-zinc-500 mb-1'>
								Jami Bronlar (
								{period === 'all'
									? 'Barchas'
									: period === 'month'
										? 'Oyiga'
										: 'Yiliga'}
								)
							</p>
							<h3 className='text-3xl font-bold text-zinc-900'>
								{totalActiveBookings}
							</h3>
						</CardContent>
					</Card>

					<Card className='border-none shadow-xl rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 text-white relative overflow-hidden'>
						<div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none'></div>
						<CardContent className='p-6 relative z-10'>
							<div className='flex justify-between items-start mb-4'>
								<div className='h-10 w-10 bg-white/10 text-white rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-md'>
									<TrendingUp className='h-5 w-5' />
								</div>
							</div>
							<p className='text-sm font-medium text-zinc-300 mb-1'>
								Platforma Tushumi
							</p>
							<h3 className='text-3xl font-bold text-white'>
								{formatPrice(totalRevenue)} UZS
							</h3>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardContent className='p-6'>
							<div className='flex justify-between items-start mb-4'>
								<div className='h-10 w-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center'>
									<Scissors className='h-5 w-5' />
								</div>
							</div>
							<p className='text-sm font-medium text-zinc-500 mb-1'>
								Biznes Hamkorlar
							</p>
							<h3 className='text-3xl font-bold text-zinc-900'>{newSalons}</h3>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardContent className='p-6'>
							<div className='flex justify-between items-start mb-4'>
								<div className='h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center'>
									<Users className='h-5 w-5' />
								</div>
							</div>
							<p className='text-sm font-medium text-zinc-500 mb-1'>
								Yangi Mijozlar
							</p>
							<h3 className='text-3xl font-bold text-zinc-900'>{newClients}</h3>
						</CardContent>
					</Card>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					{/* Dynamic Growth Chart using Recharts */}
					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardHeader className='border-b border-zinc-50 px-6 py-5 flex flex-row items-center justify-between'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								Foydalanuvchilar O'sishi
							</CardTitle>
							<div className='text-xs font-medium text-zinc-400 bg-zinc-100 px-2 py-1 rounded-md'>
								Jami: {filteredUsers.length}
							</div>
						</CardHeader>
						<CardContent className='p-6 h-[320px]'>
							<ResponsiveContainer width='100%' height='100%'>
								<AreaChart
									data={growthData}
									margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
								>
									<defs>
										<linearGradient id='colorCount' x1='0' y1='0' x2='0' y2='1'>
											<stop offset='5%' stopColor='#4f46e5' stopOpacity={0.3} />
											<stop offset='95%' stopColor='#4f46e5' stopOpacity={0} />
										</linearGradient>
									</defs>
									<XAxis
										dataKey='name'
										tickLine={false}
										axisLine={false}
										tick={{ fontSize: 10, fill: '#a1a1aa' }}
										dy={10}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tick={{ fontSize: 10, fill: '#a1a1aa' }}
										dx={-10}
									/>
									<CartesianGrid vertical={false} stroke='#f4f4f5' />
									<Tooltip content={<CustomTooltip />} />
									<Area
										type='monotone'
										dataKey='count'
										stroke='#4f46e5'
										strokeWidth={3}
										fillOpacity={1}
										fill='url(#colorCount)'
										animationDuration={1500}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>

					{/* Revenue Bar Chart using Recharts */}
					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardHeader className='border-b border-zinc-50 px-6 py-5 flex flex-row items-center justify-between'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								Tushumlar Dinamikasi
							</CardTitle>
						</CardHeader>
						<CardContent className='p-6 h-[320px]'>
							<ResponsiveContainer width='100%' height='100%'>
								<BarChart
									data={revenueData}
									margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
								>
									<XAxis
										dataKey='name'
										tickLine={false}
										axisLine={false}
										tick={{ fontSize: 10, fill: '#a1a1aa' }}
										dy={10}
									/>
									<Tooltip
										content={<CustomTooltip />}
										cursor={{ fill: '#f4f4f5' }}
									/>
									<Bar
										dataKey='income'
										fill='#10b981'
										radius={[4, 4, 0, 0]}
										animationDuration={1500}
									>
										{revenueData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={
													entry.income ===
													Math.max(...revenueData.map(d => d.income))
														? '#059669' // highlight max bar
														: '#10b981'
												}
											/>
										))}
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Popular Services PieChart */}
					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardHeader className='border-b border-zinc-50 px-6 py-5'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								Ommabop Xizmatlar
							</CardTitle>
						</CardHeader>
						<CardContent className='p-6 h-[300px] flex items-center justify-between'>
							{popularServices.length > 0 ? (
								<>
									<ResponsiveContainer width='50%' height='100%'>
										<PieChart>
											<Pie
												data={popularServices}
												cx='50%'
												cy='50%'
												innerRadius={60}
												outerRadius={80}
												paddingAngle={5}
												dataKey='value'
												stroke='none'
											>
												{popularServices.map((entry, index) => (
													<Cell
														key={`cell-${index}`}
														fill={COLORS[index % COLORS.length]}
													/>
												))}
											</Pie>
											<Tooltip />
										</PieChart>
									</ResponsiveContainer>
									<div className='w-1/2 flex flex-col justify-center space-y-3 pl-4'>
										{popularServices.map((entry, index) => (
											<div key={index} className='flex items-center gap-2'>
												<span
													className='w-3 h-3 rounded-full flex-shrink-0'
													style={{
														backgroundColor: COLORS[index % COLORS.length],
													}}
												/>
												<p className='text-sm text-zinc-600 font-medium truncate'>
													{entry.name}
												</p>
											</div>
										))}
									</div>
								</>
							) : (
								<div className='w-full h-full flex flex-col items-center justify-center'>
									<p className='text-zinc-500 font-medium'>
										Hech qanday ma'lumot yo'q
									</p>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Another potential card or info */}
					<Card className='border-none shadow-sm rounded-2xl bg-indigo-50/50 relative overflow-hidden flex flex-col justify-center border border-indigo-100/50'>
						<div className='absolute -right-10 -bottom-10 opacity-10 flex text-indigo-900'>
							<TrendingUp className='w-48 h-48' />
						</div>
						<CardContent className='p-8 relative z-10 text-center lg:text-left'>
							<div className='w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 mb-4 mx-auto lg:mx-0'>
								<Users className='w-6 h-6' />
							</div>
							<h3 className='text-2xl font-bold text-indigo-900 mb-2'>
								Platforma ishonchi ortmoqda
							</h3>
							<p className='text-indigo-600/80 font-medium text-sm max-w-sm mx-auto lg:mx-0'>
								So'nggi oylarda ro'yxatdan o'tgan mijozlar soni muntazam o'sib
								kelmoqda. Ommabop xizmatlar tufayli tadbirkorlarning o'rtacha
								tushumi sezilarli darajada oshdi.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	)
}
