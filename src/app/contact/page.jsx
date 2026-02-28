'use client'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()
		setIsSubmitting(true)
		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false)
			setIsSuccess(true)
			// Reset form after 3 seconds
			setTimeout(() => setIsSuccess(false), 3000)
		}, 1500)
	}

	return (
		<div className='min-h-screen flex flex-col pt-20'>
			<Navbar />

			<main className='flex-1 bg-zinc-50/50'>
				{/* Hero Section */}
				<section className='bg-zinc-900 border-b border-zinc-800 text-white py-16 px-4'>
					<div className='max-w-7xl mx-auto space-y-4 text-center'>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6'>
							Biz bilan bog'lanish
						</h1>
						<p className='text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed'>
							Savollaringiz bormi yoki hamkorlik qilmoqchimisiz? Biz sizga
							yordam berishga doim tayyormiz.
						</p>
					</div>
				</section>

				<section className='py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
					<div className='grid lg:grid-cols-5 gap-12 lg:gap-8'>
						{/* Contact Info */}
						<div className='lg:col-span-2 space-y-8'>
							<div>
								<h2 className='text-3xl font-bold text-zinc-900 mb-2'>
									Aloqa ma'lumotlari
								</h2>
								<p className='text-zinc-500'>
									Qulay usulni tanlang va biz bilan darhol bog'laning
								</p>
							</div>

							<div className='space-y-6'>
								<Card className='border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden hover:border-zinc-300 transition-colors'>
									<CardContent className='p-6 flex items-start gap-4'>
										<div className='p-3 bg-indigo-50 text-indigo-600 rounded-xl flex-shrink-0'>
											<MapPin className='w-6 h-6' />
										</div>
										<div>
											<h3 className='font-semibold text-zinc-900 mb-1'>
												Manzilimiz
											</h3>
											<p className='text-zinc-600 leading-relaxed text-sm'>
												O'zbekiston, Toshkent shahar,
												<br />
												Yunusobod tumani, IT Park binosi,
												<br />
												40-ofis
											</p>
										</div>
									</CardContent>
								</Card>

								<Card className='border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden hover:border-zinc-300 transition-colors'>
									<CardContent className='p-6 flex items-start gap-4'>
										<div className='p-3 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0'>
											<Phone className='w-6 h-6' />
										</div>
										<div>
											<h3 className='font-semibold text-zinc-900 mb-1'>
												Telefon
											</h3>
											<p className='text-zinc-600 mb-0.5 text-sm'>
												Mijozlarni qo'llab-quvvatlash:
											</p>
											<a
												href='tel:+998712000000'
												className='text-zinc-900 font-medium hover:text-emerald-600 transition-colors text-lg'
											>
												+998 71 200-XX-XX
											</a>
										</div>
									</CardContent>
								</Card>

								<Card className='border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden hover:border-zinc-300 transition-colors'>
									<CardContent className='p-6 flex items-start gap-4'>
										<div className='p-3 bg-amber-50 text-amber-600 rounded-xl flex-shrink-0'>
											<Mail className='w-6 h-6' />
										</div>
										<div>
											<h3 className='font-semibold text-zinc-900 mb-1'>
												Elektron pochta
											</h3>
											<p className='text-zinc-600 mb-0.5 text-sm'>
												Umumiy savollar uchun:
											</p>
											<a
												href='mailto:hello@aurabooking.uz'
												className='text-zinc-900 font-medium hover:text-amber-600 transition-colors text-lg'
											>
												hello@aurabooking.uz
											</a>
										</div>
									</CardContent>
								</Card>

								<Card className='border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden hover:border-zinc-300 transition-colors'>
									<CardContent className='p-6 flex items-start gap-4'>
										<div className='p-3 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0'>
											<Clock className='w-6 h-6' />
										</div>
										<div>
											<h3 className='font-semibold text-zinc-900 mb-1'>
												Ish vaqti
											</h3>
											<p className='text-zinc-600 text-sm leading-relaxed'>
												Dushanba - Juma: 09:00 - 18:00
												<br />
												Shanba: 10:00 - 15:00
												<br />
												Yakshanba: Dam olish
											</p>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Contact Form */}
						<div className='lg:col-span-3'>
							<Card className='border-none shadow-xl shadow-zinc-200/40 rounded-3xl overflow-hidden bg-white h-full'>
								<CardContent className='p-8 md:p-12 h-full flex flex-col justify-center'>
									<div className='mb-8'>
										<h2 className='text-3xl font-bold text-zinc-900 mb-2'>
											Qabul bo'limiga xabar yozish
										</h2>
										<p className='text-zinc-500'>
											Iltimos, iloji boricha batafsil ma'lumot qoldiring.
											Mutaxassislarimiz tez orada siz bilan bog'lanishadi.
										</p>
									</div>

									<form onSubmit={handleSubmit} className='space-y-6'>
										<div className='grid md:grid-cols-2 gap-6'>
											<div className='space-y-2'>
												<label
													htmlFor='firstName'
													className='text-sm font-medium text-zinc-700'
												>
													Ismingiz
												</label>
												<Input
													id='firstName'
													required
													placeholder='Masalan: Sardor'
													className='h-12 rounded-xl bg-zinc-50/50 border-zinc-200 focus-visible:ring-zinc-900'
												/>
											</div>
											<div className='space-y-2'>
												<label
													htmlFor='lastName'
													className='text-sm font-medium text-zinc-700'
												>
													Familiyangiz
												</label>
												<Input
													id='lastName'
													required
													placeholder='Masalan: Tursunov'
													className='h-12 rounded-xl bg-zinc-50/50 border-zinc-200 focus-visible:ring-zinc-900'
												/>
											</div>
										</div>

										<div className='grid md:grid-cols-2 gap-6'>
											<div className='space-y-2'>
												<label
													htmlFor='email'
													className='text-sm font-medium text-zinc-700'
												>
													Elektron pochta (Email)
												</label>
												<Input
													id='email'
													type='email'
													required
													placeholder='sardor@example.com'
													className='h-12 rounded-xl bg-zinc-50/50 border-zinc-200 focus-visible:ring-zinc-900'
												/>
											</div>
											<div className='space-y-2'>
												<label
													htmlFor='phone'
													className='text-sm font-medium text-zinc-700'
												>
													Telefon raqam
												</label>
												<Input
													id='phone'
													type='tel'
													required
													placeholder='+998 90 123 45 67'
													className='h-12 rounded-xl bg-zinc-50/50 border-zinc-200 focus-visible:ring-zinc-900 font-mono'
												/>
											</div>
										</div>

										<div className='space-y-2'>
											<label
												htmlFor='subject'
												className='text-sm font-medium text-zinc-700'
											>
												Murojaat mavzusi
											</label>
											<Input
												id='subject'
												required
												placeholder='Hamkorlik, shikoyat yoki taklif'
												className='h-12 rounded-xl bg-zinc-50/50 border-zinc-200 focus-visible:ring-zinc-900'
											/>
										</div>

										<div className='space-y-2'>
											<label
												htmlFor='message'
												className='text-sm font-medium text-zinc-700'
											>
												Xabar matni
											</label>
											<Textarea
												id='message'
												required
												placeholder='Bu yerda batafsil yozishingiz qoldirishingiz mumkin...'
												className='min-h-[160px] rounded-xl bg-zinc-50/50 border-zinc-200 focus-visible:ring-zinc-900 resize-y p-4 text-base'
											/>
										</div>

										<Button
											type='submit'
											disabled={isSubmitting || isSuccess}
											className={`w-full h-14 rounded-xl text-lg font-medium transition-all ${
												isSuccess
													? 'bg-emerald-500 hover:bg-emerald-600'
													: 'bg-zinc-900 hover:bg-zinc-800'
											}`}
										>
											{isSubmitting ? (
												<div className='flex items-center gap-2'>
													<div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
													Yuborilmoqda...
												</div>
											) : isSuccess ? (
												<div className='flex items-center gap-2'>
													<CheckCircle2 className='w-5 h-5' />
													Muvaffaqiyatli yuborildi!
												</div>
											) : (
												<div className='flex items-center gap-2'>
													<Send className='w-5 h-5' />
													Xabarni Yuborish
												</div>
											)}
										</Button>

										<p className='text-sm text-zinc-500 text-center mt-6'>
											"Xabarni Yuborish" tugmasini bosish orqali siz Aura
											Bookingning{' '}
											<a
												href='/privacy'
												className='underline hover:text-zinc-900 transition-colors'
											>
												Maxfiylik Siyosati
											</a>{' '}
											doirasida ma'lumotlaringiz qayta ishlanishiga rozi
											bo'lasiz.
										</p>
									</form>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Map Placeholder or Actual Map iframe could go here later */}
				<section className='h-[400px] w-full bg-zinc-200 mt-12 relative overflow-hidden'>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d2994.4607739958348!2d69.28471927587747!3d41.36398997130283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8d184ebf5e71%3A0xc3f5a285d8dabd98!2sIT%20Park%20Uzbekistan!5e0!3m2!1sen!2s!4v1712952482386!5m2!1sen!2s'
						className='absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700'
						allowFullScreen=''
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					></iframe>
				</section>
			</main>

			<Footer />
		</div>
	)
}
