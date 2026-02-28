'use client'

import { Button } from '@/components/ui/button'
import {
	ArrowRight,
	Facebook,
	Instagram,
	Mail,
	MapPin,
	Phone,
	Scissors,
	Send,
	Youtube,
} from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
	return (
		<footer className='bg-white text-zinc-600 pt-20 pb-10 border-t border-zinc-100'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				{/* Top Section - Brand & Newsletter */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 pb-16 border-b border-zinc-100'>
					<div className='max-w-md'>
						<Link
							href='/'
							className='inline-flex items-center gap-2 group mb-6'
						>
							<div className='p-2 bg-zinc-900 rounded-xl group-hover:scale-105 transition-all shadow-sm'>
								<Scissors className='h-6 w-6 text-white' strokeWidth={1.5} />
							</div>
							<span className='font-semibold text-2xl text-zinc-900 tracking-tight'>
								Aura Booking
							</span>
						</Link>
						<p className='leading-relaxed mb-8'>
							Go'zallik va o'ziga e'tibor har bir insonning shaxsiy tanlovi. Biz
							siz va eng professional mutaxassislar o'rtasida ishonchli
							ko'prikni yaratamiz.
						</p>

						{/* Social Icons */}
						<div className='flex gap-4'>
							<a
								href='https://instagram.com'
								target='_blank'
								rel='noreferrer'
								className='w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all hover:-translate-y-1'
							>
								<Instagram className='w-4 h-4' />
							</a>
							<a
								href='https://telegram.org'
								target='_blank'
								rel='noreferrer'
								className='w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all hover:-translate-y-1'
							>
								<Send className='w-4 h-4 ml-0.5' />
							</a>
							<a
								href='https://facebook.com'
								target='_blank'
								rel='noreferrer'
								className='w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all hover:-translate-y-1'
							>
								<Facebook className='w-4 h-4' />
							</a>
							<a
								href='https://youtube.com'
								target='_blank'
								rel='noreferrer'
								className='w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all hover:-translate-y-1'
							>
								<Youtube className='w-4 h-4' />
							</a>
						</div>
					</div>

					<div className='flex flex-col lg:items-end lg:text-right'>
						<h3 className='text-xl font-semibold text-zinc-900 mb-3'>
							Yangiliklardan boxabar bo'ling
						</h3>
						<p className='mb-6 max-w-sm text-zinc-500'>
							Yangi salonlar va maxsus chegirmalar haqida birinchilardan bo'lib
							bilish imkoniyati.
						</p>
						<div className='flex gap-2 w-full max-w-md'>
							<input
								type='email'
								placeholder='Sizning email manzilingiz'
								className='flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-300 text-zinc-900 placeholder-zinc-400 transition-colors'
							/>
							<Button className='bg-zinc-900 text-white hover:bg-zinc-800 h-auto rounded-xl px-5 transition-all shadow-md'>
								<ArrowRight className='w-5 h-5' />
							</Button>
						</div>
					</div>
				</div>

				{/* Middle Section - Links */}
				<div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-8 py-16'>
					<div>
						<h4 className='font-semibold text-zinc-900 mb-8 uppercase tracking-widest text-sm relative'>
							Mijozlar uchun
							<span className='absolute -bottom-3 left-0 w-8 h-0.5 bg-zinc-200'></span>
						</h4>
						<ul className='space-y-4'>
							<li>
								<Link
									href='/salons'
									className='text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2 group'
								>
									<span className='w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-900 transition-colors'></span>
									Salonlarni izlash
								</Link>
							</li>
							<li>
								<Link
									href='/salons'
									className='text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2 group'
								>
									<span className='w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-900 transition-colors'></span>
									Ustalar reytingi
								</Link>
							</li>
							<li>
								<Link
									href='/salons'
									className='text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2 group'
								>
									<span className='w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-900 transition-colors'></span>
									Xizmatlar toifasi
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2 group'
								>
									<span className='w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-900 transition-colors'></span>
									Yordam va Ma'lumot
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='font-semibold text-zinc-900 mb-8 uppercase tracking-widest text-sm relative'>
							Biznes uchun (B2B)
							<span className='absolute -bottom-3 left-0 w-8 h-0.5 bg-zinc-200'></span>
						</h4>
						<ul className='space-y-4'>
							<li>
								<Link
									href='/register'
									className='text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2 group'
								>
									<span className='w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-900 transition-colors'></span>
									Salon ro'yxatdan o'tkazish
								</Link>
							</li>
							<li>
								<Link
									href='/login'
									className='text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2 group'
								>
									<span className='w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-900 transition-colors'></span>
									Aura CRM tizimi
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2 group'
								>
									<span className='w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-900 transition-colors'></span>
									Go'zallik markazi qoidasi
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='font-semibold text-zinc-900 mb-8 uppercase tracking-widest text-sm relative'>
							Aloqa xizmati
							<span className='absolute -bottom-3 left-0 w-8 h-0.5 bg-zinc-200'></span>
						</h4>
						<ul className='space-y-5'>
							<li className='flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 transition-colors cursor-pointer group'>
								<div className='p-2 bg-white rounded-lg shadow-sm'>
									<MapPin className='h-5 w-5 text-zinc-900' />
								</div>
								<span className='text-sm leading-relaxed pt-1 text-zinc-600 group-hover:text-zinc-900 transition-colors'>
									Toshkent shahar, Yunusobod tumani, IT Park binosi, 40-ofis
								</span>
							</li>
							<li className='flex items-center gap-4 text-zinc-500 hover:text-zinc-900 transition-colors group cursor-pointer'>
								<Phone className='h-5 w-5 text-zinc-400 group-hover:text-zinc-900 transition-colors' />
								<span className='font-medium tracking-wide'>
									+998 71 200-XX-XX
								</span>
							</li>
							<li className='flex items-center gap-4 text-zinc-500 hover:text-zinc-900 transition-colors group cursor-pointer'>
								<Mail className='h-5 w-5 text-zinc-400 group-hover:text-zinc-900 transition-colors' />
								<span className='font-medium tracking-wide'>
									hello@aurabooking.uz
								</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom section */}
				<div className='w-full flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-zinc-100 text-sm font-medium'>
					<p className='text-zinc-500'>
						&copy; {new Date().getFullYear()} Aura Booking. Barcha huquqlar
						himoyalangan.
					</p>
					<div className='flex gap-8'>
						<Link
							href='/privacy'
							className='text-zinc-500 hover:text-zinc-900 transition-colors'
						>
							Maxfiylik siyosati
						</Link>
						<Link
							href='/terms'
							className='text-zinc-500 hover:text-zinc-900 transition-colors'
						>
							Foydalanish shartlari
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
