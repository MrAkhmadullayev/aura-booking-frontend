'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import {
	Ban,
	Briefcase,
	CheckCircle,
	Eye,
	Loader2,
	MoreVertical,
	Plus,
	Search,
	ShieldAlert,
	Smartphone,
	Trash2,
	UserCheck,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AdminBusinessmen() {
	const router = useRouter()
	const [businessmen, setBusinessmen] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState('')
	const [filterStatus, setFilterStatus] = useState('all')

	// Create user state
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isCreating, setIsCreating] = useState(false)
	const [newUser, setNewUser] = useState({
		name: '',
		phone: '',
		password: '',
		businessType: '',
		about: '',
	})

	const BUSINESS_TYPES = {
		beauty_salon: 'Ayollar saloni',
		barbershop: 'Barbershop',
		spa: 'Spa va dam olish',
		children_massage: 'Bolalar massaji',
		adult_massage: 'Kattalar massaji',
		cosmetology_manicure: 'Kosmetologiya va manikur',
		sport_center: 'Sport markazlari',
		none: 'Soha tanlanmagan',
	}

	const fetchBusinessmen = async () => {
		try {
			const response = await api.get('/users/admin')

			const businessUsers = response.data.filter(
				user => user.role === 'business',
			)

			const mapped = businessUsers.map(user => ({
				id: user._id,
				name: user.name,
				phone: user.phone,
				businessType: user.businessType || 'none',
				isConfirmed: user.isConfirmed,
				registered: new Date(user.createdAt).toLocaleDateString('uz-UZ'),
				status: user.isBlocked ? 'Bloklangan' : 'Faol',
				lastActive: 'Yaqinda',
				branches: user.branches || [],
			}))

			setBusinessmen(mapped)
		} catch (error) {
			toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi")
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchBusinessmen()
	}, [])

	const handleCreateUser = async e => {
		e.preventDefault()
		setIsCreating(true)
		try {
			await api.post('/users/admin', newUser)
			toast.success('Tadbirkor muvaffaqiyatli yaratildi')
			setIsCreateModalOpen(false)
			setNewUser({
				name: '',
				phone: '',
				password: '',
				businessType: '',
				about: '',
			})
			fetchBusinessmen()
		} catch (error) {
			toast.error(
				error.response?.data?.message || 'Yaratishda xatolik yuz berdi',
			)
		} finally {
			setIsCreating(false)
		}
	}

	const filteredBusinessmen = businessmen.filter(user => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.phone.includes(searchQuery)

		if (filterStatus === 'pending') return matchesSearch && !user.isConfirmed
		if (filterStatus === 'confirmed') return matchesSearch && user.isConfirmed
		if (filterStatus === 'blocked')
			return matchesSearch && user.status === 'Bloklangan'
		return matchesSearch
	})

	const toggleStatus = async id => {
		try {
			await api.patch(`/users/admin/${id}/status`, {})
			setBusinessmen(
				businessmen.map(u => {
					if (u.id === id) {
						return { ...u, status: u.status === 'Faol' ? 'Bloklangan' : 'Faol' }
					}
					return u
				}),
			)
			toast.success("Holat o'zgartirildi")
		} catch (error) {
			toast.error(error.response?.data?.message || 'Xatolik yuz berdi')
		}
	}

	const toggleConfirmation = async id => {
		try {
			await api.patch(`/users/admin/${id}/confirm`, {})
			setBusinessmen(
				businessmen.map(u => {
					if (u.id === id) {
						return { ...u, isConfirmed: !u.isConfirmed }
					}
					return u
				}),
			)
			toast.success("Tasdiqlash holati o'zgartirildi")
		} catch (error) {
			toast.error(
				error.response?.data?.message ||
					"Tasdiqlashni o'zgartirishda xatolik yuz berdi",
			)
		}
	}

	const deleteBusinessman = async id => {
		if (
			window.confirm(
				"Haqiqatan ham ushbu biznes egasini o'chirmoqchimisiz? Biznesga ulangan barcha salon ma'lumotlari ham xavf ostida bo'lishi mumkin. Ushbu amal ortga qaytarilmaydi.",
			)
		) {
			try {
				await api.delete(`/users/admin/${id}`)
				setBusinessmen(businessmen.filter(u => u.id !== id))
				toast.success("Tadbirkor o'chirildi")
			} catch (error) {
				toast.error(
					error.response?.data?.message || "O'chirishda xatolik yuz berdi",
				)
			}
		}
	}

	const totalCount = businessmen.length
	const confirmedCount = businessmen.filter(u => u.isConfirmed).length
	const pendingCount = businessmen.filter(u => !u.isConfirmed).length
	const blockedCount = businessmen.filter(u => u.status === 'Bloklangan').length

	return (
		<DashboardLayout role='admin'>
			<div className='space-y-6'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
						<div>
							<h1 className='text-3xl font-bold tracking-tight text-zinc-900'>
								Biznes Egalari
							</h1>
							<p className='text-zinc-500 mt-1'>
								Barcha tadbirkorlar va platforma hamkorlari
							</p>
						</div>

						<Button
							onClick={() => setIsCreateModalOpen(true)}
							className='bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-6 h-11 shadow-sm'
						>
							<Plus className='w-4 h-4 mr-2' /> Yangi Tadbirkor Qo'shish
						</Button>
					</div>
					<div className='flex bg-zinc-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto'>
						<button
							onClick={() => setFilterStatus('all')}
							className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filterStatus === 'all' ? 'font-bold bg-white text-zinc-900 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Barchasi
						</button>
						<button
							onClick={() => setFilterStatus('confirmed')}
							className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filterStatus === 'confirmed' ? 'font-bold bg-white text-emerald-600 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Tasdiqlangan ({isLoading ? 0 : confirmedCount})
						</button>
						<button
							onClick={() => setFilterStatus('pending')}
							className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filterStatus === 'pending' ? 'font-bold bg-white text-amber-600 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Kutmoqda ({isLoading ? 0 : pendingCount})
						</button>
						<button
							onClick={() => setFilterStatus('blocked')}
							className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filterStatus === 'blocked' ? 'font-bold bg-white text-red-600 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Bloklangan
						</button>
					</div>
				</div>

				{isLoading ? (
					<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
						{[...Array(4)].map((_, i) => (
							<Card
								key={i}
								className='border-none shadow-sm rounded-2xl bg-white'
							>
								<CardContent className='p-5 flex items-center justify-between'>
									<div className='flex items-center gap-3'>
										<Skeleton className='h-12 w-12 rounded-full' />
										<div className='space-y-2'>
											<Skeleton className='h-3 w-20 rounded-md' />
											<Skeleton className='h-6 w-12 rounded-md' />
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<CardContent className='p-5 flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<div className='h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center'>
										<UserCheck className='h-6 w-6' strokeWidth={1.5} />
									</div>
									<div>
										<p className='text-xs text-zinc-500 font-medium'>
											Jami Bizneslar
										</p>
										<p className='text-2xl font-bold text-zinc-900'>
											{totalCount}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<CardContent className='p-5 flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<div className='h-12 w-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center'>
										<CheckCircle className='h-6 w-6' strokeWidth={1.5} />
									</div>
									<div>
										<p className='text-xs text-zinc-500 font-medium'>
											Tasdiqlangan
										</p>
										<p className='text-2xl font-bold text-zinc-900'>
											{confirmedCount}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<CardContent className='p-5 flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<div className='h-12 w-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center'>
										<ShieldAlert className='h-6 w-6' strokeWidth={1.5} />
									</div>
									<div>
										<p className='text-xs text-zinc-500 font-medium'>
											Kutmoqda
										</p>
										<p className='text-2xl font-bold text-zinc-900'>
											{pendingCount}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<CardContent className='p-5 flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<div className='h-12 w-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center'>
										<Ban className='h-6 w-6' strokeWidth={1.5} />
									</div>
									<div>
										<p className='text-xs text-zinc-500 font-medium'>
											Bloklanganlar
										</p>
										<p className='text-2xl font-bold text-zinc-900'>
											{blockedCount}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
					<div className='px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row gap-4 justify-between sm:items-center'>
						<div className='relative w-full sm:w-80'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400' />
							<input
								type='text'
								placeholder='Ism yoki telefon qidirish...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='h-10 w-full pl-10 pr-4 rounded-xl border border-zinc-200 text-sm focus:border-zinc-400 focus:ring-0 outline-none transition-colors bg-white shadow-sm'
							/>
						</div>
					</div>

					<CardContent className='p-0'>
						{isLoading ? (
							<div className='overflow-x-auto'>
								<table className='w-full text-left border-collapse min-w-[700px]'>
									<thead>
										<tr className='bg-white border-b border-zinc-100 text-xs text-zinc-400 uppercase tracking-wider font-semibold'>
											<th className='py-4 px-6 w-1/3'>Foydalanuvchi</th>
											<th className='py-4 px-6'>Saloni/Filiallari</th>
											<th className='py-4 px-6 text-center'>
												Ro'yxatdan O'tgan
											</th>
											<th className='py-4 px-6 text-center'>So'nggi Faollik</th>
											<th className='py-4 px-6 text-center'>Holat</th>
											<th className='py-4 px-6'></th>
										</tr>
									</thead>
									<tbody className='divide-y divide-zinc-50'>
										{[...Array(5)].map((_, i) => (
											<tr key={i} className='bg-white'>
												<td className='py-4 px-6'>
													<div className='flex items-center gap-3'>
														<Skeleton className='h-10 w-10 rounded-full flex-shrink-0' />
														<div className='space-y-2'>
															<Skeleton className='h-4 w-32 rounded-md' />
															<Skeleton className='h-3 w-24 rounded-md' />
														</div>
													</div>
												</td>
												<td className='py-4 px-6'>
													<Skeleton className='h-5 w-24 rounded-md' />
												</td>
												<td className='py-4 px-6 text-center'>
													<Skeleton className='h-4 w-20 mx-auto rounded-md' />
												</td>
												<td className='py-4 px-6 text-center'>
													<Skeleton className='h-4 w-16 mx-auto rounded-md' />
												</td>
												<td className='py-4 px-6 text-center'>
													<Skeleton className='h-5 w-20 mx-auto rounded-full' />
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
								<table className='w-full text-left border-collapse min-w-[700px]'>
									<thead>
										<tr className='bg-white border-b border-zinc-100 text-xs text-zinc-400 uppercase tracking-wider font-semibold'>
											<th className='py-4 px-6 w-1/3'>Foydalanuvchi</th>
											<th className='py-4 px-6'>Saloni/Filiallari</th>
											<th className='py-4 px-6 text-center'>
												Ro'yxatdan O'tgan
											</th>
											<th className='py-4 px-6 text-center'>So'nggi Faollik</th>
											<th className='py-4 px-6 text-center'>Holat</th>
											<th className='py-4 px-6'></th>
										</tr>
									</thead>
									<tbody className='divide-y divide-zinc-50'>
										{filteredBusinessmen.map(user => (
											<tr
												key={user.id}
												className='hover:bg-zinc-50/50 transition-colors'
											>
												<td className='py-4 px-6'>
													<div className='flex items-center gap-3'>
														<div className='h-10 w-10 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center font-bold flex-shrink-0 uppercase'>
															{user.name.charAt(0)}
														</div>
														<div>
															<p className='font-bold text-zinc-900 text-sm flex items-center gap-2'>
																{user.name}
															</p>
															<p className='text-xs text-zinc-500 break-words flex items-center gap-1 mt-0.5'>
																<Smartphone className='w-3 h-3' /> {user.phone}
															</p>
														</div>
													</div>
												</td>
												<td className='py-4 px-6'>
													{user.isConfirmed ? (
														<span className='inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md border border-emerald-100'>
															<CheckCircle className='w-3 h-3' /> Tasdiqlangan
														</span>
													) : (
														<span className='inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md border border-amber-100'>
															<ShieldAlert className='w-3 h-3' /> Kutmoqda
														</span>
													)}
													{user.branches?.length > 0 && (
														<div className='mt-3 space-y-1.5'>
															{user.branches.map(branch => (
																<div
																	key={branch._id}
																	className='flex items-center gap-2 text-xs font-medium text-zinc-600 bg-zinc-50 border border-zinc-100 py-1.5 px-2.5 rounded-md'
																>
																	<span className='w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0'></span>
																	<span className='truncate max-w-[150px]'>
																		{branch.name}
																	</span>
																</div>
															))}
														</div>
													)}
												</td>
												<td className='py-4 px-6 text-center text-sm text-zinc-500'>
													{user.registered}
												</td>
												<td className='py-4 px-6 text-center text-sm font-medium text-zinc-700'>
													{user.lastActive}
												</td>
												<td className='py-4 px-6 text-center'>
													{user.status === 'Faol' ? (
														<span className='text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full'>
															Faol
														</span>
													) : (
														<span className='text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full'>
															Bloklangan
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
																<MoreVertical className='h-4 w-4' />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															align='end'
															className='rounded-xl w-48'
														>
															<DropdownMenuItem
																onClick={() =>
																	router.push(`/admin/businessmen/${user.id}`)
																}
																className='font-bold py-2 text-blue-600 hover:text-blue-700 mb-1'
															>
																<Eye className='w-4 h-4 mr-2 text-blue-500' />{' '}
																Batafsil ma'lumot
															</DropdownMenuItem>

															<div className='h-[1px] bg-zinc-100 my-1'></div>

															<DropdownMenuItem
																onClick={() => toggleConfirmation(user.id)}
																className='font-medium py-2 text-zinc-700 hover:text-zinc-900 md-1'
															>
																<ShieldAlert className='w-4 h-4 mr-2 text-zinc-400' />{' '}
																{user.isConfirmed
																	? 'Tasdiqni bekor qilish'
																	: 'Akkauntni tasdiqlash'}
															</DropdownMenuItem>

															<div className='h-[1px] bg-zinc-100 my-1'></div>

															<DropdownMenuItem
																onClick={() => toggleStatus(user.id)}
																className={`font-medium py-2 ${user.status === 'Faol' ? 'text-amber-600' : 'text-emerald-600'}`}
															>
																{user.status === 'Faol' ? (
																	<>
																		<Ban className='w-4 h-4 mr-2' /> Tizimdan
																		Bloklash
																	</>
																) : (
																	<>
																		<CheckCircle className='w-4 h-4 mr-2' />{' '}
																		Blokdan chiqarish
																	</>
																)}
															</DropdownMenuItem>
															<DropdownMenuItem
																onClick={() => deleteBusinessman(user.id)}
																className='font-medium py-2 text-red-600 mt-1'
															>
																<Trash2 className='w-4 h-4 mr-2' /> O'chirish
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</td>
											</tr>
										))}
									</tbody>
								</table>
								{filteredBusinessmen.length === 0 && (
									<div className='text-center py-20 bg-white'>
										<p className='text-zinc-500 font-medium'>
											Bunday biznes profil topilmadi.
										</p>
									</div>
								)}
							</div>
						)}
					</CardContent>
				</Card>

				{/* Create User Modal */}
				<Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
					<DialogContent className='sm:max-w-[500px] rounded-2xl p-0 overflow-hidden border-none shadow-2xl'>
						<div className='bg-zinc-900 px-6 py-6'>
							<DialogHeader>
								<DialogTitle className='text-xl text-white flex items-center gap-2'>
									<UserCheck className='w-5 h-5 text-zinc-400' />
									Yangi Tadbirkor Qo'shish
								</DialogTitle>
							</DialogHeader>
							<p className='text-zinc-400 text-sm mt-1'>
								Platformaga yangi biznes parnetini kiritish uchun quyidagi
								ma'lumotlarni to'ldiring.
							</p>
						</div>

						<form
							onSubmit={handleCreateUser}
							className='px-6 py-6 space-y-5 bg-white'
						>
							<div className='space-y-1.5'>
								<Label htmlFor='name' className='text-zinc-700 font-medium'>
									F.I.SH
								</Label>
								<div className='relative'>
									<UserCheck className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400' />
									<Input
										id='name'
										placeholder='Tadbirkor ism-sharifi'
										value={newUser.name}
										onChange={e =>
											setNewUser({ ...newUser, name: e.target.value })
										}
										className='h-11 pl-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white transition-colors'
										required
									/>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-1.5'>
									<Label htmlFor='phone' className='text-zinc-700 font-medium'>
										Telefon Raqam
									</Label>
									<div className='relative'>
										<Smartphone className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400' />
										<Input
											id='phone'
											placeholder='+998'
											value={newUser.phone}
											onChange={e =>
												setNewUser({ ...newUser, phone: e.target.value })
											}
											className='h-11 pl-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white transition-colors'
											required
										/>
									</div>
								</div>

								<div className='space-y-1.5'>
									<Label
										htmlFor='password'
										className='text-zinc-700 font-medium'
									>
										Parol
									</Label>
									<div className='relative'>
										<ShieldAlert className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400' />
										<Input
											id='password'
											type='password'
											placeholder='Sirli so`z'
											value={newUser.password}
											onChange={e =>
												setNewUser({ ...newUser, password: e.target.value })
											}
											className='h-11 pl-10 rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white transition-colors'
											required
										/>
									</div>
								</div>
							</div>

							<div className='space-y-1.5'>
								<Label htmlFor='type' className='text-zinc-700 font-medium'>
									Faoliyat Sohasi
								</Label>
								<div className='relative'>
									<Briefcase className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none' />
									<select
										id='type'
										value={newUser.businessType}
										onChange={e =>
											setNewUser({ ...newUser, businessType: e.target.value })
										}
										className='w-full h-11 pl-10 pr-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-medium text-sm appearance-none'
										required
									>
										<option value='' disabled>
											Sohani tanlang
										</option>
										{Object.entries(BUSINESS_TYPES)
											.filter(([key]) => key !== 'none')
											.map(([key, label]) => (
												<option key={key} value={key}>
													{label}
												</option>
											))}
									</select>
								</div>
							</div>

							<div className='space-y-1.5'>
								<Label htmlFor='about' className='text-zinc-700 font-medium'>
									Tadbirkor Haqida{' '}
									<span className='text-zinc-400 font-normal'>(ixtiyoriy)</span>
								</Label>
								<textarea
									id='about'
									placeholder='Biznes egasi va uning qarashlari haqida qisqacha ma`lumot...'
									value={newUser.about}
									onChange={e =>
										setNewUser({ ...newUser, about: e.target.value })
									}
									className='w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-medium text-sm resize-none h-24'
								/>
							</div>

							<div className='pt-2 flex gap-3'>
								<Button
									type='button'
									variant='outline'
									onClick={() => setIsCreateModalOpen(false)}
									className='h-12 flex-1 rounded-xl text-zinc-600 font-semibold'
								>
									Bekor qilish
								</Button>
								<Button
									type='submit'
									disabled={isCreating}
									className='flex-1 h-12 bg-zinc-900 text-white rounded-xl shadow-lg shadow-zinc-900/20 font-semibold'
								>
									{isCreating ? (
										<Loader2 className='w-5 h-5 animate-spin' />
									) : (
										'Tadbirkor Yaratish'
									)}
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</DashboardLayout>
	)
}
