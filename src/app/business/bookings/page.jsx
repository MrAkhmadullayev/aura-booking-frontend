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
	CheckCircle2,
	Clock,
	Filter,
	MoreVertical,
	Plus,
	Scissors,
	Trash2,
	XCircle,
} from 'lucide-react'
import { useState } from 'react'

const fakeBookings = [
	{
		id: 101,
		client: 'Sadriddin M.',
		service: 'Soch kesish (Fade)',
		master: 'Alisher',
		date: '2024-04-12',
		time: '14:30',
		status: 'upcoming',
		phone: '+998 94 000 11 22',
		price: '120000',
	},
	{
		id: 102,
		client: 'Madina',
		service: 'Manikyur klassika',
		master: 'Lola',
		date: '2024-04-12',
		time: '15:30',
		status: 'upcoming',
		phone: '+998 99 123 45 67',
		price: '70000',
	},
	{
		id: 103,
		client: 'Azizbek',
		service: 'Soqol tekislash',
		master: 'Alisher',
		date: '2024-04-12',
		time: '16:00',
		status: 'in-progress',
		phone: '+998 90 987 65 43',
		price: '50000',
	},
	{
		id: 104,
		client: 'Kamola',
		service: "Soch bo'yash",
		master: 'Zarina',
		date: '2024-04-12',
		time: '10:00',
		status: 'completed',
		phone: '+998 91 111 22 33',
		price: '300000',
	},
	{
		id: 105,
		client: 'Javohir',
		service: 'Soch kesish standart',
		master: 'Jasur',
		date: '2024-04-13',
		time: '09:00',
		status: 'upcoming',
		phone: '+998 93 444 55 66',
		price: '80000',
	},
	{
		id: 106,
		client: 'Malika',
		service: 'Pedikyur',
		master: 'Lola',
		date: '2024-04-13',
		time: '11:30',
		status: 'cancelled',
		phone: '+998 97 777 88 99',
		price: '90000',
	},
]

