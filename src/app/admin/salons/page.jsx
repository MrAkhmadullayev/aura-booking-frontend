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
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import {
	Ban,
	CheckCircle,
	Eye,
	MapPin,
	MoreHorizontal,
	Search,
	ShieldAlert,
	ShieldCheck,
	Star,
	Trash2,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AdminSalons() {
	const router = useRouter()
	const [salons, setSalons] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [filter, setFilter] = useState('all')
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchSalons = async () => {
			try {
				const res = await api.get('/salons')
				const mapped = res.data.map(salon => ({
					id: salon._id,
					name: salon.name,
					status: salon.status || 'pending',
					rating: salon.rating || 0,
					city: salon.address ? salon.address.split(',')[0] : 'Toshkent',
					ownerName: salon.ownerId?.name || "Noma'lum Biznes",
					ownerPhone: salon.ownerId?.phone || '',
					masters: salon.masters || 0,
					activeBookings: salon.activeBookings || 0,
				}))
				setSalons(mapped)
			} catch (error) {
				toast.error('Salonlarni yuklashda xatolik yuz berdi')
			} finally {
				setIsLoading(false)
			}
		}
		fetchSalons()
	}, [])

	const filteredSalons = salons.filter(salon => {
		const matchesSearch =
			salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			salon.city.toLowerCase().includes(searchQuery.toLowerCase())
		if (filter !== 'all') {
			return matchesSearch && salon.status === filter
		}
		return matchesSearch
	})

	const updateStatus = async (id, newStatus) => {
		try {
			await api.patch(`/salons/admin/${id}/status`, { status: newStatus })
			setSalons(
				salons.map(s => (s.id === id ? { ...s, status: newStatus } : s)),
			)
			toast.success('Salon holati muvaffaqiyatli saqlandi')
		} catch (error) {
			toast.error("Ma'lumotni yangilashda xatolik yuz berdi")
		}
	}

	const deleteSalon = async id => {
		const confirmDelete = window.confirm("O'chirishni tasdiqlaysizmi?")
		if (confirmDelete) {
			try {
				await api.delete(`/salons/admin/${id}`)
				setSalons(salons.filter(s => s.id !== id))
				toast.success("Salon tizimdan o'chirildi")
			} catch (error) {
				toast.error(error.response?.data?.message || "Saloni o'chirishda xato")
			}
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
						{isLoading ? (
							<div className='overflow-x-auto'>
								<table className='w-full text-left border-collapse min-w-[800px]'>
									<thead>
										<tr className='bg-white border-b border-zinc-100 text-xs text-zinc-400 uppercase tracking-wider font-semibold'>
											<th className='py-4 px-6 w-1/3'>Salon Nomi</th>
											<th className='py-4 px-6'>Shahar</th>
											<th className='py-4 px-6 text-center'>
												Ustalar / Bronlar
											</th>
											<th className='py-4 px-6 text-center'>Reyting</th>
											<th className='py-4 px-6 text-center'>Holat</th>
											<th className='py-4 px-6'></th>
										</tr>
									</thead>
									<tbody className='divide-y divide-zinc-50'>
										{[...Array(5)].map((_, i) => (
											<tr key={i} className='bg-white'>
												<td className='py-4 px-6'>
													<div className='flex items-center gap-3'>
														<Skeleton className='h-10 w-10 rounded-xl flex-shrink-0' />
														<div className='space-y-2'>
															<Skeleton className='h-4 w-32 rounded-md' />
															<Skeleton className='h-3 w-20 rounded-md' />
														</div>
													</div>
												</td>
												<td className='py-4 px-6'>
													<Skeleton className='h-4 w-20 rounded-md' />
												</td>
												<td className='py-4 px-6 text-center'>
													<div className='flex items-center justify-center gap-4'>
														<Skeleton className='h-6 w-12 rounded-md' />
														<Skeleton className='h-6 w-12 rounded-md' />
													</div>
												</td>
												<td className='py-4 px-6 text-center'>
													<Skeleton className='h-4 w-10 mx-auto rounded-md' />
												</td>
												<td className='py-4 px-6 text-center'>
													<Skeleton className='h-6 w-20 mx-auto rounded-full' />
												</td>
												<td className='py-4 px-6 text-right'>
													<Skeleton className='h-8 w-8 rounded-full ml-auto' />
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<div className='overflow-x-auto'>
								<table className='w-full text-left border-collapse min-w-[800px]'>
									<thead>
										<tr className='bg-white border-b border-zinc-100 text-xs text-zinc-400 uppercase tracking-wider font-semibold'>
											<th className='py-4 px-6 w-1/3'>Salon Nomi</th>
											<th className='py-4 px-6'>Shahar</th>
											<th className='py-4 px-6 text-center'>
												Ustalar / Bronlar
											</th>
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
														<div className='h-10 w-10 bg-zinc-100 rounded-xl flex items-center justify-center font-bold text-zinc-600 font-serif flex-shrink-0 cursor-pointer uppercase'>
															{salon.name.charAt(0)}
														</div>
														<div>
															<div className='flex flex-col gap-0.5'>
																<p className='font-bold text-zinc-900 text-sm cursor-pointer hover:underline'>
																	{salon.name}
																</p>
																<p className='text-[11px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 w-fit'>
																	Egasi: {salon.ownerName}
																</p>
															</div>
															<p className='text-[10px] text-zinc-400 mt-1 uppercase tracking-wider font-semibold'>
																ID: #{salon.id.slice(-6)}
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
															<DropdownMenuItem
																onClick={() =>
																	router.push(`/admin/salons/${salon.id}`)
																}
																className='font-bold py-2 text-blue-600 hover:text-blue-700 mb-1'
															>
																<Eye className='w-4 h-4 mr-2 text-blue-500' />{' '}
																Batafsil ko'rish
															</DropdownMenuItem>

															<div className='h-[1px] bg-zinc-100 my-1'></div>

															{salon.status !== 'active' && (
																<DropdownMenuItem
																	onClick={() =>
																		updateStatus(salon.id, 'active')
																	}
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
											Bunday ro'yhat topilmadi.
										</p>
									</div>
								)}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	)
}
