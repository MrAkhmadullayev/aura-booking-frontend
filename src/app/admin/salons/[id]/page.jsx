'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import {
	ArrowLeft,
	Ban,
	Building2,
	Calendar,
	CheckCircle,
	Clock,
	ImageIcon,
	MapPin,
	Phone,
	ShieldAlert,
	ShieldCheck,
	Star,
	Trash2,
	Users,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AdminSalonDetails({ params }) {
	const { id } = use(params)
	const router = useRouter()
	const [salon, setSalon] = useState(null)
	const [masters, setMasters] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [salonRes, mastersRes] = await Promise.all([
					api.get(`/salons/${id}`),
					api.get(`/salons/${id}/employees`),
				])
				setSalon(salonRes.data)
				setMasters(mastersRes.data || [])
			} catch (error) {
				console.error('Detail Error:', error)
				toast.error(
					error.response?.data?.message ||
						"Salon ma'lumotlarini yuklashda xatolik",
				)
				// router.push('/admin/salons')
			} finally {
				setIsLoading(false)
			}
		}
		if (id) fetchData()
	}, [id, router])

	const updateStatus = async newStatus => {
		try {
			const res = await api.patch(`/salons/admin/${id}/status`, {
				status: newStatus,
			})
			setSalon(res.data)
			toast.success('Salon holati yangilandi')
		} catch (error) {
			toast.error('Holatni oʻzgartirishda xatolik yuz berdi')
		}
	}

	const deleteSalon = async () => {
		if (
			window.confirm(
				"Haqiqatan ham ushbu salonni o'chirmoqchimisiz? Barcha bronlar va ulanishlar o'chadi.",
			)
		) {
			try {
				await api.delete(`/salons/admin/${id}`)
				toast.success("Salon o'chirildi")
				router.push('/admin/salons')
			} catch (error) {
				toast.error("O'chirishda xatolik yuz berdi")
			}
		}
	}

	if (isLoading) {
		return (
			<DashboardLayout role='admin'>
				<div className='max-w-5xl mx-auto space-y-6'>
					<Skeleton className='h-10 w-48 rounded-md' />
					<Skeleton className='h-[250px] w-full rounded-2xl' />
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<div className='md:col-span-2 space-y-6'>
							<Skeleton className='h-[300px] w-full rounded-2xl' />
						</div>
						<Skeleton className='h-[300px] w-full rounded-2xl' />
					</div>
				</div>
			</DashboardLayout>
		)
	}

	if (!salon) return null

	return (
		<DashboardLayout role='admin'>
			<div className='max-w-5xl mx-auto space-y-6 pb-12'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-4'>
						<Link href='/admin/salons'>
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
								{salon.name}
							</h1>
							<p className='text-zinc-500 text-sm'>
								ID: #{salon._id.slice(-6)} • {salon.type}
							</p>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						{salon.status === 'active' ? (
							<Button
								variant='outline'
								onClick={() => updateStatus('inactive')}
								className='border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 hover:text-amber-800 rounded-xl'
							>
								<Ban className='w-4 h-4 mr-2' /> Vaqtincha to'xtatish
							</Button>
						) : (
							<Button
								variant='outline'
								onClick={() => updateStatus('active')}
								className='border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 rounded-xl'
							>
								<CheckCircle className='w-4 h-4 mr-2' /> Faollashtirish
							</Button>
						)}
						<Button
							variant='outline'
							onClick={deleteSalon}
							className='border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl'
						>
							<Trash2 className='w-4 h-4' />
						</Button>
					</div>
				</div>

				<div className='relative h-[240px] w-full rounded-2xl overflow-hidden bg-zinc-900 flex items-center justify-center shadow-md'>
					{salon.coverImage ? (
						<img
							src={salon.coverImage}
							alt={salon.name}
							className='absolute inset-0 w-full h-full object-cover opacity-60'
						/>
					) : (
						<div className='absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 flex items-center justify-center opacity-80'>
							<ImageIcon className='w-16 h-16 text-zinc-700' />
						</div>
					)}
					<div className='absolute bottom-6 left-6 right-6 flex items-end justify-between'>
						<div className='flex items-center gap-4'>
							<div className='h-20 w-20 rounded-2xl bg-white flex items-center justify-center shadow-lg border-2 border-white/20 text-3xl font-bold text-zinc-900 uppercase overflow-hidden'>
								{salon.logo ? (
									<img
										src={salon.logo}
										alt='Logo'
										className='w-full h-full object-cover'
									/>
								) : (
									salon.name.charAt(0)
								)}
							</div>
							<div className='text-white'>
								<h2 className='text-3xl font-bold tracking-tight'>
									{salon.name}
								</h2>
								<div className='flex items-center gap-4 mt-2 text-sm font-medium'>
									<span className='flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md'>
										<Star className='w-4 h-4 text-amber-400 fill-amber-400' />{' '}
										{salon.rating || 'Yangi'}
									</span>
									<span className='flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md'>
										{salon.status === 'active' ? (
											<>
												<ShieldCheck className='w-4 h-4 text-emerald-400' />{' '}
												Faol
											</>
										) : salon.status === 'inactive' ? (
											<>
												<Ban className='w-4 h-4 text-red-400' /> To'xtatilgan
											</>
										) : (
											<>
												<ShieldAlert className='w-4 h-4 text-amber-400' />{' '}
												Kutmoqda
											</>
										)}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='md:col-span-2 space-y-6'>
						<Card className='border-none shadow-sm rounded-2xl'>
							<CardHeader className='pb-2'>
								<CardTitle className='text-lg font-bold flex items-center gap-2'>
									<Building2 className='w-5 h-5 text-zinc-400' />
									Salon Haqida
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-zinc-600 leading-relaxed text-sm'>
									{salon.about ||
										"Salon haqida batafsil ma'lumot kiritilmagan."}
								</p>

								<div className='grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-zinc-100'>
									<div className='flex gap-3'>
										<div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0'>
											<MapPin className='w-5 h-5 text-blue-600' />
										</div>
										<div>
											<p className='text-xs font-medium text-zinc-500'>
												Manzil
											</p>
											<p className='text-sm font-semibold text-zinc-900 mt-0.5 max-w-[200px]'>
												{salon.address}
											</p>
										</div>
									</div>

									<div className='flex gap-3'>
										<div className='w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0'>
											<Clock className='w-5 h-5 text-emerald-600' />
										</div>
										<div>
											<p className='text-xs font-medium text-zinc-500'>
												Ish vaqti
											</p>
											<p className='text-sm font-semibold text-zinc-900 mt-0.5'>
												{Array.isArray(salon.workHours)
													? salon.workHours.find(d => d.day === 'Dushanba')
														? salon.workHours.find(d => d.day === 'Dushanba')
																.isOpen
															? `${salon.workHours.find(d => d.day === 'Dushanba').open} - ${salon.workHours.find(d => d.day === 'Dushanba').close}`
															: 'Yopiq'
														: salon.workHours[0]?.isOpen
															? `${salon.workHours[0].open} - ${salon.workHours[0].close}`
															: 'Yopiq'
													: salon.workHours || '09:00 - 18:00'}
											</p>
										</div>
									</div>

									<div className='flex gap-3'>
										<div className='w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0'>
											<Phone className='w-5 h-5 text-purple-600' />
										</div>
										<div>
											<p className='text-xs font-medium text-zinc-500'>
												Aloqa uchun
											</p>
											<p className='text-sm font-semibold text-zinc-900 mt-0.5 flex flex-col'>
												<span>{salon.contacts?.phone || 'Kiritilmagan'}</span>
												{salon.contacts?.instagram && (
													<span className='text-xs text-blue-600'>
														@{salon.contacts.instagram}
													</span>
												)}
											</p>
										</div>
									</div>

									<div className='flex gap-3'>
										<div className='w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0'>
											<Calendar className='w-5 h-5 text-amber-600' />
										</div>
										<div>
											<p className='text-xs font-medium text-zinc-500'>
												Ro'yxatdan o'tgan
											</p>
											<p className='text-sm font-semibold text-zinc-900 mt-0.5'>
												{new Date(salon.createdAt).toLocaleDateString('uz-UZ')}
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Masters Section preview */}
						<Card className='border-none shadow-sm rounded-2xl'>
							<CardHeader className='pb-4 border-b border-zinc-100 flex flex-row items-center justify-between'>
								<CardTitle className='text-lg font-bold flex items-center gap-2'>
									<Users className='w-5 h-5 text-zinc-400' />
									Ustalar Jamoasi
								</CardTitle>
								<div className='bg-zinc-100 text-zinc-600 text-xs font-bold px-3 py-1 rounded-full'>
									{masters.length} nafar
								</div>
							</CardHeader>
							<CardContent className='pt-6'>
								{masters.length > 0 ? (
									<div className='grid grid-cols-2 gap-4'>
										{masters.map((master, idx) => (
											<div
												key={idx}
												className='flex items-center gap-3 p-3 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 transition-colors'
											>
												<div className='w-12 h-12 rounded-full bg-zinc-200 overflow-hidden flex-shrink-0'>
													{master.image ? (
														<img
															src={master.image}
															alt={master.name}
															className='w-full h-full object-cover'
														/>
													) : (
														<div className='w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold'>
															{master.name.charAt(0)}
														</div>
													)}
												</div>
												<div>
													<p className='font-bold text-sm text-zinc-900'>
														{master.name}
													</p>
													<p className='text-xs text-zinc-500'>
														{master.about?.slice(0, 30)}
														{master.about?.length > 30 ? '...' : ''}
													</p>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className='text-center py-8 text-zinc-500'>
										<p>Hozircha ustalar qo'shilmagan</p>
									</div>
								)}
							</CardContent>
						</Card>
					</div>

					<div className='space-y-6'>
						<Card className='border-none shadow-sm rounded-2xl bg-zinc-900 text-white'>
							<CardHeader className='pb-2'>
								<CardTitle className='text-lg font-bold text-white'>
									Biznes Egasi
								</CardTitle>
							</CardHeader>
							<CardContent>
								{salon.ownerId ? (
									<div className='space-y-4'>
										<div className='flex gap-3 items-center'>
											<div className='w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-lg font-bold uppercase'>
												{salon.ownerId.name.charAt(0)}
											</div>
											<div>
												<p className='font-bold text-white'>
													{salon.ownerId.name}
												</p>
												<p className='text-zinc-400 text-sm'>
													{salon.ownerId.phone}
												</p>
											</div>
										</div>
										<Button
											className='w-full bg-white text-zinc-900 hover:bg-zinc-100 mt-2 rounded-xl'
											variant='secondary'
											onClick={() =>
												router.push(`/admin/businessmen/${salon.ownerId._id}`)
											}
										>
											Profilini ko'rish
										</Button>
									</div>
								) : (
									<p className='text-sm text-zinc-400'>
										Egasi haqida ma'lumot topilmadi
									</p>
								)}
							</CardContent>
						</Card>

						{/* Quick Analytics Card placeholder */}
						<Card className='border-none shadow-sm rounded-2xl'>
							<CardHeader className='pb-2'>
								<CardTitle className='text-lg font-bold text-zinc-900'>
									Statistika
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									<div className='flex justify-between items-center py-3 border-b border-zinc-100'>
										<p className='text-sm text-zinc-500'>Jami xizmatlar</p>
										<p className='font-bold text-zinc-900 text-lg'>
											{salon.services ? salon.services.length : 0}
										</p>
									</div>
									<div className='flex justify-between items-center py-3 border-b border-zinc-100'>
										<p className='text-sm text-zinc-500'>Ustalar</p>
										<p className='font-bold text-zinc-900 text-lg'>
											{masters.length}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</DashboardLayout>
	)
}
