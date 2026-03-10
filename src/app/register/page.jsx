'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'
import { AnimatePresence, motion } from 'framer-motion'
import {
	ArrowLeft,
	Building,
	Chrome,
	Eye,
	EyeOff,
	Loader2,
	Scissors,
	Sparkles,
	User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PatternFormat } from 'react-number-format'

export default function RegisterPage() {
	const router = useRouter()
	const { refreshUser } = useAuth()
	const [activeTab, setActiveTab] = useState('client')
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	// Form states
	const [clientData, setClientData] = useState({
		name: '',
		phone: '',
		password: '',
		about: '',
	})
	const [businessData, setBusinessData] = useState({
		type: '',
		name: '',
		phone: '',
		password: '',
		about: '',
	})

	const handleRegister = async e => {
		e.preventDefault()
		setError('')

		const currentData = activeTab === 'client' ? clientData : businessData
		const cleanPhone = currentData.phone.replace(/[^0-9]/g, '')

		// Basic validation
		if (
			activeTab === 'client' &&
			(!currentData.name || !currentData.phone || !currentData.password)
		) {
			setError("Barcha maydonlarni to'ldiring")
			return
		}
		if (
			activeTab === 'business' &&
			(!currentData.type ||
				!currentData.name ||
				!currentData.phone ||
				!currentData.password)
		) {
			setError("Barcha maydonlarni to'ldiring")
			return
		}
		if (cleanPhone.length < 9) {
			setError("Telefon raqam to'liq emas")
			return
		}
		if (currentData.password.length < 6) {
			setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak")
			return
		}

		setIsLoading(true)

		try {
			const payload = {
				name: currentData.name,
				phone: '+998' + cleanPhone,
				password: currentData.password,
				role: activeTab === 'business' ? 'business' : 'client',
				businessType: activeTab === 'business' ? currentData.type : 'none',
				about: currentData.about || '',
			}

			const { data } = await api.post('/auth/register', payload)

			await refreshUser()
			router.push(`/${data.role}/dashboard`)
		} catch (err) {
			setError(err.response?.data?.message || 'Xatolik yuz berdi')
			setIsLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-zinc-50 flex flex-col md:flex-row font-sans selection:bg-zinc-200 selection:text-zinc-900 overflow-hidden'>
			{/* Left Side: Brand Imagery (Sticky) */}
			<div className='hidden md:flex w-1/2 p-6 h-screen sticky top-0'>
				<div className='relative w-full h-full rounded-3xl overflow-hidden bg-zinc-900 group'>
					{/* Animated Gradient Background */}
					<motion.div
						animate={{
							scale: [1, 1.1, 1],
							rotate: [0, 5, 0],
						}}
						transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
						className='absolute inset-0 opacity-40'
						style={{
							background:
								'radial-gradient(circle at 20% 30%, #52525b 0%, transparent 50%), radial-gradient(circle at 80% 70%, #27272a 0%, transparent 50%)',
						}}
					/>

					{/* Image Overlay */}
					<Image
						src='https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80'
						alt='Modern Salon'
						fill
						className='object-cover mix-blend-overlay opacity-60 grayscale group-hover:scale-105 transition-transform duration-1000'
						priority
					/>

					{/* Glassmorphism Branding */}
					<div className='absolute inset-0 p-12 flex flex-col justify-between'>
						<Link href='/' className='flex items-center gap-3'>
							<div className='p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/20 transition-colors'>
								<Scissors className='h-6 w-6 text-white' />
							</div>
							<span className='text-2xl font-bold tracking-tight text-white'>
								Aura
							</span>
						</Link>

						<div className='space-y-6 max-w-md'>
							<motion.h2
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.2 }}
								className='text-5xl font-bold text-white leading-[1.1]'
							>
								Go'zallik va qulaylik bir joyda.
							</motion.h2>
							<motion.p
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.3 }}
								className='text-zinc-300 text-lg font-light leading-relaxed'
							>
								O'zingizga yoqqan salonni toping, xizmatlarni tanlang va bir
								necha soniya ichida band qiling.
							</motion.p>

							{/* Stats Grid */}
							<div className='grid grid-cols-2 gap-4 pt-8'>
								{[
									{ label: 'Faol salonlar', value: '500+' },
									{ label: 'Mamnun mijozlar', value: '10k+' },
								].map((stat, idx) => (
									<div
										key={idx}
										className='p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors cursor-default'
									>
										<div className='text-2xl font-bold text-white mb-1'>
											{stat.value}
										</div>
										<div className='text-xs text-zinc-400 uppercase tracking-widest font-medium'>
											{stat.label}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Right Side: Registration Form (Scrollable) */}
			<div className='flex-1 flex flex-col min-h-screen py-8 md:py-12 px-6 sm:px-12 md:px-20 overflow-y-auto bg-zinc-50'>
				<div className='max-w-[440px] w-full mx-auto space-y-10'>
					{/* Mobile Header */}
					<div className='md:hidden flex items-center justify-between mb-8'>
						<Link href='/' className='flex items-center gap-2'>
							<div className='p-2 bg-zinc-900 rounded-lg'>
								<Scissors className='h-4 w-4 text-white' />
							</div>
							<span className='font-bold text-zinc-900'>Aura</span>
						</Link>
						<Link
							href='/login'
							className='text-sm font-medium text-zinc-600 hover:text-zinc-900'
						>
							Kirish
						</Link>
					</div>

					<div className='space-y-3 px-1'>
						<Link
							href='/'
							className='inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-4 group'
						>
							<ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
							Bosh sahifaga qaytish
						</Link>
						<h1 className='text-3xl font-bold tracking-tight text-zinc-900'>
							Hisob yaratish
						</h1>
						<p className='text-zinc-500'>
							O'zingizga mos keladigan ro'yxatdan o'tish turini tanlang
						</p>
					</div>

					{/* Registration Tabs */}
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className='w-full'
					>
						<TabsList className='grid w-full grid-cols-2 p-1.5 bg-zinc-100/80 backdrop-blur-sm rounded-2xl h-14'>
							<TabsTrigger
								value='client'
								className='rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-zinc-900 transition-all duration-300 gap-2 font-medium text-zinc-500'
							>
								<User className='h-4 w-4' />
								Mijoz
							</TabsTrigger>
							<TabsTrigger
								value='business'
								className='rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-zinc-900 transition-all duration-300 gap-2 font-medium text-zinc-500'
							>
								<Building className='h-4 w-4' />
								Biznes
							</TabsTrigger>
						</TabsList>

						<AnimatePresence mode='wait'>
							<motion.div
								key={activeTab}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.3, ease: 'easeOut' }}
							>
								<TabsContent value='client' className='mt-8'>
									<form onSubmit={handleRegister} className='space-y-5'>
										<div className='space-y-4'>
											<div className='space-y-2'>
												<Label className='text-sm font-medium text-zinc-700 ml-1'>
													Ism-sharifingiz
												</Label>
												<Input
													placeholder='Masalan: Sadriddin Akhmadullayev'
													className='h-12 px-4 rounded-xl border-zinc-200 focus:border-zinc-900 focus:ring-zinc-900 transition-all bg-white shadow-sm'
													value={clientData.name}
													onChange={e =>
														setClientData({
															...clientData,
															name: e.target.value,
														})
													}
												/>
											</div>

											<div className='space-y-2'>
												<Label className='text-sm font-medium text-zinc-700 ml-1'>
													Telefon raqamingiz
												</Label>
												<div className='relative'>
													<span className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium border-r border-zinc-200 pr-3 pointer-events-none'>
														+998
													</span>
													<PatternFormat
														format='## ### ####'
														mask='_'
														customInput={Input}
														placeholder='94 000 1122'
														className='h-12 pl-[74px] pr-4 rounded-xl border-zinc-200 focus:border-zinc-900 focus:ring-zinc-900 transition-all bg-white shadow-sm font-medium'
														value={clientData.phone}
														onValueChange={values =>
															setClientData({
																...clientData,
																phone: values.value,
															})
														}
													/>
												</div>
											</div>

											<div className='space-y-2'>
												<Label className='text-sm font-medium text-zinc-700 ml-1'>
													Parol o'rnating
												</Label>
												<div className='relative group'>
													<Input
														type={showPassword ? 'text' : 'password'}
														placeholder='Kamida 6 belgi'
														className='h-12 px-4 rounded-xl border-zinc-200 focus:border-zinc-900 focus:ring-zinc-900 transition-all bg-white shadow-sm pr-12'
														value={clientData.password}
														onChange={e =>
															setClientData({
																...clientData,
																password: e.target.value,
															})
														}
													/>
													<Button
														type='button'
														variant='ghost'
														size='icon'
														className='absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-zinc-400 hover:text-zinc-600'
														onClick={() => setShowPassword(!showPassword)}
													>
														{showPassword ? (
															<EyeOff className='h-4 w-4' />
														) : (
															<Eye className='h-4 w-4' />
														)}
													</Button>
												</div>
											</div>

											<div className='space-y-2'>
												<Label className='text-sm font-medium text-zinc-700 ml-1'>
													O'zingiz haqingizda (ixtiyoriy)
												</Label>
												<Textarea
													placeholder='Ozingiz haqingizda malumot bering...'
													className='min-h-[100px] px-4 py-3 rounded-xl border-zinc-200 focus:border-zinc-900 focus:ring-zinc-900 transition-all bg-white shadow-sm resize-none'
													value={clientData.about}
													onChange={e =>
														setClientData({
															...clientData,
															about: e.target.value,
														})
													}
												/>
											</div>
										</div>

										{error && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												className='p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2'
											>
												<div className='h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse' />
												{error}
											</motion.div>
										)}

										<Button
											type='submit'
											disabled={isLoading}
											className='w-full h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300'
										>
											{isLoading ? (
												<Loader2 className='h-5 w-5 animate-spin' />
											) : (
												"Ro'yxatdan o'tish"
											)}
										</Button>
									</form>
								</TabsContent>

								<TabsContent value='business' className='mt-8'>
									<form onSubmit={handleRegister} className='space-y-5'>
										<div className='space-y-4'>
											<div className='space-y-2'>
												<Label className='text-sm font-medium text-zinc-700 ml-1'>
													Biznes turi
												</Label>
												<Select
													value={businessData.type}
													onValueChange={value =>
														setBusinessData({ ...businessData, type: value })
													}
												>
													<SelectTrigger className='h-12 rounded-xl border-zinc-200 bg-white shadow-sm focus:ring-zinc-900 focus:border-zinc-900 w-full'>
														<SelectValue placeholder='Biznes turini tanlang' />
													</SelectTrigger>
													<SelectContent className='rounded-xl border-zinc-200 shadow-xl'>
														<SelectItem value='beauty_salon'>
															Ayollar saloni
														</SelectItem>
														<SelectItem value='barbershop'>
															Barbershop
														</SelectItem>
														<SelectItem value='spa'>
															{' '}
															Spa va Dam olish
														</SelectItem>
														<SelectItem value='children_massage'>
															Bolalar massaji
														</SelectItem>
														<SelectItem value='adult_massage'>
															Kattalar massaji
														</SelectItem>
														<SelectItem value='cosmetology_manicure'>
															Kosmetologiya va monikur
														</SelectItem>
														<SelectItem value='sport_center'>
															Sport markazlari
														</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className='space-y-2'>
												<Label className='text-sm font-medium text-zinc-700 ml-1'>
													Biznes nomi (Salon nomi)
												</Label>
												<Input
													placeholder='Masalan: Aura Elite Studio'
													className='h-12 px-4 rounded-xl border-zinc-200 focus:border-zinc-900 focus:ring-zinc-900 transition-all bg-white shadow-sm'
													value={businessData.name}
													onChange={e =>
														setBusinessData({
															...businessData,
															name: e.target.value,
														})
													}
												/>
											</div>

											<div className='space-y-2'>
												<Label className='text-sm font-medium text-zinc-700 ml-1'>
													Siz bilan bog'lanish uchun raqam
												</Label>
												<div className='relative'>
													<span className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium border-r border-zinc-200 pr-3 pointer-events-none'>
														+998
													</span>
													<PatternFormat
														format='## ### ####'
														mask='_'
														customInput={Input}
														placeholder='94 000 1122'
														className='h-12 pl-[74px] pr-4 rounded-xl border-zinc-200 focus:border-zinc-900 focus:ring-zinc-900 transition-all bg-white shadow-sm font-medium'
														value={businessData.phone}
														onValueChange={values =>
															setBusinessData({
																...businessData,
																phone: values.value,
															})
														}
													/>
												</div>
											</div>

											<div className='space-y-2'>
												<Label className='text-sm font-medium text-zinc-700 ml-1'>
													Parol (Boshqaruv paneli uchun)
												</Label>
												<div className='relative group'>
													<Input
														type={showPassword ? 'text' : 'password'}
														placeholder='Kamida 6 belgi'
														className='h-12 px-4 rounded-xl border-zinc-200 focus:border-zinc-900 focus:ring-zinc-900 transition-all bg-white shadow-sm pr-12'
														value={businessData.password}
														onChange={e =>
															setBusinessData({
																...businessData,
																password: e.target.value,
															})
														}
													/>
													<Button
														type='button'
														variant='ghost'
														size='icon'
														className='absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-zinc-400 hover:text-zinc-600'
														onClick={() => setShowPassword(!showPassword)}
													>
														{showPassword ? (
															<EyeOff className='h-4 w-4' />
														) : (
															<Eye className='h-4 w-4' />
														)}
													</Button>
												</div>
											</div>

											<div className='space-y-2'>
												<Label className='text-sm font-medium text-zinc-700 ml-1'>
													Biznes haqida (ixtiyoriy)
												</Label>
												<Textarea
													placeholder='Biznesingiz haqida qisqacha maʼlumot bering...'
													className='min-h-[100px] px-4 py-3 rounded-xl border-zinc-200 focus:border-zinc-900 focus:ring-zinc-900 transition-all bg-white shadow-sm resize-none'
													value={businessData.about}
													onChange={e =>
														setBusinessData({
															...businessData,
															about: e.target.value,
														})
													}
												/>
											</div>
										</div>

										{error && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												className='p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2'
											>
												<div className='h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse' />
												{error}
											</motion.div>
										)}

										<Button
											type='submit'
											disabled={isLoading}
											className='w-full h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300'
										>
											{isLoading ? (
												<Loader2 className='h-5 w-5 animate-spin' />
											) : (
												'Biznes hisob yaratish'
											)}
										</Button>

										<div className='flex items-center gap-3 py-2'>
											<div className='h-[1px] flex-1 bg-zinc-200' />
											<span className='text-xs font-medium text-zinc-400 uppercase tracking-widest'>
												yoki
											</span>
											<div className='h-[1px] flex-1 bg-zinc-200' />
										</div>

										<Button
											variant='outline'
											className='w-full h-12 rounded-xl border-zinc-200 hover:bg-zinc-50 transition-colors font-medium flex items-center justify-center gap-3'
										>
											<Chrome className='h-5 w-5 text-zinc-900' />
											Google bilan davom etish
										</Button>
									</form>
								</TabsContent>
							</motion.div>
						</AnimatePresence>
					</Tabs>

					{/* Footer Links */}
					<div className='text-center space-y-4'>
						<p className='text-sm text-zinc-500'>
							Hisobingiz bormi?{' '}
							<Link
								href='/login'
								className='text-zinc-900 font-semibold hover:underline decoration-zinc-900 underline-offset-4'
							>
								Kirish
							</Link>
						</p>

						<div className='pt-8 border-t border-zinc-100'>
							<div className='flex items-center justify-center gap-2'>
								<Sparkles className='h-4 w-4 text-zinc-400' />
								<span className='text-[11px] font-medium text-zinc-400 uppercase tracking-[0.2em]'>
									Premium Booking Experience
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
