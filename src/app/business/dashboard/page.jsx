import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Banknote, Calendar, CalendarCheck, Users } from 'lucide-react'

export default function BusinessDashboard() {
	return (
		<DashboardLayout role='business'>
			<div className='space-y-6'>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Xulosa
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Sizning biznesingiz va ustalar statistikasi.
						</p>
					</div>
					<Button className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-sm px-6 h-10 w-full sm:w-auto'>
						+ Yangi yozuv qo'shish
					</Button>
				</div>

				{/* Quick Stats */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<Card className='border-none shadow-sm bg-white rounded-2xl'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-zinc-500 mb-1'>
										Bugungi Yozuvlar
									</p>
									<div className='flex items-baseline gap-2'>
										<h2 className='text-3xl font-bold text-zinc-900'>12</h2>
										<span className='text-sm text-zinc-400'>/ 15 bo'sh</span>
									</div>
								</div>
								<div className='h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center'>
									<CalendarCheck
										className='h-6 w-6 text-blue-600'
										strokeWidth={1.5}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm bg-white rounded-2xl'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-zinc-500 mb-1'>
										Jami Mijozlar
									</p>
									<h2 className='text-3xl font-bold text-zinc-900'>1,204</h2>
								</div>
								<div className='h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center'>
									<Users
										className='h-6 w-6 text-emerald-600'
										strokeWidth={1.5}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm bg-zinc-900 text-white rounded-2xl'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-zinc-400 mb-1'>
										Kunlik Tushum
									</p>
									<h2 className='text-3xl font-bold text-white'>
										1.2M{' '}
										<span className='text-lg font-medium text-zinc-400 ml-1'>
											UZS
										</span>
									</h2>
								</div>
								<div className='h-12 w-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20'>
									<Banknote className='h-6 w-6 text-white' strokeWidth={1.5} />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
					{/* Upcoming Appointments */}
					<Card className='border-none shadow-sm rounded-2xl overflow-hidden lg:col-span-2'>
						<CardHeader className='bg-white border-b border-zinc-100 px-6 py-5 flex flex-row items-center justify-between'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								Yaqin Yozuvlar
							</CardTitle>
							<Button
								variant='ghost'
								size='sm'
								className='text-sm text-zinc-500 font-medium'
							>
								Barchasini ko'rish
							</Button>
						</CardHeader>
						<CardContent className='p-0 bg-white'>
							<ul className='divide-y divide-zinc-50'>
								{[
									{
										name: 'Sadriddin',
										service: 'Soch kesish (Fade)',
										time: '14:30 - 15:15',
										master: 'Alisher',
										status: 'Kutilmoqda',
									},
									{
										name: 'Madina',
										service: 'Manikyur',
										time: '15:30 - 17:00',
										master: 'Lola',
										status: 'Kutilmoqda',
									},
									{
										name: 'Azizbek',
										service: 'Soqol tekislash',
										time: '16:00 - 16:30',
										master: 'Alisher',
										status: 'Kutilmoqda',
									},
								].map((item, i) => (
									<li
										key={i}
										className='px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors'
									>
										<div className='flex items-center gap-4'>
											<div className='h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 font-medium flex-shrink-0'>
												{item.name.charAt(0)}
											</div>
											<div>
												<p className='text-sm font-medium text-zinc-900'>
													{item.name}
												</p>
												<p className='text-xs text-zinc-500'>
													{item.service} • Usta: {item.master}
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
											<span className='text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100'>
												{item.status}
											</span>
										</div>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					{/* Schedule Preview */}
					<Card className='border-none shadow-sm rounded-2xl overflow-hidden'>
						<CardHeader className='bg-white border-b border-zinc-100 px-6 py-5'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								Ustalar Jadvali (Bugun)
							</CardTitle>
						</CardHeader>
						<CardContent className='p-6 bg-white space-y-4'>
							{[
								{
									name: 'Alisher (Asosiy)',
									progress: 80,
									booked: 8,
									total: 10,
								},
								{ name: 'Lola (Manikyur)', progress: 40, booked: 4, total: 10 },
								{
									name: 'Jasur (Sartarosh)',
									progress: 100,
									booked: 12,
									total: 12,
								},
							].map((master, idx) => (
								<div key={idx} className='space-y-2'>
									<div className='flex justify-between items-center text-sm'>
										<span className='font-medium text-zinc-700'>
											{master.name}
										</span>
										<span className='text-zinc-500'>
											{master.booked}/{master.total} band
										</span>
									</div>
									<div className='h-2 w-full bg-zinc-100 rounded-full overflow-hidden'>
										<div
											className={`h-full rounded-full ${master.progress === 100 ? 'bg-red-500' : master.progress > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
											style={{ width: `${master.progress}%` }}
										></div>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	)
}
