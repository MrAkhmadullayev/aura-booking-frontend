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
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/context/AuthContext'
import useFetch from '@/hooks/useFetch'
import api from '@/lib/api'
import {
	addDays,
	addMonths,
	format,
	isSameDay,
	isSameMonth,
	startOfWeek,
	subMonths,
} from 'date-fns'
import { uz } from 'date-fns/locale'
import {
	Calendar as CalendarIcon,
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	Filter,
	Loader2,
	MapPin,
	MoreVertical,
	Plus,
	Scissors,
	XCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function BusinessBookings() {
	const {
		data: bookings = [],
		isLoading: isLoadingBookings,
		mutate: mutateBookings,
	} = useFetch('/bookings/salon')
	const { data: salons = [], isLoading: isLoadingSalons } =
		useFetch('/salons/mine')
	const { data: services = [], isLoading: isLoadingServices } =
		useFetch('/services')
	const { data: employees = [], isLoading: isLoadingEmployees } =
		useFetch('/employees')

	const isLoading =
		isLoadingBookings ||
		isLoadingSalons ||
		isLoadingServices ||
		isLoadingEmployees

	const [activeDate, setActiveDate] = useState(new Date())
	const [calendarMonth, setCalendarMonth] = useState(new Date())
	const [selectedEmployees, setSelectedEmployees] = useState([]) // array of IDs

	const { user: session } = useAuth()

	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [formData, setFormData] = useState({
		salonId: '',
		serviceId: '',
		employeeId: '',
		clientName: '',
		clientPhone: '+998',
		date: format(new Date(), 'yyyy-MM-dd'),
		time: '',
		price: '',
	})

	useEffect(() => {
		if (salons.length > 0 && !formData.salonId) {
			setFormData(prev => ({ ...prev, salonId: salons[0]._id }))
		}
	}, [salons])

	// Dynamic form lists
	const branchServices = services.filter(
		s => s.salonId === formData.salonId && s.isActive,
	)
	const [branchEmployees, setBranchEmployees] = useState([])

	useEffect(() => {
		if (formData.salonId) {
			api.get(`/salons/${formData.salonId}/employees`).then(res => {
				setBranchEmployees(res.data)
			})
		} else {
			setBranchEmployees([])
		}
	}, [formData.salonId])

	// Auto-fill price
	useEffect(() => {
		if (formData.serviceId) {
			const s = services.find(x => x._id === formData.serviceId)
			if (s) setFormData(prev => ({ ...prev, price: s.price.toString() }))
		}
	}, [formData.serviceId])

	// Filterings
	const filteredBookings = bookings.filter(b => {
		// Filter by Date
		const bDate = new Date(b.date)
		const passesDate = isSameDay(bDate, activeDate)

		// Filter by Employee
		let passesEmployee = true
		if (selectedEmployees.length > 0) {
			passesEmployee = selectedEmployees.includes(b.employeeId?._id)
		}

		return passesDate && passesEmployee
	})

	const statusConfig = {
		pending: {
			label: 'Kutilmoqda',
			color: 'text-amber-600 bg-amber-50 border-amber-100',
		},
		confirmed: {
			label: 'Tasdiqlangan',
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
		return (
			parseInt(price || 0)
				.toLocaleString('en-US')
				.replace(/,/g, ' ') + ' UZS'
		)
	}

	const handleAddSubmit = async e => {
		e.preventDefault()
		if (
			!formData.salonId ||
			!formData.serviceId ||
			!formData.employeeId ||
			!formData.time
		) {
			toast.error('Iltimos barcha maydonlarni to`ldiring')
			return
		}

		try {
			setIsSubmitting(true)
			await api.post('/bookings', {
				salonId: formData.salonId,
				serviceId: formData.serviceId,
				employeeId: formData.employeeId,
				date: formData.date,
				time: formData.time,
				totalPrice: Number(formData.price),
				guestName: formData.clientName,
				guestPhone: formData.clientPhone,
			})

			// Refresh bookings using SWR mutation
			await mutateBookings()
			setIsAddModalOpen(false)

			setFormData(prev => ({
				...prev,
				clientName: '',
				clientPhone: '+998',
				time: '',
			}))
			toast.success("Yozuv muvaffaqiyatli qo'shildi")
		} catch (error) {
			toast.error(error.response?.data?.message || 'Xatolik yuz berdi')
		} finally {
			setIsSubmitting(false)
		}
	}

	const updateStatus = async (id, newStatus) => {
		try {
			// Optimistic UI update
			const updatedBookings = bookings.map(b =>
				b._id === id ? { ...b, status: newStatus } : b,
			)
			mutateBookings(updatedBookings, false) // Revalidate is false to hold optimistic status instantly
			await api.patch(`/bookings/${id}/status`, { status: newStatus })
			mutateBookings() // Sync with server
			toast.success('Status yangilandi')
		} catch (error) {
			toast.error('Status yangilashda xatolik yuz berdi')
		}
	}

	// Calendar Generation
	const generateCalendarDays = () => {
		const startDate = startOfWeek(calendarMonth, { weekStartsOn: 1 }) // Monday
		const days = []
		for (let i = 0; i < 42; i++) {
			days.push(addDays(startDate, i))
		}
		return days
	}

	const calendarDays = generateCalendarDays()

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
							onClick={() => {
								setActiveDate(new Date())
								setCalendarMonth(new Date())
							}}
						>
							Bugun, {format(new Date(), 'dd MMM', { locale: uz })}
						</Button>
						<Button
							onClick={() => setIsAddModalOpen(true)}
							className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl flex-1 md:flex-none'
						>
							<Plus className='h-4 w-4 mr-2' /> Yangi
						</Button>
					</div>
				</div>

				{isLoading ? (
					<div className='flex flex-col lg:flex-row gap-6 mt-6'>
						<div className='w-full lg:w-72 flex-shrink-0 space-y-6'>
							<Skeleton className='h-80 w-full rounded-2xl' />
							<Skeleton className='h-40 w-full rounded-2xl' />
						</div>
						<div className='flex-1 space-y-4'>
							<Skeleton className='h-6 w-48 mb-4' />
							<div className='flex flex-col gap-3'>
								{[...Array(4)].map((_, i) => (
									<Skeleton key={i} className='h-24 w-full rounded-2xl' />
								))}
							</div>
						</div>
					</div>
				) : (
					<div className='flex flex-col lg:flex-row gap-6'>
						{/* Sidebar Controls */}
						<div className='w-full lg:w-72 flex-shrink-0 space-y-6'>
							{/* Calendar */}
							<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
								<CardContent className='p-5'>
									<div className='flex justify-between items-center mb-4 text-zinc-900'>
										<h3 className='font-semibold capitalize'>
											{format(calendarMonth, 'MMMM yyyy', { locale: uz })}
										</h3>
										<div className='flex gap-1'>
											<button
												onClick={() =>
													setCalendarMonth(subMonths(calendarMonth, 1))
												}
												className='h-8 w-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500'
											>
												<ChevronLeft className='w-4 h-4' />
											</button>
											<button
												onClick={() =>
													setCalendarMonth(addMonths(calendarMonth, 1))
												}
												className='h-8 w-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500'
											>
												<ChevronRight className='w-4 h-4' />
											</button>
										</div>
									</div>

									<div className='grid grid-cols-7 gap-1 text-center mb-2'>
										{['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'].map((d, i) => (
											<div
												key={i}
												className='text-xs font-medium text-zinc-400 py-1'
											>
												{d}
											</div>
										))}
									</div>
									<div className='grid grid-cols-7 gap-1 text-center'>
										{calendarDays.map((date, i) => {
											const isCurrentMonth = isSameMonth(date, calendarMonth)
											const isSelected = isSameDay(date, activeDate)
											const isToday = isSameDay(date, new Date())

											// Check if there's any booking on this day
											const hasBookings = bookings.some(b =>
												isSameDay(new Date(b.date), date),
											)

											return (
												<div
													key={i}
													onClick={() => setActiveDate(date)}
													className={`h-8 w-8 mx-auto rounded-lg flex items-center justify-center text-sm relative cursor-pointer transition-colors
														${!isCurrentMonth ? 'text-zinc-300' : 'text-zinc-700 font-medium'}
														${isSelected ? 'bg-zinc-900 text-white shadow-sm ring-2 ring-zinc-900/20 ring-offset-1 font-bold' : 'hover:bg-zinc-100'}
														${isToday && !isSelected ? 'border border-zinc-200 bg-zinc-50/50' : ''}
													`}
												>
													{format(date, 'd')}
													{hasBookings && !isSelected && (
														<div className='absolute bottom-1 w-1 h-1 bg-red-400 rounded-full'></div>
													)}
												</div>
											)
										})}
									</div>
								</CardContent>
							</Card>

							{/* Master Filters */}
							<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
								<CardContent className='p-5'>
									<h3 className='font-semibold text-zinc-900 flex items-center gap-2 mb-4'>
										<Filter className='h-4 w-4 text-zinc-500' /> Ustalar
										bo'yicha
									</h3>
									<div className='space-y-2 max-h-60 overflow-y-auto pr-2'>
										<label className='flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 cursor-pointer'>
											<input
												type='checkbox'
												className='rounded text-zinc-900 w-4 h-4 accent-zinc-900'
												checked={selectedEmployees.length === 0}
												onChange={() => setSelectedEmployees([])}
											/>
											<span className='text-sm font-medium text-zinc-700'>
												Barchasi
											</span>
										</label>
										{employees.map(emp => (
											<label
												key={emp._id}
												className='flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 cursor-pointer'
											>
												<input
													type='checkbox'
													className='rounded text-zinc-900 w-4 h-4 accent-zinc-900'
													checked={selectedEmployees.includes(emp._id)}
													onChange={e => {
														if (e.target.checked) {
															setSelectedEmployees([
																...selectedEmployees,
																emp._id,
															])
														} else {
															setSelectedEmployees(
																selectedEmployees.filter(id => id !== emp._id),
															)
														}
													}}
												/>
												<span className='text-sm text-zinc-600 truncate'>
													{emp.name}
												</span>
											</label>
										))}
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Bookings List */}
						<div className='flex-1 space-y-4'>
							<h3 className='font-bold text-zinc-900 text-lg flex items-center gap-2'>
								<CalendarIcon className='w-5 h-5 text-zinc-500' />
								{format(activeDate, 'd MMMM yyyy, eeee', { locale: uz })}
							</h3>

							<div className='flex flex-col gap-3'>
								{filteredBookings.map(booking => (
									<Card
										key={booking._id}
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
													<div className='flex items-center gap-3 w-48'>
														<div className='h-10 w-10 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center font-bold text-zinc-500 flex-shrink-0'>
															{(
																booking.guestName ||
																booking.clientId?.name ||
																'M'
															)
																.charAt(0)
																.toUpperCase()}
														</div>
														<div>
															<h3 className='font-bold text-zinc-900 flex flex-wrap items-center gap-2 line-clamp-1'>
																{booking.guestName ? (
																	<span className='flex items-center gap-1'>
																		{booking.guestName}{' '}
																		<span className='text-[9px] bg-zinc-100 px-1 rounded text-zinc-500'>
																			Qo'lda
																		</span>
																	</span>
																) : booking.clientId?.name ? (
																	booking.clientId.name
																) : (
																	'Noma`lum'
																)}
															</h3>
															{booking.clientId?.about && (
																<p className='text-[10px] text-zinc-400 italic line-clamp-1'>
																	"{booking.clientId.about}"
																</p>
															)}
															<p className='text-sm text-zinc-500'>
																{booking.guestPhone || booking.clientId?.phone}
															</p>
														</div>
													</div>
												</div>

												{/* Service & Master */}
												<div className='flex-1 sm:text-right ml-16 sm:ml-0 border-l-2 border-zinc-100 pl-4 sm:border-l-0 sm:pl-0'>
													<div className='flex items-center sm:justify-end gap-2 mb-1'>
														<span
															className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${statusConfig[booking.status]?.color || ''}`}
														>
															{statusConfig[booking.status]?.label ||
																booking.status}
														</span>
													</div>
													<p className='font-semibold text-zinc-900 flex items-center sm:justify-end gap-1.5'>
														<Scissors className='h-3.5 w-3.5 text-zinc-400' />{' '}
														{booking.serviceId?.name || "O'chirilgan xizmat"}
													</p>
													<p className='text-sm text-zinc-500 mt-0.5 flex items-center sm:justify-end gap-1'>
														<MapPin className='w-3 h-3' />{' '}
														{booking.salonId?.name} •
														<span className='font-medium text-zinc-700 ml-1'>
															Usta: {booking.employeeId?.name || "Noma'lum"}
														</span>
													</p>
												</div>

												{/* Price & Actions */}
												<div className='flex items-center justify-between sm:justify-end gap-4 ml-16 sm:ml-0 mt-2 sm:mt-0'>
													<div className='text-right'>
														<p className='font-bold text-zinc-900 text-lg whitespace-nowrap'>
															{formatPrice(booking.totalPrice)}
														</p>
													</div>
													<div className='flex items-center gap-2'>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	variant='ghost'
																	size='icon'
																	className='h-8 w-8 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 rounded-lg'
																>
																	<MoreVertical className='h-4 w-4' />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent
																align='end'
																className='rounded-xl w-48'
															>
																{booking.status !== 'confirmed' && (
																	<DropdownMenuItem
																		onClick={() =>
																			updateStatus(booking._id, 'confirmed')
																		}
																		className='font-medium py-2 text-blue-600 cursor-pointer'
																	>
																		<CheckCircle2 className='w-4 h-4 mr-2' />{' '}
																		Tasdiqlash
																	</DropdownMenuItem>
																)}
																{booking.status !== 'completed' && (
																	<DropdownMenuItem
																		onClick={() =>
																			updateStatus(booking._id, 'completed')
																		}
																		className='font-medium py-2 text-emerald-600 cursor-pointer'
																	>
																		<CheckCircle2 className='w-4 h-4 mr-2' />{' '}
																		Bajarildi
																	</DropdownMenuItem>
																)}
																{booking.status !== 'cancelled' && (
																	<DropdownMenuItem
																		onClick={() =>
																			updateStatus(booking._id, 'cancelled')
																		}
																		className='font-medium py-2 text-red-600 cursor-pointer'
																	>
																		<XCircle className='w-4 h-4 mr-2' /> Bekor
																		qilish
																	</DropdownMenuItem>
																)}
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								))}

								{filteredBookings.length === 0 && (
									<div className='text-center py-20 bg-white rounded-2xl border-none shadow-sm'>
										<p className='text-zinc-500 font-medium'>
											Ushbu sanada mijozlar yo'q.
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Add Modal */}
			<Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
				<DialogContent className='sm:max-w-md bg-white rounded-2xl overflow-y-auto max-h-[90vh]'>
					<DialogHeader>
						<DialogTitle>Yangi Yozuv Qo'shish</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleAddSubmit} className='space-y-4 py-4'>
						<div className='space-y-2'>
							<Label>Filial</Label>
							<Select
								required
								value={formData.salonId}
								onValueChange={v =>
									setFormData({
										...formData,
										salonId: v,
										employeeId: '',
										serviceId: '',
									})
								}
							>
								<SelectTrigger className='rounded-xl h-11 border-zinc-200'>
									<SelectValue placeholder='Filialni tanlang' />
								</SelectTrigger>
								<SelectContent className='rounded-xl'>
									{salons.map(s => (
										<SelectItem key={s._id} value={s._id}>
											{s.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className='space-y-2'>
							<Label>Mijoz ism-sharif (Majburiy emas)</Label>
							<Input
								value={formData.clientName}
								onChange={e =>
									setFormData({ ...formData, clientName: e.target.value })
								}
								placeholder='Masalan: Sadriddin M.'
								className='rounded-xl h-11 border-zinc-200'
							/>
						</div>

						<div className='space-y-2'>
							<Label>Telefon raqami (Majburiy emas)</Label>
							<Input
								value={formData.clientPhone}
								onChange={e =>
									setFormData({ ...formData, clientPhone: e.target.value })
								}
								className='rounded-xl h-11 border-zinc-200 font-mono'
							/>
						</div>

						<div className='space-y-2'>
							<Label>Xizmat</Label>
							<Select
								required
								value={formData.serviceId}
								onValueChange={v => setFormData({ ...formData, serviceId: v })}
							>
								<SelectTrigger className='rounded-xl h-11 border-zinc-200'>
									<SelectValue placeholder='Xizmatni tanlang' />
								</SelectTrigger>
								<SelectContent className='rounded-xl'>
									{branchServices.map(s => (
										<SelectItem key={s._id} value={s._id}>
											{s.name} ({s.duration} daq - {formatPrice(s.price)})
										</SelectItem>
									))}
									{branchServices.length === 0 && (
										<SelectItem value='none' disabled>
											Xizmatlar yo'q
										</SelectItem>
									)}
								</SelectContent>
							</Select>
						</div>

						<div className='space-y-2'>
							<Label>Usta</Label>
							<Select
								required
								value={formData.employeeId}
								onValueChange={v => setFormData({ ...formData, employeeId: v })}
							>
								<SelectTrigger className='rounded-xl h-11 border-zinc-200'>
									<SelectValue placeholder='Ustani tanlang' />
								</SelectTrigger>
								<SelectContent className='rounded-xl'>
									{branchEmployees.map(e => (
										<SelectItem key={e._id} value={e._id}>
											{e.name}
										</SelectItem>
									))}
									{branchEmployees.length === 0 && (
										<SelectItem value='none' disabled>
											Xodimlar topilmadi
										</SelectItem>
									)}
								</SelectContent>
							</Select>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label>Sana</Label>
								<Input
									required
									type='date'
									value={formData.date}
									onChange={e =>
										setFormData({ ...formData, date: e.target.value })
									}
									className='rounded-xl h-11 border-zinc-200'
								/>
							</div>
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
						</div>

						<div className='space-y-2'>
							<Label>Umumiy Narx (UZS)</Label>
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

						<DialogFooter className='pt-4 sm:justify-end gap-2 text-right'>
							<Button
								type='button'
								variant='outline'
								onClick={() => setIsAddModalOpen(false)}
								className='rounded-xl h-11 w-full sm:w-auto'
								disabled={isSubmitting}
							>
								Bekor qilish
							</Button>
							<Button
								type='submit'
								disabled={isSubmitting}
								className='bg-zinc-900 text-white rounded-xl h-11 w-full sm:w-auto'
							>
								{isSubmitting ? (
									<Loader2 className='w-4 h-4 animate-spin' />
								) : (
									'Yozish'
								)}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</DashboardLayout>
	)
}
