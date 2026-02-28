'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import {
	ArrowLeft,
	Building,
	Chrome,
	Eye,
	EyeOff,
	Scissors,
	User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PatternFormat } from 'react-number-format'

export default function RegisterPage() {
	const router = useRouter()
	const [activeTab, setActiveTab] = useState('client')
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	// Form states
	const [clientData, setClientData] = useState({
		name: '',
		phone: '',
		password: '',
	})
	const [businessData, setBusinessData] = useState({
		type: '',
		name: '',
		phone: '',
		password: '',
	})

	const handleRegister = e => {
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
			// Assuming 9 digits after +998
			setError("Telefon raqam to'liq emas")
			return
		}
		if (currentData.password.length < 6) {
			setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak")
			return
		}

		setIsLoading(true)

		// Simulate API call
		setTimeout(() => {
			const sessionData = {
				id:
					(activeTab === 'client' ? 'usr_' : 'biz_') +
					Math.random().toString(36).substr(2, 9),
				name: currentData.name,
				phone: '+' + cleanPhone,
				role: activeTab,
				token: 'fake-jwt-token-xyz',
			}

			localStorage.setItem('aura_session', JSON.stringify(sessionData))
			window.dispatchEvent(new Event('storage'))
			router.push('/')
			router.refresh()
		}, 1000)
	}

	return (
		<div className='min-h-screen bg-zinc-50 flex flex-col md:flex-row font-sans selection:bg-zinc-200 selection:text-zinc-900 overflow-hidden'>
			{/* Left Side: Brand Imagery (Sticky) */}
			<div className='hidden md:flex w-1/2 p-6 h-screen sticky top-0'>
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					className='relative w-full h-full rounded-[2.5rem] overflow-hidden flex flex-col justify-end p-12'
				>
					<Image
						src='/images/hero.png'
						alt='Aura Booking Reception'
						fill
						className='object-cover'
						priority
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-900/40 to-transparent'></div>

					<div className='relative z-10 text-white max-w-lg mb-8'>
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.3, duration: 0.6 }}
							className='inline-flex items-center gap-3 mb-8'
						>
							<div className='p-3 bg-white/10 backdrop-blur-md rounded-2xl'>
								<Scissors className='h-8 w-8 text-white' strokeWidth={1.5} />
							</div>
							<span className='font-semibold text-3xl tracking-tight'>
								Aura Booking
							</span>
						</motion.div>

						<motion.h2
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.4, duration: 0.6 }}
							className='text-4xl font-bold mb-4 leading-tight'
						>
							Yangi go'zallik davri boshlandi
						</motion.h2>

						<motion.p
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.6 }}
							className='text-zinc-300 text-lg leading-relaxed'
						>
							Mijozlar uchun qulaylik, salonlar va ustalar uchun daromadli
							ekotizim. O'z o'rningizni hoziroq band qiling.
						</motion.p>
					</div>

					{/* decorative glass card */}
					<motion.div
						initial={{ y: 30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.6, duration: 0.6 }}
						className='relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl max-w-sm'
					>
						<div className='flex -space-x-4 mb-4'>
							{[...Array(4)].map((_, i) => (
								<div
									key={i}
									className='w-12 h-12 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-white text-xs font-bold'
								>
									<User className='w-5 h-5 text-zinc-400' />
								</div>
							))}
							<div className='w-12 h-12 rounded-full border-2 border-zinc-900 bg-white flex items-center justify-center text-zinc-900 text-xs font-bold'>
								+10k
							</div>
						</div>
						<p className='text-sm text-zinc-300 font-medium'>
							Barchasi biz bilan birga
						</p>
					</motion.div>
				</motion.div>
			</div>

			{/* Right Side: Form (Scrollable) */}
			<div className='w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto min-h-screen'>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
					className='w-full max-w-md w-full'
				>
					{/* Mobile Logo & Back button */}
					<div className='flex md:hidden items-center justify-between mb-12'>
						<Link href='/' className='inline-flex items-center gap-2 group'>
							<div className='p-2 bg-zinc-900 rounded-xl'>
								<Scissors className='h-5 w-5 text-white' strokeWidth={1.5} />
							</div>
							<span className='font-semibold text-xl text-zinc-900 tracking-tight'>
								Aura Booking
							</span>
						</Link>
					</div>

					<div className='hidden md:block mb-10'>
						<Link
							href='/'
							className='inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors'
						>
							<ArrowLeft className='w-4 h-4 mr-2' /> Bosh sahifaga qaytish
						</Link>
					</div>

					<div className='mb-10'>
						<h1 className='text-3xl font-bold text-zinc-900 tracking-tight mb-3'>
							Ro'yxatdan o'tish
						</h1>
						<p className='text-zinc-500'>
							O'zingizga kerakli profil turini tanlang va ma'lumotlarni
							kiriting.
						</p>
					</div>

					{error && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className='mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100'
						>
							{error}
						</motion.div>
					)}

					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className='w-full'
					>
						<TabsList className='grid w-full grid-cols-2 h-14 mb-8 bg-zinc-100 rounded-2xl p-1.5'>
							<TabsTrigger
								value='client'
								className='rounded-xl font-medium text-zinc-500 data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm transition-all focus-visible:ring-0'
							>
								<User className='w-4 h-4 mr-2' /> Mijoz
							</TabsTrigger>
							<TabsTrigger
								value='business'
								className='rounded-xl font-medium text-zinc-500 data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm transition-all focus-visible:ring-0'
							>
								<Building className='w-4 h-4 mr-2' /> Biznes
							</TabsTrigger>
						</TabsList>

						<form onSubmit={handleRegister}>
							{/* Client Registration */}
							<TabsContent
								value='client'
								className='space-y-6 focus-visible:ring-0 mt-0'
							>
								<div className='flex flex-col gap-5'>
									<div className='space-y-2'>
										<Label
											htmlFor='c_name'
											className='text-zinc-700 font-medium'
										>
											To'liq ismingiz
										</Label>
										<Input
											id='c_name'
											placeholder='Ism va familiya'
											value={clientData.name}
											onChange={e =>
												setClientData({ ...clientData, name: e.target.value })
											}
											className='h-12 rounded-xl bg-zinc-50 border-zinc-200 focus-visible:ring-zinc-900'
										/>
									</div>

									<div className='space-y-2'>
										<Label
											htmlFor='c_phone'
											className='text-zinc-700 font-medium'
										>
											Telefon raqamingiz
										</Label>
										<div className='relative'>
											<span className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium'>
												+998
											</span>
											<PatternFormat
												id='c_phone'
												format='(##) ### ## ##'
												allowEmptyFormatting
												mask='_'
												value={clientData.phone}
												onValueChange={values =>
													setClientData({ ...clientData, phone: values.value })
												}
												className='flex h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-16 pr-4 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50'
											/>
										</div>
									</div>

									<div className='space-y-2'>
										<Label
											htmlFor='c_pass'
											className='text-zinc-700 font-medium'
										>
											Parol o'ylab toping
										</Label>
										<div className='relative'>
											<input
												id='c_pass'
												type={showPassword ? 'text' : 'password'}
												value={clientData.password}
												onChange={e =>
													setClientData({
														...clientData,
														password: e.target.value,
													})
												}
												placeholder='••••••••'
												className='flex h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 pr-12'
											/>
											<button
												type='button'
												onClick={() => setShowPassword(!showPassword)}
												className='absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors'
											>
												{showPassword ? (
													<EyeOff className='w-5 h-5' />
												) : (
													<Eye className='w-5 h-5' />
												)}
											</button>
										</div>
									</div>
								</div>
							</TabsContent>

							{/* Business Registration */}
							<TabsContent
								value='business'
								className='space-y-6 focus-visible:ring-0 mt-0'
							>
								<div className='flex flex-col gap-5'>
									<div className='space-y-2'>
										<Label
											htmlFor='b_type'
											className='text-zinc-700 font-medium'
										>
											Biznes turi
										</Label>
										<select
											id='b_type'
											value={businessData.type}
											onChange={e =>
												setBusinessData({
													...businessData,
													type: e.target.value,
												})
											}
											className='w-full h-12 rounded-xl bg-zinc-50 border border-zinc-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 text-zinc-700'
										>
											<option value=''>Tanlang...</option>
											<option value='salon'>
												Yirik Go'zallik Saloni (Bir nechta usta)
											</option>
											<option value='master'>
												Yakka tartibdagi usta (Sartarosh, vizajist)
											</option>
											<option value='spa'>Spa & Massaj Markazi</option>
										</select>
									</div>

									<div className='space-y-2'>
										<Label
											htmlFor='b_name'
											className='text-zinc-700 font-medium'
										>
											Salon yoki Usta nomi
										</Label>
										<Input
											id='b_name'
											placeholder='Masalan: Aura Premium yoki Alisher (usta)'
											value={businessData.name}
											onChange={e =>
												setBusinessData({
													...businessData,
													name: e.target.value,
												})
											}
											className='h-12 rounded-xl bg-zinc-50 border-zinc-200 focus-visible:ring-zinc-900'
										/>
									</div>

									<div className='space-y-2'>
										<Label
											htmlFor='b_phone'
											className='text-zinc-700 font-medium'
										>
											Aloqa biznes raqami
										</Label>
										<div className='relative'>
											<span className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium'>
												+998
											</span>
											<PatternFormat
												id='b_phone'
												format='(##) ### ## ##'
												allowEmptyFormatting
												mask='_'
												value={businessData.phone}
												onValueChange={values =>
													setBusinessData({
														...businessData,
														phone: values.value,
													})
												}
												className='flex h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-16 pr-4 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50'
											/>
										</div>
									</div>

									<div className='space-y-2'>
										<Label
											htmlFor='b_pass'
											className='text-zinc-700 font-medium'
										>
											Parol o'ylab toping
										</Label>
										<div className='relative'>
											<input
												id='b_pass'
												type={showPassword ? 'text' : 'password'}
												value={businessData.password}
												onChange={e =>
													setBusinessData({
														...businessData,
														password: e.target.value,
													})
												}
												placeholder='••••••••'
												className='flex h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 pr-12'
											/>
											<button
												type='button'
												onClick={() => setShowPassword(!showPassword)}
												className='absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors'
											>
												{showPassword ? (
													<EyeOff className='w-5 h-5' />
												) : (
													<Eye className='w-5 h-5' />
												)}
											</button>
										</div>
									</div>
								</div>
							</TabsContent>

							<Button
								type='submit'
								disabled={isLoading}
								className='w-full h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-base mt-8 shadow-md hover:shadow-lg transition-all disabled:opacity-70'
							>
								{isLoading
									? 'Iltimos, kuting...'
									: activeTab === 'client'
										? 'Profil yaratish'
										: 'Biznes profil yaratish'}
							</Button>
						</form>
					</Tabs>

					<div className='relative my-10'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-zinc-200'></div>
						</div>
						<div className='relative flex justify-center text-sm'>
							<span className='px-4 bg-zinc-50 text-zinc-500 font-medium'>
								Yoki
							</span>
						</div>
					</div>

					<div className='space-y-4'>
						<Button
							variant='outline'
							className='w-full h-12 rounded-xl border-zinc-200 bg-white hover:bg-zinc-50 font-medium text-zinc-700 transition-colors'
						>
							<Chrome className='w-5 h-5 mr-3 text-zinc-700' /> Google orqali
							davom etish
						</Button>
					</div>

					<p className='text-center text-sm text-zinc-500 mt-10 font-medium'>
						Allaqachon profilingiz bormi?{' '}
						<Link
							href='/login'
							className='text-zinc-900 font-semibold hover:underline decoration-zinc-900/50 underline-offset-4'
						>
							Tizimga kirish
						</Link>
					</p>
				</motion.div>
			</div>
		</div>
	)
}
