'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
	return (
		<section className='py-24 relative overflow-hidden bg-white'>
			<div className='max-w-5xl mx-auto px-6 lg:px-8 relative z-10'>
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
					className='bg-zinc-900 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl'
				>
					{/* Decorative abstract elements inside CTA */}
					<div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
						<div className='absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-zinc-800/40 rounded-full blur-[80px]' />
						<div className='absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-zinc-800/40 rounded-full blur-[80px]' />
					</div>

					<div className='relative z-10 max-w-2xl mx-auto'>
						<div className='w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-8 ring-8 ring-zinc-800/50'>
							<Sparkles className='w-8 h-8 text-zinc-300' />
						</div>

						<h2 className='text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight'>
							Tayyormisiz?
							<br />
							Hamma narsa sizni kutmoqda.
						</h2>

						<p className='text-lg text-zinc-400 mb-10 leading-relaxed font-light'>
							Vaqtingizni tejashga yoki biznesingizni keyingi bosqichga olib
							chiqishga tayyor bo'lsangiz, ro'yxatdan o'ting va bepul sinab
							ko'ring.
						</p>

						<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
							<Button
								size='lg'
								className='w-full sm:w-auto rounded-full px-8 h-14 bg-white text-zinc-900 hover:bg-zinc-100 hover:scale-105 transition-all font-semibold text-base gap-2 group'
								asChild
							>
								<Link href='/register'>
									Boshlash uchun bosing
									<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
								</Link>
							</Button>
							<p className='text-sm text-zinc-500 font-medium sm:ml-4'>
								100% bepul foydalanish. <br className='sm:hidden' /> Karta talab
								qilinmaydi.
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
