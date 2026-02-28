'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, Menu, Scissors, User, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
	const pathname = usePathname()
	const router = useRouter()
	const isModernDark = false

	const [isOpen, setIsOpen] = useState(false)
	const [session, setSession] = useState(null)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		const checkSession = () => {
			const data = localStorage.getItem('aura_session')
			if (data) {
				try {
					setSession(JSON.parse(data))
				} catch (e) {}
			} else {
				setSession(null)
			}
		}

		checkSession()
		window.addEventListener('storage', checkSession)
		return () => window.removeEventListener('storage', checkSession)
	}, [])

	const handleLogout = () => {
		localStorage.removeItem('aura_session')
		setSession(null)
		setIsOpen(false)
		window.dispatchEvent(new Event('storage'))
		router.refresh()
	}

	const navLinks = [
		{ name: 'Bosh sahifa', href: '/' },
		{ name: 'Salonlar', href: '/salons' },
		{ name: 'Biz haqimizda', href: '/about' },
		{ name: 'Aloqa', href: '/contact' },
	]

	// Don't render auth buttons until mounted to prevent hydration errors
	const renderAuthSection = (isMobile = false) => {
		if (!mounted) {
			return isMobile ? (
				<div className='h-24 animate-pulse bg-zinc-100 rounded-xl w-full' />
			) : (
				<div className='w-[180px] h-10 animate-pulse bg-zinc-100 rounded-xl' />
			)
		}

		if (session) {
			if (isMobile) {
				return (
					<div className='flex flex-col gap-4 py-4 border-t border-zinc-100 mt-2'>
						<div className='flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl'>
							<div className='h-12 w-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center'>
								<User className='w-6 h-6 text-zinc-600' />
							</div>
							<div>
								<p className='font-semibold text-zinc-900 leading-none mb-1 text-base'>
									{session.name
										? session.name
										: session.role === 'business'
											? 'Biznes Profil'
											: 'Mijoz'}
								</p>
								<p className='text-zinc-500 text-sm'>{session.phone}</p>
							</div>
						</div>
						<Button
							variant='outline'
							onClick={handleLogout}
							className='w-full justify-center h-12 rounded-xl text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700'
						>
							<LogOut className='w-5 h-5 mr-2' /> Profildan chiqish
						</Button>
					</div>
				)
			}

			return (
				<div className='flex items-center gap-4'>
					<div className='flex items-center gap-3'>
						<div className='h-10 w-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center'>
							<User className='w-5 h-5 text-zinc-600' />
						</div>
						<div className='hidden lg:block text-sm'>
							<p className='font-medium text-zinc-900 leading-none mb-1'>
								{session.name
									? session.name
									: session.role === 'business'
										? 'Biznes Profil'
										: 'Mijoz'}
							</p>
							<p className='text-zinc-500 text-xs'>{session.phone}</p>
						</div>
					</div>
					<Button
						variant='ghost'
						size='icon'
						onClick={handleLogout}
						className='h-10 w-10 rounded-full text-zinc-500 hover:text-red-600 hover:bg-red-50 flex-shrink-0'
					>
						<LogOut className='w-5 h-5' />
					</Button>
				</div>
			)
		}

		if (isMobile) {
			return (
				<div className='pt-6 mt-2 border-t border-zinc-100 flex flex-col gap-3'>
					<Button
						variant='outline'
						className='w-full justify-center h-12 rounded-xl text-base'
						asChild
						onClick={() => setIsOpen(false)}
					>
						<Link href='/login'>Kirish</Link>
					</Button>
					<Button
						className='w-full justify-center h-12 rounded-xl bg-zinc-900 text-white text-base'
						asChild
						onClick={() => setIsOpen(false)}
					>
						<Link href='/register'>Ro'yxatdan o'tish</Link>
					</Button>
				</div>
			)
		}

		return (
			<div className='flex items-center gap-3'>
				<Link href='/login'>
					<Button
						variant='ghost'
						className='font-medium hover:bg-zinc-100/80 rounded-xl text-zinc-600'
					>
						Kirish
					</Button>
				</Link>
				<Link href='/register'>
					<Button className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-sm px-6 font-medium'>
						Ro'yxatdan o'tish
					</Button>
				</Link>
			</div>
		)
	}

	return (
		<nav
			className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
				isModernDark
					? 'bg-zinc-950/80 border-zinc-800'
					: 'bg-white/80 border-zinc-100'
			}`}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex h-20 items-center justify-between'>
					{/* Logo */}
					<div className='flex-shrink-0 flex items-center gap-3'>
						<Link href='/' className='flex items-center gap-3 group'>
							<div className='p-2.5 bg-zinc-900 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-md'>
								<Scissors className='h-5 w-5 text-white' strokeWidth={1.5} />
							</div>
							<span
								className={`font-semibold text-xl tracking-tight ${
									isModernDark ? 'text-white' : 'text-zinc-900'
								}`}
							>
								Aura Booking
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center space-x-1'>
						{navLinks.map(link => {
							const isActive = pathname === link.href
							return (
								<Link
									key={link.name}
									href={link.href}
									className={`px-4 py-2.5 rounded-full text-[15px] font-medium transition-all duration-200 relative ${
										isActive
											? isModernDark
												? 'text-white bg-white/10'
												: 'text-zinc-900 bg-zinc-100/80'
											: isModernDark
												? 'text-zinc-400 hover:text-white hover:bg-white/5'
												: 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
									}`}
								>
									{link.name}
								</Link>
							)
						})}
					</div>

					{/* Action Buttons */}
					<div className='hidden md:flex items-center gap-4'>
						{renderAuthSection(false)}
					</div>

					{/* Mobile menu button */}
					<div className='md:hidden flex items-center'>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className='text-zinc-800 focus:outline-none p-2'
						>
							{isOpen ? (
								<X className='h-6 w-6' strokeWidth={1.5} />
							) : (
								<Menu className='h-6 w-6' strokeWidth={1.5} />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className='md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-xl overflow-hidden'
					>
						<div className='px-6 py-6 space-y-4 flex flex-col'>
							{navLinks.map(link => (
								<Link
									key={link.name}
									href={link.href}
									className='text-lg font-medium text-zinc-800 hover:text-zinc-500'
									onClick={() => setIsOpen(false)}
								>
									{link.name}
								</Link>
							))}
							{renderAuthSection(true)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	)
}
