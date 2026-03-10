'use client'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'
import { format } from 'date-fns'
import 'leaflet/dist/leaflet.css'
import {
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	Info,
	Instagram,
	Loader2,
	MapPin,
	MessageCircle,
	Navigation,
	Phone,
	PlaySquare,
	Send,
	Share2,
	Star,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

const MapContainer = dynamic(
	() => import('react-leaflet').then(mod => mod.MapContainer),
	{ ssr: false },
)
const TileLayer = dynamic(
	() => import('react-leaflet').then(mod => mod.TileLayer),
	{ ssr: false },
)
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
	ssr: false,
})

export default function SalonDetailPage({ params }) {
	const resolvedParams = use(params)
	const router = useRouter()
	const { user: session, isLoading: authLoading } = useAuth()

	const [salon, setSalon] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const [date, setDate] = useState(new Date())
	const [selectedTime, setSelectedTime] = useState(null)
	const [bookingStep, setBookingStep] = useState(1) // 1: Xizmat, 2: Xodim, 3: Kun, 4: Vaqt
	const [selectedService, setSelectedService] = useState(null)
	const [selectedEmployee, setSelectedEmployee] = useState(null)
	const [isBooking, setIsBooking] = useState(false)
	const [employees, setEmployees] = useState([])
	const [services, setServices] = useState([])

	const [availableTimes, setAvailableTimes] = useState([])
	const [isLoadingTimes, setIsLoadingTimes] = useState(false)

	useEffect(() => {
		const fetchSalon = async () => {
			try {
				const res = await api.get(`/salons/${resolvedParams.id}`)
				const formattedSalon = {
					...res.data,
					id: res.data._id,
					distance: '', // fallback
					services: res.data.services || ['Soch kesish', 'Soqol tekislash'], // fallback
					minPrice: '50000', // fallback
					rating: res.data.rating || 5.0,
					reviews: res.data.reviewCount || 12,
					image:
						res.data.coverImage ||
						'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80',
					about: res.data.about || "Kompaniya haqida ma'lumot...",
					workHours: Array.isArray(res.data.workHours)
						? res.data.workHours
						: '09:00 - 20:00',
					contacts: res.data.contacts || { phone: '+998' },
					gallery:
						res.data.gallery?.length > 0
							? res.data.gallery
							: [
									'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80',
									'https://images.unsplash.com/photo-1562322140-8baeececf3ce?auto=format&fit=crop&q=80',
								],
					comments: res.data.comments || [],
					location: res.data.location || {
						lat: 41.2995,
						lng: 69.2401,
					},
				}
				setSalon(formattedSalon)

				// Fetch Real Services and Employees for this Salon
				const [srvRes, empRes] = await Promise.all([
					api
						.get(`/services/salon/${res.data._id}`)
						.catch(() => ({ data: [] })),
					api
						.get(`/salons/${res.data._id}/employees`)
						.catch(() => ({ data: [] })),
				])
				setServices(srvRes.data)
				setEmployees(empRes.data)
			} catch (error) {
				console.error('Error fetching salon detail:', error)
			} finally {
				setIsLoading(false)
			}
		}
		if (resolvedParams.id) fetchSalon()
	}, [resolvedParams.id])

	// Fetch available times when Date and Employee are selected
	useEffect(() => {
		const fetchTimes = async () => {
			if (!selectedEmployee || !date || !salon?.id) return
			try {
				setIsLoadingTimes(true)
				const res = await api.post('/bookings/available', {
					salonId: salon.id,
					employeeId: selectedEmployee._id,
					date: format(date, 'yyyy-MM-dd'),
				})
				setAvailableTimes(res.data.availableTimes || [])
			} catch (error) {
				console.error('Error fetching available times', error)
				setAvailableTimes([])
			} finally {
				setIsLoadingTimes(false)
			}
		}

		if (bookingStep === 4) {
			fetchTimes()
		}
	}, [date, selectedEmployee, salon?.id, bookingStep])

	const handleBooking = async () => {
		if (!session) return router.push('/login')

		try {
			setIsBooking(true)
			const payload = {
				salonId: salon.id,
				serviceId: selectedService._id,
				employeeId: selectedEmployee._id,
				date: format(date, 'yyyy-MM-dd'),
				time: selectedTime,
				totalPrice: selectedService.price || 50000,
			}

			await api.post('/bookings', payload)
			alert('Muvaffaqiyatli band qilindi!')
			router.push('/client/bookings')
		} catch (error) {
			console.error('Error making booking', error)
			alert(
				error.response?.data?.message ||
					"Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.",
			)
		} finally {
			setIsBooking(false)
		}
	}

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-zinc-50'>
				<Loader2 className='w-12 h-12 animate-spin text-zinc-400' />
			</div>
		)
	}

	if (!salon) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-zinc-50 flex-col gap-4'>
				<h2 className='text-2xl font-bold'>Salon topilmadi</h2>
				<Link
					href='/salons'
					className='text-zinc-500 hover:text-zinc-900 underline'
				>
					Ortga qaytish
				</Link>
			</div>
		)
	}

	const isLoggedIn = !!session

	return (
		<div className='min-h-screen flex flex-col font-sans bg-zinc-50 selection:bg-zinc-200 selection:text-zinc-900'>
			<Navbar />

			{/* Hero Image Section */}
			<div className='pt-20 w-full'>
				<div className='relative h-[40vh] md:h-[50vh] w-full'>
					<Image
						src={salon.image}
						alt={salon.name}
						fill
						className='object-cover'
						priority
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent'></div>

					{/* Content over image */}
					<div className='absolute bottom-0 w-full'>
						<div className='max-w-7xl mx-auto px-6 lg:px-8 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6'>
							<div className='text-white'>
								<Badge className='bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-none mb-4'>
									{salon.type}
								</Badge>
								<h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-2'>
									{salon.name}
								</h1>
								<div className='flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-300'>
									<span className='flex items-center gap-1.5'>
										<Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
										<span className='text-white'>{salon.rating}</span> (
										{salon.reviews} sharh)
									</span>
									<span className='w-1 h-1 bg-zinc-500 rounded-full'></span>
									<span className='flex items-center gap-1.5'>
										<MapPin className='w-4 h-4' />
										{salon.address} ({salon.distance})
									</span>
								</div>
							</div>

							<div className='flex gap-3'>
								<Button
									variant='outline'
									className='bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md rounded-full px-6'
								>
									<Share2 className='w-4 h-4 mr-2' /> Ulashish
								</Button>
								<Button className='bg-white text-zinc-900 hover:bg-zinc-100 rounded-full px-6 font-semibold shadow-xl'>
									Lokatsiya <Navigation className='w-4 h-4 ml-2' />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content Areas */}
			<main className='flex-grow pb-24 -mt-4 relative z-10'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8'>
					<div className='flex flex-col lg:flex-row gap-10'>
						{/* Left Column: Details */}
						<div className='w-full lg:w-2/3 space-y-10 py-10'>
							{/* About Section */}
							<section>
								<h2 className='text-2xl font-semibold text-zinc-900 mb-4'>
									Salon haqida
								</h2>
								<p className='text-zinc-600 leading-relaxed text-lg'>
									{salon.about}
								</p>
							</section>

							{/* Info Cards */}
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<div className='bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm flex flex-col gap-4 relative overflow-hidden group'>
									<div className='absolute -right-6 -top-6 w-24 h-24 bg-zinc-50 rounded-full group-hover:scale-110 transition-transform duration-500'></div>
									<div className='p-3 bg-zinc-900 rounded-xl text-white w-max z-10'>
										<Info className='w-5 h-5' />
									</div>
									<div className='z-10'>
										<p className='text-sm text-zinc-500 font-medium mb-2 uppercase tracking-wider'>
											Ish vaqti
										</p>
										{Array.isArray(salon.workHours) ? (
											<div className='flex flex-col gap-1'>
												{salon.workHours
													.filter(wh => wh.isOpen)
													.slice(0, 3)
													.map((wh, idx) => (
														<p
															key={idx}
															className='font-semibold text-zinc-900 text-sm'
														>
															{wh.day}: {wh.open} - {wh.close}
														</p>
													))}
												{salon.workHours.filter(wh => wh.isOpen).length > 3 && (
													<p className='text-xs text-zinc-500'>
														Va boshqa kunlar...
													</p>
												)}
												{salon.workHours.filter(wh => wh.isOpen).length ===
													0 && (
													<p className='font-semibold text-zinc-900 text-sm'>
														Vaqt belgilanmagan
													</p>
												)}
											</div>
										) : (
											<p className='font-semibold text-zinc-900 text-lg'>
												{salon.workHours}
											</p>
										)}
										<div className='inline-flex items-center gap-1.5 mt-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold'>
											<span className='w-1.5 h-1.5 rounded-full bg-green-500'></span>{' '}
											{salon.status}
										</div>
									</div>
								</div>

								<div className='bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm flex flex-col gap-4 relative overflow-hidden group'>
									<div className='absolute -right-6 -top-6 w-24 h-24 bg-zinc-50 rounded-full group-hover:scale-110 transition-transform duration-500'></div>
									<div className='p-3 bg-zinc-900 rounded-xl text-white w-max z-10'>
										<Phone className='w-5 h-5' />
									</div>
									<div className='z-10'>
										<p className='text-sm text-zinc-500 font-medium mb-2 uppercase tracking-wider'>
											Aloqa
										</p>
										<p className='font-semibold text-zinc-900 text-lg'>
											{salon.contacts.phone}
										</p>
										<div className='flex gap-3 mt-3'>
											{salon.contacts.instagram && (
												<a
													href={salon.contacts.instagram}
													target='_blank'
													rel='noreferrer'
													className='text-zinc-400 hover:text-pink-600 transition-colors bg-zinc-50 p-2 rounded-lg'
												>
													<Instagram className='w-4 h-4' />
												</a>
											)}
											{salon.contacts.telegram && (
												<a
													href={salon.contacts.telegram}
													target='_blank'
													rel='noreferrer'
													className='text-zinc-400 hover:text-blue-500 transition-colors bg-zinc-50 p-2 rounded-lg'
												>
													<Send className='w-4 h-4' />
												</a>
											)}
											{salon.contacts.youtube && (
												<a
													href={salon.contacts.youtube}
													target='_blank'
													rel='noreferrer'
													className='text-zinc-400 hover:text-red-500 transition-colors bg-zinc-50 p-2 rounded-lg'
												>
													<PlaySquare className='w-4 h-4' />
												</a>
											)}
										</div>
									</div>
								</div>
							</div>

							{/* Gallery Section */}
							<section>
								<h2 className='text-2xl font-semibold text-zinc-900 mb-4'>
									Galereya
								</h2>
								<div className='flex gap-4 overflow-x-auto pb-4 snap-x'>
									{salon.gallery.map((img, idx) => (
										<div
											key={idx}
											className='relative w-64 h-64 flex-shrink-0 snap-start rounded-2xl overflow-hidden'
										>
											<Image
												src={img}
												alt='gallery'
												fill
												className='object-cover'
											/>
										</div>
									))}
								</div>
							</section>
						</div>

						{/* Right Column: Booking Widget */}
						<div className='w-full lg:w-1/3'>
							<div className='sticky top-28 bg-white p-6 md:p-8 rounded-[2rem] border border-zinc-100 shadow-xl lg:-mt-24 shadow-black/5 flex flex-col'>
								<div className='flex items-center justify-between mb-8'>
									<h3 className='text-2xl font-semibold text-zinc-900'>
										Onlayn yozilish
									</h3>
									<div className='flex gap-1'>
										{[1, 2, 3, 4].map(step => (
											<div
												key={step}
												className={`h-1.5 w-4 rounded-full transition-colors ${bookingStep >= step ? 'bg-zinc-900' : 'bg-zinc-200'}`}
											></div>
										))}
									</div>
								</div>

								{/* Step 1: Services */}
								{bookingStep === 1 && (
									<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
										<h4 className='text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2'>
											<span className='flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 text-zinc-900 text-xs'>
												1
											</span>
											Xizmat turini tanlang
										</h4>
										<div className='space-y-2 mb-8 max-h-[300px] overflow-y-auto px-1'>
											{services.length === 0 ? (
												<p className='text-zinc-500 text-sm text-center py-4'>
													Bu filialga xizmatlar qo'shilmagan
												</p>
											) : (
												services.map((service, idx) => (
													<div
														key={service._id}
														onClick={() => setSelectedService(service)}
														className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center group ${
															selectedService?._id === service._id
																? 'border-zinc-900 bg-zinc-50'
																: 'border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50'
														}`}
													>
														<div>
															<span
																className={`font-medium block ${selectedService?._id === service._id ? 'text-zinc-900' : 'text-zinc-700'}`}
															>
																{service.name}
															</span>
															<span className='text-xs text-zinc-500 mt-1'>
																{service.duration} •{' '}
																{service.price?.toLocaleString()} so'm
															</span>
														</div>
														{selectedService?._id === service._id ? (
															<CheckCircle2 className='w-5 h-5 text-zinc-900' />
														) : (
															<div className='w-5 h-5 rounded-full border-2 border-zinc-200 group-hover:border-zinc-300'></div>
														)}
													</div>
												))
											)}
										</div>

										<Button
											onClick={() => setBookingStep(2)}
											disabled={!selectedService}
											size='lg'
											className='w-full h-14 rounded-xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-all text-base gap-2'
										>
											Davom etish <ChevronRight className='w-5 h-5' />
										</Button>
									</div>
								)}

								{/* Step 2: Employee */}
								{bookingStep === 2 && (
									<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
										<button
											onClick={() => setBookingStep(1)}
											className='mb-6 flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors'
										>
											<ChevronLeft className='w-4 h-4 mr-1' /> Orqaga
										</button>

										<h4 className='text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2'>
											<span className='flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 text-zinc-900 text-xs'>
												2
											</span>
											Ustani tanlang
										</h4>
										<div className='space-y-2 mb-8 max-h-[300px] overflow-y-auto px-1'>
											{employees.length === 0 ? (
												<p className='text-zinc-500 text-sm text-center py-4'>
													Bu filialga ustalar qo'shilmagan
												</p>
											) : (
												employees.map(emp => (
													<div
														key={emp._id}
														onClick={() => setSelectedEmployee(emp)}
														className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center group ${
															selectedEmployee?._id === emp._id
																? 'border-zinc-900 bg-zinc-50'
																: 'border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50'
														}`}
													>
														<div className='flex items-center gap-3'>
															<div className='w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-zinc-700'>
																{emp.name.charAt(0)}
															</div>
															<div>
																<span
																	className={`font-medium block ${selectedEmployee?._id === emp._id ? 'text-zinc-900' : 'text-zinc-700'}`}
																>
																	{emp.name}
																</span>
																{emp.about && (
																	<span className='text-[10px] text-zinc-400 mt-0.5 max-w-[150px] line-clamp-1'>
																		{emp.about}
																	</span>
																)}
															</div>
														</div>
														{selectedEmployee?._id === emp._id ? (
															<CheckCircle2 className='w-5 h-5 text-zinc-900' />
														) : (
															<div className='w-5 h-5 rounded-full border-2 border-zinc-200 group-hover:border-zinc-300'></div>
														)}
													</div>
												))
											)}
										</div>

										<Button
											onClick={() => setBookingStep(3)}
											disabled={!selectedEmployee}
											size='lg'
											className='w-full h-14 rounded-xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-all text-base gap-2'
										>
											Davom etish <ChevronRight className='w-5 h-5' />
										</Button>
									</div>
								)}

								{/* Step 3: Date */}
								{bookingStep === 3 && (
									<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
										<button
											onClick={() => setBookingStep(2)}
											className='mb-6 flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors'
										>
											<ChevronLeft className='w-4 h-4 mr-1' /> Orqaga
										</button>

										<h4 className='text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2'>
											<span className='flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 text-zinc-900 text-xs'>
												3
											</span>
											Kunni tanlang
										</h4>

										<div className='mb-8 flex justify-center'>
											<Calendar
												mode='single'
												selected={date}
												onSelect={newDate => {
													if (newDate) setDate(newDate)
												}}
												initialFocus
												disabled={d =>
													d < new Date(new Date().setHours(0, 0, 0, 0))
												}
												className='rounded-xl border border-zinc-200 p-3'
											/>
										</div>

										<Button
											onClick={() => setBookingStep(4)}
											disabled={!date}
											size='lg'
											className='w-full h-14 rounded-xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-all text-base gap-2'
										>
											Davom etish <ChevronRight className='w-5 h-5' />
										</Button>
									</div>
								)}

								{/* Step 4: Time */}
								{bookingStep === 4 && (
									<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
										<button
											onClick={() => {
												setBookingStep(3)
												setSelectedTime(null)
											}}
											className='mb-6 flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors'
										>
											<ChevronLeft className='w-4 h-4 mr-1' /> Orqaga
										</button>

										{/* Details Card Summary */}
										<div className='bg-zinc-50 p-4 rounded-xl mb-6 border border-zinc-100'>
											<div className='flex justify-between items-center mb-2'>
												<span className='text-xs text-zinc-500 font-medium uppercase tracking-wider'>
													Xizmat
												</span>
												<span className='text-sm font-semibold text-zinc-900'>
													{selectedService?.name}
												</span>
											</div>
											<div className='flex justify-between items-center mb-2'>
												<span className='text-xs text-zinc-500 font-medium uppercase tracking-wider'>
													Usta
												</span>
												<span className='text-sm font-semibold text-zinc-900'>
													{selectedEmployee?.name}
												</span>
											</div>
											<div className='flex justify-between items-center'>
												<span className='text-xs text-zinc-500 font-medium uppercase tracking-wider'>
													Sana
												</span>
												<span className='text-sm font-semibold text-zinc-900'>
													{format(date, 'PPP')}
												</span>
											</div>
										</div>

										<h4 className='text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2'>
											<span className='flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 text-zinc-900 text-xs'>
												4
											</span>
											Bosh vaqtlar
										</h4>

										<div className='mb-8'>
											{isLoadingTimes ? (
												<div className='flex justify-center py-8'>
													<Loader2 className='w-8 h-8 animate-spin text-zinc-400' />
												</div>
											) : availableTimes.length === 0 ? (
												<div className='text-center py-6 border-2 border-dashed border-zinc-200 rounded-xl'>
													<p className='text-sm text-zinc-500 font-medium'>
														Bu kunga bo'sh vaqtlar qolmagan
													</p>
													<p className='text-xs text-zinc-400 mt-1'>
														Boshqa kunni tanlab ko'ring
													</p>
												</div>
											) : (
												<div className='grid grid-cols-3 gap-3'>
													{availableTimes.map(time => (
														<Button
															key={time}
															variant={
																selectedTime === time ? 'default' : 'outline'
															}
															onClick={() => setSelectedTime(time)}
															className={`h-12 rounded-xl text-sm font-medium transition-all ${
																selectedTime === time
																	? 'bg-zinc-900 text-white shadow-md'
																	: 'text-zinc-700 bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300'
															}`}
														>
															{time}
														</Button>
													))}
												</div>
											)}
										</div>

										<div className='pt-2'>
											{!isLoggedIn ? (
												<Button
													onClick={() => router.push('/login')}
													size='lg'
													className='w-full h-14 rounded-xl bg-zinc-900 text-white font-medium shadow-md hover:bg-zinc-800 transition-all text-base'
												>
													Tizimga kirish
												</Button>
											) : (
												<Button
													onClick={handleBooking}
													disabled={!date || !selectedTime || isBooking}
													size='lg'
													className='w-full h-14 rounded-xl bg-zinc-900 text-white font-medium shadow-md hover:bg-zinc-800 transition-all text-base'
												>
													{isBooking ? (
														<Loader2 className='w-5 h-5 animate-spin' />
													) : (
														'Band qilish'
													)}
												</Button>
											)}
											<p className='text-center text-xs text-zinc-400 mt-4 font-medium'>
												{isLoggedIn
													? "To'lov salonning o'zida mijoz tomonidan amalga oshiriladi."
													: 'Band qilish uchun tizimga kirish talab etiladi.'}
											</p>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Bottom Section: Map & Comments */}
					<div className='mt-20 pt-16 border-t border-zinc-100 max-w-7xl mx-auto pb-8'>
						<div className='flex flex-col lg:flex-row gap-16'>
							{/* Reviews Section */}
							<div className='flex-1 w-full lg:w-1/2'>
								<div className='flex items-center justify-between mb-8'>
									<h2 className='text-3xl font-semibold text-zinc-900 tracking-tight flex items-center gap-3'>
										Mijozlar sharhlari
										<Badge
											variant='secondary'
											className='bg-zinc-100 text-zinc-900 font-bold px-3 py-1 rounded-full text-lg'
										>
											{salon.comments?.length || 0}
										</Badge>
									</h2>
								</div>

								{salon.comments?.length > 0 ? (
									<div className='space-y-6'>
										{salon.comments.map(comment => (
											<div
												key={comment.id}
												className='p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm'
											>
												<div className='flex items-center justify-between mb-4'>
													<div className='flex items-center gap-3'>
														<div className='w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-600'>
															{comment.author.charAt(0)}
														</div>
														<div>
															<p className='font-semibold text-zinc-900'>
																{comment.author}
															</p>
															<p className='text-xs text-zinc-400 font-medium'>
																{comment.date}
															</p>
														</div>
													</div>
													<div className='flex gap-1'>
														{[...Array(5)].map((_, i) => (
															<Star
																key={i}
																className={`w-4 h-4 ${i < comment.rating ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-200 fill-zinc-200'}`}
															/>
														))}
													</div>
												</div>
												<p className='text-zinc-600 leading-relaxed text-sm md:text-base'>
													"{comment.text}"
												</p>
											</div>
										))}
									</div>
								) : (
									<div className='p-12 border-2 border-dashed border-zinc-200 rounded-[2rem] flex flex-col items-center justify-center text-center'>
										<MessageCircle className='w-12 h-12 text-zinc-300 mb-4' />
										<p className='text-zinc-500 font-medium'>
											Hozircha sharhlar yo'q
										</p>
										<p className='text-zinc-400 text-sm mt-1'>
											Birinchi bo'lib fikr bildiring!
										</p>
									</div>
								)}
							</div>

							{/* Map Section */}
							<div className='flex-1 w-full lg:w-1/2'>
								<h2 className='text-3xl font-semibold text-zinc-900 tracking-tight mb-8'>
									Joylashuv
								</h2>
								<div className='w-full h-[400px] md:h-[500px] bg-zinc-100 rounded-[2rem] overflow-hidden border border-zinc-200 relative group shadow-sm'>
									{typeof window !== 'undefined' &&
									salon.location?.lat &&
									salon.location?.lng ? (
										<div className='w-full h-full grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 relative z-0'>
											<MapContainer
												center={[salon.location.lat, salon.location.lng]}
												zoom={14}
												style={{ height: '100%', width: '100%' }}
											>
												<TileLayer
													attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
													url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
												/>
												<Marker
													position={[salon.location.lat, salon.location.lng]}
												/>
											</MapContainer>
										</div>
									) : (
										<div className='w-full h-full flex flex-col items-center justify-center text-zinc-400'>
											<MapPin className='w-10 h-10 mb-2' />
											<p>Joylashuv belgilanmagan</p>
										</div>
									)}

									<div className='absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20 z-10'>
										<div className='p-3 bg-zinc-900 rounded-xl text-white'>
											<MapPin className='w-5 h-5' />
										</div>
										<div>
											<p className='text-sm text-zinc-500 font-medium uppercase tracking-wider mb-0.5'>
												Aniq manzil
											</p>
											<p className='font-semibold text-zinc-900 capitalize leading-snug'>
												{salon.address}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	)
}
