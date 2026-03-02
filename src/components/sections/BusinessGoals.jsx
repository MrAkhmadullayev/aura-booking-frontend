'use client'

import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'

export default function BusinessGoals() {
	return (
		<section className='py-24 bg-white'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
					className='text-center max-w-2xl mx-auto mb-16'
				>
					<h2 className='text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight'>
						Aura sizga har qanday biznes maqsadlariga erishishda yordam beradi
					</h2>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6'>
					{/* Card 1: Mijozlarni jalb qiling */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='lg:col-span-3 md:col-span-2 bg-zinc-50 rounded-[2rem] p-8 md:p-10 border border-zinc-100/80 flex flex-col hover:-translate-y-1 transition-transform duration-300'
					>
						<h3 className='text-2xl font-semibold text-zinc-900 mb-4'>
							Yangi mijozlarni bepul toping
						</h3>
						<p className='text-zinc-500 leading-relaxed font-light mb-10 max-w-sm'>
							Instagram, Telegram va boshqa tarmoqlarga yozilish havolasini
							qo'ying. Odamlar sizga qo'ng'iroq qilmasdan, o'zlari bo'sh vaqtni
							tanlab avtomatik yozilishadi.
						</p>
						<div className='mt-auto relative h-40 bg-zinc-200/40 rounded-2xl overflow-hidden border border-zinc-200/50 p-6 flex flex-col justify-center items-center'>
							{/* Mock UI Element */}
							<div className='bg-white w-full max-w-xs rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-zinc-100 p-4 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300'>
								<div className='flex items-center justify-between mb-3'>
									<div className='flex items-center gap-3'>
										<div className='w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600'>
											<CalendarDays className='w-5 h-5' />
										</div>
										<div>
											<p className='text-[10px] font-semibold uppercase tracking-wider text-zinc-400'>
												Yangi Yoziluv
											</p>
											<p className='text-sm font-bold text-zinc-900'>
												Bugun, 14:30
											</p>
										</div>
									</div>
									<div className='w-10 h-5 bg-zinc-800 rounded-full relative shadow-inner'>
										<div className='w-3.5 h-3.5 bg-white rounded-full absolute right-1 top-[3px] shadow-sm'></div>
									</div>
								</div>
								<div className='h-8 bg-zinc-50 rounded-lg flex items-center px-3 text-xs text-zinc-600 font-medium border border-zinc-100'>
									Sardor R. - Soch qisqartirish
								</div>
							</div>
						</div>
					</motion.div>

					{/* Card 2: Vaqt sarflamang */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='lg:col-span-3 md:col-span-2 bg-zinc-50 rounded-[2rem] p-8 md:p-10 border border-zinc-100/80 flex flex-col hover:-translate-y-1 transition-transform duration-300'
					>
						<h3 className='text-2xl font-semibold text-zinc-900 mb-4'>
							Asab va vaqtingizni asrang
						</h3>
						<p className='text-zinc-500 leading-relaxed font-light mb-10 max-w-sm'>
							Qog'oz daftarlar va kelmay qolgan mijozlar muammosini unuting.
							Aura hammaga vaqtida avtomat SMS eslatma yuboradi va kalendarni
							o'zi yuritadi.
						</p>
						<div className='mt-auto relative h-40 bg-zinc-200/40 rounded-2xl overflow-hidden border border-zinc-200/50 p-6 flex flex-col justify-center items-center'>
							{/* Mock UI */}
							<div className='bg-white w-full max-w-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-zinc-100 p-4 transform rotate-[2deg] hover:rotate-0 transition-transform duration-300'>
								<div className='flex gap-2 mb-4 pl-1'>
									<div className='h-2 w-16 bg-zinc-200 rounded-full'></div>
									<div className='h-2 w-10 bg-zinc-200 rounded-full'></div>
								</div>
								<div className='space-y-2.5'>
									<div className='flex gap-3'>
										<div className='w-14 h-11 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-center text-xs font-semibold text-zinc-400'>
											10:00
										</div>
										<div className='flex-1 h-11 bg-emerald-50 border border-emerald-100 rounded-xl px-4 flex items-center text-[13px] text-emerald-700 font-medium'>
											Dilshod — Spa-massaj
										</div>
									</div>
									<div className='flex gap-3'>
										<div className='w-14 h-11 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-center text-xs font-semibold text-zinc-400'>
											11:30
										</div>
										<div className='flex-1 h-11 border border-dashed border-zinc-300 rounded-xl px-4 flex items-center text-[13px] text-zinc-400 font-medium bg-zinc-50/50'>
											Bo'sh vaqt
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Card 3: Daromadni oshiring */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className='lg:col-span-2 md:col-span-1 bg-zinc-50 rounded-[2rem] p-8 border border-zinc-100/80 flex flex-col hover:-translate-y-1 transition-transform duration-300'
					>
						<h3 className='text-xl md:text-2xl font-semibold text-zinc-900 mb-3'>
							Ko'proq pul ishlang
						</h3>
						<p className='text-zinc-500 text-sm leading-relaxed font-light mb-8'>
							Qaysi ustangiz nechta mijoz qabul qildi, qaysi xizmat turidan
							qancha daromad topildi? Tahlillar orqali foydani oshiring.
						</p>
						<div className='mt-auto flex justify-center'>
							<div className='w-44 h-28 bg-gradient-to-br from-zinc-200 to-zinc-300 border border-zinc-300/50 rounded-2xl p-5 shadow-sm text-zinc-800 transform -rotate-6 hover:-translate-y-2 hover:rotate-0 transition-transform duration-300 flex flex-col justify-center'>
								<div className='w-8 h-5 bg-zinc-400/30 rounded mb-3'></div>
								<div className='text-[11px] font-medium uppercase tracking-widest text-zinc-500 mb-1'>
									Tushum
								</div>
								<div className='text-2xl font-bold font-mono tracking-tight'>
									2.5M
								</div>
							</div>
						</div>
					</motion.div>

					{/* Card 4: Mijozlarni ushlab qoling */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className='lg:col-span-2 md:col-span-1 bg-zinc-50 rounded-[2rem] p-8 border border-zinc-100/80 flex flex-col hover:-translate-y-1 transition-transform duration-300'
					>
						<h3 className='text-xl md:text-2xl font-semibold text-zinc-900 mb-3'>
							Mijozlarni ushlab qoling
						</h3>
						<p className='text-zinc-500 text-sm leading-relaxed font-light mb-8'>
							Doimiy mijozlarga chegirmalar bering, tug'ilgan kunlarida
							avtomatik tabriklab ularni xursand qiling.
						</p>
						<div className='mt-auto bg-zinc-200/40 rounded-2xl p-4 border border-zinc-200/50 flex flex-col gap-3'>
							<div className='bg-white p-3 rounded-2xl rounded-bl-sm shadow-sm text-[13px] font-medium text-zinc-600 max-w-[90%] border border-zinc-100 leading-snug'>
								Sizga 20% lik chegirma taqdim etdik 🎉 Kelishingizni kutamiz!
							</div>
							<div className='bg-zinc-800 text-zinc-50 border border-zinc-700 p-3 rounded-2xl rounded-br-sm shadow-sm text-[13px] font-medium self-end max-w-[90%] leading-snug'>
								Katta rahmat! Albatta boraman.
							</div>
						</div>
					</motion.div>

					{/* Card 5: Dark Card */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.5 }}
						className='col-span-1 lg:col-span-2 md:col-span-2 bg-zinc-900 rounded-[2rem] p-8 shadow-[0_20px_40px_rgb(0,0,0,0.1)] flex flex-col relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300'
					>
						<div className='absolute -top-32 -right-32 w-64 h-64 bg-amber-500 rounded-full blur-[100px] opacity-20 pointer-events-none'></div>

						<h3 className='text-xl md:text-2xl font-semibold text-white mb-3 relative z-10'>
							Doimiy nazorat masofadan
						</h3>
						<p className='text-zinc-400 text-sm leading-relaxed font-light mb-8 relative z-10'>
							Dunyoning istalgan joyida turib saloningiz qancha pul
							topayotganini telefoningiz orqali real vaqtda nazorat qiling.
						</p>
						<div className='mt-auto flex items-end justify-between h-24 gap-1.5 relative z-10 pt-4'>
							{[30, 45, 25, 60, 40, 75, 50, 95, 40, 60, 85, 70].map(
								(height, idx) => (
									<div
										key={idx}
										className='w-full bg-zinc-800 hover:bg-amber-400 transition-colors rounded-t-[3px] duration-300 cursor-pointer'
										style={{ height: `${height}%` }}
									></div>
								),
							)}
						</div>
						<div className='border-t border-zinc-800 mt-3 pt-3 flex justify-between text-[10px] uppercase font-bold tracking-widest text-zinc-500 relative z-10'>
							<span>Dush</span>
							<span>Chor</span>
							<span>Juma</span>
							<span>Yak</span>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
