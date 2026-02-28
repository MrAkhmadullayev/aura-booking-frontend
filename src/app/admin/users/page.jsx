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
	MoreVertical,
	Search,
	Smartphone,
	Trash2,
	UserCheck,
	UserX,
} from 'lucide-react'
import { useState } from 'react'

const initialUsers = [
	{
		id: 1,
		name: 'Sadriddin M.',
		phone: '+998 94 000 11 22',
		role: 'Mijoz',
		registered: '12 Aprel, 2024',
		status: 'Faol',
		lastActive: 'Bugun, 09:12',
	},
	{
		id: 2,
		name: 'Aura Premium',
		phone: '+998 99 111 22 33',
		role: 'Biznes Egasi',
		registered: '11 Yanvar, 2024',
		status: 'Faol',
		lastActive: 'Bugun, 14:00',
	},
	{
		id: 3,
		name: 'Madina',
		phone: '+998 99 123 45 67',
		role: 'Mijoz',
		registered: '05 Aprel, 2024',
		status: 'Faol',
		lastActive: 'Kecha, 21:40',
	},
	{
		id: 4,
		name: 'Tohir M.',
		phone: '+998 90 123 45 67',
		role: 'Admin',
		registered: '01 Yanvar, 2024',
		status: 'Faol',
		lastActive: 'Hozir',
	},
	{
		id: 5,
		name: 'Begzod',
		phone: '+998 91 999 88 77',
		role: 'Mijoz',
		registered: '22 Mart, 2024',
		status: 'Bloklangan',
		lastActive: '2 Haft. oldin',
	},
]

export default function AdminUsers() {
	const [users, setUsers] = useState(initialUsers)
	const [searchQuery, setSearchQuery] = useState('')
	const [filterRole, setFilterRole] = useState('all')

	const filteredUsers = users.filter(user => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.phone.includes(searchQuery)
		if (filterRole !== 'all') {
			return matchesSearch && user.role === filterRole
		}
		return matchesSearch
	})

	const toggleStatus = id => {
		setUsers(
			users.map(u => {
				if (u.id === id) {
					return { ...u, status: u.status === 'Faol' ? 'Bloklangan' : 'Faol' }
				}
				return u
			}),
		)
	}

	const deleteUser = id => {
		if (
			window.confirm(
				"Haqiqatan ham bu foydalanuvchini o'chirib yubormoqchimisiz?",
			)
		) {
			setUsers(users.filter(u => u.id !== id))
		}
	}

	// Calculate counts
	const customerCount = users.filter(u => u.role === 'Mijoz').length
	const businessCount = users.filter(u => u.role === 'Biznes Egasi').length
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
							Mijozlar ({customerCount})
						</button>
						<button
							onClick={() => setFilterRole('Biznes Egasi')}
							className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filterRole === 'Biznes Egasi' ? 'font-bold bg-white text-zinc-900 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Biznes egalari ({businessCount})
						</button>
					</div>
				</div>

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
								<div className='h-12 w-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center'>
									<UserCheck className='h-6 w-6' strokeWidth={1.5} />
								</div>
								<div>
									<p className='text-xs text-zinc-500 font-medium'>
										Biznes Egalari
									</p>
									<p className='text-2xl font-bold text-zinc-900'>
										{businessCount}
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
						<div className='overflow-x-auto'>
							<table className='w-full text-left border-collapse min-w-[700px]'>
								<thead>
									<tr className='bg-white border-b border-zinc-100 text-xs text-zinc-400 uppercase tracking-wider font-semibold'>
										<th className='py-4 px-6 w-1/3'>Foydalanuvchi</th>
										<th className='py-4 px-6'>Rol</th>
										<th className='py-4 px-6 text-center'>Ro'yxatdan O'tgan</th>
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
													<div className='h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-zinc-500 flex-shrink-0'>
														{user.name.charAt(0)}
													</div>
													<div>
														<p className='font-bold text-zinc-900 text-sm'>
															{user.name}
														</p>
														<p className='text-xs text-zinc-500 break-words flex items-center gap-1 mt-0.5'>
															<Smartphone className='w-3 h-3' /> {user.phone}
														</p>
													</div>
												</div>
											</td>
											<td className='py-4 px-6'>
												<span
													className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md 
													${
														user.role === 'Admin'
															? 'bg-indigo-50 text-indigo-600'
															: user.role === 'Biznes Egasi'
																? 'bg-amber-50 text-amber-600'
																: 'bg-zinc-100 text-zinc-600'
													}`}
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
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	)
}
