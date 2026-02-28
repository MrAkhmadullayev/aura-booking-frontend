'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Ban,
	CheckCircle,
	MapPin,
	MoreHorizontal,
	Search,
	ShieldAlert,
	ShieldCheck,
	Star,
	Trash2,
} from 'lucide-react'
import { useState } from 'react'

const initialSalons = [
	{
		id: 101,
		name: 'Aura Premium Salon',
		status: 'active',
		rating: 4.8,
		city: 'Toshkent',
		masters: 5,
		activeBookings: 24,
	},
	{
		id: 102,
		name: 'VIP Barbershop 01',
		status: 'active',
		rating: 4.9,
		city: 'Toshkent',
		masters: 3,
		activeBookings: 18,
	},
	{
		id: 103,
		name: 'Beauty & Spa Lounge',
		status: 'inactive',
		rating: 4.5,
		city: 'Samarqand',
		masters: 8,
		activeBookings: 0,
	},
	{
		id: 104,
		name: 'Qween Manicure Center',
		status: 'active',
		rating: 4.7,
		city: 'Buxoro',
		masters: 12,
		activeBookings: 45,
	},
	{
		id: 105,
		name: 'Top Hairstyles',
		status: 'pending',
		rating: 0,
		city: 'Toshkent',
		masters: 2,
		activeBookings: 0,
	},
]

