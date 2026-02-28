'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ArrowDownRight,
	ArrowUpRight,
	DollarSign,
	Download,
	Wallet,
} from 'lucide-react'

const fakeTransactions = [
	{
		id: 1,
		desc: 'Sadriddin M. (Soch kesish)',
		date: 'Bugun, 14:30',
		amount: '+120,000 UZS',
		type: 'in',
		status: 'Yakunlangan',
	},
	{
		id: 2,
		desc: 'Madina T. (Manikyur)',
		date: 'Bugun, 12:15',
		amount: '+70,000 UZS',
		type: 'in',
		status: 'Yakunlangan',
	},
	{
		id: 3,
		desc: 'Kiyim/Asboblar xaridi',
		date: 'Kecha',
		amount: '-450,000 UZS',
		type: 'out',
		status: 'Yakunlangan',
	},
	{
		id: 4,
		desc: 'Azizbek (Soqol)',
		date: 'Kecha',
		amount: '+50,000 UZS',
		type: 'in',
		status: 'Yakunlangan',
	},
	{
		id: 5,
		desc: "Aura Platformasi ta'rif to'lovi",
		date: '01 Aprel',
		amount: '-200,000 UZS',
		type: 'out',
		status: 'Yakunlangan',
	},
	{
		id: 6,
		desc: "Kamola (Soch bo'yash)",
		date: '30 Mart',
		amount: '+300,000 UZS',
		type: 'in',
		status: 'Yakunlangan',
	},
]

