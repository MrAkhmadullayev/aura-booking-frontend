'use client'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import useFetch from '@/hooks/useFetch'
import { isSameDay } from 'date-fns'
import {
	Banknote,
	Calendar,
	CalendarCheck,
	MapPin,
	Scissors,
	Users,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BusinessDashboard() {
	const router = useRouter()

	// Concurrent SWR Fetches
	const {
		data: stats = {
			totalServices: 0,
			totalBookings: 0,
			pendingBookings: 0,
			totalRevenue: 0,
		},
		isLoading: isStatsLoading,
	} = useFetch('/dashboard/business')
	const { data: bookingsData = [], isLoading: isBookingsLoading } =
		useFetch('/bookings/salon')
	const { data: salonsData = [], isLoading: isSalonsLoading } =
		useFetch('/salons/mine')
	const { data: employeesData = [], isLoading: isEmployeesLoading } =
		useFetch('/employees')

	const isLoading =
		isStatsLoading || isBookingsLoading || isSalonsLoading || isEmployeesLoading

	// Derived State for Data Aggregations directly from SWR Cache without explicit useEffect syncs
	const today = new Date()
	const todaysBookings = bookingsData.filter(b =>
		isSameDay(new Date(b.date), today),
	)

	const upcomingBookings = todaysBookings
		.filter(b => b.status === 'pending' || b.status === 'confirmed')
		.sort((a, b) => a.time.localeCompare(b.time))

	// Calculate Employee Busy Rates
	const empsData = {}
	salonsData.forEach(salon => {
		// Employees mapping
		const salonEmployees = employeesData.filter(e => {
			const empSalonId = e.salonId?._id || e.salonId
			return empSalonId === salon._id
		})
		salonEmployees.forEach(e => {
			empsData[e._id] = {
				id: e._id,
				name: e.name,
				salonName: salon.name,
				booked: 0,
				total: 10,
			}
		})
	})

	todaysBookings.forEach(b => {
		if (
			b.status === 'pending' ||
			b.status === 'confirmed' ||
			b.status === 'completed'
		) {
			const empId = b.employeeId?._id
			if (empId && empsData[empId]) {
				empsData[empId].booked += 1
			}
		}
	})

	const employeeSchedules = Object.values(empsData)
		.map(emp => ({
			...emp,
			progress: Math.min((emp.booked / emp.total) * 100, 100),
		}))
		.sort((a, b) => a.salonName.localeCompare(b.salonName))

	const formatPrice = price => {
		return parseInt(price || 0)
			.toLocaleString('en-US')
			.replace(/,/g, ' ')
	}

	const statusConfig = {
		pending: 'text-amber-600 bg-amber-50 border-amber-100',
		confirmed: 'text-blue-600 bg-blue-50 border-blue-100',
	}

	const translateStatus = status => {
		if (status === 'pending') return 'Kutilmoqda'
		if (status === 'confirmed') return 'Tasdiqlangan'
		return status
	}

	return (
		<DashboardLayout role='business'>
			<div className='space-y-6 pb-20'>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Xulosa
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Sizning biznesingiz va ustalar statistikasi.
						</p>
					</div>
					<Button
						onClick={() => router.push('/business/bookings')}
						className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-sm px-6 h-10 w-full sm:w-auto'
					>
						+ Yangi yozuv qo'shish
					</Button>
				</div>

				{/* Quick Stats */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6'>
					<Card className='border-none shadow-sm rounded-2xl overflow-hidden relative'>
						<div className='absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60 pointer-events-none'></div>
						<CardContent className='p-6 relative z-10'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-zinc-500 mb-2'>
										Jami Yozuvlar
									</p>
									{isLoading ? (
										<div className='space-y-2'>
											<Skeleton className='h-8 w-24 rounded-lg' />
											<Skeleton className='h-4 w-32 rounded-lg' />
										</div>
									) : (
										<div className='flex items-baseline gap-2'>
											<h2 className='text-3xl font-bold tracking-tight text-zinc-900'>
												{stats.totalBookings}
											</h2>
											<span className='text-xs font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full'>
												/ {stats.pendingBookings} kutayotgan
											</span>
										</div>
									)}
								</div>
								<div className='h-12 w-12 rounded-xl bg-blue-50/80 border border-blue-100/50 flex items-center justify-center shadow-sm shrink-0'>
									<CalendarCheck
										className='h-5 w-5 text-blue-600'
										strokeWidth={2}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm rounded-2xl overflow-hidden relative'>
						<div className='absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60 pointer-events-none'></div>
						<CardContent className='p-6 relative z-10'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-zinc-500 mb-2'>
										Jami Xizmatlar
									</p>
									{isLoading ? (
										<Skeleton className='h-8 w-20 rounded-lg' />
									) : (
										<h2 className='text-3xl font-bold tracking-tight text-zinc-900'>
											{stats.totalServices}
										</h2>
									)}
								</div>
								<div className='h-12 w-12 rounded-xl bg-emerald-50/80 border border-emerald-100/50 flex items-center justify-center shadow-sm shrink-0'>
									<Users className='h-5 w-5 text-emerald-600' strokeWidth={2} />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className='border-none shadow-lg rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white overflow-hidden relative'>
						<div className='absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none'></div>
						<div className='absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none'></div>
						<CardContent className='p-6 relative z-10'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-zinc-400 mb-2'>
										Daromad
									</p>
									{isLoading ? (
										<div className='space-y-2'>
											<Skeleton className='h-8 w-32 bg-white/10 rounded-lg' />
										</div>
									) : (
										<h2 className='text-3xl font-bold tracking-tight text-white flex items-baseline gap-1.5'>
											{formatPrice(stats.totalRevenue)}
											<span className='text-sm font-semibold text-zinc-400 uppercase'>
												UZS
											</span>
										</h2>
									)}
								</div>
								<div className='h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shadow-inner backdrop-blur-md shrink-0'>
									<Banknote
										className='h-5 w-5 text-emerald-400'
										strokeWidth={2}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
					{/* Upcoming Appointments */}
					<Card className='border-none shadow-sm rounded-2xl overflow-hidden lg:col-span-2 flex flex-col'>
						<CardHeader className='bg-white border-b border-zinc-100 px-6 py-5 flex flex-row items-center justify-between'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								Bugungi Yozuvlar ({upcomingBookings.length})
							</CardTitle>
							<Button
								variant='ghost'
								size='sm'
								onClick={() => router.push('/business/bookings')}
								className='text-sm text-zinc-500 font-medium'
							>
								Barchasini ko'rish
							</Button>
						</CardHeader>
						<CardContent className='p-0 bg-white flex-1 overflow-auto max-h-[400px]'>
							{isLoading ? (
								<ul className='divide-y divide-zinc-50'>
									{[...Array(3)].map((_, i) => (
										<li
											key={i}
											className='px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4'
										>
											<div className='flex items-center gap-4 w-full'>
												<Skeleton className='h-10 w-10 min-w-[40px] rounded-full' />
												<div className='space-y-2 w-full'>
													<Skeleton className='h-4 w-32' />
													<Skeleton className='h-3 w-48' />
												</div>
											</div>
											<div className='flex items-center gap-4 sm:ml-auto w-full sm:w-auto mt-2 sm:mt-0'>
												<Skeleton className='h-4 w-16' />
												<Skeleton className='h-6 w-20 rounded-md' />
											</div>
										</li>
									))}
								</ul>
							) : upcomingBookings.length > 0 ? (
								<ul className='divide-y divide-zinc-50'>
									{upcomingBookings.map((item, i) => (
										<li
											key={item._id}
											className='px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors'
										>
											<div className='flex items-center gap-4'>
												<div className='h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 font-medium flex-shrink-0'>
													{(item.guestName || item.clientId?.name || 'M')
														.charAt(0)
														.toUpperCase()}
												</div>
												<div>
													<p className='text-sm font-bold text-zinc-900'>
														{item.guestName ||
															item.clientId?.name ||
															'Mijoz nomi kiritilmagan'}
													</p>
													<p className='text-xs text-zinc-500 flex items-center gap-1 mt-0.5'>
														{item.serviceId?.name} •
														<MapPin className='w-3 h-3 ml-1' />{' '}
														{item.salonId?.name}
													</p>
												</div>
											</div>
											<div className='flex items-center gap-4 sm:ml-auto'>
												<div className='text-right flex items-center gap-2'>
													<Calendar className='h-4 w-4 text-zinc-400' />
													<span className='text-sm font-semibold text-zinc-700'>
														{item.time}
													</span>
												</div>
												<span
													className={`text-xs font-semibold px-2 py-1 rounded-md border ${statusConfig[item.status] || ''}`}
												>
													{translateStatus(item.status)}
												</span>
											</div>
										</li>
									))}
								</ul>
							) : (
								<div className='flex flex-col items-center justify-center h-full p-10 text-center'>
									<Scissors className='w-10 h-10 text-zinc-200 mb-3' />
									<p className='text-zinc-500 font-medium'>
										Bugun uchun hech qanday yozuv yo'q
									</p>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Schedule Preview */}
					<Card className='border-none shadow-sm rounded-2xl overflow-hidden flex flex-col'>
						<CardHeader className='bg-white border-b border-zinc-100 px-6 py-5'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								Ustalar Jadvali (Bugun)
							</CardTitle>
						</CardHeader>
						<CardContent className='p-6 bg-white space-y-6 flex-1 overflow-auto max-h-[400px]'>
							{isLoading ? (
								<div className='space-y-6'>
									{[...Array(4)].map((_, i) => (
										<div key={i} className='space-y-2'>
											<div className='flex justify-between items-center'>
												<div className='space-y-1'>
													<Skeleton className='h-4 w-28' />
													<Skeleton className='h-3 w-20' />
												</div>
												<Skeleton className='h-5 w-12 rounded-full' />
											</div>
											<Skeleton className='h-2 w-full rounded-full' />
										</div>
									))}
								</div>
							) : employeeSchedules.length > 0 ? (
								employeeSchedules.map((master, idx) => (
									<div key={master.id} className='space-y-2'>
										<div className='flex justify-between items-center text-sm'>
											<div className='flex flex-col'>
												<span className='font-bold text-zinc-800 line-clamp-1'>
													{master.name}
												</span>
												<span className='text-[10px] text-zinc-400 uppercase tracking-wider'>
													{master.salonName}
												</span>
											</div>
											<span className='text-zinc-500 font-medium bg-zinc-100 px-2 py-0.5 rounded-full text-xs'>
												{master.booked} band
											</span>
										</div>
										<div className='h-2 w-full bg-zinc-100 rounded-full overflow-hidden'>
											<div
												className={`h-full rounded-full transition-all duration-1000 ${master.progress === 100 ? 'bg-red-500' : master.progress > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
												style={{
													width: `${master.progress === 0 ? 3 : master.progress}%`,
												}}
											></div>
										</div>
									</div>
								))
							) : (
								<div className='flex flex-col items-center justify-center p-6 text-center'>
									<p className='text-zinc-500 font-medium'>
										Hech qanday usta topilmadi
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	)
}
