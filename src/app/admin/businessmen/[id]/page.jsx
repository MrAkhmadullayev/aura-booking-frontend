'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import api from '@/lib/api'
import {
	ArrowLeft,
	Ban,
	Building2,
	CheckCircle,
	Edit2,
	Eye,
	Loader2,
	MapPin,
	Phone,
	Plus,
	Save,
	Scissors,
	ShieldAlert,
	Trash2,
	User,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { toast } from 'sonner'

const BUSINESS_TYPES = [
	{ id: 'beauty_salon', label: 'Ayollar saloni' },
	{ id: 'barbershop', label: 'Barbershop' },
	{ id: 'spa', label: 'Spa va dam olish' },
	{ id: 'children_massage', label: 'Bolalar massaji' },
	{ id: 'adult_massage', label: 'Kattalar massaji' },
	{ id: 'cosmetology_manicure', label: 'Kosmetologiya va manikur' },
	{ id: 'sport_center', label: 'Sport markazlari' },
	{ id: 'none', label: 'Soha tanlanmagan' },
]

export default function BusinessmanDetails({ params }) {
	// Unwrap params in Next.js 15+
	const { id } = use(params)
	const router = useRouter()

	const [user, setUser] = useState(null)
	const [salon, setSalon] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isSaving, setIsSaving] = useState(false)
	const [error, setError] = useState('')

	// Edit states toggles
	const [isEditingUser, setIsEditingUser] = useState(false)
	const [isEditingSalon, setIsEditingSalon] = useState(false)

	// Edit states
	const [editUser, setEditUser] = useState({
		name: '',
		phone: '',
		businessType: '',
		about: '',
	})

	const [editSalon, setEditSalon] = useState({
		name: '',
		type: '',
		address: '',
		phone: '',
		workHours: '',
	})

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				setIsLoading(true)
				// Fetch user
				const userRes = await api.get(`/users/admin/${id}`)

				if (userRes.data.role !== 'business') {
					router.push('/admin/businessmen') // Not a business owner
					return
				}

				setUser(userRes.data)
				setEditUser({
					name: userRes.data.name,
					phone: userRes.data.phone,
					businessType: userRes.data.businessType || 'none',
					about: userRes.data.about || '',
				})

				try {
					const salonRes = await api.get(`/salons/admin/owner/${id}`)
					if (salonRes.data && salonRes.data.length > 0) {
						const ownerSalon = salonRes.data[0]

						let formattedWorkHours = '09:00 - 18:00'
						if (Array.isArray(ownerSalon.workHours)) {
							const monday =
								ownerSalon.workHours.find(d => d.day === 'Dushanba') ||
								ownerSalon.workHours[0]
							if (monday)
								formattedWorkHours = monday.isOpen
									? `${monday.open} - ${monday.close}`
									: 'Yopiq'
						} else if (typeof ownerSalon.workHours === 'string') {
							formattedWorkHours = ownerSalon.workHours
						}

						const processedSalon = {
							...ownerSalon,
							processedWorkHours: formattedWorkHours,
						}

						setSalon(processedSalon)
						setEditSalon({
							name: ownerSalon.name,
							type: ownerSalon.type,
							address: ownerSalon.address,
							phone: ownerSalon.contacts?.phone || '',
							workHours: formattedWorkHours,
							about: ownerSalon.about || '',
						})

						// Try to fetch stats
						Promise.all([
							api
								.get(`/salons/${ownerSalon._id}/employees`)
								.catch(() => ({ data: [] })),
						]).then(([masters]) => {
							setSalon(prev => ({
								...prev,
								mastersCount: masters.data?.length || 0,
							}))
						})
					}
				} catch (err) {
					// 404 is expected if they haven't created a salon yet
					if (err.response?.status !== 404) {
						console.warn('Could not fetch salon', err)
					}
				}
			} catch (err) {
				console.error('Error fetching details:', err)
				setError("Ma'lumotlarni yuklashda xatolik yuz berdi")
			} finally {
				setIsLoading(false)
			}
		}

		if (id) {
			fetchDetails()
		}
	}, [id, router])

	const handleUpdateUser = async e => {
		e.preventDefault()
		setIsSaving(true)
		try {
			await api.put(`/users/admin/${id}`, editUser)
			setUser(prev => ({ ...prev, ...editUser }))
			setIsEditingUser(false)
			toast.success('Muvaffaqiyatli saqlandi')
		} catch (err) {
			toast.error(err.response?.data?.message || 'Xatolik yuz berdi')
		} finally {
			setIsSaving(false)
		}
	}

	const handleUpdateSalon = async e => {
		e.preventDefault()
		setIsSaving(true)
		try {
			const payload = {
				name: editSalon.name,
				type: editSalon.type,
				address: editSalon.address,
				workHours: editSalon.workHours,
				about: editSalon.about,
				contacts: {
					phone: editSalon.phone,
					instagram: salon?.contacts?.instagram,
					telegram: salon?.contacts?.telegram,
				},
			}

			if (salon) {
				// Edit existing
				await api.put(`/salons/admin/${salon._id}`, payload)
				setSalon(prev => ({ ...prev, ...payload }))
			} else {
				// Create new
				payload.ownerId = id
				const res = await api.post('/salons/admin', payload)
				setSalon(res.data)
				toast.success('Yangi salon muvaffaqiyatli yaratildi')
			}
			setIsEditingSalon(false)
			toast.success("Salon ma'lumotlari saqlandi")
		} catch (err) {
			toast.error(err.response?.data?.message || 'Xatolik yuz berdi')
		} finally {
			setIsSaving(false)
		}
	}

	const handleToggleStatus = async () => {
		try {
			await api.patch(`/users/admin/${id}/status`, {})
			setUser(prev => ({ ...prev, isBlocked: !prev.isBlocked }))
			toast.success("Holat o'zgartirildi")
		} catch (err) {
			toast.error('Holatni oʻzgartirishda xatolik yuz berdi')
		}
	}

	const handleToggleConfirmation = async () => {
		try {
			await api.patch(`/users/admin/${id}/confirm`, {})
			setUser(prev => ({ ...prev, isConfirmed: !prev.isConfirmed }))
			toast.success("Tasdiqlash o'zgartirildi")
		} catch (err) {
			toast.error('Tasdiqlashda xatolik yuz berdi')
		}
	}

	const handleDeleteUser = async () => {
		if (
			window.confirm(
				"Haqiqatan ham o'chirmoqchimisiz? Salon bilan birga barcha ma'lumotlar yo'qoladi.",
			)
		) {
			try {
				await api.delete(`/users/admin/${id}`)
				toast.success("Foydalanuvchi o'chirildi")
				router.push('/admin/businessmen')
			} catch (err) {
				toast.error("O'chirishda xatolik yuz berdi")
			}
		}
	}

	if (isLoading) {
		return (
			<DashboardLayout role='admin'>
				<div className='flex items-center justify-center min-h-[50vh]'>
					<Loader2 className='w-8 h-8 animate-spin text-zinc-400' />
				</div>
			</DashboardLayout>
		)
	}

	if (error || !user) {
		return (
			<DashboardLayout role='admin'>
				<div className='flex flex-col items-center justify-center min-h-[50vh]'>
					<ShieldAlert className='w-12 h-12 text-red-500 mb-4' />
					<h2 className='text-xl font-bold text-zinc-900'>Xatolik</h2>
					<p className='text-zinc-500'>{error}</p>
					<Button
						className='mt-4'
						onClick={() => router.push('/admin/businessmen')}
					>
						Ortga qaytish
					</Button>
				</div>
			</DashboardLayout>
		)
	}

	return (
		<DashboardLayout role='admin'>
			<div className='space-y-6 max-w-5xl mx-auto pb-12'>
				{/* Top Actions Header */}
				<div className='flex flex-col md:flex-row items-center gap-4 justify-between bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-zinc-100'>
					<div className='flex items-center gap-4 w-full md:w-auto'>
						<Link href='/admin/businessmen'>
							<Button
								variant='ghost'
								size='icon'
								className='h-12 w-12 rounded-full bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 shadow-sm transition-all'
							>
								<ArrowLeft className='w-5 h-5 text-zinc-600' />
							</Button>
						</Link>
						<div className='flex items-center gap-4'>
							<div className='h-12 w-12 bg-indigo-50 text-indigo-600 font-bold text-xl uppercase rounded-xl flex items-center justify-center border border-indigo-100 shrink-0'>
								{user.name.charAt(0)}
							</div>
							<div>
								<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
									{user.name}
								</h1>
								<p className='text-zinc-500 text-sm font-medium'>
									Ro'yxatdan o'tdi:{' '}
									{new Date(user.createdAt).toLocaleDateString('uz-UZ')}
								</p>
							</div>
						</div>
					</div>

					<div className='flex flex-wrap items-center gap-2 w-full md:w-auto'>
						<Button
							variant='outline'
							onClick={handleToggleConfirmation}
							className={`h-10 px-4 rounded-xl font-medium transition-colors ${
								user.isConfirmed
									? 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800'
									: 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 hover:text-amber-800'
							}`}
						>
							{user.isConfirmed ? (
								<>
									<CheckCircle className='w-4 h-4 mr-2' /> Tasdiqlangan
								</>
							) : (
								<>
									<ShieldAlert className='w-4 h-4 mr-2' /> Kutmoqda
								</>
							)}
						</Button>

						<Button
							variant='outline'
							onClick={handleToggleStatus}
							className={`h-10 px-4 rounded-xl font-medium transition-colors ${
								!user.isBlocked
									? 'border-zinc-200 text-zinc-700 hover:bg-zinc-100'
									: 'border-red-200 text-red-700 bg-red-50 hover:bg-red-100'
							}`}
						>
							{!user.isBlocked ? (
								<>
									<Ban className='w-4 h-4 mr-2 text-zinc-400' /> Bloklash
								</>
							) : (
								<>
									<CheckCircle className='w-4 h-4 mr-2 text-red-600' /> Blokdan
									chiqarish
								</>
							)}
						</Button>

						<Button
							variant='outline'
							onClick={handleDeleteUser}
							className='h-10 px-4 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700'
						>
							<Trash2 className='w-4 h-4 mr-2' /> O'chirish
						</Button>
					</div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					{/* User Form */}
					<Card className='border-none shadow-sm rounded-2xl overflow-hidden'>
						<CardHeader className='pb-4 border-b border-zinc-100 bg-zinc-50/50 flex flex-row items-center justify-between'>
							<CardTitle className='text-lg font-bold flex items-center gap-2 text-zinc-800'>
								<User className='w-5 h-5 text-indigo-500' />
								Shaxsiy Ma'lumotlar
							</CardTitle>
							<Button
								variant='ghost'
								size='sm'
								onClick={() => setIsEditingUser(!isEditingUser)}
								className='text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-100'
							>
								{isEditingUser ? (
									'Bekor qilish'
								) : (
									<>
										<Edit2 className='w-4 h-4 mr-2' /> Tahrirlash
									</>
								)}
							</Button>
						</CardHeader>
						<CardContent className='pt-6'>
							{!isEditingUser ? (
								<div className='space-y-6'>
									<div className='grid grid-cols-2 gap-6'>
										<div>
											<p className='text-sm text-zinc-500 font-medium mb-1'>
												F.I.SH
											</p>
											<p className='font-bold text-[15px] text-zinc-900 bg-zinc-50/50 p-2.5 rounded-xl border border-zinc-100'>
												{user.name}
											</p>
										</div>
										<div>
											<p className='text-sm text-zinc-500 font-medium mb-1'>
												Telefon raqam
											</p>
											<a
												href={`tel:${user.phone}`}
												className='font-bold text-[15px] text-blue-600 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 flex items-center gap-2 hover:bg-blue-50 transition-colors'
											>
												<Phone className='w-4 h-4' /> {user.phone}
											</a>
										</div>
									</div>

									<div>
										<p className='text-sm text-zinc-500 font-medium mb-1'>
											Faoliyat Sohasi
										</p>
										<div className='inline-flex items-center font-bold text-zinc-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 text-sm'>
											{BUSINESS_TYPES.find(t => t.id === user.businessType)
												?.label ||
												BUSINESS_TYPES.find(t => t.id === 'none').label}
										</div>
									</div>

									<div>
										<p className='text-sm text-zinc-500 font-medium mb-1'>
											Tadbirkor Haqida
										</p>
										<div className='bg-zinc-50 p-4 rounded-xl border border-zinc-100 text-sm font-medium text-zinc-700 leading-relaxed min-h-[80px]'>
											{user.about ? (
												user.about
											) : (
												<span className='text-zinc-400 italic'>
													Ma'lumot kiritilmagan. O'zi haqida hech narsa
													yozmagan.
												</span>
											)}
										</div>
									</div>
								</div>
							) : (
								<form onSubmit={handleUpdateUser} className='space-y-4'>
									<div className='space-y-2'>
										<Label htmlFor='name'>F.I.SH</Label>
										<Input
											id='name'
											value={editUser.name}
											onChange={e =>
												setEditUser({ ...editUser, name: e.target.value })
											}
											className='h-11 rounded-xl bg-zinc-50'
											required
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='phone'>Telefon raqam</Label>
										<Input
											id='phone'
											value={editUser.phone}
											onChange={e =>
												setEditUser({ ...editUser, phone: e.target.value })
											}
											className='h-11 rounded-xl bg-zinc-50'
											required
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='businessType'>Faoliyat Sohasi</Label>
										<select
											id='businessType'
											value={editUser.businessType}
											onChange={e =>
												setEditUser({
													...editUser,
													businessType: e.target.value,
												})
											}
											className='w-full h-11 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-medium text-sm'
										>
											{BUSINESS_TYPES.map(type => (
												<option key={type.id} value={type.id}>
													{type.label}
												</option>
											))}
										</select>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='about'>Tadbirkor Haqida (ixtiyoriy)</Label>
										<textarea
											id='about'
											value={editUser.about}
											onChange={e =>
												setEditUser({ ...editUser, about: e.target.value })
											}
											className='w-full min-h-[100px] p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-medium text-sm resize-none'
											placeholder='Biznes egasi haqida ma`lumot...'
										/>
									</div>
									<Button
										type='submit'
										disabled={isSaving}
										className='w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-md'
									>
										{isSaving ? (
											<Loader2 className='w-5 h-5 animate-spin' />
										) : (
											<>
												<Save className='w-4 h-4 mr-2' /> Saqlash
											</>
										)}
									</Button>
								</form>
							)}
						</CardContent>
					</Card>

					{/* Salon Form / View */}
					<Card className='border-none shadow-sm rounded-2xl relative overflow-hidden flex flex-col'>
						{/* If blocked, show overlay warning for salon */}
						{user.isBlocked && (
							<div className='absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex items-center justify-center p-6 text-center text-red-600 font-medium'>
								<span className='bg-red-50 text-red-600 px-5 py-3 rounded-xl border border-red-200 shadow-xl flex items-center gap-2'>
									<ShieldAlert className='w-5 h-5' /> Foydalanuvchi bloklangan.
								</span>
							</div>
						)}

						<CardHeader className='pb-4 border-b border-zinc-100 bg-zinc-50/50 flex flex-row items-center justify-between'>
							<CardTitle className='text-lg font-bold flex items-center gap-2 text-zinc-800'>
								<Building2 className='w-5 h-5 text-emerald-500' />
								{salon && !isEditingSalon
									? "Salon Yoki Markaz Ma'lumotlari"
									: !salon
										? 'Yangi Markaz Yaratish'
										: 'Salon Tahriri'}
							</CardTitle>
							{salon && (
								<Button
									variant='ghost'
									size='sm'
									onClick={() => setIsEditingSalon(!isEditingSalon)}
									className='text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-100'
								>
									{isEditingSalon ? (
										'Bekor qilish'
									) : (
										<>
											<Edit2 className='w-4 h-4 mr-2' /> Tahrirlash
										</>
									)}
								</Button>
							)}
						</CardHeader>
						<CardContent className='pt-6 flex-1 flex flex-col'>
							{!salon && !isEditingSalon ? (
								<div className='text-center py-12 flex-1 flex flex-col justify-center items-center'>
									<div className='w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100 shadow-inner'>
										<Scissors className='w-8 h-8 text-emerald-500' />
									</div>
									<h3 className='text-xl font-bold text-zinc-900 mb-2'>
										Salon / Markaz biriktirilmagan
									</h3>
									<p className='text-zinc-500 text-sm mb-6 max-w-sm mx-auto'>
										Bu tadbirkor hali o'z salonini tizimga raqamli ro'yxatdan
										o'tkazmagan.
									</p>
									<Button
										onClick={() => setIsEditingSalon(true)}
										className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-6 h-11'
									>
										<Plus className='w-4 h-4 mr-2' /> Yangi Markaz Yaratish
									</Button>
								</div>
							) : salon && !isEditingSalon ? (
								<div className='space-y-6 flex-1'>
									<div className='flex items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100'>
										<div className='w-16 h-16 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center text-3xl font-bold text-zinc-300'>
											{salon.logo ? (
												<img
													src={salon.logo}
													alt={salon.name}
													className='w-full h-full object-cover rounded-xl'
												/>
											) : (
												salon.name.charAt(0)
											)}
										</div>
										<div className='flex-1'>
											<p className='text-sm text-zinc-500 font-medium'>
												Salon / Markaz Nomi
											</p>
											<p className='font-bold text-xl text-zinc-900 truncate'>
												{salon.name}
											</p>
										</div>
										<div className='flex flex-col items-center justify-center bg-white h-12 w-12 rounded-lg border border-zinc-100 shadow-sm'>
											<span className='text-xs font-semibold text-zinc-400'>
												Holat
											</span>
											<span
												className={`w-3 h-3 rounded-full mt-1 ${salon.status === 'active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`}
											></span>
										</div>
									</div>

									<div className='grid grid-cols-2 gap-4'>
										<div className='bg-zinc-50/50 p-3 rounded-xl border border-zinc-100'>
											<p className='text-xs text-zinc-500 font-medium mb-1'>
												Turi
											</p>
											<p className='font-bold text-zinc-800 text-sm'>
												{salon.type}
											</p>
										</div>
										<div className='bg-zinc-50/50 p-3 rounded-xl border border-zinc-100'>
											<p className='text-xs text-zinc-500 font-medium mb-1'>
												Telefon
											</p>
											<p className='font-bold text-zinc-800 text-sm'>
												{salon.contacts?.phone || 'Kiritilmagan'}
											</p>
										</div>
										<div className='bg-zinc-50/50 p-3 rounded-xl border border-zinc-100'>
											<p className='text-xs text-zinc-500 font-medium mb-1'>
												Ish Vaqti
											</p>
											<p className='font-bold text-zinc-800 text-sm'>
												{salon.processedWorkHours ||
													(typeof salon.workHours === 'string'
														? salon.workHours
														: '09:00 - 18:00')}
											</p>
										</div>
										<div className='bg-zinc-50/50 p-3 rounded-xl border border-zinc-100'>
											<p className='text-xs text-zinc-500 font-medium mb-1'>
												Jami Ustalar
											</p>
											<p className='font-bold text-zinc-800 text-sm'>
												{salon.mastersCount || 0} nafar 👤
											</p>
										</div>
									</div>

									<div>
										<p className='text-sm text-zinc-500 font-medium mb-1'>
											Manzil / Geografik lokatsiya
										</p>
										<div className='flex items-start gap-3 bg-zinc-50 p-3 rounded-xl border border-zinc-100'>
											<MapPin className='w-5 h-5 text-red-400 flex-shrink-0 mt-0.5' />
											<p className='font-bold text-zinc-800 text-sm leading-snug'>
												{salon.address}
											</p>
										</div>
									</div>

									{salon.about && (
										<div>
											<p className='text-sm text-zinc-500 font-medium mb-1'>
												Salon haqida
											</p>
											<div className='bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-sm font-medium text-zinc-700'>
												{salon.about}
											</div>
										</div>
									)}

									<div className='pt-4 border-t border-zinc-100'>
										<Button
											className='w-full h-12 bg-white text-emerald-600 border-2 border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200 transition-all font-bold text-[15px] rounded-xl'
											onClick={() => router.push(`/admin/salons/${salon._id}`)}
										>
											<Eye className='w-5 h-5 mr-2' />
											Kengaytirilgan Salon Ma'lumotlariga O'tish
										</Button>
									</div>
								</div>
							) : (
								<form onSubmit={handleUpdateSalon} className='space-y-4'>
									<div className='space-y-2'>
										<Label htmlFor='salonName'>Salon / Markaz Nomi</Label>
										<Input
											id='salonName'
											value={editSalon.name}
											onChange={e =>
												setEditSalon({ ...editSalon, name: e.target.value })
											}
											placeholder='Masalan: Aura Spa Markazi'
											className='h-11 rounded-xl bg-zinc-50'
											required
										/>
									</div>

									<div className='grid grid-cols-2 gap-4'>
										<div className='space-y-2'>
											<Label htmlFor='type'>Turi</Label>
											<select
												id='type'
												value={editSalon.type}
												onChange={e =>
													setEditSalon({ ...editSalon, type: e.target.value })
												}
												className='w-full h-11 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all text-sm font-medium'
												required
											>
												<option value='' disabled>
													Tanlang
												</option>
												{BUSINESS_TYPES.filter(t => t.id !== 'none').map(
													type => (
														<option key={type.id} value={type.label}>
															{type.label}
														</option>
													),
												)}
											</select>
										</div>
										<div className='space-y-2'>
											<Label htmlFor='sPhone'>Filial Telefoni</Label>
											<div className='relative'>
												<Phone className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400' />
												<Input
													id='sPhone'
													value={editSalon.phone}
													onChange={e =>
														setEditSalon({
															...editSalon,
															phone: e.target.value,
														})
													}
													className='h-11 rounded-xl bg-zinc-50 pl-9'
													placeholder='Misol: +998901234567'
													required
												/>
											</div>
										</div>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='workHours'>Ish Vaqti</Label>
										<Input
											id='workHours'
											value={editSalon.workHours}
											onChange={e =>
												setEditSalon({
													...editSalon,
													workHours: e.target.value,
												})
											}
											placeholder='09:00 - 18:00'
											className='h-11 rounded-xl bg-zinc-50'
											required
										/>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='address'>
											Manzil / Geografik lokatsiya
										</Label>
										<div className='relative'>
											<MapPin className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400' />
											<Input
												id='address'
												value={editSalon.address}
												onChange={e =>
													setEditSalon({
														...editSalon,
														address: e.target.value,
													})
												}
												className='h-11 rounded-xl bg-zinc-50 pl-9'
												placeholder='Hudud, koʻcha, bino nomi...'
												required
											/>
										</div>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='salonAbout'>Markaz Haqida</Label>
										<textarea
											id='salonAbout'
											value={editSalon.about || ''}
											onChange={e =>
												setEditSalon({
													...editSalon,
													about: e.target.value,
												})
											}
											className='w-full min-h-[80px] p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium focus:ring-2 focus:ring-zinc-900 resize-none outline-none'
											placeholder='Sharoitlar, yandex xaritasiga belgi, masterlar tajribasi...'
										/>
									</div>

									<div className='pt-2 flex gap-3'>
										{!salon && (
											<Button
												type='button'
												variant='outline'
												onClick={() => setIsEditingSalon(false)}
												className='h-11 w-32 rounded-xl'
											>
												Bekor qilish
											</Button>
										)}
										<Button
											type='submit'
											disabled={isSaving}
											className='flex-1 h-11 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-md'
										>
											{isSaving ? (
												<Loader2 className='w-5 h-5 animate-spin' />
											) : salon ? (
												<>
													<Save className='w-4 h-4 mr-2' /> Salonni Yangilash
												</>
											) : (
												<>
													<Plus className='w-4 h-4 mr-2' /> Yaratish
												</>
											)}
										</Button>
									</div>
								</form>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	)
}
