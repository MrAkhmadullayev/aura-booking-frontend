'use client'

import { motion } from 'framer-motion'
import { Award, Briefcase, CalendarCheck, Users } from 'lucide-react'

const stats = [
	{
		id: 1,
		name: 'Faol Foydalanuvchilar',
		value: '25,000+',
		icon: Users,
		description: 'Har oy Aura orqali xizmat izlaydi',
	},
	{
		id: 2,
		name: 'Muvaffaqiyatli Band Qilishlar',
		value: '100,000+',
		icon: CalendarCheck,
		description: 'Vaqtni qadrlaydigan insonlar tanlovi',
	},
	{
		id: 3,
		name: 'Usta va Salonlar',
		value: '1,500+',
		icon: Briefcase,
		description: 'O‘z ishining haqiqiy professionallari',
	},
	{
		id: 4,
		name: 'O‘rtacha Reyting',
		value: '4.9/5',
		icon: Award,
		description: 'Haqiqiy mijozlar tomonidan baholangan',
	},
]

export default function Stats() {
	return (
		<section className='bg-zinc-950 py-16 sm:py-24 border-y border-zinc-800 relative z-10'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				<div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0'>
					{stats.map((stat, idx) => (
						<motion.div
							key={stat.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: idx * 0.1 }}
							className='flex flex-col items-center sm:items-start text-center sm:text-left relative group'
						>
							<div className='flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 text-white mb-6 group-hover:scale-110 group-hover:border-zinc-700 transition-all duration-300 shadow-xl'>
								<stat.icon
									className='h-6 w-6 stroke-[1.5]'
									aria-hidden='true'
								/>
							</div>
							<dt className='text-sm font-medium text-zinc-400 mb-2 leading-6 uppercase tracking-wider'>
								{stat.name}
							</dt>
							<dd className='text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3'>
								{stat.value}
							</dd>
							<p className='text-sm text-zinc-500 font-light max-w-[200px]'>
								{stat.description}
							</p>

							{/* Subtle divider for mobile/tablet */}
							{idx !== stats.length - 1 && (
								<div className='absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-px bg-zinc-800 sm:hidden' />
							)}
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
