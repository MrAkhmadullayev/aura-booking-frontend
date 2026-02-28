'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
	return (
		<div className='relative pt-32 lg:pt-40 pb-20 overflow-hidden bg-zinc-50 selection:bg-stone-200'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10 lg:flex items-center gap-12'>
				{/* Text Content */}
				<div className='flex-1 text-center lg:text-left pt-10 lg:pt-0'>
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}
						className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-600 font-medium text-xs tracking-wide uppercase mb-8 shadow-sm'
					>
						<Star className='w-3.5 h-3.5 fill-current' />
						<span>Premium Go'zallik Platformasi</span>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
						className='text-5xl md:text-6xl lg:text-7xl font-semibold text-zinc-900 tracking-tight leading-[1.05] mb-6'
					>
						O'zingizga qulay <br className='hidden lg:block' />
						<span className='text-zinc-500 italic font-serif'>
							vaqt va uslubni
						</span>{' '}
						toping.
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
						className='text-lg text-zinc-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light'
					>
						Aura Booking yordamida eng yuqori reytingdagi salonlar va ustalarni
						kashf eting. O'z ishlari bilan ajralib turadigan mutaxassislarga
						onlayn navbatga yoziling.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
						className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4'
					>
						<Button
							size='lg'
							className='w-full sm:w-auto rounded-full px-8 h-14 bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-xl transition-all font-medium text-base gap-2 group'
							asChild
						>
							<Link href='/salons'>
								Salonlarni izlash{' '}
								<MapPin className='w-4 h-4 group-hover:scale-110 transition-transform' />
							</Link>
						</Button>
						<Button
							size='lg'
							variant='outline'
							className='w-full sm:w-auto rounded-full px-8 h-14 border-zinc-200 text-zinc-900 hover:bg-zinc-100 transition-all font-medium text-base gap-2 group'
							asChild
						>
							<Link href='#b2b-features'>
								Biznes uchun{' '}
								<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
							</Link>
						</Button>
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

				{/* Hero Image / Graphic */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
					animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
					transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
					className='flex-1 mt-16 lg:mt-0 relative hidden md:block'
				>
					<div className='relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-100/50'>
						<Image
							src='/images/hero.png'
							alt='Premium Salon Interior'
							fill
							className='object-cover'
							priority
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent'></div>

						{/* Floating Info Card */}
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 1, duration: 0.6 }}
							className='absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg flex items-center justify-between'
						>
							<div>
								<h3 className='font-semibold text-zinc-900'>Aura Premium</h3>
								<p className='text-sm text-zinc-500'>
									Toshkent, Yunusobod 📍 1.2 km
								</p>
							</div>
							<Link
								href='/salons/1'
								className='bg-zinc-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-zinc-800 transition-colors'
							>
								Bron qilish
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
