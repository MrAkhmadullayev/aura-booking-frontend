'use client'

import { motion } from 'framer-motion'
import { Calendar, CheckCircle2, Search } from 'lucide-react'

const steps = [
	{
		id: 1,
		name: 'Izlang',
		description:
			"O'zingizga kerakli xizmat turini va eng yaxshi ustalarni hududingiz bo'yicha toping.",
		icon: Search,
	},
	{
		id: 2,
		name: 'Vaqtni tanlang',
		description:
			"Ustaning bo'sh vaqtlar jadvali bilan tanishing va o'zingizga mos soatni bir klikda band qiling.",
		icon: Calendar,
	},
	{
		id: 3,
		name: 'Zavqlaning',
		description:
			"Belgilangan vaqtda salonga tashrif buyuring va yuqori darajadagi xizmatdan bahramand bo'ling.",
		icon: CheckCircle2,
	},
]

export default function HowItWorks() {
	return (
		<section className='py-24 bg-zinc-50 relative overflow-hidden'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
					className='text-center max-w-3xl mx-auto mb-20'
				>
					<h2 className='text-sm font-semibold tracking-wider text-zinc-500 uppercase mb-3'>
						Jarayon qanday ishlaydi?
					</h2>
					<h3 className='text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight'>
						3 qadamda{' '}
						<span className='italic font-serif text-zinc-500'>
							mukammallik.
						</span>
					</h3>
				</motion.div>

				<div className='relative'>
					{/* Connecting Line */}
					<div className='hidden md:block absolute top-12 left-0 w-full h-0.5 bg-zinc-200' />

					<div className='grid md:grid-cols-3 gap-12 relative'>
						{steps.map((step, idx) => (
							<motion.div
								key={step.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-50px' }}
								transition={{ duration: 0.6, delay: idx * 0.2 }}
								className='relative text-center'
							>
								{/* Number Badge */}
								<div className='absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl font-bold text-zinc-300 z-10 shadow-sm border border-zinc-100 hidden md:flex'>
									{step.id}
								</div>

								{/* Icon Bubble */}
								<div className='w-24 h-24 mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center mb-8 relative z-10 group hover:-translate-y-2 transition-transform duration-300'>
									<div className='absolute inset-0 bg-zinc-900 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
									<step.icon className='w-10 h-10 text-zinc-900 group-hover:text-white transition-colors duration-300 relative z-20 stroke-[1.5]' />
								</div>

								{/* Content */}
								<h4 className='text-2xl font-semibold text-zinc-900 mb-4'>
									{step.name}
								</h4>
								<p className='text-zinc-600 leading-relaxed max-w-xs mx-auto text-base'>
									{step.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
