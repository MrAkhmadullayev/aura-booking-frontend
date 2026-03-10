'use client'

import { Button } from '@/components/ui/button'
import api from '@/lib/api'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MapPin, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
	const [salons, setSalons] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchSalons = async () => {
			try {
				const res = await api.get('/salons')
				// Filter salons with images and limit to top 5 for the carousel
				const validSalons = res.data
					.filter(
						salon =>
							salon.coverImage || (salon.gallery && salon.gallery.length > 0),
					)
					.slice(0, 5)
				setSalons(validSalons)
			} catch (error) {
				console.error('Error fetching salons for Hero:', error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchSalons()
	}, [])

	useEffect(() => {
		if (salons.length <= 1) return
		const interval = setInterval(() => {
			setCurrentIndex(prev => (prev + 1) % salons.length)
		}, 5000) // Change image every 5 seconds
		return () => clearInterval(interval)
	}, [salons])

	const currentSalon = salons[currentIndex]
	return (
		<div className='relative pt-32 lg:pt-40 pb-20 overflow-hidden bg-zinc-50 selection:bg-stone-200'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10 lg:flex items-center gap-12'>
				{/* Text Content */}
				<div className='flex-1 text-center lg:text-left pt-10 lg:pt-0'>
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}
						className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 font-semibold text-xs tracking-wider uppercase mb-8 shadow-sm'
					>
						<Star className='w-4 h-4 text-yellow-500 fill-current' />
						<span>O'ZBEKISTONNING №1 GO'ZALLIK PLATFORMASI</span>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
						className='text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-zinc-900 tracking-tight leading-[1.05] mb-6'
					>
						Qidirishga vaqt sarflamang. <br className='hidden lg:block' />
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800 italic font-serif'>
							O'zingizga qulay joy va vaqtni toping.
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
						className='text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light'
					>
						Salonlar, Spa markazlar, Massaj xizmatlari va Barbershoplar endi
						bitta platformada. Uzoq chaqiruvlarsiz telefon orqali onlayn
						yoziling.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
						className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4'
					>
						<Button
							size='lg'
							className='w-full sm:w-auto rounded-full px-8 h-14 bg-zinc-900 text-white hover:bg-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-xl transition-all font-semibold text-base gap-2 group'
							asChild
						>
							<Link href='/salons'>
								Mijoz sifatida izlash{' '}
								<MapPin className='w-4 h-4 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform' />
							</Link>
						</Button>
						<Button
							size='lg'
							variant='outline'
							className='w-full sm:w-auto rounded-full px-8 h-14 border-zinc-200 text-zinc-900 hover:bg-zinc-100 transition-all font-medium text-base gap-2 group'
							asChild
						>
							<Link href='#b2b-features'>
								Biznes qo'shish{' '}
								<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
							</Link>
						</Button>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
						className='mt-8 pt-8 border-t border-zinc-200/60 max-w-lg mx-auto lg:mx-0'
					>
						<p className='text-sm text-zinc-500 mb-4 font-medium'>
							Siz nima izlayapsiz?
						</p>
						<div className='flex flex-wrap items-center justify-center lg:justify-start gap-2.5'>
							{[
								'Ayollar Saloni',
								'Barbershop',
								'SPA',
								'Manikur',
								'Kattalar va Bolalar massaji',
							].map(tag => (
								<Link
									key={tag}
									href={`/salons?category=${tag.toLowerCase()}`}
									className='px-4 py-1.5 rounded-full bg-white border border-zinc-200 text-sm text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 transition-colors shadow-sm'
								>
									{tag}
								</Link>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8, duration: 1 }}
						className='mt-12 flex items-center justify-center lg:justify-start gap-4 text-sm text-zinc-500 font-medium'
					>
						<div className='flex -space-x-3'>
							<div className='w-10 h-10 rounded-full border-2 border-white bg-zinc-200 relative overflow-hidden'>
								<Image
									src='/images/client.png'
									alt='user'
									fill
									className='object-cover'
								/>
							</div>
							<div className='w-10 h-10 rounded-full border-2 border-white bg-stone-300 relative overflow-hidden'>
								<Image
									src='/images/master.png'
									alt='user'
									fill
									className='object-cover'
								/>
							</div>
							<div className='w-10 h-10 rounded-full border-2 border-white bg-zinc-800 flex items-center justify-center text-white text-xs'>
								+2k
							</div>
						</div>
						<div>
							<span className='text-zinc-900 font-bold'>2,000+</span> mamnun
							mijozlar
						</div>
					</motion.div>
				</div>

				{/* Hero Image / Graphic Carousel */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
					animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
					transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
					className='flex-1 mt-16 lg:mt-0 relative hidden md:block'
				>
					<div className='relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-100/50 bg-zinc-200'>
						{!isLoading && salons.length > 0 ? (
							<AnimatePresence mode='wait'>
								<motion.div
									key={currentIndex}
									initial={{ opacity: 0, scale: 1.05 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.8, ease: 'easeInOut' }}
									className='absolute inset-0'
								>
									<Image
										src={
											currentSalon.coverImage ||
											currentSalon.gallery?.[0] ||
											'/images/hero.png'
										}
										alt={currentSalon.name}
										fill
										className='object-cover'
										priority
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent'></div>

									{/* Floating Info Card */}
									<motion.div
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.4, duration: 0.6 }}
										className='absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl flex items-center justify-between border border-white/20'
									>
										<div className='flex-1 pr-4'>
											<h3 className='font-bold text-zinc-900 text-lg line-clamp-1'>
												{currentSalon.name}
											</h3>
											<p className='text-sm text-zinc-500 font-medium flex items-center gap-1 mt-0.5 line-clamp-1'>
												<span className='capitalize'>{currentSalon.type}</span>{' '}
												• {currentSalon.address}
											</p>
										</div>
										<Link
											href={`/salons/${currentSalon._id}`}
											className='bg-zinc-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-zinc-800 hover:scale-105 transition-all shadow-md flex-shrink-0'
										>
											Tanlash
										</Link>
									</motion.div>
								</motion.div>
							</AnimatePresence>
						) : (
							<div className='absolute inset-0 flex items-center justify-center bg-zinc-100'>
								{isLoading ? (
									<div className='w-10 h-10 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin' />
								) : (
									<Image
										src='/images/hero.png'
										alt='Premium Salon Interior'
										fill
										className='object-cover'
										priority
									/>
								)}
							</div>
						)}
					</div>

					{/* Carousel Indicators */}
					{salons.length > 1 && (
						<div className='absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2'>
							{salons.map((_, idx) => (
								<button
									key={idx}
									onClick={() => setCurrentIndex(idx)}
									className={`transition-all duration-300 rounded-full ${
										idx === currentIndex
											? 'w-6 h-1.5 bg-zinc-900'
											: 'w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400'
									}`}
									aria-label={`Go to slide ${idx + 1}`}
								/>
							))}
						</div>
					)}
				</motion.div>
			</div>
		</div>
	)
}
