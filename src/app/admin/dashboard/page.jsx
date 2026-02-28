import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarCheck, Scissors, TrendingUp, Users } from 'lucide-react'

export default function AdminDashboard() {
	return (
		<DashboardLayout role='admin'>
			<div className='space-y-6'>
				<div>
					<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
						Xulosa
					</h1>
					<p className='text-zinc-500 text-sm mt-1'>
						Aura Booking tizimining umumiy statistikasi.
					</p>
				</div>

				{/* Quick Stats */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					<Card className='border-none shadow-sm bg-white rounded-2xl'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-zinc-500 mb-1'>
										Jami Salonlar
									</p>
									<h2 className='text-3xl font-bold text-zinc-900'>124</h2>
								</div>
								<div className='h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center'>
									<Scissors
										className='h-6 w-6 text-zinc-700'
										strokeWidth={1.5}
									/>
								</div>
							</div>
							<div className='mt-4 flex items-center text-sm'>
								<span className='text-emerald-600 font-medium'>+12%</span>
								<span className='text-zinc-400 ml-2'>o'tgan oydan</span>
							</div>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm bg-white rounded-2xl'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-zinc-500 mb-1'>
										Foydalanuvchilar
									</p>
									<h2 className='text-3xl font-bold text-zinc-900'>8,430</h2>
								</div>
								<div className='h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center'>
									<Users className='h-6 w-6 text-blue-600' strokeWidth={1.5} />
								</div>
							</div>
							<div className='mt-4 flex items-center text-sm'>
								<span className='text-emerald-600 font-medium'>+5.4%</span>
								<span className='text-zinc-400 ml-2'>o'tgan oydan</span>
							</div>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm bg-white rounded-2xl'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-zinc-500 mb-1'>
										Bugungi Bronlar
									</p>
									<h2 className='text-3xl font-bold text-zinc-900'>284</h2>
								</div>
								<div className='h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center'>
									<CalendarCheck
										className='h-6 w-6 text-purple-600'
										strokeWidth={1.5}
									/>
								</div>
							</div>
							<div className='mt-4 flex items-center text-sm'>
								<span className='text-emerald-600 font-medium'>+18%</span>
								<span className='text-zinc-400 ml-2'>kechagiga nisbatan</span>
							</div>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm bg-zinc-900 text-white rounded-2xl'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-zinc-400 mb-1'>
										Tushum (Aura)
									</p>
									<h2 className='text-3xl font-bold text-white'>45M</h2>
								</div>
								<div className='h-12 w-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20'>
									<TrendingUp
										className='h-6 w-6 text-white'
										strokeWidth={1.5}
									/>
								</div>
							</div>
							<div className='mt-4 flex items-center text-sm'>
								<span className='text-emerald-400 font-medium'>+22%</span>
								<span className='text-zinc-400 ml-2'>o'tgan oydan</span>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
					{/* Recent Activity */}
					<Card className='border-none shadow-sm rounded-2xl overflow-hidden'>
						<CardHeader className='bg-white border-b border-zinc-100 px-6 py-5'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								Yangi qo'shilgan salonlar
							</CardTitle>
						</CardHeader>
						<CardContent className='p-0 bg-white'>
							<ul className='divide-y divide-zinc-50'>
								{[
									{
										name: 'VIP Beauty Center',
										owner: 'Malika A.',
										time: '2 soat oldin',
									},
									{
										name: 'Barbershop 01',
										owner: 'Aziz R.',
										time: '5 soat oldin',
									},
									{ name: 'Lola Spa', owner: 'Lola T.', time: '1 kun oldin' },
								].map((item, i) => (
									<li
										key={i}
										className='px-6 py-4 flex items-center justify-between hover:bg-zinc-50/50 transition-colors'
									>
										<div className='flex items-center gap-4'>
											<div className='h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 font-medium'>
												{item.name.charAt(0)}
											</div>
											<div>
												<p className='text-sm font-medium text-zinc-900'>
													{item.name}
												</p>
												<p className='text-xs text-zinc-500'>
													Rahbar: {item.owner}
												</p>
											</div>
										</div>
										<span className='text-xs font-medium text-zinc-400 bg-zinc-100 px-2 py-1 rounded-md'>
											{item.time}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					{/* System Stats placeholder */}
					<Card className='border-none shadow-sm rounded-2xl overflow-hidden'>
						<CardHeader className='bg-white border-b border-zinc-100 px-6 py-5 flex flex-row items-center justify-between'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								So'nggi ro'yxatdan o'tgan mijozlar
							</CardTitle>
						</CardHeader>
						<CardContent className='p-6 bg-white min-h-[300px] flex items-center justify-center'>
							<div className='text-center'>
								<div className='h-16 w-16 bg-zinc-50 border border-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3'>
									<Users className='h-6 w-6 text-zinc-400' />
								</div>
								<p className='text-zinc-500 text-sm'>
									Yangi mijozlar statistikasi shu yerda ko'rinadi.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	)
}
