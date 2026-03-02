'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
	{
		id: 1,
		content:
			"Aura Booking'ga ulangach, mijozlarimiz soni 40% ga oshdi. Endi administratorlarga ehtiyoj qolmadi, hamma narsa avtomatik!",
		author: 'Malika Karimova',
		role: "'Beauty Lab' saloni rahbari",
		rating: 5,
		image: '/images/master.png',
	},
	{
		id: 2,
		content:
			"Juda qulay ilova! Ilgari usta topish uchun soatlab vaqt ketkazardim, hozir 2 ta klik orqali o'zimga yoqqan salonni band qilyapman.",
		author: 'Sardor Rustamov',
		role: 'Daimiy mijoz',
		rating: 5,
		image: '/images/client.png',
	},
	{
		id: 3,
		content:
			"Moliyaviy hisobotlar bo'limi biznesimni nazorat qilishimda juda katta yordam beryapti. Daromad va xarajatlar kaftdek oydin.",
		author: 'Dilshod Rahmatov',
		role: "'Gentlemen' barbershop egasi",
		rating: 5,
		image: '/images/master.png',
	},
]

export default function Testimonials() {
	return (
		<section className='py-24 bg-zinc-950 relative overflow-hidden'>
			{/* Decorative background blur */}
			<div className='absolute top-0 right-0 w-[500px] h-[500px] bg-zinc-800/30 rounded-full blur-[120px] pointer-events-none' />
			<div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-zinc-900/40 rounded-full blur-[100px] pointer-events-none' />

			<div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
					className='text-center max-w-2xl mx-auto mb-16'
				>
					<h2 className='text-sm font-semibold tracking-wider text-zinc-400 uppercase mb-3'>
						Ishonch va Natija
					</h2>
					<h3 className='text-3xl md:text-5xl font-semibold text-white tracking-tight'>
						Foydalanuvchilar fikri
					</h3>
				</motion.div>

				<div className='grid md:grid-cols-3 gap-8'>
					{testimonials.map((item, idx) => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-50px' }}
							transition={{ duration: 0.5, delay: idx * 0.15 }}
							className='bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 hover:bg-zinc-900 transition-colors duration-300'
						>
							<div className='flex items-center gap-1 mb-6'>
								{[...Array(item.rating)].map((_, i) => (
									<Star
										key={i}
										className='w-4 h-4 text-emerald-400 fill-emerald-400'
									/>
								))}
							</div>
							<p className='text-zinc-300 leading-relaxed mb-8 italic font-light'>
								"{item.content}"
							</p>
							<div className='flex items-center gap-4'>
								<div className='w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-800 relative bg-zinc-800'>
									<Image
										src={item.image}
										alt={item.author}
										fill
										className='object-cover'
									/>
								</div>
								<div>
									<h4 className='font-medium text-white'>{item.author}</h4>
									<p className='text-sm text-zinc-500'>{item.role}</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