export default function AdminSalons() {
	const [salons, setSalons] = useState(initialSalons)
	const [searchQuery, setSearchQuery] = useState('')
	const [filter, setFilter] = useState('all')

	const filteredSalons = salons.filter(salon => {
		const matchesSearch =
			salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			salon.city.toLowerCase().includes(searchQuery.toLowerCase())
		if (filter !== 'all') {
			return matchesSearch && salon.status === filter
		}
		return matchesSearch
	})

	const updateStatus = (id, newStatus) => {
		setSalons(salons.map(s => (s.id === id ? { ...s, status: newStatus } : s)))
	}

	const deleteSalon = id => {
		if (
			window.confirm("Haqiqatan ham bu salonni butunlay o'chirmoqchimisiz?")
		) {
			setSalons(salons.filter(s => s.id !== id))
		}
	}

	return (
		<DashboardLayout role='admin'>
			<div className='space-y-6'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Salonlar va Markazlar
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Platformadagi barcha ro'yxatdan o'tgan bizneslarni boshqaring.
						</p>
					</div>
					<div className='flex bg-zinc-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto'>
						<button
							onClick={() => setFilter('all')}
							className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${filter === 'all' ? 'font-bold bg-white text-zinc-900 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Barchasi
						</button>
						<button
							onClick={() => setFilter('active')}
							className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${filter === 'active' ? 'font-bold bg-white text-emerald-600 shadow-sm' : 'font-medium text-emerald-600 hover:bg-emerald-50'}`}
						>
							Faol
						</button>
						<button
							onClick={() => setFilter('pending')}
							className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${filter === 'pending' ? 'font-bold bg-white text-amber-600 shadow-sm' : 'font-medium text-amber-600 hover:bg-amber-50'}`}
						>
							Kutilmoqda
						</button>
						<button
							onClick={() => setFilter('inactive')}
							className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${filter === 'inactive' ? 'font-bold bg-white text-red-600 shadow-sm' : 'font-medium text-zinc-500 hover:bg-zinc-200'}`}
						>
							To'xtatilgan
						</button>
					</div>
				</div>

				<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
					<div className='px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row gap-4 justify-between sm:items-center'>
						<div className='relative w-full sm:w-80'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400' />
							<input
								type='text'
								placeholder="Salon nomi bo'yicha qidirish..."
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='h-10 w-full pl-10 pr-4 rounded-xl border border-zinc-200 text-sm focus:border-zinc-400 focus:ring-0 outline-none transition-colors bg-white shadow-sm'
							/>
						</div>
					</div>

					<CardContent className='p-0'>
						<div className='overflow-x-auto'>
							<table className='w-full text-left border-collapse min-w-[800px]'>
								<thead>
									<tr className='bg-white border-b border-zinc-100 text-xs text-zinc-400 uppercase tracking-wider font-semibold'>
										<th className='py-4 px-6 w-1/3'>Salon Nomi</th>
										<th className='py-4 px-6'>Shahar</th>
										<th className='py-4 px-6 text-center'>Ustalar / Bronlar</th>
										<th className='py-4 px-6 text-center'>Reyting</th>
										<th className='py-4 px-6 text-center'>Holat</th>
										<th className='py-4 px-6'></th>
									</tr>
								</thead>
								<tbody className='divide-y divide-zinc-50'>
									{filteredSalons.map(salon => (
										<tr
											key={salon.id}
											className='hover:bg-zinc-50/50 transition-colors'
										>
											<td className='py-4 px-6'>
												<div className='flex items-center gap-3'>
													<div className='h-10 w-10 bg-zinc-100 rounded-xl flex items-center justify-center font-bold text-zinc-600 font-serif flex-shrink-0 cursor-pointer'>
														{salon.name.charAt(0)}
													</div>
													<div>
														<p className='font-bold text-zinc-900 text-sm cursor-pointer hover:underline'>
															{salon.name}
														</p>
														<p className='text-xs text-zinc-500'>
															ID: #{salon.id}
														</p>
													</div>
												</div>
											</td>
											<td className='py-4 px-6 text-sm text-zinc-600 mt-2 flex items-center gap-1.5 h-full'>
												<MapPin className='w-3.5 h-3.5 text-zinc-400' />{' '}
												{salon.city}
											</td>
											<td className='py-4 px-6 text-center'>
												<div className='flex items-center justify-center gap-4 text-sm font-medium'>
													<span className='bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md'>
														{salon.masters}👤
													</span>
													<span className='bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md'>
														{salon.activeBookings}📅
													</span>
												</div>
											</td>
											<td className='py-4 px-6 text-center'>
												<div className='flex items-center justify-center gap-1'>
													<Star className='w-4 h-4 fill-amber-400 text-amber-400' />
													<span className='font-bold text-zinc-900 text-sm'>
														{salon.rating || '-'}
													</span>
												</div>
											</td>
											<td className='py-4 px-6 text-center'>
												{salon.status === 'active' && (
													<span className='inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100'>
														<ShieldCheck className='w-3 h-3' /> FaoL
													</span>
												)}
												{salon.status === 'inactive' && (
													<span className='inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200'>
														To'xtatilgan
													</span>
												)}
												{salon.status === 'pending' && (
													<span className='inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100'>
														<ShieldAlert className='w-3 h-3' /> Yangi
													</span>
												)}
											</td>
											<td className='py-4 px-6 text-right'>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant='ghost'
															size='icon'
															className='h-8 w-8 text-zinc-400 hover:text-zinc-900 rounded-full'
														>
															<MoreHorizontal className='h-4 w-4' />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent
														align='end'
														className='rounded-xl w-48'
													>
														{salon.status !== 'active' && (
															<DropdownMenuItem
																onClick={() => updateStatus(salon.id, 'active')}
																className='font-medium py-2 text-emerald-600'
															>
																<CheckCircle className='w-4 h-4 mr-2' />{' '}
																Faollashtirish
															</DropdownMenuItem>
														)}
														{salon.status !== 'inactive' && (
															<DropdownMenuItem
																onClick={() =>
																	updateStatus(salon.id, 'inactive')
																}
																className='font-medium py-2 text-amber-600'
															>
																<Ban className='w-4 h-4 mr-2' /> Vaqtincha
																to'xtatish
															</DropdownMenuItem>
														)}
														<DropdownMenuItem
															onClick={() => deleteSalon(salon.id)}
															className='font-medium py-2 text-red-600 border-t border-zinc-100 mt-1 pt-2'
														>
															<Trash2 className='w-4 h-4 mr-2' /> O'chirish
															(Delete)
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							{filteredSalons.length === 0 && (
								<div className='text-center py-20 bg-white'>
									<p className='text-zinc-500 font-medium'>
										Bunday salon topilmadi.
									</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	)
}
