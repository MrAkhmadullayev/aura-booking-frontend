'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const categories = [
	{
		id: 1,
		name: 'Ayollar saloni',
		image: '/images/salon_category.jpg',
		desc: 'Soch turmaklash, makiyaj, vizaj',
	},
	{
		id: 2,
		name: 'Barbershop',
		image: '/images/barbershop_carousel.png',
		desc: 'Erkaklar soch qisqartirish, soqol tekislash',
	},
	{
		id: 3,
		name: 'SPA va Dam olish',
		image: '/images/spa_carousel.png',
		desc: 'Gidromassaj, sauna, tosh massaji',
	},
	{
		id: 4,
		name: 'Bolalar Massaji',
		image: '/images/baby_massage_carousel.png',
		desc: 'Chaqaloqlar va bolalar uchun shifobaxsh massaj',
	},
	{
		id: 5,
		name: 'Kattalar Massaji',
		image: '/images/adult_massage_carousel.png',
		desc: "Butun tana massaji, bo'yin massaji",
	},
	{
		id: 6,
		name: 'Kosmetologiya va Manikur',
		image: '/images/cosmetology_carousel.png',
		desc: 'Tirnoq dizayni, yuz parvarishi',
	},
]

export default function ServicesCarousel() {
	const [isHovered, setIsHovered] = useState(false)

	// We duplicate the categories array to create a seamless infinite loop effect
	const scrollingCategories = [...categories, ...categories, ...categories]

	return (
		<section className='py-24 bg-white overflow-hidden'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8 relative'>
				<div className='flex items-end justify-between mb-12'>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: '-50px' }}
						transition={{ duration: 0.6 }}
						className='max-w-xl'
					>
						<h2 className='text-3xl md:text-4xl font-semibold text-zinc-900 mb-4 tracking-tight'>
							Turli xil xizmatlardan{' '}
							<span className='italic font-serif text-zinc-500'>tanlang</span>
						</h2>
						<p className='text-zinc-600 leading-relaxed font-light'>
							Har bir ehtiyojingiz uchun mos mutaxassislarni va dam olish
							maskanlarini osongina toping.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: '-50px' }}
						transition={{ duration: 0.6 }}
						className='hidden md:block'
					>
						<Link
							href='/salons'
							className='inline-flex items-center gap-2 text-zinc-900 font-medium hover:text-zinc-600 transition-colors group'
						>
							Barchasini ko'rish
							<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
						</Link>
					</motion.div>
				</div>

				{/* Carousel container */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-50px' }}
					transition={{ duration: 0.8 }}
					className='-mx-6 lg:-mx-8 overflow-hidden relative'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{/* Gradient overlays to smooth the edges */}
					<div className='absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-30 pointer-events-none hidden md:block' />
					<div className='absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-30 pointer-events-none hidden md:block' />

					<div
						className={`flex gap-6 py-8 w-max ${
							isHovered
								? 'animate-infinite-scroll-paused'
								: 'animate-infinite-scroll'
						}`}
					>
						{scrollingCategories.map((category, idx) => (
							<div
								key={`${category.id}-${idx}`}
								className='relative flex-shrink-0 w-[280px] sm:w-[320px] aspect-[3/4] rounded-3xl overflow-hidden snap-start group'
							>
								{/* Placeholder for missing images to default to black bg if route fails */}
								<div className='absolute inset-0 bg-zinc-900/10 z-0' />

								<Image
									src={category.image}
									alt={category.name}
									fill
									sizes='(max-width: 768px) 100vw, 320px'
									className='object-cover transition-transform duration-700 group-hover:scale-105 z-0'
									onError={e => {
										e.target.style.display = 'none' // Basic fallback if image doesn't exist yet
									}}
								/>

								{/* Fallback pattern if image is missing */}
								<div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-[-1] bg-zinc-100' />

								{/* Gradient Overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10' />

								{/* Content */}
								<div className='absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
									<h3 className='text-xl font-semibold text-white mb-2'>
										{category.name}
									</h3>
									<p className='text-sm text-zinc-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100'>
										{category.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</motion.div>
			</div>

			{/* Custom style for infinite scroll animation */}
			<style
				dangerouslySetInnerHTML={{
					__html: `
				@keyframes infinite-scroll {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(calc(-33.333% - 8px)); /* Approximates one set of cards (1/3 of the duplicated total array + gap offset) */
					}
				}
				.animate-infinite-scroll {
					animation: infinite-scroll 45s linear infinite;
				}
				.animate-infinite-scroll-paused {
					animation: infinite-scroll 45s linear infinite;
					animation-play-state: paused;
				}
			`,
				}}
			/>
		</section>
	)
}
