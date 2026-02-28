'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import {
	ArrowLeft,
	Building,
	Chrome,
	Eye,
	EyeOff,
	Scissors,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PatternFormat } from 'react-number-format'

const MOCK_USERS = [
	{
		id: 'adm_1',
		name: 'Admin',
		phone: '+998901234567',
		password: 'password123',
		role: 'admin',
		token: 'admin-token-xyz',
	},
	{
		id: 'biz_1',
		name: 'Aura Premium Salon',
		phone: '+998991112233',
		password: 'password123',
		role: 'business',
		token: 'biz-token-xyz',
	},
	{
		id: 'usr_1',
		name: 'Sadriddin (Mijoz)',
		phone: '+998940001122',
		password: 'password123',
		role: 'client',
		token: 'client-token-xyz',
	},
]

export default function LoginPage() {
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleLogin = e => {
		e.preventDefault()
		setError('')

		if (!phone || !password) {
			setError("Iltimos, barcha maydonlarni to'ldiring")
			return
		}

		setIsLoading(true)
		// Simulate API call
		setTimeout(() => {
			const cleanPhone = '+998' + phone.replace(/[^0-9]/g, '')

			// Mock finding user
			const user = MOCK_USERS.find(
				u => u.phone === cleanPhone && u.password === password,
			)

			if (user) {
				const sessionData = {
					id: user.id,
					name: user.name,
					phone: user.phone,
					role: user.role,
					token: user.token,
				}

				localStorage.setItem('aura_session', JSON.stringify(sessionData))

				window.dispatchEvent(new Event('storage'))
				router.push(`/${user.role}/dashboard`)
				router.refresh()
			} else {
				setError("Telefon raqam yoki parol noto'g'ri")
				setIsLoading(false)
			}
		}, 800)
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
						src='/images/master.png'
						alt='Aura Booking Professional'
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
							Qaytganingizdan xursandmiz
						</motion.h2>

						<motion.p
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.6 }}
							className='text-zinc-300 text-lg leading-relaxed'
						>
							Profilingizga kiring va vaqtingizni o'zingiz boshqaring. Eng a'lo
							xizmatlar yana siz bilan.
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
							{[...Array(3)].map((_, i) => (
								<div
									key={i}
									className='w-12 h-12 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-white text-xs font-bold'
								>
									<Building className='w-5 h-5 text-zinc-400' />
								</div>
							))}
							<div className='w-12 h-12 rounded-full border-2 border-zinc-900 bg-white flex items-center justify-center text-zinc-900 text-xs font-bold'>
								+500
							</div>
						</div>
						<p className='text-sm text-zinc-300 font-medium'>
							Barcha Premium Salonlar ushbu tizimda
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
							Tizimga kirish
						</h1>
						<p className='text-zinc-500'>
							Tizimga kirish uchun telefon raqamingiz va parolingizni kiriting.
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

					{/* Demo Accounts Info */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className='mb-8 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl'
					>
						<p className='text-xs font-semibold text-blue-900 mb-3 uppercase tracking-wider'>
							Test hisoblari (Parol: password123)
						</p>
						<div className='space-y-2 text-sm text-blue-800'>
							<div className='flex justify-between items-center'>
								<span className='opacity-70'>Admin:</span>{' '}
								<span className='font-mono bg-blue-100 px-2 py-0.5 rounded text-xs select-all'>
									90 123 45 67
								</span>
							</div>
							<div className='flex justify-between items-center'>
								<span className='opacity-70'>Salon:</span>{' '}
								<span className='font-mono bg-blue-100 px-2 py-0.5 rounded text-xs select-all'>
									99 111 22 33
								</span>
							</div>
							<div className='flex justify-between items-center'>
								<span className='opacity-70'>Mijoz:</span>{' '}
								<span className='font-mono bg-blue-100 px-2 py-0.5 rounded text-xs select-all'>
									94 000 11 22
								</span>
							</div>
						</div>
					</motion.div>

					{/* Unified Login Form */}
					<form onSubmit={handleLogin} className='flex flex-col gap-6 relative'>
						<div className='space-y-2'>
							<Label htmlFor='phone' className='text-zinc-700 font-medium'>
								Telefon raqamingiz
							</Label>
							<div className='relative'>
								<span className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium'>
									+998
								</span>
								<PatternFormat
									id='phone'
									format='(##) ### ## ##'
									allowEmptyFormatting
									mask='_'
									value={phone}
									onValueChange={values => setPhone(values.value)}
									className='flex h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-16 pr-4 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50'
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<Label htmlFor='pass' className='text-zinc-700 font-medium'>
									Parol
								</Label>
								<Link
									href='#'
									className='text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors'
								>
									Yodingizdan chiqdimi?
								</Link>
							</div>
							<div className='relative'>
								<input
									id='pass'
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={e => setPassword(e.target.value)}
									placeholder='••••••••'
									className='flex h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 pr-12'
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

						<Button
							type='submit'
							disabled={isLoading}
							className='w-full h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-base mt-2 shadow-md hover:shadow-lg transition-all disabled:opacity-70'
						>
							{isLoading ? 'Iltimos, kuting...' : 'Kirish'}
						</Button>
					</form>

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
						Hali profilingiz yo'qmi?{' '}
						<Link
							href='/register'
							className='text-zinc-900 font-semibold hover:underline decoration-zinc-900/50 underline-offset-4'
						>
							Ro'yxatdan o'tish
						</Link>
					</p>
				</motion.div>
			</div>
		</div>
	)
}
