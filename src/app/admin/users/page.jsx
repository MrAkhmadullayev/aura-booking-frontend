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
	MoreVertical,
	Search,
	ShieldAlert,
	Smartphone,
	Trash2,
	UserCheck,
	UserX,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AdminUsers() {
	const router = useRouter()
	const [users, setUsers] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState('')
	const [filterRole, setFilterRole] = useState('all')

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await api.get('/users/admin')
				// Filter out 'business' users, they have their own tab now.
				const pureUsers = response.data.filter(user => user.role !== 'business')

				const mapped = pureUsers.map(user => ({
					id: user._id,
					name: user.name,
					phone: user.phone,
					roleCode: user.role,
					role:
						user.role === 'admin'
							? 'Admin'
							: user.role === 'business'
								? 'Biznes Egasi'
								: 'Mijoz',
					registered: new Date(user.createdAt).toLocaleDateString('uz-UZ'),
					status: user.isBlocked ? 'Bloklangan' : 'Faol',
					lastActive: 'Yaqinda',
					about: user.about,
				}))
				setUsers(mapped)
			} catch (error) {
				toast.error('Foydalanuvchilarni yuklashda xato')
			} finally {
				setIsLoading(false)
			}
		}
		fetchUsers()
	}, [])

	const filteredUsers = users.filter(user => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.phone.includes(searchQuery)
		if (filterRole !== 'all') {
			return matchesSearch && user.role === filterRole
		}
		return matchesSearch
	})

	const toggleStatus = async id => {
		try {
			await api.patch(`/users/admin/${id}/status`, {})
			setUsers(
				users.map(u => {
					if (u.id === id) {
						return { ...u, status: u.status === 'Faol' ? 'Bloklangan' : 'Faol' }
					}
					return u
				}),
			)
			toast.success("Foydalanuvchi holati o'zgartirildi")
		} catch (error) {
			toast.error(error.response?.data?.message || 'Xatolik yuz berdi')
		}
	}

	const toggleConfirmation = async id => {
		try {
			await api.patch(`/users/admin/${id}/confirm`, {})
			setUsers(
				users.map(u => {
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

	const deleteUser = async id => {
		if (
			window.confirm(
				"Haqiqatan ham ushbu foydalanuvchini o'chirmoqchimisiz? Ushbu amal ortga qaytarilmaydi.",
			)
		) {
			try {
				await api.delete(`/users/admin/${id}`)
				setUsers(users.filter(u => u.id !== id))
				toast.success("Foydalanuvchi o'chirildi")
			} catch (error) {
				toast.error(
					error.response?.data?.message || "O'chirishda xatolik yuz berdi",
				)
			}
		}
	}

	const customerCount = users.filter(u => u.roleCode === 'client').length
	const adminCount = users.filter(u => u.roleCode === 'admin').length
	const blockedCount = users.filter(u => u.status === 'Bloklangan').length

	return (
		<DashboardLayout role='admin'>
			<div className='space-y-6'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Foydalanuvchilar
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Barcha mijozlar, biznes egalari va adminlar ro'yxati.
						</p>
					</div>
					<div className='flex bg-zinc-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto'>
						<button
							onClick={() => setFilterRole('all')}
							className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filterRole === 'all' ? 'font-bold bg-white text-zinc-900 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Barchasi
						</button>
						<button
							onClick={() => setFilterRole('Mijoz')}
							className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filterRole === 'Mijoz' ? 'font-bold bg-white text-zinc-900 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Mijozlar ({isLoading ? 0 : customerCount})
						</button>
						<button
							onClick={() => setFilterRole('Admin')}
							className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filterRole === 'Admin' ? 'font-bold bg-white text-zinc-900 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Adminlar ({isLoading ? 0 : adminCount})
						</button>
					</div>
				</div>

				{isLoading ? (
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{[...Array(3)].map((_, i) => (
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
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<CardContent className='p-5 flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<div className='h-12 w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center'>
										<UserCheck className='h-6 w-6' strokeWidth={1.5} />
									</div>
									<div>
										<p className='text-xs text-zinc-500 font-medium'>
											Jami Mijozlar
										</p>
										<p className='text-2xl font-bold text-zinc-900'>
											{customerCount}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<CardContent className='p-5 flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<div className='h-12 w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center'>
										<ShieldAlert className='h-6 w-6' strokeWidth={1.5} />
									</div>
									<div>
										<p className='text-xs text-zinc-500 font-medium'>
											Adminlar
										</p>
										<p className='text-2xl font-bold text-zinc-900'>
											{adminCount}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<CardContent className='p-5 flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<div className='h-12 w-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center'>
										<UserX className='h-6 w-6' strokeWidth={1.5} />
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
											<th className='py-4 px-6'>Rol</th>
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
													<Skeleton className='h-5 w-16 mx-auto rounded-md' />
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
											<th className='py-4 px-6'>Rol</th>
											<th className='py-4 px-6 text-center'>
												Ro'yxatdan O'tgan
											</th>
											<th className='py-4 px-6 text-center'>So'nggi Faollik</th>
											<th className='py-4 px-6 text-center'>Holat</th>
											<th className='py-4 px-6'></th>
										</tr>
									</thead>
									<tbody className='divide-y divide-zinc-50'>
										{filteredUsers.map(user => (
											<tr
												key={user.id}
												className='hover:bg-zinc-50/50 transition-colors'
											>
												<td className='py-4 px-6'>
													<div className='flex items-center gap-3'>
														<div className='h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-zinc-500 flex-shrink-0 uppercase'>
															{user.name.charAt(0)}
														</div>
														<div>
															<p className='font-bold text-zinc-900 text-sm flex items-center gap-2'>
																{user.name}
																{user.roleCode === 'admin' && (
																	<span className='bg-indigo-100 text-indigo-700 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded flex-shrink-0'>
																		Admin
																	</span>
																)}
															</p>
															{user.about && (
																<p className='text-[10px] text-zinc-400 max-w-[200px] line-clamp-1 italic'>
																	"{user.about}"
																</p>
															)}
															<p className='text-xs text-zinc-500 break-words flex items-center gap-1 mt-0.5'>
																<Smartphone className='w-3 h-3' /> {user.phone}
															</p>
														</div>
													</div>
												</td>
												<td className='py-4 px-6'>
													<span
														className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md ${user.role === 'Admin' ? 'bg-indigo-50 text-indigo-600' : 'bg-zinc-100 text-zinc-600'}`}
													>
														{user.role}
													</span>
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
													{user.roleCode !== 'admin' && (
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
																className='rounded-xl w-40'
															>
																<DropdownMenuItem
																	onClick={() =>
																		router.push(`/admin/users/${user.id}`)
																	}
																	className='font-bold py-2 text-blue-600 hover:text-blue-700 mb-1'
																>
																	<Eye className='w-4 h-4 mr-2 text-blue-500' />{' '}
																	Batafsil ko'rish
																</DropdownMenuItem>

																<div className='h-[1px] bg-zinc-100 my-1'></div>

																<DropdownMenuItem
																	onClick={() => toggleStatus(user.id)}
																	className={`font-medium py-2 ${user.status === 'Faol' ? 'text-amber-600' : 'text-emerald-600'}`}
																>
																	{user.status === 'Faol' ? (
																		<>
																			<Ban className='w-4 h-4 mr-2' /> Bloklash
																		</>
																	) : (
																		<>
																			<CheckCircle className='w-4 h-4 mr-2' />{' '}
																			Blokdan chiqarish
																		</>
																	)}
																</DropdownMenuItem>
																<DropdownMenuItem
																	onClick={() => deleteUser(user.id)}
																	className='font-medium py-2 text-red-600 border-t border-zinc-100 mt-1 pt-2'
																>
																	<Trash2 className='w-4 h-4 mr-2' /> O'chirish
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
								{filteredUsers.length === 0 && (
									<div className='text-center py-20 bg-white'>
										<p className='text-zinc-500 font-medium'>
											Bunday foydalanuvchi topilmadi.
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