export default function BusinessFinance() {
	return (
		<DashboardLayout role='business'>
			<div className='space-y-6'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Moliya va Hisobot
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Daromad va xarajatlar statistikasi.
						</p>
					</div>
					<Button
						variant='outline'
						className='rounded-xl bg-white shadow-sm font-medium'
					>
						<Download className='h-4 w-4 mr-2' /> PDF Yuklash
					</Button>
				</div>

				{/* Finance Overview */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					<Card className='border-none shadow-sm bg-zinc-900 text-white rounded-2xl overflow-hidden relative'>
						<div className='absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl -mr-10 -mt-10'></div>
						<CardContent className='p-6 relative z-10'>
							<p className='text-sm font-medium text-zinc-400 mb-1'>
								Umumiy Balans
							</p>
							<h2 className='text-3xl font-bold text-white mb-4'>
								4,250,000{' '}
								<span className='text-lg font-medium text-zinc-500'>UZS</span>
							</h2>
							<div className='flex items-center gap-2'>
								<Wallet className='h-5 w-5 text-zinc-400' />
								<span className='text-sm text-zinc-300'>Aura Hisob</span>
							</div>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm bg-white rounded-2xl'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<div className='h-10 w-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600'>
									<ArrowUpRight className='h-5 w-5' />
								</div>
								<span className='text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100'>
									+12%
								</span>
							</div>
							<p className='text-sm font-medium text-zinc-500 mb-1'>
								Oylik Tushum
							</p>
							<h3 className='text-2xl font-bold text-zinc-900'>
								12,400,000 UZS
							</h3>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm bg-white rounded-2xl'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<div className='h-10 w-10 bg-red-50 rounded-full flex items-center justify-center text-red-600'>
									<ArrowDownRight className='h-5 w-5' />
								</div>
								<span className='text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100'>
									+4%
								</span>
							</div>
							<p className='text-sm font-medium text-zinc-500 mb-1'>
								Oylik Xarajat
							</p>
							<h3 className='text-2xl font-bold text-zinc-900'>
								3,150,000 UZS
							</h3>
						</CardContent>
					</Card>

					<Card className='border-none shadow-sm bg-white rounded-2xl'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<div className='h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600'>
									<DollarSign className='h-5 w-5' />
								</div>
							</div>
							<p className='text-sm font-medium text-zinc-500 mb-1'>
								O'rtacha Chek
							</p>
							<h3 className='text-2xl font-bold text-zinc-900'>145,000 UZS</h3>
						</CardContent>
					</Card>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Fake Chart Area */}
					<Card className='border-none shadow-sm rounded-2xl bg-white lg:col-span-2'>
						<CardHeader className='border-b border-zinc-100 px-6 py-5 flex flex-row items-center justify-between'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								Daromad Statistikasi
							</CardTitle>
							<div className='flex bg-zinc-100 p-1 rounded-lg'>
								<button className='px-3 py-1.5 text-xs font-bold bg-white text-zinc-900 rounded-md shadow-sm'>
									Hafta
								</button>
								<button className='px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 rounded-md'>
									Oy
								</button>
								<button className='px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 rounded-md'>
									Yil
								</button>
							</div>
						</CardHeader>
						<CardContent className='p-6 pt-10 flex flex-col justify-end min-h-[300px] relative'>
							{/* Highly stylized mock chart (CSS bars) */}
							<div className='absolute inset-x-6 inset-y-10 flex flex-col-reverse justify-between pb-8 z-0'>
								<div className='border-t border-dashed border-zinc-200 w-full h-0'></div>
								<div className='border-t border-dashed border-zinc-200 w-full h-0'></div>
								<div className='border-t border-dashed border-zinc-200 w-full h-0'></div>
								<div className='border-t border-dashed border-zinc-200 w-full h-0'></div>
							</div>

							<div className='relative z-10 flex items-end justify-between gap-2 h-48 mt-auto px-2'>
								{[40, 60, 45, 80, 50, 95, 70].map((height, i) => (
									<div
										key={i}
										className='flex flex-col items-center gap-2 group w-full'
									>
										<div className='w-full max-w-[40px] bg-zinc-100 rounded-t-sm rounded-b-none relative overflow-hidden h-full flex items-end justify-center transition-all group-hover:bg-zinc-200 cursor-pointer'>
											<div
												className={`w-full rounded-t-sm transition-all duration-1000 ease-out ${i === 5 ? 'bg-zinc-900' : 'bg-zinc-300 group-hover:bg-zinc-400'}`}
												style={{ height: `${height}%` }}
											></div>
											<div className='absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] font-bold py-1 px-2 rounded-md whitespace-nowrap shadow-md pointer-events-none'>
												{height * 15}K
											</div>
										</div>
										<span className='text-[10px] font-medium text-zinc-400 uppercase'>
											{['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'][i]}
										</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Transaction History */}
					<Card className='border-none shadow-sm rounded-2xl bg-white flex flex-col h-full'>
						<CardHeader className='border-b border-zinc-100 px-6 py-5 flex flex-row items-center justify-between pb-4'>
							<CardTitle className='text-base font-semibold text-zinc-900'>
								So'nggi O'tkazmalar
							</CardTitle>
							<Button
								variant='ghost'
								size='sm'
								className='text-xs font-semibold px-2 h-auto text-zinc-500'
							>
								Barchasi
							</Button>
						</CardHeader>
						<CardContent className='p-0 flex-1 overflow-auto'>
							<ul className='divide-y divide-zinc-50'>
								{fakeTransactions.map(tx => (
									<li
										key={tx.id}
										className='px-6 py-4 flex items-center justify-between hover:bg-zinc-50/50 transition-colors cursor-pointer group'
									>
										<div className='flex items-center gap-4'>
											<div
												className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}
											>
												{tx.type === 'in' ? (
													<ArrowDownRight className='h-5 w-5' />
												) : (
													<ArrowUpRight className='h-5 w-5' />
												)}
											</div>
											<div>
												<p className='text-sm font-semibold text-zinc-900 line-clamp-1'>
													{tx.desc}
												</p>
												<p className='text-xs text-zinc-500 mt-0.5'>
													{tx.date}
												</p>
											</div>
										</div>
										<div className='text-right flex-shrink-0'>
											<p
												className={`text-sm font-bold ${tx.type === 'in' ? 'text-emerald-600' : 'text-zinc-900'}`}
											>
												{tx.amount}
											</p>
										</div>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	)
}
