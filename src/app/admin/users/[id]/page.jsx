'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import {
	ArrowLeft,
	Ban,
	CalendarDays,
	CheckCircle,
	CreditCard,
	Info,
	Phone,
	Trash2,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AdminUserDetails({ params }) {
	const { id } = use(params)
	const router = useRouter()
	const [user, setUser] = useState(null)
	const [bookings, setBookings] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const [userRes, bookingsRes] = await Promise.all([
					api.get(`/users/admin/${id}`),
					api.get(`/bookings/admin/user/${id}`).catch(() => ({ data: [] })),
				])
				setUser(userRes.data)
				setBookings(bookingsRes.data)
			} catch (error) {
				toast.error("Foydalanuvchi ma'lumotlarini yuklashda xatolik yuz berdi")
				router.push('/admin/users')
			} finally {
				setIsLoading(false)
			}
		}

		if (id) fetchUserDetails()
	}, [id, router])

	const handleToggleStatus = async () => {
		try {
			await api.patch(`/users/admin/${id}/status`, {})
			setUser(prev => ({ ...prev, isBlocked: !prev.isBlocked }))
			toast.success("Foydalanuvchi holati o'zgartirildi")
		} catch (err) {
			toast.error('Holatni oʻzgartirishda xatolik yuz berdi')
		}
	}

	const handleDeleteUser = async () => {
		if (
			window.confirm(
				"Haqiqatan ham ushbu foydalanuvchini o'chirmoqchimisiz? Amalni ortga qaytarib bo'lmaydi.",
			)
		) {
			try {
				await api.delete(`/users/admin/${id}`)
				toast.success("Foydalanuvchi o'chirildi")
				router.push('/admin/users')
			} catch (err) {
				toast.error("O'chirishda xatolik yuz berdi")
			}
		}
	}

	if (isLoading) {
		return (
			<DashboardLayout role='admin'>
				<div className='max-w-4xl mx-auto space-y-6'>
					<Skeleton className='h-10 w-48 rounded-md' />
					<Skeleton className='h-[200px] w-full rounded-2xl' />
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<Skeleton className='h-[400px] w-full rounded-2xl md:col-span-2' />
						<Skeleton className='h-[400px] w-full rounded-2xl' />
					</div>
				</div>
			</DashboardLayout>
		)
	}

	if (!user) return null

	const isBlocked = user.isBlocked
	const roleName =
		user.role === 'admin'
			? 'Admin'
			: user.role === 'business'
				? 'Biznes Egasi'
				: 'Mijoz'

	return (
		<DashboardLayout role='admin'>
			<div className='max-w-5xl mx-auto space-y-6 pb-12'>
				<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
					<div className='flex items-center gap-4'>
						<Link href='/admin/users'>
							<Button
								variant='ghost'
								size='icon'
								className='h-10 w-10 rounded-full bg-white border border-zinc-200 shadow-sm'
							>
								<ArrowLeft className='w-5 h-5 text-zinc-600' />
							</Button>
						</Link>
						<div>
							<h1 className='text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2'>
								Foydalanuvchi Profili
							</h1>
							<p className='text-zinc-500 text-sm'>So'nggi faollik: Yaqinda</p>
						</div>
					</div>

					<div className='flex items-center gap-2'>
						{user.role !== 'admin' && (
							<Button
								variant='outline'
								onClick={handleToggleStatus}
								className={
									!isBlocked
										? 'border-zinc-200 text-zinc-700 hover:bg-zinc-100 rounded-xl'
										: 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl'
								}
							>
								{!isBlocked ? (
									<>
										<Ban className='w-4 h-4 mr-2 text-zinc-400' /> Bloklash
									</>
								) : (
									<>
										<CheckCircle className='w-4 h-4 mr-2 text-emerald-600' />{' '}
										Blokdan chiqarish
									</>
								)}
							</Button>
						)}

						{user.role !== 'admin' && (
							<Button
								variant='outline'
								onClick={handleDeleteUser}
								className='border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl'
							>
								<Trash2 className='w-4 h-4' />
							</Button>
						)}
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='md:col-span-1 space-y-6'>
						<Card className='border-none shadow-sm rounded-2xl overflow-hidden'>
							<div className='bg-zinc-900 h-24 relative'>
								{/* Placeholder cover */}
								<div className='absolute -bottom-10 left-6'>
									<div className='w-20 h-20 bg-white p-1 rounded-2xl shadow-sm'>
										<div className='w-full h-full bg-zinc-100 rounded-xl flex items-center justify-center text-3xl font-bold text-zinc-800 uppercase'>
											{user.name.charAt(0)}
										</div>
									</div>
								</div>
							</div>
							<CardContent className='pt-14 pb-8 px-6'>
								<h2 className='text-xl font-bold text-zinc-900 flex items-center gap-2'>
									{user.name}
									{user.role === 'admin' && (
										<span className='bg-indigo-100 text-indigo-700 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded'>
											Admin
										</span>
									)}
								</h2>
								<div className='flex items-center gap-2 mt-2 text-sm text-zinc-600 font-medium'>
									<Phone className='w-4 h-4 text-zinc-400' />
									{user.phone}
								</div>

								<div className='mt-6 space-y-4 pt-6 border-t border-zinc-100'>
									<div className='flex justify-between items-center'>
										<span className='text-sm text-zinc-500'>Rol</span>
										<span className='font-semibold text-zinc-900 text-sm'>
											{roleName}
										</span>
									</div>
									<div className='flex justify-between items-center'>
										<span className='text-sm text-zinc-500'>
											Ro'yxatdan o'tgan
										</span>
										<span className='font-semibold text-zinc-900 text-sm'>
											{new Date(user.createdAt).toLocaleDateString('uz-UZ')}
										</span>
									</div>
									<div className='flex justify-between items-center'>
										<span className='text-sm text-zinc-500'>Holat</span>
										{isBlocked ? (
											<span className='text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-100'>
												Bloklangan
											</span>
										) : (
											<span className='text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100'>
												Faol
											</span>
										)}
									</div>
								</div>
							</CardContent>
						</Card>

						{user.about && (
							<Card className='border-none shadow-sm rounded-2xl'>
								<CardHeader className='pb-3'>
									<CardTitle className='text-sm flex items-center gap-2 text-zinc-600 uppercase tracking-wider font-bold'>
										<Info className='w-4 h-4' /> O'zi haqida
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-sm text-zinc-700 leading-relaxed italic'>
										"{user.about}"
									</p>
								</CardContent>
							</Card>
						)}
					</div>

					<div className='md:col-span-2 space-y-6'>
						<div className='grid grid-cols-2 gap-4'>
							<Card className='border-none shadow-sm rounded-2xl bg-white'>
								<CardContent className='p-6 flex items-center gap-4'>
									<div className='w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0'>
										<CalendarDays className='w-6 h-6' />
									</div>
									<div>
										<p className='text-sm font-medium text-zinc-500'>
											Jami bronlar
										</p>
										<p className='text-2xl font-bold text-zinc-900'>
											{bookings.length}
										</p>
									</div>
								</CardContent>
							</Card>
							<Card className='border-none shadow-sm rounded-2xl bg-white'>
								<CardContent className='p-6 flex items-center gap-4'>
									<div className='w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0'>
										<CheckCircle className='w-6 h-6' />
									</div>
									<div>
										<p className='text-sm font-medium text-zinc-500'>
											Muvaffaqiyatli xizmatlar
										</p>
										<p className='text-2xl font-bold text-zinc-900'>
											{bookings.filter(b => b.status === 'completed').length}
										</p>
									</div>
								</CardContent>
							</Card>
						</div>

						<Card className='border-none shadow-sm rounded-2xl'>
							<CardHeader className='border-b border-zinc-100'>
								<CardTitle className='text-lg font-bold text-zinc-900'>
									So'nggi Bronlar Tarixi
								</CardTitle>
							</CardHeader>
							<CardContent className='p-0'>
								{bookings.length > 0 ? (
									<div className='divide-y divide-zinc-100'>
										{bookings.map(booking => (
											<div
												key={booking._id}
												className='p-4 hover:bg-zinc-50 transition-colors flex items-center justify-between'
											>
												<div className='flex items-center gap-4'>
													<div className='w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-500 font-bold'>
														{new Date(booking.date).getDate()}
													</div>
													<div>
														<p className='text-sm font-bold text-zinc-900'>
															{booking.serviceId?.name || 'Xizmat'}
														</p>
														<p className='text-xs text-zinc-500 mt-0.5'>
															{new Date(booking.date).toLocaleDateString(
																'uz-UZ',
															)}{' '}
															y. • {booking.time} • {booking.salonId?.name}
														</p>
													</div>
												</div>
												<div className='text-right'>
													{booking.status === 'completed' && (
														<span className='text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md'>
															Bajarildi
														</span>
													)}
													{booking.status === 'pending' && (
														<span className='text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md'>
															Kutmoqda
														</span>
													)}
													{booking.status === 'rejected' && (
														<span className='text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md'>
															Rad etildi
														</span>
													)}
													<p className='text-sm font-bold text-zinc-900 mt-2 flex items-center gap-1 justify-end'>
														<CreditCard className='w-3 h-3 text-zinc-400' />{' '}
														{booking.totalPrice?.toLocaleString()} so'm
													</p>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className='text-center py-16 px-6'>
										<div className='w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4'>
											<CalendarDays className='w-8 h-8 text-zinc-300' />
										</div>
										<h3 className='text-zinc-900 font-bold text-lg mb-2'>
											Bronlar mavjud emas
										</h3>
										<p className='text-sm text-zinc-500 max-w-sm mx-auto'>
											Ushbu foydalanuvchi hozircha hech qanday xizmatni bron
											qilmagan.
										</p>
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</DashboardLayout>
	)
}
