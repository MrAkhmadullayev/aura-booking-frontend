'use client'

import { motion } from 'framer-motion'
import {
	BarChart3,
	Box,
	Calculator,
	CalendarCheck,
	CheckCircle,
	Gift,
	Globe,
	HardDrive,
	MessageSquare,
	MonitorSmartphone,
	Settings,
	Smartphone,
	Users,
	Wallet,
} from 'lucide-react'

const features = [
	{ icon: CheckCircle, name: 'Istalgan vaqtda yozilish', active: true },
	{ icon: Wallet, name: 'Ustalar pulini hisoblash' },
	{ icon: Box, name: 'Sotiladigan tovarlar hisobi' },
	{ icon: MessageSquare, name: 'SMS Eslatmalar' },
	{ icon: Gift, name: 'Chegirma va bonuslar' },
	{ icon: Globe, name: 'Bir nechta filiallarni ulash' },
	{ icon: Calculator, name: 'Pullar hisob-kitobi' },
	{ icon: Smartphone, name: 'Oson qidiruv tizimi' },
	{ icon: MonitorSmartphone, name: "Telefondan to'liq boshqarish" },
	{ icon: BarChart3, name: 'Kuzatuv va natijalar' },
	{ icon: CalendarCheck, name: 'Online daftar' },
	{ icon: Settings, name: 'Boshqa dasturlarga ulash' },
	{ icon: Users, name: "Mijozlarning ro'yxati" },
	{ icon: HardDrive, name: 'Aura kassasi (Tez kunda)', badge: 'New' },
	{ icon: null, name: 'va yana qulayliklar', isLink: true },
]

export default function EcosystemFeatures() {
	return (
		<section className='py-24 bg-white'>
			<div className='max-w-[70rem] mx-auto px-6 lg:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
					className='text-center max-w-3xl mx-auto mb-16'
				>
					<h2 className='text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight'>
						Barcha qulayliklar bitta ilovada.
					</h2>
				</motion.div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-10'>
					{features.map((item, idx) => {
						const Icon = item.icon

						if (item.isLink) {
							return (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 15 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: idx * 0.05 }}
									className='flex items-center justify-center p-4 h-[72px] rounded-2xl bg-zinc-50/50 hover:bg-zinc-100 transition-colors cursor-pointer border border-transparent'
								>
									<span className='text-zinc-400 text-[15px] font-medium'>
										{item.name}
									</span>
								</motion.div>
							)
						}

						return (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 15 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: idx * 0.05 }}
								className={`flex items-center gap-4 p-3 h-[72px] rounded-2xl transition-all duration-300 ${
									item.active
										? 'bg-zinc-50 border border-zinc-100 shadow-sm'
										: 'bg-zinc-50/80 hover:bg-zinc-100/90 hover:shadow-sm border border-transparent cursor-default'
								}`}
							>
								<div
									className={`flex-shrink-0 w-12 h-12 rounded-[14px] flex items-center justify-center ${
										item.active
											? 'bg-zinc-900 text-white shadow-md'
											: 'text-zinc-700 bg-white shadow-sm border border-zinc-100/80'
									}`}
								>
									<Icon className='w-5 h-5 stroke-[1.5]' />
								</div>

								<div className='flex items-center justify-between flex-1 min-w-0 pr-1'>
									<span
										className={`text-[15px] leading-tight font-medium ${
											item.active ? 'text-zinc-900' : 'text-zinc-700'
										}`}
									>
										{item.name}
									</span>
									{item.badge && (
										<span className='px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-amber-950 rounded-full flex-shrink-0 ml-2'>
											{item.badge}
										</span>
									)}
								</div>
							</motion.div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
