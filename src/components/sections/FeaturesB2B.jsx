'use client'

import { motion } from 'framer-motion'
import { CalendarDays, TrendingUp, Users, Wallet } from 'lucide-react'
import Image from 'next/image'

const features = [
	{
		icon: <CalendarDays className='w-5 h-5 text-white' />,
		title: 'Elektron Kalendar',
		description:
			"Ustalar va mijozlar vaqtini daftar o'rniga telefonda boshqaring. Hech kimning vaqti ustma-ust tushib qolmaydi.",
		delay: 0.1,
	},
	{
		icon: <Wallet className='w-5 h-5 text-white' />,
		title: 'Pullar Hisob-kitobi',
		description:
			"Kunning oxirida qancha pul tushdi va qancha harajat ketganini tizim o'zi aniq hisoblab ko'rsatib turadi.",
		delay: 0.2,
	},
	{
		icon: <TrendingUp className='w-5 h-5 text-white' />,
		title: 'Ishchilar Nazorati',
		description:
			'Qaysi ishchingiz bugun qancha ishladi, necha pul topdi - barchasini uydan chiqmasdan kuzating.',
		delay: 0.3,
	},
	{
		icon: <Users className='w-5 h-5 text-white' />,
		title: 'Yangi Mijozlar oqimi',
		description:
			"Ilova orqali minglab odamlar sizni ko'radi. Reklama qilmasdan ham doimiy yangi mijozlarga ega bo'ling.",
		delay: 0.4,
	},
]

export default function FeaturesB2B() {
	return (
		<section
			id='b2b-features'
			className='py-24 bg-zinc-900 text-zinc-50 relative overflow-hidden'
		>
			<div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
				<div className='grid lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row'>
					{/* Left: Text Content & Cards (Dark Mode style) */}
					<div className='flex flex-col justify-center order-2 lg:order-1'>
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: '-100px' }}
							transition={{ duration: 0.6 }}
						>
							<h2 className='text-sm font-semibold tracking-wider text-zinc-400 uppercase mb-3 text-left'>
								Biznes egalari uchun
							</h2>
							<h3 className='text-4xl md:text-5xl font-semibold mb-6 leading-[1.1] tracking-tight'>
								Biznesingizni <br />
								<span className='text-zinc-500 italic font-serif'>
									telefonda{' '}
								</span>
								boshqaring.
							</h3>
							<p className='text-lg text-zinc-400 mb-10 leading-relaxed font-light'>
								Aura loyihasi biznesingizga qanday yordam beradi? Tizim nafaqat
								yangi mijozlar olib keladi, balki biznesingizdagi{' '}
								<strong>pul aylanmasi</strong>, navbatlar ro'yxati va doimiy{' '}
								<strong>hisob-kitoblarni</strong> avtomatlashtiradi.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
							{features.map((feature, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-50px' }}
									transition={{ duration: 0.5, delay: feature.delay }}
								>
									<div className='flex flex-col gap-4'>
										<div className='w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center'>
											{feature.icon}
										</div>
										<div>
											<h4 className='font-semibold text-lg mb-2 text-zinc-100'>
												{feature.title}
											</h4>
											<p className='text-zinc-400 text-sm leading-relaxed'>
												{feature.description}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>

					{/* Right: Premium Image */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='relative order-1 lg:order-2'
					>
						<div className='relative aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-800/50 shadow-2xl'>
							<Image
								src='/images/master.png'
								alt='Professional Hair Stylist working'
								fill
								className='object-cover opacity-90 hover:opacity-100 transition-opacity'
							/>

							{/* CRM UI Mockup floating overlay */}
							<div className='absolute -bottom-6 -left-6 lg:-left-10 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-2xl w-72 lg:w-80 transform lg:rotate-[-5deg]'>
								<div className='flex items-center justify-between mb-4'>
									<span className='text-xs font-semibold uppercase tracking-wider text-zinc-400'>
										Bugungi Tushum
									</span>
									<TrendingUp className='w-4 h-4 text-emerald-400' />
								</div>
								<div className='text-3xl font-bold font-mono text-zinc-50 mb-1'>
									3,500,000
									<span className='text-sm text-emerald-400 ml-1'>+14%</span>
								</div>
								<div className='text-sm text-zinc-500 mb-4'>UzA</div>
								<div className='space-y-3'>
									<div className='h-2 w-full bg-zinc-800 rounded-full overflow-hidden'>
										<div className='h-full bg-zinc-100 w-3/4'></div>
									</div>
									<div className='h-2 w-full bg-zinc-800 rounded-full overflow-hidden'>
										<div className='h-full bg-zinc-400 w-1/2'></div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
