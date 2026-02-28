'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Scissors, TrendingUp, Users } from 'lucide-react'

export default function AdminStats() {
	return (
		<DashboardLayout role='admin'>
			<div className='space-y-6'>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Umumiy Statistika
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Platformaning o'sishi va moliyaviy aylanmasi haqida hisobotlar.
						</p>
					</div>
					<div className='flex bg-zinc-100 p-1 rounded-xl'>
						<button className='px-4 py-2 text-sm font-bold bg-white text-zinc-900 rounded-lg shadow-sm'>
							Oy
						</button>
						<button className='px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 rounded-lg transition-colors'>
							Yil
						</button>
						<button className='px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 rounded-lg transition-colors'>
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
								<span className='text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100'>
									+24%
								</span>
							</div>
							<p className='text-sm font-medium text-zinc-500 mb-1'>
								Aktiv Bronlar (Oyiga)
							</p>
							<h3 className='text-3xl font-bold text-zinc-900'>42,500</h3>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardContent className='p-6'>
							<div className='flex justify-between items-start mb-4'>
								<div className='h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center'>
									<TrendingUp className='h-5 w-5' />
								</div>
								<span className='text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100'>
									+12%
								</span>
							</div>
							<p className='text-sm font-medium text-zinc-500 mb-1'>
								Platforma Tushumi
							</p>
							<h3 className='text-3xl font-bold text-zinc-900'>124M UZS</h3>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardContent className='p-6'>
							<div className='flex justify-between items-start mb-4'>
								<div className='h-10 w-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center'>
									<Scissors className='h-5 w-5' />
								</div>
								<span className='text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100'>
									+8
								</span>
							</div>
							<p className='text-sm font-medium text-zinc-500 mb-1'>
								Yangi Salonlar
							</p>
							<h3 className='text-3xl font-bold text-zinc-900'>15</h3>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardContent className='p-6'>
							<div className='flex justify-between items-start mb-4'>
								<div className='h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center'>
									<Users className='h-5 w-5' />
								</div>
								<span className='text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100'>
									+1.2k
								</span>
							</div>
							<p className='text-sm font-medium text-zinc-500 mb-1'>
								Yangi Mijozlar
							</p>
							<h3 className='text-3xl font-bold text-zinc-900'>1,240</h3>
						</CardContent>
					</Card>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					{/* Fake Growth Chart */}
					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardHeader className='border-b border-zinc-100 px-6 py-5'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								Yangi Foydalanuvchilar O'sishi
							</CardTitle>
						</CardHeader>
						<CardContent className='p-6 h-64 flex items-end gap-2'>
							{/* Simple CSS bar chart visualization */}
							{[20, 35, 40, 55, 45, 70, 60, 85, 90, 100].map((h, i) => (
								<div
									key={i}
									className='flex-1 bg-zinc-100 rounded-t-sm relative group cursor-pointer hover:bg-zinc-200 transition-colors h-full flex items-end'
								>
									<div
										className={`w-full rounded-t-sm transition-all duration-700 ${i > 7 ? 'bg-indigo-500' : 'bg-indigo-400 opacity-60'}`}
										style={{ height: `${h}%` }}
									></div>
									<div className='absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] py-1 px-2 rounded font-bold'>
										{h * 12}
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Fake Donut/Progress */}
					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<CardHeader className='border-b border-zinc-100 px-6 py-5'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								Mashhur Xizmatlar
							</CardTitle>
						</CardHeader>
						<CardContent className='p-6 space-y-6'>
							{[
								{
									name: 'Erkaklar soch kesish',
									percent: 45,
									color: 'bg-indigo-500',
								},
								{
									name: 'Ayollar soch turmaklash',
									percent: 30,
									color: 'bg-emerald-500',
								},
								{
									name: 'Manikyur va Pedikyur',
									percent: 15,
									color: 'bg-amber-400',
								},
								{
									name: 'Kosmetologiya / Yuz',
									percent: 10,
									color: 'bg-rose-500',
								},
							].map((item, i) => (
								<div key={i}>
									<div className='flex justify-between items-center mb-2'>
										<span className='text-sm font-semibold text-zinc-700'>
											{item.name}
										</span>
										<span className='text-sm text-zinc-500'>
											{item.percent}%
										</span>
									</div>
									<div className='h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden flex'>
										<div
											className={`h-full ${item.color} rounded-full`}
											style={{ width: `${item.percent}%` }}
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
