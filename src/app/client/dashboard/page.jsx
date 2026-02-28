'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Calendar,
	CalendarCheck,
	Clock,
	MapPin,
	Scissors,
	Star,
} from 'lucide-react'

export default function ClientDashboard() {
	return (
		<DashboardLayout role='client'>
			<div className='space-y-6'>
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
					<Card className='border-none shadow-sm rounded-3xl overflow-hidden lg:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white relative'>
						<div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-10 -mt-20 pointer-events-none'></div>
						<CardContent className='p-8 sm:p-10 relative z-10 flex flex-col md:flex-row gap-8 justify-between'>
							<div className='space-y-6'>
								<div>
									<span className='inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-zinc-200 mb-4 border border-white/20'>
										Yaqinlashib kelayotgan
									</span>
									<h2 className='text-3xl font-bold'>Aura Premium Salon</h2>
									<p className='text-zinc-400 mt-2 flex items-center gap-2'>
										<MapPin className='h-4 w-4' /> Yunusobod tumani, Amir Temur
										108
									</p>
								</div>

								<div className='flex items-center gap-6'>
									<div>
										<p className='text-zinc-400 text-sm mb-1'>Xizmat</p>
										<p className='font-semibold flex items-center gap-2'>
											<Scissors className='h-4 w-4' /> Erkaklar soch kesish
										</p>
									</div>
									<div className='w-[1px] h-10 bg-white/10'></div>
									<div>
										<p className='text-zinc-400 text-sm mb-1'>Usta</p>
										<p className='font-semibold flex items-center gap-2'>
											<Star className='h-4 w-4 text-amber-400 fill-amber-400' />{' '}
											Alisher
										</p>
									</div>
								</div>
							</div>

							<div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 text-center min-w-[180px]'>
								<div>
									<p className='text-sm font-medium text-zinc-300 mb-2 flex items-center justify-center gap-2'>
										<Calendar className='h-4 w-4' /> Ertaga
									</p>
									<p className='text-4xl font-bold font-mono'>14:30</p>
								</div>
								<div className='w-10 h-[1px] md:h-10 md:w-[1px] bg-white/10 hidden md:block'></div>
								<Button className='bg-white text-zinc-900 hover:bg-zinc-100 rounded-xl font-medium w-full md:w-auto'>
									Bekor qilish
								</Button>
							</div>
						</CardContent>
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
									<p className='text-2xl font-bold text-zinc-900'>14</p>
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
										Har oyning oxiri
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
				<div className='mt-8'>
					<h3 className='text-lg font-bold text-zinc-900 mb-4 px-1'>
						O'tgan tashriflar tarixi
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{[
							{
								salon: 'Aura Premium Salon',
								service: 'Soch kesish (Fade)',
								date: '12 Aprel, 2024',
								price: '120,000 UZS',
							},
							{
								salon: 'Aura Premium Salon',
								service: 'Soch va soqol',
								date: '05 Mart, 2024',
								price: '150,000 UZS',
							},
							{
								salon: 'VIP Barbershop',
								service: 'Soch kesish',
								date: '10 Fevral, 2024',
								price: '80,000 UZS',
							},
						].map((item, idx) => (
							<Card
								key={idx}
								className='border-none shadow-sm rounded-xl hover:shadow-md transition-shadow'
							>
								<CardContent className='p-5 flex items-center justify-between'>
									<div className='flex items-center gap-4'>
										<div className='h-10 w-10 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-500 font-medium'>
											{item.salon.charAt(0)}
										</div>
										<div>
											<p className='text-sm font-semibold text-zinc-900'>
												{item.salon}
											</p>
											<p className='text-xs text-zinc-500 mt-0.5'>
												{item.service} • {item.date}
											</p>
										</div>
									</div>
									<div className='text-right'>
										<p className='text-sm font-bold text-zinc-900'>
											{item.price}
										</p>
										<p className='text-xs text-emerald-600 font-medium mt-0.5'>
											Bajarilgan
										</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</DashboardLayout>
	)
}
