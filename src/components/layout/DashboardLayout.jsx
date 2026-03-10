'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext'
import { AnimatePresence, motion } from 'framer-motion'
import {
	BarChart3,
	Briefcase,
	Calendar,
	CreditCard,
	LayoutDashboard,
	LogOut,
	Menu,
	Scissors,
	Search,
	Settings,
	ShieldAlert,
	Store,
	User,
	Users,
	X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

// Define sidebar links based on role
const ROLE_LINKS = {
	admin: [
		{
			name: 'Boshqaruv Paneli',
			href: '/admin/dashboard',
			icon: LayoutDashboard,
		},
		{ name: 'Biznes Egalari', href: '/admin/businessmen', icon: Briefcase },
		{ name: 'Salonlar', href: '/admin/salons', icon: Scissors },
		{ name: 'Foydalanuvchilar', href: '/admin/users', icon: Users },
		{ name: 'Statistika', href: '/admin/stats', icon: BarChart3 },
	],
	business: [
		{
			name: 'Boshqaruv Paneli',
			href: '/business/dashboard',
			icon: LayoutDashboard,
		},
		{ name: 'Yozuvlar (Bron)', href: '/business/bookings', icon: Calendar },
		{ name: 'Mijozlar', href: '/business/clients', icon: Users },
		{ name: 'Xodimlar', href: '/business/employees', icon: Users },
		{ name: 'Xizmatlar & Narxlar', href: '/business/services', icon: Scissors },
		{ name: 'Filiallar', href: '/business/salons', icon: Store },
		{ name: 'Moliya', href: '/business/finance', icon: CreditCard },
	],
	employee: [
		{
			name: 'Boshqaruv Paneli',
			href: '/employee/dashboard',
			icon: LayoutDashboard,
		},
		{ name: 'Mening Yozuvlarim', href: '/employee/bookings', icon: Calendar },
		{ name: 'Moliya', href: '/employee/finance', icon: CreditCard },
	],
	client: [
		{ name: 'Profilim', href: '/client/dashboard', icon: LayoutDashboard },
		{ name: 'Mening Yozuvlarim', href: '/client/bookings', icon: Calendar },
		{ name: 'Salonlar', href: '/client/salons', icon: Store },
		{ name: 'Moliya', href: '/client/finance', icon: CreditCard },
	],
}

export default function DashboardLayout({ children, role = 'client' }) {
	const [isSidebarOpen, setSidebarOpen] = useState(false)
	const pathname = usePathname()
	const router = useRouter()
	const { user: session, logout, loading } = useAuth()

	const links = ROLE_LINKS[role] || ROLE_LINKS.client

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-zinc-50'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900'></div>
			</div>
		)
	}

	const handleLogout = async () => {
		await logout()
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
									? ' Biznes'
									: role === 'admin'
										? ' Admin'
										: role === 'employee'
											? ' Usta'
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
						<div className='h-8 w-[1px] bg-zinc-200 hidden sm:block'></div>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='ghost'
									className='flex items-center gap-3 p-1 sm:p-2 rounded-full hover:bg-zinc-100 transition-all outline-none group'
								>
									<div className='hidden sm:block text-right'>
										<p className='text-sm font-medium text-zinc-900 leading-none mb-1'>
											{session?.name || 'Foydalanuvchi'}
										</p>
										<p className='text-[10px] text-zinc-500 uppercase tracking-wider font-bold'>
											{role === 'admin'
												? 'Admin'
												: role === 'business'
													? 'Biznes'
													: role === 'employee'
														? 'Usta'
														: 'Mijoz'}
										</p>
									</div>
									<div className='h-10 w-10 bg-zinc-900 rounded-full border border-zinc-200 flex items-center justify-center flex-shrink-0 group-hover:scale-95 transition-transform'>
										<User className='h-5 w-5 text-white' strokeWidth={1.5} />
									</div>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align='end'
								className='w-56 mt-1 rounded-2xl p-2'
							>
								<DropdownMenuLabel className='px-3 py-2'>
									<p className='text-sm font-bold text-zinc-900'>
										{session?.name}
									</p>
									<p className='text-xs text-zinc-500 font-medium'>
										{session?.phone}
									</p>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => router.push(`/${role}/profile`)}
									className='rounded-xl p-2.5 font-medium cursor-pointer'
								>
									<Settings className='h-4 w-4 mr-2 text-zinc-500' />
									Profil sozlamalari
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={handleLogout}
									className='rounded-xl p-2.5 font-medium text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer'
								>
									<LogOut className='h-4 w-4 mr-2' />
									Tizimdan chiqish
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>

				{/* Page Content Scrollable Area */}
				<div className='flex-1 overflow-y-auto bg-zinc-50 p-4 sm:p-6 lg:p-8'>
					<div className='max-w-6xl mx-auto h-full'>
						{role === 'business' && session && session.isConfirmed === false ? (
							<div className='flex flex-col items-center justify-center min-h-[70vh] text-center max-w-md mx-auto'>
								<div className='h-20 w-20 bg-amber-50 rounded-full flex items-center justify-center mb-6'>
									<ShieldAlert
										className='h-10 w-10 text-amber-500'
										strokeWidth={1.5}
									/>
								</div>
								<h1 className='text-2xl font-bold text-zinc-900 mb-2'>
									Akkaunt Tasdiqlanmagan
								</h1>
								<p className='text-zinc-500 mb-8'>
									Aura Booking tizimiga xush kelibsiz! Biznesingiz ro'yxatdan
									o'tkazildi, ammo CRM panelidan foydalanish uchun administrator
									tizimni tasdiqlashi (yoxud aloqaga chiqishi) kutilmoqda.
								</p>
								<Button
									className='w-full bg-zinc-900 text-white rounded-xl h-11'
									onClick={handleLogout}
								>
									Tizimdan chiqish
								</Button>
							</div>
						) : (
							children
						)}
					</div>
				</div>
			</main>
		</div>
	)
}
