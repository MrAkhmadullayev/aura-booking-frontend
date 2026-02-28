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
	Clock,
	Edit2,
	MoreHorizontal,
	Plus,
	Search,
	Trash2,
	Wallet,
} from 'lucide-react'
import { useState } from 'react'

const initialServices = [
	{
		id: 1,
		category: 'Soch kesish',
		name: 'Erkaklar soch kesish (Klassika)',
		duration: '45 daq',
		price: '80000',
		status: 'Faol',
	},
	{
		id: 2,
		category: 'Soch kesish',
		name: 'Soch kesish (Fade/Kroft)',
		duration: '60 daq',
		price: '120000',
		status: 'Faol',
	},
	{
		id: 3,
		category: 'Soch kesish',
		name: 'Bolalar soch kesish (12 yoshgacha)',
		duration: '30 daq',
		price: '50000',
		status: 'Faol',
	},
	{
		id: 4,
		category: 'Soqol',
		name: 'Soqol tekislash va qurtartirish',
		duration: '30 daq',
		price: '60000',
		status: 'Faol',
	},
	{
		id: 5,
		category: 'Soqol',
		name: "Soqolni to'liq olish (Qirolicha)",
		duration: '40 daq',
		price: '80000',
		status: 'Faol',
	},
	{
		id: 6,
		category: 'Qoshish',
		name: 'Yuz tozalash (Qora niqob)',
		duration: '20 daq',
		price: '40000',
		status: 'Faol',
	},
	{
		id: 7,
		category: 'Qoshish',
		name: "Soch bo'yash (Qora/Jigarrang)",
		duration: '90 daq',
		price: '250000',
		status: 'Nofaol',
	},
]

