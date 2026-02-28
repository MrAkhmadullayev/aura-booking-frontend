'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { CalendarCheck, Map, Search, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

const features = [
	{
		icon: <Search className='w-5 h-5 text-zinc-900' />,
		title: 'Oson qidiruv',
		description:
			"Xizmat turi va ustalar reytingi bo'yicha filterlar yordamida tezkor tanlov qiling.",
		delay: 0.1,
	},
	{
		icon: <Map className='w-5 h-5 text-zinc-900' />,
		title: 'GPS Lokatsiya',
		description:
			"Geolokatsiya orqali o'zingizga eng yaqin (📍 500m) bo'sh ustalarni va salonlarni ko'ring.",
		delay: 0.2,
	},
	{
		icon: <CalendarCheck className='w-5 h-5 text-zinc-900' />,
		title: 'Onlayn Band qilish',
		description:
			"Qo'ng'iroqlarsiz, to'g'ridan-to'g'ri ilova orqali real vaqtda o'zingizga qulay soatni tanlang.",
		delay: 0.3,
	},
	{
		icon: <ShieldCheck className='w-5 h-5 text-zinc-900' />,
		title: 'Video isbot va Reyting',
		description:
			'Instagram Reels va YouTube orqali usta ishlari bilan real tanishing. Faqat rost izohlar.',
		delay: 0.4,
	},
]

export default function FeaturesB2C() {
	return (
		<section id='b2c-features' className='py-24 bg-white relative'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				<div className='grid lg:grid-cols-2 gap-16 items-center'>
					{/* Left: Premium Image */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.7, ease: 'easeOut' }}
						className='relative aspect-[3/4] lg:aspect-square rounded-[2rem] overflow-hidden bg-zinc-100'
					>
						<Image
							src='/images/client.png'
							alt='Happy beautiful client'
							fill
							className='object-cover'
						/>
						{/* Decorative badge */}
						<div className='absolute top-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl text-center'>
							<span className='block text-2xl font-bold text-zinc-900'>
								4.9
							</span>
							<div className='flex text-yellow-500 mt-1 mb-1'>
								{[...Array(5)].map((_, i) => (
									<Star key={i} className='w-4 h-4 fill-current' />
								))}
							</div>
							<span className='text-xs text-zinc-500 font-medium'>
								O'rtacha reyting
							</span>
						</div>
					</motion.div>

					{/* Right: Content & Cards */}
					<div className='flex flex-col justify-center'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-100px' }}
							transition={{ duration: 0.6 }}
						>
							<h2 className='text-sm font-semibold tracking-wider text-zinc-500 uppercase mb-3'>
								Mijozlar uchun
							</h2>
							<h3 className='text-4xl md:text-5xl font-semibold text-zinc-900 mb-6 tracking-tight'>
								Vaqtingizni qadrlang.
								<br />
								<span className='text-zinc-400 italic font-serif'>
									Go'zallik orzuingiz
								</span>{' '}
								qo'l ostingizda.
							</h3>
							<p className='text-lg text-zinc-600 mb-10 leading-relaxed font-light'>
								Aura Booking sizga o'z ismining ustalarini topish va uzoq
								navbatlarsiz, elektron formatda ro'yxatdan o'tish imkonini
								beradi.
							</p>
						</motion.div>

						<div className='grid sm:grid-cols-2 gap-5'>
							{features.map((feature, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-50px' }}
									transition={{ duration: 0.5, delay: feature.delay }}
								>
									<Card className='border-zinc-100 shadow-sm hover:shadow-md transition-shadow group h-full'>
										<CardContent className='p-6'>
											<div className='w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center mb-4 text-zinc-900 group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300'>
												{feature.icon}
											</div>
											<h4 className='text-lg font-semibold text-zinc-900 mb-2'>
												{feature.title}
											</h4>
											<p className='text-zinc-500 text-sm leading-relaxed'>
												{feature.description}
											</p>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

// Temporary Star icon since it wasn't imported from lucide-react initially
function Star(props) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
		</svg>
	)
}