export default function BusinessBookings() {
	const [bookings, setBookings] = useState(fakeBookings)
	const [activeDate, setActiveDate] = useState('2024-04-12')

	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [formData, setFormData] = useState({
		client: '',
		phone: '+998',
		service: '',
		master: 'Alisher',
		date: '2024-04-12',
		time: '12:00',
		price: '50000',
	})

	// Status definitions for styles
	const statusConfig = {
		upcoming: {
			label: 'Kutilmoqda',
			color: 'text-amber-600 bg-amber-50 border-amber-100',
		},
		'in-progress': {
			label: 'Jarayonda',
			color: 'text-blue-600 bg-blue-50 border-blue-100',
		},
		completed: {
			label: 'Bajarildi',
			color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
		},
		cancelled: {
			label: 'Bekor',
			color: 'text-red-600 bg-red-50 border-red-100',
		},
	}

	const formatPrice = price => {
		return parseInt(price).toLocaleString('en-US').replace(/,/g, ' ') + ' UZS'
	}

	const handleAddSubmit = e => {
		e.preventDefault()
		const newId = bookings.length ? Math.max(...bookings.map(b => b.id)) + 1 : 1
		setBookings([...bookings, { id: newId, ...formData, status: 'upcoming' }])
		setIsAddModalOpen(false)
		setFormData({
			client: '',
			phone: '+998',
			service: '',
			master: 'Alisher',
			date: '2024-04-12',
			time: '12:00',
			price: '50000',
		})
	}

	const updateStatus = (id, newStatus) => {
		setBookings(
			bookings.map(b => (b.id === id ? { ...b, status: newStatus } : b)),
		)
	}

	const deleteBooking = id => {
		if (window.confirm("Rostdan ham bu yozuvni butunlay o'chirmoqchimisiz?")) {
			setBookings(bookings.filter(b => b.id !== id))
		}
	}

	return (
		<DashboardLayout role='business'>
			<div className='space-y-6 pb-20'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Yozuvlar (Bron)
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Sizning salon/ustalaringiz bandlik jadvali va mijozlar yozuvlari.
						</p>
					</div>
					<div className='flex gap-2 w-full md:w-auto'>
						<Button
							variant='outline'
							className='rounded-xl flex-1 md:flex-none'
						>
							Bugun, 12 Apr
						</Button>
						<Button
							onClick={() => setIsAddModalOpen(true)}
							className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl flex-1 md:flex-none'
						>
							<Plus className='h-4 w-4 mr-2' /> Yangi
						</Button>
					</div>
				</div>

				<div className='flex flex-col lg:flex-row gap-6'>
					{/* Calendar Sidebar */}
					<div className='w-full lg:w-72 flex-shrink-0 space-y-6'>
						<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
							<CardContent className='p-5'>
								<div className='flex justify-between items-center mb-4'>
									<h3 className='font-semibold text-zinc-900'>Aprel 2024</h3>
									<div className='flex gap-1'>
										<button className='h-8 w-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500'>
											&lt;
										</button>
										<button className='h-8 w-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500'>
											&gt;
										</button>
									</div>
								</div>

								<div className='grid grid-cols-7 gap-1 text-center mb-2'>
									{['D', 'S', 'Ch', 'P', 'J', 'Sh', 'Y'].map((d, i) => (
										<div
											key={i}
											className='text-xs font-medium text-zinc-400 py-1'
										>
											{d}
										</div>
									))}
								</div>
								<div className='grid grid-cols-7 gap-1 text-center'>
									<div className='h-8 w-8 rounded-lg flex items-center justify-center text-sm text-zinc-300'>
										1
									</div>
									<div className='h-8 w-8 rounded-lg flex items-center justify-center text-sm text-zinc-300'>
										2
									</div>
									<div className='h-8 w-8 rounded-lg flex items-center justify-center text-sm text-zinc-300'>
										3
									</div>
									<div className='h-8 w-8 rounded-lg flex items-center justify-center text-sm text-zinc-500'>
										7
									</div>
									<div className='h-8 w-8 rounded-lg flex items-center justify-center text-sm text-zinc-700 font-medium'>
										8
									</div>
									<div className='h-8 w-8 rounded-lg flex items-center justify-center text-sm text-zinc-700 font-medium'>
										9
									</div>
									<div className='h-8 w-8 rounded-lg flex items-center justify-center text-sm text-zinc-700 font-medium'>
										10
									</div>
									<div className='h-8 w-8 rounded-lg flex items-center justify-center text-sm text-zinc-700 font-medium relative cursor-pointer hover:bg-zinc-100'>
										11
										<div className='absolute bottom-1 w-1 h-1 bg-zinc-300 rounded-full'></div>
									</div>
									<div className='h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold bg-zinc-900 text-white shadow-sm ring-2 ring-zinc-900/20 ring-offset-1 cursor-pointer'>
										12
									</div>
									<div className='h-8 w-8 rounded-lg flex items-center justify-center text-sm text-zinc-700 font-medium relative cursor-pointer hover:bg-zinc-100'>
										13
										<div className='absolute bottom-1 w-1 h-1 bg-red-400 rounded-full'></div>
									</div>
									<div className='h-8 w-8 rounded-lg flex items-center justify-center text-sm text-zinc-500 cursor-pointer hover:bg-zinc-100'>
										14
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Filters */}
						<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
							<CardContent className='p-5'>
								<h3 className='font-semibold text-zinc-900 flex items-center gap-2 mb-4'>
									<Filter className='h-4 w-4 text-zinc-500' /> Ustalar bo'yicha
								</h3>
								<div className='space-y-2'>
									<label className='flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 cursor-pointer'>
										<input
											type='checkbox'
											className='rounded text-zinc-900 w-4 h-4'
											defaultChecked
										/>
										<span className='text-sm font-medium text-zinc-700'>
											Barchasi
										</span>
									</label>
									<label className='flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 cursor-pointer'>
										<input
											type='checkbox'
											className='rounded text-zinc-900 w-4 h-4 bg-zinc-100'
										/>
										<span className='text-sm text-zinc-600'>
											Alisher (Sartarosh)
										</span>
									</label>
									<label className='flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 cursor-pointer'>
										<input
											type='checkbox'
											className='rounded text-zinc-900 w-4 h-4 bg-zinc-100'
										/>
										<span className='text-sm text-zinc-600'>
											Lola (Kosmetolog)
										</span>
									</label>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Bookings List */}
					<div className='flex-1 space-y-4'>
						<div className='bg-white p-1 rounded-xl flex w-fit shadow-sm'>
							<button className='px-5 py-2 text-sm font-bold bg-zinc-900 text-white rounded-lg shadow-sm'>
								Ro'yxat
							</button>
							<button className='px-5 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 rounded-lg transition-colors'>
								Jadval (Kanban)
							</button>
						</div>

						<div className='flex flex-col gap-3'>
							{bookings.map(booking => (
								<Card
									key={booking.id}
									className='border-none shadow-sm rounded-2xl bg-white hover:shadow-md transition-all duration-200'
								>
									<CardContent className='p-5'>
										<div className='flex flex-col sm:flex-row gap-4 sm:items-center justify-between'>
											<div className='flex items-start sm:items-center gap-4'>
												{/* Time */}
												<div className='bg-zinc-50 px-3 py-2 rounded-xl text-center border border-zinc-100 w-20 flex-shrink-0'>
													<p className='text-lg font-bold font-mono text-zinc-900'>
														{booking.time}
													</p>
												</div>

												{/* Client Info */}
												<div className='flex items-center gap-3'>
													<div className='h-10 w-10 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center font-bold text-zinc-500 flex-shrink-0'>
														{booking.client.charAt(0)}
													</div>
													<div>
														<h3 className='font-bold text-zinc-900 flex flex-wrap items-center gap-2'>
															{booking.client}
															<span
																className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${statusConfig[booking.status].color}`}
															>
																{statusConfig[booking.status].label}
															</span>
														</h3>
														<p className='text-sm text-zinc-500'>
															{booking.phone}
														</p>
													</div>
												</div>
											</div>

											{/* Service & Master */}
											<div className='flex-1 sm:text-right ml-16 sm:ml-0 border-l-2 border-zinc-100 pl-4 sm:border-l-0 sm:pl-0'>
												<p className='font-semibold text-zinc-900 flex items-center sm:justify-end gap-1.5'>
													<Scissors className='h-3.5 w-3.5 text-zinc-400' />{' '}
													{booking.service}
												</p>
												<p className='text-sm text-zinc-500 mt-1'>
													Usta:{' '}
													<span className='font-medium text-zinc-700'>
														{booking.master}
													</span>
												</p>
											</div>

											{/* Price & Actions */}
											<div className='flex items-center justify-between sm:justify-end gap-4 ml-16 sm:ml-0 mt-2 sm:mt-0'>
												<div className='text-right'>
													<p className='font-bold text-zinc-900 text-lg whitespace-nowrap'>
														{formatPrice(booking.price)}
													</p>
												</div>
												<div className='flex items-center gap-2'>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant='ghost'
																size='icon'
																className='h-8 w-8 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 rounded-full bg-zinc-50'
															>
																<MoreVertical className='h-4 w-4' />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															align='end'
															className='rounded-xl w-48'
														>
															{booking.status !== 'in-progress' && (
																<DropdownMenuItem
																	onClick={() =>
																		updateStatus(booking.id, 'in-progress')
																	}
																	className='font-medium py-2 text-blue-600'
																>
																	<Clock className='w-4 h-4 mr-2' /> Jarayonda
																	deb belgilash
																</DropdownMenuItem>
															)}
															{booking.status !== 'completed' && (
																<DropdownMenuItem
																	onClick={() =>
																		updateStatus(booking.id, 'completed')
																	}
																	className='font-medium py-2 text-emerald-600'
																>
																	<CheckCircle2 className='w-4 h-4 mr-2' />{' '}
																	Bajarildi
																</DropdownMenuItem>
															)}
															{booking.status !== 'cancelled' && (
																<DropdownMenuItem
																	onClick={() =>
																		updateStatus(booking.id, 'cancelled')
																	}
																	className='font-medium py-2 text-amber-600'
																>
																	<XCircle className='w-4 h-4 mr-2' /> Bekor
																	qilish
																</DropdownMenuItem>
															)}
															<DropdownMenuItem
																onClick={() => deleteBooking(booking.id)}
																className='font-medium py-2 text-red-600'
															>
																<Trash2 className='w-4 h-4 mr-2' /> O'chirish
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							))}

							{bookings.length === 0 && (
								<div className='text-center py-20 bg-white rounded-2xl border-none shadow-sm'>
									<p className='text-zinc-500 font-medium'>Bu yozuvlar yo'q.</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Add Modal */}
			<Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
				<DialogContent className='sm:max-w-md bg-white rounded-2xl overflow-y-auto max-h-[90vh]'>
					<DialogHeader>
						<DialogTitle>Yangi Yozuv Qo'shish</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleAddSubmit} className='space-y-4 py-4'>
						<div className='space-y-2'>
							<Label>Mijoz ism-sharif</Label>
							<Input
								required
								value={formData.client}
								onChange={e =>
									setFormData({ ...formData, client: e.target.value })
								}
								placeholder='Sadriddin M.'
								className='rounded-xl h-11 border-zinc-200'
							/>
						</div>
						<div className='space-y-2'>
							<Label>Telefon raqami</Label>
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
							<Label>Xizmat</Label>
							<Select
								value={formData.service}
								onValueChange={v => setFormData({ ...formData, service: v })}
							>
								<SelectTrigger className='rounded-xl h-11 border-zinc-200'>
									<SelectValue placeholder='Tanlang...' />
								</SelectTrigger>
								<SelectContent className='rounded-xl'>
									<SelectItem value='Soch kesish (Klassika)'>
										Soch kesish (Klassika)
									</SelectItem>
									<SelectItem value='Soch kesish (Fade)'>
										Soch kesish (Fade)
									</SelectItem>
									<SelectItem value='Bolalar soch kesish'>
										Bolalar soch kesish
									</SelectItem>
									<SelectItem value='Soqol tekislash'>
										Soqol tekislash
									</SelectItem>
									<SelectItem value='Manikyur'>Manikyur</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className='space-y-2'>
							<Label>Usta</Label>
							<Select
								value={formData.master}
								onValueChange={v => setFormData({ ...formData, master: v })}
							>
								<SelectTrigger className='rounded-xl h-11 border-zinc-200'>
									<SelectValue placeholder='Usta' />
								</SelectTrigger>
								<SelectContent className='rounded-xl'>
									<SelectItem value='Alisher'>Alisher (Sartarosh)</SelectItem>
									<SelectItem value='Jasur'>Jasur (Sartarosh)</SelectItem>
									<SelectItem value='Lola'>Lola (Manikyur)</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label>Vaqt</Label>
								<Input
									required
									type='time'
									value={formData.time}
									onChange={e =>
										setFormData({ ...formData, time: e.target.value })
									}
									className='rounded-xl h-11 border-zinc-200'
								/>
							</div>
							<div className='space-y-2'>
								<Label>Narx (UZS)</Label>
								<Input
									required
									type='number'
									value={formData.price}
									onChange={e =>
										setFormData({ ...formData, price: e.target.value })
									}
									className='rounded-xl h-11 border-zinc-200'
								/>
							</div>
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
								Yozish
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</DashboardLayout>
	)
}
