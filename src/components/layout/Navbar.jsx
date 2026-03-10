'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, Info, LogOut, Phone, Scissors, Search, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
	const pathname = usePathname()
	const { user: session, logout } = useAuth()
	const [isOpen, setIsOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const isModernDark = false

	useEffect(() => {
		setMounted(true)
		document.body.classList.add('mobile-nav-padding')
		return () => {
			document.body.classList.remove('mobile-nav-padding')
		}
	}, [])

	const handleLogout = async () => {
		await logout()
		setIsOpen(false)
	}

	const getDashboardLink = () => {
		if (!session) return '/login'
		switch (session.role) {
			case 'admin':
				return '/admin/dashboard'
			case 'business':
				return '/business/dashboard'
			case 'employee':
				return '/employee/dashboard'
			default:
				return '/client/dashboard'
		}
	}

	const navLinks = [
		{ name: 'Bosh sahifa', href: '/', icon: Home },
		{ name: 'Salonlar', href: '/salons', icon: Search },
		{ name: 'Biz haqimizda', href: '/about', icon: Info },
		{ name: 'Aloqa', href: '/contact', icon: Phone },
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
					<div className='flex flex-col gap-4'>
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
							className='w-full justify-center h-12 rounded-xl text-zinc-600 hover:bg-zinc-100'
							asChild
							onClick={() => setIsOpen(false)}
						>
							<Link href={getDashboardLink()}>Dashboard</Link>
						</Button>
						<Button
							variant='outline'
							onClick={handleLogout}
							className='w-full justify-center h-12 rounded-xl text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700'
						>
							<LogOut className='w-5 h-5 mr-2' /> Tizimdan chiqish
						</Button>
					</div>
				)
			}

			return (
				<div className='flex items-center gap-4'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className='flex items-center gap-3 hover:bg-zinc-50 px-2 py-1.5 rounded-full transition-colors'>
								<div className='h-10 w-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center'>
									<User className='w-5 h-5 text-zinc-600' />
								</div>
								<div className='hidden lg:block text-sm text-left pr-2'>
									<p className='font-medium text-zinc-900 leading-none mb-1'>
										{session.name
											? session.name
											: session.role === 'business'
												? 'Biznes Profil'
												: 'Mijoz'}
									</p>
									<p className='text-zinc-500 text-xs'>{session.phone}</p>
								</div>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							className='w-56 rounded-xl p-2 gap-1 flex flex-col'
						>
							<DropdownMenuItem asChild className='rounded-lg cursor-pointer'>
								<Link
									href={getDashboardLink()}
									className='flex items-center font-medium'
								>
									<User className='mr-2 h-4 w-4 text-zinc-500' />
									<span>Dashboard</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={handleLogout}
								className='rounded-lg cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 font-medium'
							>
								<LogOut className='mr-2 h-4 w-4' />
								<span>Tizimdan chiqish</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		}

		if (isMobile) {
			return (
				<div className='flex flex-col gap-3'>
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
		<>
			<nav
				className={`fixed top-0 left-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
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
					</div>
				</div>
			</nav>

			{/* Mobile Bottom Navigation Card */}
			<div className='md:hidden fixed bottom-6 left-4 right-4 z-[100]'>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, y: 20, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 20, scale: 0.95 }}
							transition={{ duration: 0.2 }}
							className='absolute bottom-[calc(100%+16px)] left-0 w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-zinc-100 overflow-hidden p-5'
						>
							{renderAuthSection(true)}
						</motion.div>
					)}
				</AnimatePresence>

				<div className='bg-white/95 backdrop-blur-xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl px-6 py-4 flex items-center justify-between'>
					{navLinks.map(link => {
						const isActive = pathname === link.href
						const Icon = link.icon
						return (
							<Link
								key={link.name}
								href={link.href}
								onClick={() => setIsOpen(false)}
								className={`flex flex-col items-center gap-1.5 transition-colors ${
									isActive
										? 'text-zinc-900'
										: 'text-zinc-400 hover:text-zinc-600'
								}`}
							>
								<div
									className={`relative flex items-center justify-center transition-all ${isActive ? 'scale-110' : ''}`}
								>
									<Icon
										className={`w-6 h-6 ${isActive ? 'stroke-2' : 'stroke-[1.5]'}`}
									/>
									{isActive && (
										<motion.div
											layoutId='bubble'
											className='absolute -inset-2 bg-zinc-100 -z-10 rounded-full'
											transition={{
												type: 'spring',
												bounce: 0.2,
												duration: 0.6,
											}}
										/>
									)}
								</div>
								<span
									className={`text-[10px] font-medium ${isActive ? 'text-zinc-900 font-semibold' : ''}`}
								>
									{link.name}
								</span>
							</Link>
						)
					})}

					{/* Profile Tab */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className={`flex flex-col items-center gap-1.5 transition-colors ${
							isOpen ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
						}`}
					>
						<div
							className={`relative flex items-center justify-center transition-all ${isOpen ? 'scale-110' : ''}`}
						>
							{session ? (
								<div
									className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isOpen ? 'border-zinc-900' : 'border-zinc-400'}`}
								>
									<User
										className={`w-4 h-4 ${isOpen ? 'stroke-2' : 'stroke-[1.5]'}`}
									/>
								</div>
							) : (
								<User
									className={`w-6 h-6 ${isOpen ? 'stroke-2' : 'stroke-[1.5]'}`}
								/>
							)}
							{isOpen && (
								<motion.div
									layoutId='bubble'
									className='absolute -inset-2 bg-zinc-100 -z-10 rounded-full'
									transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
								/>
							)}
						</div>
						<span
							className={`text-[10px] font-medium ${isOpen ? 'text-zinc-900 font-semibold' : ''}`}
						>
							Profil
						</span>
					</button>
				</div>
			</div>
		</>
	)
}
