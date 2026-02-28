import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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

export const metadata = {
	title: 'Biz haqimizda - Aura Booking',
	description:
		"Aura Booking - bu go'zallik salonlari va mijozlarni bog'lovchi innovatsion platforma.",
}

export default function AboutPage() {
	return (
		<div className='min-h-screen flex flex-col font-sans bg-zinc-50 selection:bg-zinc-200 selection:text-zinc-900'>
			<Navbar />

			<main className='flex-grow pt-28 pb-24'>
				{/* Header Section */}
				<section className='max-w-7xl mx-auto px-6 lg:px-8 mb-20 text-center'>
					<div className='inline-block px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-600 font-semibold text-sm mb-6 uppercase tracking-wider'>
						Bizning hikoyamiz
					</div>
					<h1 className='text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight max-w-4xl mx-auto'>
						Go'zallik sohasida{' '}
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-900'>
							raqamli inqilob
						</span>
					</h1>
					<p className='text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed'>
						Aura Booking - bu nafaqat navbatga yozilish tizimi, balki salonlar
						va mijozlar orasidagi ishonch ko'prigidir. Bizning maqsadimiz xizmat
						ko'rsatish sohasini soddalashtirish va zamonaviylashtirish.
					</p>
				</section>

				{/* Image Grid / Hero Block */}
				<section className='max-w-7xl mx-auto px-6 lg:px-8 mb-32'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px] md:h-[500px]'>
						<div className='relative rounded-[2rem] overflow-hidden col-span-1 md:col-span-2 shadow-sm group'>
							<Image
								src='/images/hero.png'
								alt='Aura Booking Office'
								fill
								className='object-cover group-hover:scale-105 transition-transform duration-700'
							/>
							<div className='absolute inset-0 bg-zinc-900/20'></div>
							<div className='absolute bottom-8 left-8 right-8'>
								<h3 className='text-white text-2xl font-bold mb-2'>
									Hammasi bir joyda
								</h3>
								<p className='text-white/80'>
									Eng yaxshi salonlarni izlash endi bir marta bosish orqali
									amalga oshadi.
								</p>
							</div>
						</div>
						<div className='relative rounded-[2rem] overflow-hidden hidden md:block shadow-sm group'>
							<Image
								src='/images/client.png'
								alt='Happy Client'
								fill
								className='object-cover group-hover:scale-105 transition-transform duration-700'
							/>
							<div className='absolute inset-0 bg-zinc-900/20'></div>
						</div>
					</div>
				</section>

				{/* Mission & Vision */}
				<section className='max-w-7xl mx-auto px-6 lg:px-8 mb-32'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
						<div className='space-y-8'>
							<h2 className='text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight'>
								Nima uchun Aura Booking yaratildi?
							</h2>
							<div className='space-y-6 text-zinc-600 leading-relaxed text-lg'>
								<p>
									Ko'p yillar davomida go'zallik salonlariga navbatga yozilish
									qo'ng'iroqlar, kutishlar va vaqt yo'qotish bilan bog'liq
									bo'ldi. Usta o'z ish jadvalini daftariga yozib bordi,
									taymingdagi xatolar mijozlarning noroziligiga sabab bo'ldi.
								</p>
								<p>
									<strong>Aura Booking</strong> shu muammolarni to'liq bartaraf
									etadi. Biz B2B (Salonlar va Ustalar) hamda B2C (Mijozlar)
									uchun o'ziga xos ekotizim yaratdik. Odamlar platformaga kirib,
									bo'sh vaqtlarni aniq ko'radi va bir zumda o'ziga qulay vaqtni
									band qiladi.
								</p>
							</div>

							<div className='grid grid-cols-2 gap-6 pt-6'>
								<div>
									<h4 className='text-4xl font-bold text-zinc-900 mb-2'>50+</h4>
									<p className='text-sm font-medium text-zinc-500 uppercase tracking-wider'>
										Hamkor salonlar
									</p>
								</div>
								<div>
									<h4 className='text-4xl font-bold text-zinc-900 mb-2'>
										10k+
									</h4>
									<p className='text-sm font-medium text-zinc-500 uppercase tracking-wider'>
										Muvaffaqiyatli bronlar
									</p>
								</div>
							</div>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
							<Card className='border-none shadow-sm rounded-3xl bg-white flex flex-col items-start p-8 hover:shadow-lg transition-shadow'>
								<div className='w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-900 mb-6'>
									<Target className='w-6 h-6' />
								</div>
								<h3 className='text-xl font-bold text-zinc-900 mb-3'>
									Bizning Missiyamiz
								</h3>
								<p className='text-zinc-500 leading-relaxed'>
									Har bir insonga sifatli va tezkor xizmat ko'rsatish sohasida
									raqamli qulaylik yaratish.
								</p>
							</Card>
							<Card className='border-none shadow-sm rounded-3xl bg-white flex flex-col items-start p-8 hover:shadow-lg transition-shadow md:translate-y-8'>
								<div className='w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-900 mb-6'>
									<Zap className='w-6 h-6' />
								</div>
								<h3 className='text-xl font-bold text-zinc-900 mb-3'>
									Tezlik & Qulaylik
								</h3>
								<p className='text-zinc-500 leading-relaxed'>
									Go'zallik saloniga yozilish uchun atigi 30 soniya sarflash
									kifoya.
								</p>
							</Card>
						</div>
					</div>
				</section>

				{/* Values / Features for both sides */}
				<section className='bg-zinc-900 py-24 md:py-32 mb-32 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8'>
					<div className='max-w-7xl mx-auto'>
						<div className='text-center mb-16'>
							<h2 className='text-3xl md:text-5xl font-bold tracking-tight text-white mb-6'>
								Keng imkoniyatlar platformasi
							</h2>
							<p className='text-zinc-400 max-w-2xl mx-auto text-lg'>
								Har bir tomon - ham xizmat ko'rsatuvchilar, ham xizmat
								oluvchilar uchun ideal sharoit.
							</p>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{/* B2C Benefits */}
							<div className='bg-zinc-800/50 border border-zinc-700/50 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-sm'>
								<div className='w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white mb-8'>
									<Users className='w-7 h-7' />
								</div>
								<h3 className='text-2xl font-bold text-white mb-6'>
									Mijozlar uchun
								</h3>
								<ul className='space-y-4'>
									{[
										"Sizga eng yaqin salonlarni masofa bo'yicha qidirish",
										'Xizmatlar va ularning aniq narxlari bilan tanishish',
										'Ustalarining reytingi va boshqalar qoldirgan sharhlar',
										"Qo'ng'iroqlarsiz, bir zumda bo'sh soatni band qilish",
										'Sms xabarnomalar orqali yozilgan vaqtini eslatish',
									].map((item, idx) => (
										<li
											key={idx}
											className='flex items-start gap-4 text-zinc-300'
										>
											<CheckCircle2 className='w-6 h-6 text-green-400 flex-shrink-0' />
											<span className='leading-snug pt-0.5'>{item}</span>
										</li>
									))}
								</ul>
							</div>

							{/* B2B Benefits */}
							<div className='bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl'>
								<div className='w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 mb-8'>
									<Building className='w-7 h-7' />
								</div>
								<h3 className='text-2xl font-bold text-zinc-900 mb-6'>
									Biznes uchun (CRM)
								</h3>
								<ul className='space-y-4'>
									{[
										'Elektron daftar va raqamli kalendar',
										"Har bir usta uchun alohida grafik profil bo'limi",
										'Mijozlar bazasini yuritish va analitika (CRM)',
										'Portfolio yuklash va xizmatlarni boshqarish',
										'Bekor qilingan bandlarni minimallashtirish',
									].map((item, idx) => (
										<li
											key={idx}
											className='flex items-start gap-4 text-zinc-700'
										>
											<CheckCircle2 className='w-6 h-6 text-zinc-900 flex-shrink-0' />
											<span className='leading-snug pt-0.5'>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className='max-w-4xl mx-auto px-6 lg:px-8 text-center'>
					<h2 className='text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-6'>
						Bugunoq bizga qo'shiling
					</h2>
					<p className='text-lg text-zinc-500 mb-10 leading-relaxed'>
						Go'zallikka yetishish endi yanada oson. O'zingiz uchun ideal salon
						toping yoki biznesingizni yangi bosqichga olib chiqing.
					</p>
					<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
						<Button
							asChild
							size='lg'
							className='w-full sm:w-auto rounded-full h-14 px-8 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-base shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 group'
						>
							<Link href='/salons'>
								Salon izlash{' '}
								<ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
							</Link>
						</Button>
						<Button
							asChild
							variant='outline'
							size='lg'
							className='w-full sm:w-auto rounded-full h-14 px-8 border-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-semibold text-base transition-all'
						>
							<Link href='/register'>Biznesni ro'yxatdan o'tkazish</Link>
						</Button>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	)
}
