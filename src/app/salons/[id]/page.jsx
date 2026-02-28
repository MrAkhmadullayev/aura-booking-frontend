'use client'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { mockSalons } from '@/data/salons'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
	Calendar as CalendarIcon,
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	Info,
	Instagram,
	MapPin,
	Navigation,
	Phone,
	PlaySquare,
	Send,
	Share2,
	Star,
} from 'lucide-react'
import Image from 'next/image'
import { use, useState } from 'react'

const getSalonData = id => {
	return mockSalons.find(s => s.id === parseInt(id)) || mockSalons[0]
}

export default function SalonDetailPage({ params }) {
	const resolvedParams = use(params)
	const salon = getSalonData(resolvedParams.id)
	const [date, setDate] = useState(new Date())
	const [selectedTime, setSelectedTime] = useState(null)
	const [bookingStep, setBookingStep] = useState(1) // 1: Xizmat, 2: Kun & Vaqt
	const [isLoggedIn, setIsLoggedIn] = useState(false) // Fake auth state
	const [selectedService, setSelectedService] = useState(null)

	const timeSlots = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00']

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
										<p className='font-semibold text-zinc-900 text-lg'>
											{salon.workHours}
										</p>
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
										<div
											className={`h-1.5 w-6 rounded-full transition-colors ${bookingStep >= 1 ? 'bg-zinc-900' : 'bg-zinc-200'}`}
										></div>
										<div
											className={`h-1.5 w-6 rounded-full transition-colors ${bookingStep >= 2 ? 'bg-zinc-900' : 'bg-zinc-200'}`}
										></div>
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
										<div className='space-y-2 mb-8'>
											{salon.services.map((service, idx) => (
												<div
													key={idx}
													onClick={() => setSelectedService(service)}
													className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center group ${
														selectedService === service
															? 'border-zinc-900 bg-zinc-50'
															: 'border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50'
													}`}
												>
													<span
														className={`font-medium ${selectedService === service ? 'text-zinc-900' : 'text-zinc-700'}`}
													>
														{service}
													</span>
													{selectedService === service ? (
														<CheckCircle2 className='w-5 h-5 text-zinc-900' />
													) : (
														<div className='w-5 h-5 rounded-full border-2 border-zinc-200 group-hover:border-zinc-300'></div>
													)}
												</div>
											))}
										</div>

										<Button
											onClick={() => setBookingStep(2)}
											disabled={!selectedService}
											size='lg'
											className='w-full h-14 rounded-xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-all text-base gap-2'
										>
											Keyingi qadam <ChevronRight className='w-5 h-5' />
										</Button>
									</div>
								)}

								{/* Step 2: Date & Time */}
								{bookingStep === 2 && (
									<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
										<button
											onClick={() => setBookingStep(1)}
											className='mb-6 flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors'
										>
											<ChevronLeft className='w-4 h-4 mr-1' /> Orqaga
										</button>

										{/* Details Card Summary */}
										<div className='bg-zinc-50 p-4 rounded-xl mb-6 border border-zinc-100'>
											<p className='text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1'>
												Tanlangan xizmat
											</p>
											<p className='text-sm font-semibold text-zinc-900'>
												{selectedService}
											</p>
										</div>

										<h4 className='text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2'>
											<span className='flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 text-zinc-900 text-xs'>
												2
											</span>
											Kun va vaqt
										</h4>

										<div className='mb-6'>
											<Popover>
												<PopoverTrigger asChild>
													<Button
														variant={'outline'}
														className={cn(
															'w-full h-14 justify-start text-left font-medium rounded-xl border-zinc-200',
															!date && 'text-muted-foreground',
														)}
													>
														<CalendarIcon className='mr-2 h-5 w-5' />
														{date ? (
															format(date, 'PPP')
														) : (
															<span>Kunni tanlang</span>
														)}
													</Button>
												</PopoverTrigger>
												<PopoverContent
													className='w-auto p-0 rounded-2xl'
													align='start'
												>
													<Calendar
														mode='single'
														selected={date}
														onSelect={setDate}
														initialFocus
														className='rounded-xl border-none'
													/>
												</PopoverContent>
											</Popover>
										</div>

										<div className='mb-8'>
											<div className='grid grid-cols-3 gap-2'>
												{timeSlots.map(time => (
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
										</div>

										<div className='pt-2'>
											{!isLoggedIn ? (
												<Button
													size='lg'
													className='w-full h-14 rounded-xl bg-zinc-900 text-white font-medium shadow-md hover:bg-zinc-800 transition-all text-base'
												>
													Tizimga kirish
												</Button>
											) : (
												<Button
													disabled={!date || !selectedTime}
													size='lg'
													className='w-full h-14 rounded-xl bg-zinc-900 text-white font-medium shadow-md hover:bg-zinc-800 transition-all text-base'
												>
													Band qilish
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
									<iframe
										src={salon.location?.mapUrl}
										width='100%'
										height='100%'
										style={{ border: 0 }}
										allowFullScreen=''
										loading='lazy'
										referrerPolicy='no-referrer-when-downgrade'
										className='grayscale-[30%] group-hover:grayscale-0 transition-all duration-700'
									></iframe>

									<div className='absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20'>
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
