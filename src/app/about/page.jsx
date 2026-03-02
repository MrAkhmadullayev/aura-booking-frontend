'use client'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
	ArrowRight,
	Building,
	CheckCircle2,
	Target,
	Users,
	Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Temporary team data - images will be replaced with generated ones when API is back
const teamMembers = [
	{
		id: 1,
		name: 'Sadriddin',
		role: 'Founder & CEO',
		image: '/images/master.png',
		desc: 'Go&apos;zallik va texnologiya olamini birlashtirish tashabbuskori.',
	},
	{
		id: 2,
		name: 'Rustam',
		role: 'CTO',
		image: '/images/master.png',
		desc: 'Platformaning texnik barqarorligi va xavfsizligi bo&apos;yicha mas&apos;ul.',
	},
	{
		id: 3,
		name: 'Aziza',
		role: 'Head of Design',
		image: '/images/client.png',
		desc: 'Foydalanuvchilar qulayligi uchun mukammal interfeys yaratuvchisi.',
	},
	{
		id: 4,
		name: 'Javohir',
		role: 'Marketing Lead',
		image: '/images/master.png',
		desc: 'Brendni ommalashtirish va hamkorlik aqli.',
	},
]

// Page-level fade-in
const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function AboutPage() {
	return (
		<div className='min-h-screen flex flex-col font-sans bg-zinc-50 selection:bg-zinc-200 selection:text-zinc-900'>
			<Navbar />

			<main className='flex-grow pt-28 pb-24'>
				{/* 1. Hero Section */}
				<motion.section
					variants={fadeIn}
					initial='hidden'
					animate='visible'
					className='max-w-7xl mx-auto px-6 lg:px-8 mb-20 text-center'
				>
					<div className='inline-block px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-600 font-semibold text-sm mb-6 uppercase tracking-wider'>
						Bizning hikoyamiz
					</div>
					<h1 className='text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight max-w-4xl mx-auto'>
						Go&apos;zallik sohasida{' '}
						<span className='italic font-serif text-zinc-500'>
							raqamli inqilob
						</span>
					</h1>
					<p className='text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-light'>
						Aura Booking - bu nafaqat navbatga yozilish tizimi, balki salonlar,
						spa markazlar va mijozlar orasidagi{' '}
						<strong className='text-zinc-700 font-medium'>
							ishonch ko&apos;prigidir
						</strong>
						. Bizning maqsadimiz har ikki tomon uchun hayotni osonlashtirish.
					</p>
				</motion.section>

				{/* 2. Image Grid / Hero Block */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.7 }}
					className='max-w-7xl mx-auto px-6 lg:px-8 mb-32'
				>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px] md:h-[500px]'>
						<div className='relative rounded-[2rem] overflow-hidden col-span-1 md:col-span-2 shadow-[0_8px_30px_rgb(0,0,0,0.06)] group'>
							<Image
								src='/images/hero.png'
								alt='Aura Booking Office'
								fill
								className='object-cover group-hover:scale-105 transition-transform duration-700'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent'></div>
							<div className='absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
								<h3 className='text-white text-3xl font-bold mb-2'>
									Hammasi bir joyda
								</h3>
								<p className='text-white/90 text-lg font-light'>
									Eng yaxshi xizmatlarni izlash endi bir marta bosish orqali
									amalga oshadi.
								</p>
							</div>
						</div>
						<div className='relative rounded-[2rem] overflow-hidden hidden md:block shadow-[0_8px_30px_rgb(0,0,0,0.06)] group'>
							<Image
								src='/images/client.png'
								alt='Happy Client'
								fill
								className='object-cover group-hover:scale-105 transition-transform duration-700'
							/>
							<div className='absolute inset-0 bg-zinc-900/10 group-hover:bg-zinc-900/0 transition-colors duration-500'></div>
						</div>
					</div>
				</motion.section>

				{/* 3. Team Section (New) */}
				<section className='bg-white py-32 mb-32 border-y border-zinc-100'>
					<div className='max-w-7xl mx-auto px-6 lg:px-8'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className='text-center mb-16'
						>
							<h2 className='text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4'>
								Bizning Jamoa
							</h2>
							<p className='text-zinc-500 max-w-2xl mx-auto text-lg font-light'>
								Aura Booking orqasida turgan, har kuni sizning qulayligingiz
								uchun harakat qiladigan professionallar bilan tanishing.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
							{teamMembers.map((member, idx) => (
								<motion.div
									key={member.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-50px' }}
									transition={{ duration: 0.5, delay: idx * 0.1 }}
									className='group'
								>
									<Card className='overflow-hidden border-none shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] bg-zinc-50 transition-all duration-300 rounded-[2rem] h-full flex flex-col'>
										<div className='relative aspect-[4/5] overflow-hidden bg-zinc-200'>
											<Image
												src={member.image}
												alt={member.name}
												fill
												className='object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700'
											/>
											<div className='absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
										</div>
										<div className='p-6 text-center transform group-hover:-translate-y-2 transition-transform duration-300 bg-white relative z-10 rounded-t-3xl -mt-6 h-full flex flex-col'>
											<h3 className='text-xl font-bold text-zinc-900 mb-1'>
												{member.name}
											</h3>
											<p className='text-sm text-amber-600 font-semibold uppercase tracking-wider mb-4'>
												{member.role}
											</p>
											<p className='text-sm text-zinc-500 leading-relaxed font-light'>
												{member.desc}
											</p>
										</div>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* 4. Mission & Vision */}
				<section className='max-w-7xl mx-auto px-6 lg:px-8 mb-32'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: '-100px' }}
							transition={{ duration: 0.7 }}
							className='space-y-8'
						>
							<h2 className='text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight'>
								Nima uchun Aura Booking yaratildi?
							</h2>
							<div className='space-y-6 text-zinc-600 leading-relaxed text-lg font-light'>
								<p>
									Ko&apos;p yillar davomida navbatga yozilish
									qo&apos;ng&apos;iroqlar, kutishlar va vaqt yo&apos;qotish
									bilan bog&apos;liq bo&apos;ldi. Usta o&apos;z ish jadvalini
									daftariga yozib bordi, hisob-kitoblar qog&apos;ozda qoldi.
								</p>
								<p>
									<strong>Aura Booking</strong> shu muammolarni to&apos;liq
									bartaraf etadi. Barcha ma&apos;lumotlar va hisobotlar raqamli
									ko&apos;rinishga o&apos;tdi. Odamlar platformaga kirib,
									bo&apos;sh vaqtlarni aniq ko&apos;radi va telefon orqali bir
									zumda o&apos;ziga qulay vaqtni band qiladi.
								</p>
							</div>

							<div className='grid grid-cols-2 gap-6 pt-6 border-t border-zinc-100'>
								<div>
									<h4 className='text-4xl lg:text-5xl font-bold text-zinc-900 mb-2 font-serif'>
										50+
									</h4>
									<p className='text-sm font-semibold text-zinc-400 uppercase tracking-wider'>
										Hamkor salonlar
									</p>
								</div>
								<div>
									<h4 className='text-4xl lg:text-5xl font-bold text-zinc-900 mb-2 font-serif'>
										10k+
									</h4>
									<p className='text-sm font-semibold text-zinc-400 uppercase tracking-wider'>
										Qilingan bronlar
									</p>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: '-100px' }}
							transition={{ duration: 0.7 }}
							className='grid grid-cols-1 sm:grid-cols-2 gap-6'
						>
							<Card className='border border-zinc-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl bg-white flex flex-col items-start p-8 hover:-translate-y-2 transition-transform duration-300'>
								<div className='w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-white mb-6 shadow-md'>
									<Target className='w-6 h-6' />
								</div>
								<h3 className='text-xl font-bold text-zinc-900 mb-3'>
									Bizning Missiyamiz
								</h3>
								<p className='text-zinc-500 leading-relaxed font-light'>
									Har bir insonga sifatli va tezkor xizmat ko&apos;rsatish
									sohasida raqamli qulaylik yaratish.
								</p>
							</Card>
							<Card className='border border-zinc-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl bg-white flex flex-col items-start p-8 hover:-translate-y-2 transition-transform duration-300 md:translate-y-8'>
								<div className='w-14 h-14 rounded-2xl bg-amber-400 flex items-center justify-center text-amber-950 mb-6 shadow-md'>
									<Zap className='w-6 h-6 fill-amber-950 stroke-none' />
								</div>
								<h3 className='text-xl font-bold text-zinc-900 mb-3'>
									Tezlik va Qulaylik
								</h3>
								<p className='text-zinc-500 leading-relaxed font-light'>
									Go&apos;zallik saloniga yozilish uchun atigi 30 soniya
									sarflash kifoya.
								</p>
							</Card>
						</motion.div>
					</div>
				</section>

				{/* 5. Values / Features for both sides */}
				<section className='bg-zinc-900 py-24 md:py-32 mb-32 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 overflow-hidden'>
					<div className='max-w-7xl mx-auto'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-100px' }}
							transition={{ duration: 0.6 }}
							className='text-center mb-16'
						>
							<h2 className='text-3xl md:text-5xl font-bold tracking-tight text-white mb-6'>
								Keng imkoniyatlar platformasi
							</h2>
							<p className='text-zinc-400 max-w-2xl mx-auto text-lg font-light'>
								Har bir tomon - ham xizmat ko&apos;rsatuvchilar, ham xizmat
								oluvchilar uchun ideal sharoit.
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{/* B2C Benefits */}
							<motion.div
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, margin: '-100px' }}
								transition={{ duration: 0.6 }}
								className='bg-zinc-800/50 border border-zinc-700/50 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-sm hover:bg-zinc-800/80 transition-colors'
							>
								<div className='w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white mb-8 border border-white/5'>
									<Users className='w-7 h-7' />
								</div>
								<h3 className='text-2xl font-bold text-white mb-6'>
									Mijozlar uchun
								</h3>
								<ul className='space-y-4'>
									{[
										'Sizga eng yaqin joylarni tezda topish',
										'Xizmatlar va aniq narxlar bilan tanishish',
										'Haqiqiy izohlar va reytinglar',
										'Qo&apos;ng&apos;iroqlarsiz, o&apos;ziga qulay soatni band qilish',
										'SMS orqali yozilgan vaqtini avtomat eslatish',
									].map((item, idx) => (
										<li
											key={idx}
											className='flex items-start gap-4 text-zinc-300 font-light'
										>
											<CheckCircle2 className='w-6 h-6 text-amber-400 flex-shrink-0' />
											<span className='leading-snug pt-0.5'>{item}</span>
										</li>
									))}
								</ul>
							</motion.div>

							{/* B2B Benefits */}
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, margin: '-100px' }}
								transition={{ duration: 0.6 }}
								className='bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl hover:-translate-y-1 transition-transform duration-300'
							>
								<div className='w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 mb-8 border border-zinc-200'>
									<Building className='w-7 h-7' />
								</div>
								<h3 className='text-2xl font-bold text-zinc-900 mb-6'>
									Biznes egalari uchun
								</h3>
								<ul className='space-y-4'>
									{[
										'Qog&apos;oz daftarlar o&apos;rniga raqamli kalendar',
										'Pul harajatlari va kirimini hisoblash',
										'Doimiy mijozlar bazasi (CRM)',
										'Har bir ustaning shaxsiy portfoliosi',
										'Kelmay qoladigan mijozlarni kamaytirish',
									].map((item, idx) => (
										<li
											key={idx}
											className='flex items-start gap-4 text-zinc-600 font-light'
										>
											<CheckCircle2 className='w-6 h-6 text-zinc-900 flex-shrink-0' />
											<span className='leading-snug pt-0.5'>{item}</span>
										</li>
									))}
								</ul>
							</motion.div>
						</div>
					</div>
				</section>

				{/* 6. CTA Section */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-50px' }}
					transition={{ duration: 0.6 }}
					className='max-w-4xl mx-auto px-6 lg:px-8 text-center'
				>
					<h2 className='text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-6'>
						Bugunoq bizga qo'shiling
					</h2>
					<p className='text-lg text-zinc-500 mb-10 leading-relaxed font-light'>
						Go&apos;zallikka yetishish endi yanada oson. O&apos;zingiz uchun
						ideal joy toping yoki biznesingizni yangi bosqichga olib chiqing.
					</p>
					<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
						<Button
							asChild
							size='lg'
							className='w-full sm:w-auto rounded-full h-14 px-8 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-base shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 group'
						>
							<Link href='/salons'>
								Xizmat izlash{' '}
								<ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
							</Link>
						</Button>
						<Button
							asChild
							variant='outline'
							size='lg'
							className='w-full sm:w-auto rounded-full h-14 px-8 border-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-semibold text-base transition-all hover:-translate-y-1'
						>
							<Link href='/register'>
								Biznesni ro&apos;yxatdan o&apos;tkazish
							</Link>
						</Button>
					</div>
				</motion.section>
			</main>

			<Footer />
		</div>
	)
}
