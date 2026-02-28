'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import {
	BarChart3,
	Bell,
	Calendar,
	CreditCard,
	LayoutDashboard,
	LogOut,
	Menu,
	Scissors,
	Search,
	Settings,
	Star,
	Users,
	X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Define sidebar links based on role
const ROLE_LINKS = {
	admin: [
		{
			name: 'Boshqaruv Paneli',
			href: '/admin/dashboard',
			icon: LayoutDashboard,
		},
		{ name: 'Salonlar', href: '/admin/salons', icon: Scissors },
		{ name: 'Foydalanuvchilar', href: '/admin/users', icon: Users },
		{ name: 'Statistika', href: '/admin/stats', icon: BarChart3 },
		{ name: 'Sozlamalar', href: '/admin/settings', icon: Settings },
	],
	business: [
		{ name: 'Xulosa', href: '/business/dashboard', icon: LayoutDashboard },
		{ name: 'Yozuvlar (Bron)', href: '/business/bookings', icon: Calendar },
		{ name: 'Mijozlar', href: '/business/clients', icon: Users },
		{ name: 'Xizmatlar & Narxlar', href: '/business/services', icon: Scissors },
		{ name: 'Moliya', href: '/business/finance', icon: CreditCard },
		{ name: 'Sharhlar', href: '/business/reviews', icon: Star },
		{ name: 'Sozlamalar', href: '/business/settings', icon: Settings },
	],
	client: [
		{ name: 'Profilim', href: '/client/dashboard', icon: LayoutDashboard },
		{ name: 'Mening Yozuvlarim', href: '/client/bookings', icon: Calendar },
		{ name: 'Saqlangan Salonlar', href: '/client/favorites', icon: Star },
		{ name: 'Sozlamalar', href: '/client/settings', icon: Settings },
	],
}

export default function DashboardLayout({ children, role = 'client' }) {
	const [isSidebarOpen, setSidebarOpen] = useState(false)
	const pathname = usePathname()
	const router = useRouter()
	const [session, setSession] = useState(null)

	useEffect(() => {
		const data = localStorage.getItem('aura_session')
		if (data) {
			try {
				const s = JSON.parse(data)
				setSession(s)
			} catch (e) {}
		} else {
			// If no session, redirect to login
			router.push('/login')
		}
	}, [router])

	const links = ROLE_LINKS[role] || ROLE_LINKS.client

	const handleLogout = () => {
		localStorage.removeItem('aura_session')
		window.dispatchEvent(new Event('storage'))
		router.push('/login')
	}

	return (
		<div className='min-h-screen bg-zinc-50 flex'>
			{/* Mobile Sidebar Overlay */}
			<AnimatePresence>
				{isSidebarOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setSidebarOpen(false)}
						className='fixed inset-0 bg-zinc-900/50 z-40 lg:hidden backdrop-blur-sm'
					/>
				)}
			</AnimatePresence>

			{/* Sidebar */}
			<motion.aside
				className={`fixed top-0 left-0 z-50 h-screen w-[280px] bg-white border-r border-zinc-200 transform transition-transform duration-300 ease-in-out flex flex-col ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
				}`}
			>
				<div className='h-20 flex items-center px-6 border-b border-zinc-100 flex-shrink-0 justify-between'>
					<Link href='/' className='flex items-center gap-3 group'>
						<div className='p-2 bg-zinc-900 rounded-xl'>
							<Scissors className='h-5 w-5 text-white' strokeWidth={1.5} />
						</div>
						<span className='font-semibold text-lg tracking-tight text-zinc-900'>
							Aura{' '}
							<span className='text-zinc-500'>
								{role === 'business'
									? 'Biznes'
									: role === 'admin'
										? 'Admin'
										: ''}
							</span>
						</span>
					</Link>

					{/* Close button for mobile */}
					<Button
						variant='ghost'
						size='icon'
						className='lg:hidden'
						onClick={() => setSidebarOpen(false)}
					>
						<X className='h-5 w-5' />
					</Button>
				</div>

				<div className='flex-1 overflow-y-auto py-6 space-y-1'>
					{links.map(link => {
						const isActive =
							pathname === link.href || pathname.startsWith(link.href + '/')
						const Icon = link.icon

						return (
							<Link key={link.name} href={link.href} className='block px-4'>
								<div
									className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
										isActive
											? 'bg-zinc-900 text-white font-medium shadow-md'
											: 'text-zinc-500 hover:bg-zinc-100/80 hover:text-zinc-900 font-medium'
									}`}
								>
									<Icon
										className='h-5 w-5 flex-shrink-0'
										strokeWidth={isActive ? 2 : 1.5}
									/>
									<span>{link.name}</span>
								</div>
							</Link>
						)
					})}
				</div>

				<div className='p-4 border-t border-zinc-100 flex-shrink-0 mt-auto'>
					<Button
						variant='ghost'
						className='w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 h-12 rounded-xl'
						onClick={handleLogout}
					>
						<LogOut className='h-5 w-5 mr-3' strokeWidth={1.5} />
						Tizimdan chiqish
					</Button>
				</div>
			</motion.aside>

			{/* Main Content */}
			<main className='flex-1 flex flex-col min-w-0 h-screen overflow-hidden lg:pl-[280px]'>
				{/* Top Header */}
				<header className='h-20 bg-white/80 backdrop-blur-xl border-b border-zinc-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 sticky top-0 flex-shrink-0'>
					<div className='flex items-center gap-4'>
						<Button
							variant='ghost'
							size='icon'
							className=''
							onClick={() => setSidebarOpen(true)}
						>
							<Menu className='h-5 w-5' />
						</Button>

						{/* Search Bar (Optional, can hide on mobile) */}
						<div className='hidden md:flex relative w-96'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400' />
							<input
								type='text'
								placeholder='Qidirish...'
								className='h-10 w-full pl-10 pr-4 bg-zinc-100/50 border-transparent rounded-full text-sm focus:border-zinc-300 focus:bg-white focus:ring-0 transition-all outline-none'
							/>
						</div>
					</div>

					<div className='flex items-center gap-3 sm:gap-5'>
						<Button
							variant='ghost'
							size='icon'
							className='relative text-zinc-500 rounded-full h-10 w-10 border border-zinc-200'
						>
							<Bell className='h-5 w-5' strokeWidth={1.5} />
							<span className='absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white'></span>
						</Button>

						<div className='h-8 w-[1px] bg-zinc-200 hidden sm:block'></div>

						<div className='flex items-center gap-3'>
							<div className='hidden sm:block text-right'>
								<p className='text-sm font-medium text-zinc-900 leading-none mb-1'>
									{session?.name || 'Foydalanuvchi'}
								</p>
								<p className='text-xs text-zinc-500'>
									{role === 'admin'
										? 'Administrator'
										: role === 'business'
											? 'Biznes Egasi'
											: 'Mijoz'}
								</p>
							</div>
							<div className='h-10 w-10 bg-zinc-100 rounded-full border border-zinc-200 flex items-center justify-center flex-shrink-0'>
								<Users className='h-5 w-5 text-zinc-600' />
							</div>
						</div>
					</div>
				</header>

				{/* Page Content Scrollable Area */}
				<div className='flex-1 overflow-y-auto bg-zinc-50 p-4 sm:p-6 lg:p-8'>
					<div className='max-w-6xl mx-auto h-full'>{children}</div>
				</div>
			</main>
		</div>
	)
}