export default function BusinessServices() {
	const [services, setServices] = useState(initialServices)
	const [searchQuery, setSearchQuery] = useState('')

	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [currentService, setCurrentService] = useState(null)

	// Form states
	const [formData, setFormData] = useState({
		name: '',
		category: 'Soch kesish',
		duration: '30 daq',
		price: '',
		status: 'Faol',
	})

	const formatPrice = price => {
		return parseInt(price).toLocaleString('en-US').replace(/,/g, ' ') + ' UZS'
	}

	// Filter and Group Services
	const filteredServices = services.filter(s =>
		s.name.toLowerCase().includes(searchQuery.toLowerCase()),
	)
	const categories = [...new Set(services.map(s => s.category))]

	const handleAddSubmit = e => {
		e.preventDefault()
		const newId = services.length ? Math.max(...services.map(s => s.id)) + 1 : 1
		setServices([{ id: newId, ...formData }, ...services])
		setIsAddModalOpen(false)
		setFormData({
			name: '',
			category: 'Soch kesish',
			duration: '30 daq',
			price: '',
			status: 'Faol',
		})
	}

	const handleEditSubmit = e => {
		e.preventDefault()
		setServices(
			services.map(s => (s.id === currentService.id ? currentService : s)),
		)
		setIsEditModalOpen(false)
	}

	const handleDelete = id => {
		// Confirm standard window alert for fast native performance
		if (window.confirm("Haqiqatan ham bu xizmatni o'chirmoqchimisiz?")) {
			setServices(services.filter(s => s.id !== id))
		}
	}

	const openEditModal = service => {
		setCurrentService({ ...service })
		setIsEditModalOpen(true)
	}

	return (
		<DashboardLayout role='business'>
			<div className='space-y-6'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Xizmatlar & Narxlar
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Saloningiz taklif qiladigan xizmatlarni boshqaring.
						</p>
					</div>
					<div className='flex gap-3 w-full md:w-auto'>
						<div className='relative flex-1 md:w-64'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400' />
							<input
								type='text'
								placeholder='Xizmat izlash...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='h-10 w-full pl-10 pr-4 rounded-xl border border-zinc-200 text-sm focus:border-zinc-400 focus:ring-0 outline-none transition-colors'
							/>
						</div>
						<Button
							onClick={() => setIsAddModalOpen(true)}
							className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-10 px-5 flex-shrink-0'
						>
							<Plus className='h-4 w-4 mr-2' /> Qo'shish
						</Button>
					</div>
				</div>

				<div className='grid grid-cols-1 gap-6'>
					{categories.map(category => {
						const catServices = filteredServices.filter(
							s => s.category === category,
						)
						if (catServices.length === 0) return null

						return (
							<Card
								key={category}
								className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'
							>
								<div className='bg-zinc-50/50 px-6 py-4 border-b border-zinc-100 flex items-center justify-between'>
									<h3 className='font-bold text-zinc-900 text-lg'>
										{category}
									</h3>
									<span className='text-sm font-medium text-zinc-500 bg-white px-3 py-1 rounded-full shadow-sm border border-zinc-100'>
										{catServices.length} ta xizmat
									</span>
								</div>

								<CardContent className='p-0'>
									<ul className='divide-y divide-zinc-50'>
										{catServices.map(service => (
											<li
												key={service.id}
												className='p-6 hover:bg-zinc-50/30 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group'
											>
												<div className='flex-1'>
													<div className='flex items-center gap-3'>
														<h4 className='font-semibold text-zinc-900 text-base'>
															{service.name}
														</h4>
														{service.status === 'Nofaol' && (
															<span className='text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-zinc-100 text-zinc-500 border-zinc-200'>
																Yashiringan
															</span>
														)}
													</div>
													<div className='flex items-center gap-4 mt-2'>
														<div className='flex items-center gap-1.5 text-zinc-500 text-sm'>
															<Clock className='w-4 h-4' /> {service.duration}
														</div>
														<div className='w-1 h-1 bg-zinc-300 rounded-full'></div>
														<div className='flex items-center gap-1.5 text-zinc-500 text-sm font-medium'>
															<Wallet className='w-4 h-4 text-emerald-600' />
															<span className='text-zinc-900'>
																{formatPrice(service.price)}
															</span>
														</div>
													</div>
												</div>

												<div className='flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-zinc-100 sm:border-0 justify-end transition-opacity'>
													<Button
														onClick={() => openEditModal(service)}
														variant='outline'
														size='sm'
														className='h-9 px-4 rounded-lg font-medium shadow-none'
													>
														<Edit2 className='w-3.5 h-3.5 mr-2' /> Tahrirlash
													</Button>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant='ghost'
																size='icon'
																className='h-9 w-9 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg'
															>
																<MoreHorizontal className='h-4 w-4' />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															align='end'
															className='rounded-xl mt-1 w-40'
														>
															<DropdownMenuItem
																onClick={() => {
																	setCurrentService({
																		...service,
																		status:
																			service.status === 'Faol'
																				? 'Nofaol'
																				: 'Faol',
																	})
																	setServices(
																		services.map(s =>
																			s.id === service.id
																				? {
																						...s,
																						status:
																							s.status === 'Faol'
																								? 'Nofaol'
																								: 'Faol',
																					}
																				: s,
																		),
																	)
																}}
																className='cursor-pointer font-medium py-2'
															>
																{service.status === 'Faol'
																	? 'Yashirish'
																	: 'Faollashtirish'}
															</DropdownMenuItem>
															<DropdownMenuItem
																onClick={() => handleDelete(service.id)}
																className='cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 font-medium py-2'
															>
																<Trash2 className='w-4 h-4 mr-2' /> O'chirish
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</div>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						)
					})}

					{filteredServices.length === 0 && (
						<div className='text-center py-20 bg-white rounded-2xl border-none shadow-sm'>
							<p className='text-zinc-500 font-medium'>Xizmatlar topilmadi.</p>
						</div>
					)}
				</div>
			</div>

			{/* Add Modal */}
			<Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
				<DialogContent className='sm:max-w-md bg-white rounded-2xl'>
					<DialogHeader>
						<DialogTitle>Yangi Xizmat Qo'shish</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleAddSubmit} className='space-y-4 py-4'>
						<div className='space-y-2'>
							<Label>Kategoriya</Label>
							<Select
								value={formData.category}
								onValueChange={v => setFormData({ ...formData, category: v })}
							>
								<SelectTrigger className='rounded-xl h-11 border-zinc-200'>
									<SelectValue placeholder='Kategoriyani tanlang' />
								</SelectTrigger>
								<SelectContent className='rounded-xl'>
									<SelectItem value='Soch kesish'>Soch kesish</SelectItem>
									<SelectItem value='Soqol'>Soqol</SelectItem>
									<SelectItem value='Qoshish'>
										Boshqa (Qoshish, Yuz, va hk)
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='space-y-2'>
							<Label>Xizmat Nomi</Label>
							<Input
								required
								value={formData.name}
								onChange={e =>
									setFormData({ ...formData, name: e.target.value })
								}
								placeholder='Masalan: Erkaklar soch kesish'
								className='rounded-xl h-11 border-zinc-200'
							/>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label>Davomiyligi</Label>
								<Select
									value={formData.duration}
									onValueChange={v => setFormData({ ...formData, duration: v })}
								>
									<SelectTrigger className='rounded-xl h-11 border-zinc-200'>
										<SelectValue placeholder='Vaqt' />
									</SelectTrigger>
									<SelectContent className='rounded-xl'>
										<SelectItem value='15 daq'>15 daq</SelectItem>
										<SelectItem value='30 daq'>30 daq</SelectItem>
										<SelectItem value='45 daq'>45 daq</SelectItem>
										<SelectItem value='60 daq'>1 soat</SelectItem>
										<SelectItem value='90 daq'>1.5 soat</SelectItem>
										<SelectItem value='120 daq'>2 soat</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className='space-y-2'>
								<Label>Narxi (UZS)</Label>
								<Input
									required
									type='number'
									value={formData.price}
									onChange={e =>
										setFormData({ ...formData, price: e.target.value })
									}
									placeholder='80000'
									className='rounded-xl h-11 border-zinc-200'
								/>
							</div>
						</div>
						<div className='space-y-2'>
							<Label>Holati</Label>
							<Select
								value={formData.status}
								onValueChange={v => setFormData({ ...formData, status: v })}
							>
								<SelectTrigger className='rounded-xl h-11 border-zinc-200'>
									<SelectValue placeholder='Holati' />
								</SelectTrigger>
								<SelectContent className='rounded-xl'>
									<SelectItem value='Faol'>Faol</SelectItem>
									<SelectItem value='Nofaol'>Nofaol (Yashirilgan)</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<DialogFooter className='pt-4 sm:justify-end gap-2'>
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
						<DialogTitle>Xizmatni Tahrirlash</DialogTitle>
					</DialogHeader>
					{currentService && (
						<form onSubmit={handleEditSubmit} className='space-y-4 py-4'>
							<div className='space-y-2'>
								<Label>Kategoriya</Label>
								<Select
									value={currentService.category}
									onValueChange={v =>
										setCurrentService({ ...currentService, category: v })
									}
								>
									<SelectTrigger className='rounded-xl h-11 border-zinc-200'>
										<SelectValue placeholder='Kategoriyani tanlang' />
									</SelectTrigger>
									<SelectContent className='rounded-xl'>
										<SelectItem value='Soch kesish'>Soch kesish</SelectItem>
										<SelectItem value='Soqol'>Soqol</SelectItem>
										<SelectItem value='Qoshish'>
											Boshqa (Qoshish, Yuz, va hk)
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className='space-y-2'>
								<Label>Xizmat Nomi</Label>
								<Input
									required
									value={currentService.name}
									onChange={e =>
										setCurrentService({
											...currentService,
											name: e.target.value,
										})
									}
									className='rounded-xl h-11 border-zinc-200'
								/>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label>Davomiyligi</Label>
									<Select
										value={currentService.duration}
										onValueChange={v =>
											setCurrentService({ ...currentService, duration: v })
										}
									>
										<SelectTrigger className='rounded-xl h-11 border-zinc-200'>
											<SelectValue placeholder='Vaqt' />
										</SelectTrigger>
										<SelectContent className='rounded-xl'>
											<SelectItem value='15 daq'>15 daq</SelectItem>
											<SelectItem value='30 daq'>30 daq</SelectItem>
											<SelectItem value='45 daq'>45 daq</SelectItem>
											<SelectItem value='60 daq'>1 soat</SelectItem>
											<SelectItem value='90 daq'>1.5 soat</SelectItem>
											<SelectItem value='120 daq'>2 soat</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className='space-y-2'>
									<Label>Narxi (UZS)</Label>
									<Input
										required
										type='number'
										value={currentService.price}
										onChange={e =>
											setCurrentService({
												...currentService,
												price: e.target.value,
											})
										}
										className='rounded-xl h-11 border-zinc-200'
									/>
								</div>
							</div>
							<div className='space-y-2'>
								<Label>Holati</Label>
								<Select
									value={currentService.status}
									onValueChange={v =>
										setCurrentService({ ...currentService, status: v })
									}
								>
									<SelectTrigger className='rounded-xl h-11 border-zinc-200'>
										<SelectValue placeholder='Holati' />
									</SelectTrigger>
									<SelectContent className='rounded-xl'>
										<SelectItem value='Faol'>Faol</SelectItem>
										<SelectItem value='Nofaol'>Nofaol (Yashirilgan)</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<DialogFooter className='pt-4 sm:justify-end gap-2'>
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
