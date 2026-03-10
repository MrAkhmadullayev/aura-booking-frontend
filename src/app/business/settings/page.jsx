'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'
import {
	Briefcase,
	Camera,
	Image as ImageIcon,
	Loader2,
	MapPin,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function BusinessSettings() {
	const { user } = useAuth()
	const [salon, setSalon] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isSaving, setIsSaving] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		about: '',
		phone: '',
		instagram: '',
		address: '',
		type: 'Salon',
	})

	useEffect(() => {
		const fetchSalon = async () => {
			try {
				const res = await api.get('/salons/mine')
				setSalon(res.data)
				setFormData({
					name: res.data.name || '',
					about: res.data.about || '',
					phone: res.data.contacts?.phone || '',
					instagram: res.data.contacts?.instagram || '',
					address: res.data.address || '',
					type: res.data.type || 'Salon',
				})
			} catch (error) {
				if (error.response?.status !== 404) {
					toast.error('Salonni yuklashda xatolik yuz berdi')
				}
			} finally {
				setIsLoading(false)
			}
		}
		if (user) fetchSalon()
	}, [user])

	const handleSave = async () => {
		try {
			setIsSaving(true)
			const payload = {
				name: formData.name,
				about: formData.about,
				address: formData.address,
				type: formData.type,
				contacts: {
					phone: formData.phone,
					instagram: formData.instagram,
				},
				workHours: '09:00 - 21:00', // hardcoded for now
			}

			if (salon) {
				// Update
				const res = await api.put(`/salons/${salon._id}`, payload)
				setSalon(res.data)
				toast.success('Muvaffaqiyatli saqlandi!')
			} else {
				// Create
				const res = await api.post('/salons', payload)
				setSalon(res.data)
				toast.success('Salon muvaffaqiyatli yaratildi!')
			}
		} catch (error) {
			toast.error('Xatolik yuz berdi')
		} finally {
			setIsSaving(false)
		}
	}

	if (isLoading) {
		return (
			<DashboardLayout role='business'>
				<div className='flex items-center justify-center min-h-[60vh]'>
					<Loader2 className='w-8 h-8 animate-spin text-zinc-400' />
				</div>
			</DashboardLayout>
		)
	}

	return (
		<DashboardLayout role='business'>
			<div className='space-y-6'>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Salon Sozlamalari
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Salon ma'lumotlari, manzili va ish vaqtlarini tahrirlash.
						</p>
					</div>
					<Button
						onClick={handleSave}
						disabled={isSaving}
						className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-sm px-6 font-medium'
					>
						{isSaving ? (
							<Loader2 className='w-4 h-4 animate-spin' />
						) : (
							'Saqlash'
						)}
					</Button>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					<div className='lg:col-span-2 space-y-6'>
						{/* Basic Info */}
						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<div className='px-6 py-5 border-b border-zinc-100 flex items-center gap-3'>
								<div className='h-8 w-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center'>
									<Briefcase className='w-4 h-4' />
								</div>
								<h3 className='font-bold text-zinc-900'>Asosiy Ma'lumotlar</h3>
							</div>
							<CardContent className='p-6 space-y-4'>
								<div className='flex items-center gap-6 mb-6'>
									<div className='relative h-24 w-24 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden group cursor-pointer'>
										<ImageIcon className='w-8 h-8 text-zinc-400 group-hover:opacity-0 transition-opacity' />
										<div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
											<Camera className='w-6 h-6 text-white' />
										</div>
									</div>
									<div>
										<h4 className='font-semibold text-zinc-900 mb-1'>
											Salon Logosi
										</h4>
										<p className='text-xs text-zinc-500 mb-3'>
											Tavsiya etiladi: 500x500px, PNG yoki JPG formati.
										</p>
										<Button
											variant='outline'
											size='sm'
											className='rounded-xl h-9'
										>
											Rasm tanlash
										</Button>
									</div>
								</div>

								<div className='space-y-2'>
									<Label
										htmlFor='salonName'
										className='text-zinc-700 font-medium'
									>
										Salon Nomi
									</Label>
									<Input
										id='salonName'
										value={formData.name}
										onChange={e =>
											setFormData({ ...formData, name: e.target.value })
										}
										placeholder='Salon nomi'
										className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
									/>
								</div>
								<div className='space-y-2 flex-col flex'>
									<Label htmlFor='desc' className='text-zinc-700 font-medium'>
										Salon Haqida Ma'lumot
									</Label>
									<textarea
										id='desc'
										value={formData.about}
										onChange={e =>
											setFormData({ ...formData, about: e.target.value })
										}
										placeholder="Salon haqida qisqacha ma'lumot..."
										className='min-h-[100px] p-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 resize-y w-full'
									/>
								</div>
							</CardContent>
						</Card>

						{/* Location Details */}
						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<div className='px-6 py-5 border-b border-zinc-100 flex items-center gap-3'>
								<div className='h-8 w-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center'>
									<MapPin className='w-4 h-4' />
								</div>
								<h3 className='font-bold text-zinc-900'>Manzil va Aloqa</h3>
							</div>
							<CardContent className='p-6 space-y-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label
											htmlFor='phone'
											className='text-zinc-700 font-medium'
										>
											Asosiy Telefon Raqam
										</Label>
										<Input
											id='phone'
											value={formData.phone}
											onChange={e =>
												setFormData({ ...formData, phone: e.target.value })
											}
											placeholder='+998 90 123 45 67'
											className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='inst' className='text-zinc-700 font-medium'>
											Instagram Username
										</Label>
										<Input
											id='inst'
											value={formData.instagram}
											onChange={e =>
												setFormData({ ...formData, instagram: e.target.value })
											}
											placeholder='@username'
											className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<Label
										htmlFor='address'
										className='text-zinc-700 font-medium'
									>
										Manzil (To'liq)
									</Label>
									<Input
										id='address'
										value={formData.address}
										onChange={e =>
											setFormData({ ...formData, address: e.target.value })
										}
										placeholder='Toshkent shahar...'
										className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
									/>
								</div>

								<div className='h-[200px] bg-zinc-100 rounded-xl flex items-center justify-center mt-2 relative overflow-hidden border border-zinc-200'>
									<div className="absolute inset-0 opacity-50 bg-[url('https://maps.wikimedia.org/osm-intl/13/4665/3081.png')] bg-cover bg-center"></div>
									<div className='absolute inset-0 bg-white/40 backdrop-blur-[2px]'></div>
									<Button
										variant='outline'
										className='relative z-10 bg-white shadow-sm flex items-center rounded-xl border-zinc-200'
									>
										<MapPin className='h-4 w-4 mr-2' /> Xaritada belgilash
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Working Hours Sidebar */}
					<div className='lg:col-span-1'>
						<Card className='border-none shadow-sm rounded-2xl bg-white sticky top-24'>
							<div className='px-6 py-5 border-b border-zinc-100'>
								<h3 className='font-bold text-zinc-900'>Ish Vaqtlari</h3>
							</div>
							<CardContent className='p-6'>
								<div className='space-y-4 text-sm font-medium'>
									{[
										{
											day: 'Dushanba',
											open: '09:00',
											close: '21:00',
											active: true,
										},
										{
											day: 'Seshanba',
											open: '09:00',
											close: '21:00',
											active: true,
										},
										{
											day: 'Chorshanba',
											open: '09:00',
											close: '21:00',
											active: true,
										},
										{
											day: 'Payshanba',
											open: '09:00',
											close: '21:00',
											active: true,
										},
										{
											day: 'Juma',
											open: '09:00',
											close: '21:00',
											active: true,
										},
										{
											day: 'Shanba',
											open: '09:00',
											close: '21:00',
											active: true,
										},
										{
											day: 'Yakshanba',
											open: '09:00',
											close: '18:00',
											active: true,
										},
									].map((schedule, i) => (
										<div
											key={i}
											className='flex flex-col sm:flex-row xl:flex-col 2xl:flex-row justify-between sm:items-center xl:items-start 2xl:items-center gap-2 pb-4 border-b border-zinc-100 last:border-0 last:pb-0'
										>
											<div className='flex items-center gap-3'>
												<div
													className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${schedule.active ? 'bg-zinc-900 justify-end' : 'bg-zinc-200 justify-start'}`}
												>
													<div className='bg-white w-4 h-4 rounded-full shadow-sm shadow-zinc-400'></div>
												</div>
												<span className='w-24 text-zinc-700'>
													{schedule.day}
												</span>
											</div>
											{schedule.active ? (
												<div className='flex items-center gap-2'>
													<input
														type='time'
														defaultValue={schedule.open}
														className='p-1 rounded bg-zinc-50 border border-zinc-200 text-xs w-[64px] text-center'
													/>
													<span className='text-zinc-400'>-</span>
													<input
														type='time'
														defaultValue={schedule.close}
														className='p-1 rounded bg-zinc-50 border border-zinc-200 text-xs w-[64px] text-center'
													/>
												</div>
											) : (
												<span className='text-zinc-400 font-italic text-sm'>
													Dam olish
												</span>
											)}
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</DashboardLayout>
	)
}
