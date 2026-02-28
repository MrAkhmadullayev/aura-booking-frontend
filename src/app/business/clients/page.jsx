'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogFooter,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Edit2,
	MoreHorizontal,
	Phone,
	Plus,
	Search,
	Star,
	Trash2,
	UserCheck,
} from 'lucide-react'
import { useState } from 'react'

const initialClients = [
	{
		id: 1,
		name: 'Sadriddin M.',
		phone: '+998 94 000 11 22',
		visits: 12,
		spent: 1450000,
		lastVisit: 'Kecha',
		status: 'VIP',
	},
	{
		id: 2,
		name: 'Azizbek',
		phone: '+998 90 123 45 67',
		visits: 3,
		spent: 240000,
		lastVisit: '1 Hafta oldin',
		status: 'Doimiy',
	},
	{
		id: 3,
		name: 'Javohir T.',
		phone: '+998 99 987 65 43',
		visits: 1,
		spent: 80000,
		lastVisit: '1 Oy oldin',
		status: 'Yangi',
	},
	{
		id: 4,
		name: 'Sherzod',
		phone: '+998 97 111 22 33',
		visits: 45,
		spent: 5800000,
		lastVisit: '3 Kun oldin',
		status: 'VIP',
	},
	{
		id: 5,
		name: 'Umidjon',
		phone: '+998 93 444 55 66',
		visits: 0,
		spent: 0,
		lastVisit: 'Kelmagan',
		status: 'Potensial',
	},
	{
		id: 6,
		name: 'Otabek',
		phone: '+998 91 222 33 44',
		visits: 2,
		spent: 160000,
		lastVisit: '6 Oy oldin',
		status: "Yo'qolgan",
	},
]

export default function BusinessClients() {
	const [clients, setClients] = useState(initialClients)
	const [searchQuery, setSearchQuery] = useState('')
	const [filterStatus, setFilterStatus] = useState('all')

	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [currentClient, setCurrentClient] = useState(null)

	const [formData, setFormData] = useState({
		name: '',
		phone: '+998',
		status: 'Yangi',
	})

	const formatMoney = amount => {
		return amount.toLocaleString('en-US').replace(/,/g, ' ') + ' UZS'
	}

	const filteredClients = clients.filter(client => {
		const matchesSearch =
			client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			client.phone.includes(searchQuery)
		if (filterStatus !== 'all') {
			return matchesSearch && client.status === filterStatus
		}
		return matchesSearch
	})

	const handleAddSubmit = e => {
		e.preventDefault()
		const newId = clients.length ? Math.max(...clients.map(c => c.id)) + 1 : 1
		setClients([
			{ id: newId, ...formData, visits: 0, spent: 0, lastVisit: 'Kelmagan' },
			...clients,
		])
		setIsAddModalOpen(false)
		setFormData({ name: '', phone: '+998', status: 'Yangi' })
	}

	const handleEditSubmit = e => {
		e.preventDefault()
		setClients(
			clients.map(c => (c.id === currentClient.id ? currentClient : c)),
		)
		setIsEditModalOpen(false)
	}

	const deleteClient = id => {
		if (
			window.confirm("Bu mijozni bazadan butunlay o'chirib yubormoqchimisiz?")
		) {
			setClients(clients.filter(c => c.id !== id))
		}
	}

	const openEditModal = client => {
		setCurrentClient({ ...client })
		setIsEditModalOpen(true)
	}

	return (
		<DashboardLayout role='business'>
			<div className='space-y-6'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Mijozlar Bazasi
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Saloningizga tashrif buyurgan barcha CRM mijozlar tarixi.
						</p>
					</div>
					<div className='flex gap-2 w-full md:w-auto overflow-x-auto'>
						<div className='flex bg-zinc-100 p-1 rounded-xl'>
							<button
								onClick={() => setFilterStatus('all')}
								className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filterStatus === 'all' ? 'font-bold bg-white text-zinc-900 shadow-sm' : 'font-medium text-zinc-500'}`}
							>
								Barchasi
							</button>
							<button
								onClick={() => setFilterStatus('VIP')}
								className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filterStatus === 'VIP' ? 'font-bold bg-white text-emerald-600 shadow-sm' : 'font-medium text-zinc-500'}`}
							>
								VIP Mijozlar
							</button>
							<button
								onClick={() => setFilterStatus("Yo'qolgan")}
								className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${filterStatus === "Yo'qolgan" ? 'font-bold bg-white text-red-600 shadow-sm' : 'font-medium text-zinc-500'}`}
							>
								Yo'qolganlar
							</button>
						</div>
						<Button
							onClick={() => setIsAddModalOpen(true)}
							className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-sm whitespace-nowrap px-4 w-full md:w-auto flex-shrink-0 flex items-center h-10'
						>
							<Plus className='w-4 h-4 mr-2' /> Yangi Mijoz
						</Button>
					</div>
				</div>

				<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
					<div className='px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row gap-4 justify-between sm:items-center'>
						<div className='relative w-full sm:w-80'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400' />
							<input
								type='text'
								placeholder='Ism yoki telefon orqali qidirish...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='h-10 w-full pl-10 pr-4 rounded-xl border border-zinc-200 text-sm focus:border-zinc-400 focus:ring-0 outline-none transition-colors bg-white shadow-sm'
							/>
						</div>
						<span className='text-sm font-medium text-zinc-500 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 inline-block text-center shadow-sm'>
							Jami: <b className='text-zinc-900'>{filteredClients.length} ta</b>{' '}
							mijoz
						</span>
					</div>

					<CardContent className='p-0'>
						<div className='overflow-x-auto'>
							<table className='w-full text-left border-collapse min-w-[800px]'>
								<thead>
									<tr className='bg-white border-b border-zinc-100 text-xs text-zinc-400 uppercase tracking-wider font-semibold'>
										<th className='py-4 px-6 w-[30%]'>Mijoz Ismi</th>
										<th className='py-4 px-6'>Telefon</th>
										<th className='py-4 px-6 text-center'>
											Tashriflar / So'nggi
										</th>
										<th className='py-4 px-6 text-right'>Tushum (Jami)</th>
										<th className='py-4 px-6 text-center'>Daraja</th>
										<th className='py-4 px-6 w-16'></th>
									</tr>
								</thead>
								<tbody className='divide-y divide-zinc-50'>
									{filteredClients.map(client => (
										<tr
											key={client.id}
											className='hover:bg-zinc-50/50 transition-colors group'
										>
											<td className='py-4 px-6'>
												<div className='flex items-center gap-3'>
													<div className='h-10 w-10 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600 flex-shrink-0 shadow-inner'>
														{client.name.charAt(0)}
													</div>
													<h4 className='font-bold text-zinc-900 text-sm'>
														{client.name}
													</h4>
												</div>
											</td>
											<td className='py-4 px-6 text-sm text-zinc-600 font-medium'>
												<div className='flex items-center gap-2'>
													<Phone className='w-3.5 h-3.5 text-zinc-400' />{' '}
													{client.phone}
												</div>
											</td>
											<td className='py-4 px-6 text-center'>
												<div className='flex flex-col items-center justify-center gap-0.5'>
													<span className='font-bold text-zinc-900 text-sm'>
														{client.visits} marta
													</span>
													<span className='text-[10px] text-zinc-500 uppercase tracking-wider'>
														{client.lastVisit}
													</span>
												</div>
											</td>
											<td className='py-4 px-6 text-right font-mono font-semibold text-zinc-700'>
												{formatMoney(client.spent)}
											</td>
											<td className='py-4 px-6 text-center'>
												<span
													className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border
													${
														client.status === 'VIP'
															? 'bg-amber-50 text-amber-600 border-amber-100'
															: client.status === 'Yangi'
																? 'bg-blue-50 text-blue-600 border-blue-100'
																: client.status === "Yo'qolgan"
																	? 'bg-red-50 text-red-600 border-red-100'
																	: 'bg-zinc-100 text-zinc-600 border-zinc-200'
													}`}
												>
													{client.status === 'VIP' && (
														<Star className='w-3 h-3 fill-current' />
													)}
													{client.status}
												</span>
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
														className='rounded-xl w-40'
													>
														<DropdownMenuItem
															onClick={() => openEditModal(client)}
															className='font-medium py-2'
														>
															<Edit2 className='w-4 h-4 mr-2' /> Tahrirlash
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() => deleteClient(client.id)}
															className='font-medium py-2 text-red-600 border-t border-zinc-100 mt-1 pt-2 focus:bg-red-50 focus:text-red-700'
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
							{filteredClients.length === 0 && (
								<div className='text-center py-20 bg-white'>
									<UserCheck className='w-12 h-12 text-zinc-300 mx-auto mb-4' />
									<p className='text-zinc-500 font-medium'>
										Bu parametrlar bo'yicha mijoz topilmadi.
									</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Add Modal */}
			<Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
				<DialogContent className='sm:max-w-md bg-white rounded-2xl'>
					<DialogHeader>
						<DialogTitle>Mijoz Qo'shish</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleAddSubmit} className='space-y-4 py-4'>
						<div className='space-y-2'>
							<Label>To'liq Ismi</Label>
							<Input
								required
								value={formData.name}
								onChange={e =>
									setFormData({ ...formData, name: e.target.value })
								}
								placeholder='Masalan: Sardor'
								className='rounded-xl h-11 border-zinc-200'
							/>
						</div>
						<div className='space-y-2'>
							<Label>Telefon raqam</Label>
							<Input
								required
								value={formData.phone}
								onChange={e =>
									setFormData({ ...formData, phone: e.target.value })
								}
								className='rounded-xl h-11 border-zinc-200 font-mono'
							/>
						</div>
						<div className='space-y-2'>
							<Label>Darajasi (Status)</Label>
							<Select
								value={formData.status}
								onValueChange={v => setFormData({ ...formData, status: v })}
							>
								<SelectTrigger className='rounded-xl h-11 border-zinc-200 text-sm'>
									<SelectValue placeholder='Tanlang' />
								</SelectTrigger>
								<SelectContent className='rounded-xl'>
									<SelectItem value='Yangi'>Yangi</SelectItem>
									<SelectItem value='Potensial'>Potensial</SelectItem>
									<SelectItem value='Doimiy'>Doimiy</SelectItem>
									<SelectItem value='VIP'>VIP Mijoz</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<DialogFooter className='pt-4 sm:justify-end gap-2 text-right'>
							<Button
								type='button'
								variant='outline'
								onClick={() => setIsAddModalOpen(false)}
								className='rounded-xl h-11 w-full sm:w-auto'
							>
								Bekor qilish
							</Button>
							<Button
								type='submit'
								className='bg-zinc-900 text-white rounded-xl h-11 w-full sm:w-auto'
							>
								Qo'shish
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Edit Modal */}
			<Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
				<DialogContent className='sm:max-w-md bg-white rounded-2xl'>
					<DialogHeader>
						<DialogTitle>Mijoz ma'lumotlarini tahrirlash</DialogTitle>
					</DialogHeader>
					{currentClient && (
						<form onSubmit={handleEditSubmit} className='space-y-4 py-4'>
							<div className='space-y-2'>
								<Label>To'liq Ismi</Label>
								<Input
									required
									value={currentClient.name}
									onChange={e =>
										setCurrentClient({ ...currentClient, name: e.target.value })
									}
									className='rounded-xl h-11 border-zinc-200'
								/>
							</div>
							<div className='space-y-2'>
								<Label>Telefon raqam</Label>
								<Input
									required
									value={currentClient.phone}
									onChange={e =>
										setCurrentClient({
											...currentClient,
											phone: e.target.value,
										})
									}
									className='rounded-xl h-11 border-zinc-200 font-mono'
								/>
							</div>
							<div className='space-y-2'>
								<Label>Darajasi (Status)</Label>
								<Select
									value={currentClient.status}
									onValueChange={v =>
										setCurrentClient({ ...currentClient, status: v })
									}
								>
									<SelectTrigger className='rounded-xl h-11 border-zinc-200 text-sm'>
										<SelectValue placeholder='Tanlang' />
									</SelectTrigger>
									<SelectContent className='rounded-xl'>
										<SelectItem value='Yangi'>Yangi</SelectItem>
										<SelectItem value='Potensial'>Potensial</SelectItem>
										<SelectItem value='Doimiy'>Doimiy</SelectItem>
										<SelectItem value='VIP'>VIP Mijoz</SelectItem>
										<SelectItem value="Yo'qolgan">Yo'qolgan</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className='grid grid-cols-2 gap-4 opacity-50 pointer-events-none bg-zinc-50 p-3 rounded-xl border border-zinc-100'>
								<div>
									<Label className='text-xs'>Tashriflar soni</Label>
									<p className='font-bold text-zinc-900 mt-1'>
										{currentClient.visits}
									</p>
								</div>
								<div>
									<Label className='text-xs'>Jami tushum (UZS)</Label>
									<p className='font-bold text-zinc-900 mt-1'>
										{formatMoney(currentClient.spent)}
									</p>
								</div>
							</div>
							<DialogFooter className='pt-4 sm:justify-end gap-2 text-right'>
								<Button
									type='button'
									variant='outline'
									onClick={() => setIsEditModalOpen(false)}
									className='rounded-xl h-11 w-full sm:w-auto'
								>
									Bekor qilish
								</Button>
								<Button
									type='submit'
									className='bg-zinc-900 text-white rounded-xl h-11 w-full sm:w-auto'
								>
									Saqlash
								</Button>
							</DialogFooter>
						</form>
					)}
				</DialogContent>
			</Dialog>
		</DashboardLayout>
	)
}
