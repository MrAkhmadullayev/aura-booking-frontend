'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import api from '@/lib/api'
import 'leaflet/dist/leaflet.css'
import {
	Briefcase,
	Camera,
	Clock,
	Image as ImageIcon,
	Loader2,
	MapPin,
	Trash2,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
// Dynamically import map to avoid SSR issues
const MapContainer = dynamic(
	() => import('react-leaflet').then(mod => mod.MapContainer),
	{ ssr: false },
)
const TileLayer = dynamic(
	() => import('react-leaflet').then(mod => mod.TileLayer),
	{ ssr: false },
)
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
	ssr: false,
})
const useMapEvents = dynamic(
	() => import('react-leaflet').then(mod => mod.useMapEvents),
	{ ssr: false },
)

function LocationMarker({ position, setPosition }) {
	const map = useMapEvents({
		click(e) {
			setPosition(e.latlng)
			map.flyTo(e.latlng, map.getZoom())
		},
	})
	return position === null ? null : <Marker position={position}></Marker>
}

export default function BranchForm({ initialData = null, isEdit = false }) {
	const router = useRouter()
	const [isSaving, setIsSaving] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const fileInputRef = useRef(null)

	const [formData, setFormData] = useState({
		name: initialData?.name || '',
		about: initialData?.about || '',
		phone: initialData?.contacts?.phone || '',
		instagram: initialData?.contacts?.instagram || '',
		telegram: initialData?.contacts?.telegram || '',
		facebook: initialData?.contacts?.facebook || '',
		youtube: initialData?.contacts?.youtube || '',
		address: initialData?.address || '',
		type: initialData?.type || 'Salon',
		coverImage: initialData?.coverImage || '',
		gallery: initialData?.gallery || [],
		location: initialData?.location || { lat: 41.2995, lng: 69.2401 }, // Default Tashkent
		workHours: initialData?.workHours?.length
			? initialData.workHours
			: [
					{ day: 'Dushanba', isOpen: true, open: '09:00', close: '18:00' },
					{ day: 'Seshanba', isOpen: true, open: '09:00', close: '18:00' },
					{ day: 'Chorshanba', isOpen: true, open: '09:00', close: '18:00' },
					{ day: 'Payshanba', isOpen: true, open: '09:00', close: '18:00' },
					{ day: 'Juma', isOpen: true, open: '09:00', close: '18:00' },
					{ day: 'Shanba', isOpen: true, open: '09:00', close: '18:00' },
					{ day: 'Yakshanba', isOpen: false, open: '09:00', close: '18:00' },
				],
	})

	const handleImageUpload = async e => {
		const file = e.target.files?.[0]
		if (!file) return

		const data = new FormData()
		data.append('image', file)

		try {
			setIsUploading(true)
			const res = await api.post('/upload', data, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})

			if (res.data?.url) {
				setFormData({ ...formData, coverImage: res.data.url })
			}
		} catch (error) {
			toast.error('Rasm yuklashda xatolik yuz berdi')
		} finally {
			setIsUploading(false)
		}
	}

	const handleGalleryUpload = async e => {
		const files = Array.from(e.target.files)
		if (!files.length) return

		try {
			setIsUploading(true)
			const newUrls = []

			// Upload each file individually
			for (const file of files) {
				const data = new FormData()
				data.append('image', file)

				const res = await api.post('/upload', data, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				if (res.data?.url) {
					newUrls.push(res.data.url)
				}
			}

			setFormData(prev => ({
				...prev,
				gallery: [...prev.gallery, ...newUrls],
			}))
		} catch (error) {
			toast.error('Gallereya rasmlarini yuklashda xatolik yuz berdi')
		} finally {
			setIsUploading(false)
		}
	}

	const removeGalleryImage = index => {
		setFormData(prev => ({
			...prev,
			gallery: prev.gallery.filter((_, i) => i !== index),
		}))
	}

	const handleSubmit = async () => {
		try {
			setIsSaving(true)
			const payload = {
				name: formData.name,
				about: formData.about,
				address: formData.address,
				type: formData.type,
				coverImage: formData.coverImage,
				gallery: formData.gallery,
				location: {
					lat: formData.location.lat,
					lng: formData.location.lng,
					mapUrl: `https://www.google.com/maps?q=${formData.location.lat},${formData.location.lng}`,
				},
				contacts: {
					phone: formData.phone,
					instagram: formData.instagram,
					telegram: formData.telegram,
					facebook: formData.facebook,
					youtube: formData.youtube,
				},
				workHours: formData.workHours,
			}

			if (isEdit && initialData?._id) {
				await api.put(`/salons/${initialData._id}`, payload)
				toast.success('Muvaffaqiyatli saqlandi!')
			} else {
				await api.post('/salons', payload)
				toast.success('Filial muvaffaqiyatli yaratildi!')
			}
			router.push('/business/salons')
		} catch (error) {
			toast.error(error.response?.data?.message || 'Xatolik yuz berdi')
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<div className='space-y-6'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<div>
					<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
						{isEdit ? 'Filialni Tahrirlash' : 'Yangi Filial'}
					</h1>
					<p className='text-zinc-500 text-sm mt-1'>
						Filial ma'lumotlari, manzili va rasmlari.
					</p>
				</div>
				<div className='flex gap-2'>
					<Button
						variant='outline'
						onClick={() => router.push('/business/salons')}
						className='rounded-xl bg-white'
					>
						Bekor qilish
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={isSaving || isUploading}
						className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-sm px-6 font-medium'
					>
						{isSaving ? (
							<Loader2 className='w-4 h-4 animate-spin' />
						) : (
							'Saqlash'
						)}
					</Button>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<div className='lg:col-span-2 space-y-6'>
					{/* Basic Info */}
					<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
						<div className='px-6 py-5 border-b border-zinc-100 flex items-center gap-3'>
							<div className='h-8 w-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center'>
								<Briefcase className='w-4 h-4' />
							</div>
							<h3 className='font-bold text-zinc-900'>Asosiy Ma'lumotlar</h3>
						</div>
						<CardContent className='p-6 space-y-4'>
							<div className='flex items-center gap-6 mb-6'>
								<div
									className='relative h-32 w-48 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden group cursor-pointer'
									onClick={() => fileInputRef.current?.click()}
								>
									{formData.coverImage ? (
										<Image
											src={formData.coverImage}
											alt='Cover'
											fill
											className='object-cover'
										/>
									) : (
										<ImageIcon className='w-8 h-8 text-zinc-400 group-hover:opacity-0 transition-opacity' />
									)}
									<div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
										{isUploading ? (
											<Loader2 className='w-6 h-6 text-white animate-spin' />
										) : (
											<Camera className='w-6 h-6 text-white' />
										)}
									</div>
								</div>
								<div>
									<h4 className='font-semibold text-zinc-900 mb-1'>Surat</h4>
									<p className='text-xs text-zinc-500 mb-3'>
										Tavsiya etiladi: 800x600px, PNG yoki JPG. Bytescale orqali
										yuklanadi.
									</p>
									<input
										type='file'
										ref={fileInputRef}
										className='hidden'
										accept='image/*'
										onChange={handleImageUpload}
									/>
									<Button
										variant='outline'
										size='sm'
										className='rounded-xl h-9'
										onClick={() => fileInputRef.current?.click()}
										disabled={isUploading}
									>
										{isUploading ? 'Yuklanmoqda...' : 'Rasm tanlash'}
									</Button>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-2 col-span-2 sm:col-span-1'>
									<Label htmlFor='name' className='text-zinc-700 font-medium'>
										Filial Nomi
									</Label>
									<Input
										id='name'
										value={formData.name}
										onChange={e =>
											setFormData({ ...formData, name: e.target.value })
										}
										placeholder='Filial nomi'
										className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
									/>
								</div>
								<div className='space-y-2 col-span-2 sm:col-span-1'>
									<Label htmlFor='type' className='text-zinc-700 font-medium'>
										Toifa
									</Label>
									<Input
										id='type'
										value={formData.type}
										onChange={e =>
											setFormData({ ...formData, type: e.target.value })
										}
										placeholder='Salon, Barbershop, v.b.'
										className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
									/>
								</div>
							</div>
							<div className='space-y-2 flex-col flex'>
								<Label htmlFor='desc' className='text-zinc-700 font-medium'>
									Filial Haqida
								</Label>
								<textarea
									id='desc'
									value={formData.about}
									onChange={e =>
										setFormData({ ...formData, about: e.target.value })
									}
									placeholder="Qisqacha ma'lumot..."
									className='min-h-[100px] p-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 resize-y w-full'
								/>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className='lg:col-span-1 space-y-6'>
					{/* Contacts Details */}
					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<div className='px-6 py-5 border-b border-zinc-100 flex items-center gap-3'>
							<h3 className='font-bold text-zinc-900'>Aloqa</h3>
						</div>
						<CardContent className='p-6 space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='phone' className='text-zinc-700 font-medium'>
									Telefon
								</Label>
								<Input
									id='phone'
									value={formData.phone}
									onChange={e =>
										setFormData({ ...formData, phone: e.target.value })
									}
									placeholder='+998 90 123 45 67'
									className='h-11 bg-zinc-50 border-zinc-200 rounded-xl'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='inst' className='text-zinc-700 font-medium'>
									Instagram
								</Label>
								<Input
									id='inst'
									value={formData.instagram}
									onChange={e =>
										setFormData({ ...formData, instagram: e.target.value })
									}
									placeholder='@username'
									className='h-11 bg-zinc-50 border-zinc-200 rounded-xl'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='tg' className='text-zinc-700 font-medium'>
									Telegram
								</Label>
								<Input
									id='tg'
									value={formData.telegram}
									onChange={e =>
										setFormData({ ...formData, telegram: e.target.value })
									}
									placeholder='@username'
									className='h-11 bg-zinc-50 border-zinc-200 rounded-xl'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='fb' className='text-zinc-700 font-medium'>
									Facebook
								</Label>
								<Input
									id='fb'
									value={formData.facebook}
									onChange={e =>
										setFormData({ ...formData, facebook: e.target.value })
									}
									placeholder='@username'
									className='h-11 bg-zinc-50 border-zinc-200 rounded-xl'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='yt' className='text-zinc-700 font-medium'>
									YouTube
								</Label>
								<Input
									id='yt'
									value={formData.youtube}
									onChange={e =>
										setFormData({ ...formData, youtube: e.target.value })
									}
									placeholder='@channel'
									className='h-11 bg-zinc-50 border-zinc-200 rounded-xl'
								/>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Work Hours Details */}
				<div className='lg:col-span-3'>
					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<div className='px-6 py-5 border-b border-zinc-100 flex items-center gap-3'>
							<div className='h-8 w-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center'>
								<Clock className='w-4 h-4' />
							</div>
							<h3 className='font-bold text-zinc-900'>
								Ish faoliyati vaqtlari
							</h3>
						</div>
						<CardContent className='p-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								{formData.workHours.map((wh, idx) => (
									<div
										key={wh.day}
										className={`p-4 rounded-xl border-2 transition-all ${
											wh.isOpen
												? 'border-zinc-200 bg-zinc-50/50'
												: 'border-zinc-100 bg-zinc-50/20 opacity-70'
										}`}
									>
										<div className='flex items-center justify-between mb-3'>
											<span className='font-semibold text-zinc-900'>
												{wh.day}
											</span>
											<label className='flex items-center cursor-pointer'>
												<div className='relative'>
													<input
														type='checkbox'
														className='sr-only'
														checked={wh.isOpen}
														onChange={e => {
															const newWorkHours = [...formData.workHours]
															newWorkHours[idx].isOpen = e.target.checked
															setFormData({
																...formData,
																workHours: newWorkHours,
															})
														}}
													/>
													<div
														className={`block w-10 h-6 rounded-full transition-colors ${
															wh.isOpen ? 'bg-zinc-900' : 'bg-zinc-200'
														}`}
													></div>
													<div
														className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
															wh.isOpen ? 'transform translate-x-4' : ''
														}`}
													></div>
												</div>
											</label>
										</div>
										<div className='flex items-center gap-2'>
											<div className='flex-1'>
												<Input
													type='time'
													disabled={!wh.isOpen}
													value={wh.open}
													onChange={e => {
														const newWorkHours = [...formData.workHours]
														newWorkHours[idx].open = e.target.value
														setFormData({
															...formData,
															workHours: newWorkHours,
														})
													}}
													className='h-10 text-sm bg-white border-zinc-200 rounded-lg disabled:bg-zinc-100'
												/>
											</div>
											<span className='text-zinc-400'>-</span>
											<div className='flex-1'>
												<Input
													type='time'
													disabled={!wh.isOpen}
													value={wh.close}
													onChange={e => {
														const newWorkHours = [...formData.workHours]
														newWorkHours[idx].close = e.target.value
														setFormData({
															...formData,
															workHours: newWorkHours,
														})
													}}
													className='h-10 text-sm bg-white border-zinc-200 rounded-lg disabled:bg-zinc-100'
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				<div className='lg:col-span-3'>
					<div className='lg:col-span-3'>
						<Card className='border-none shadow-sm rounded-2xl bg-white'>
							<div className='px-6 py-5 border-b border-zinc-100 flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<div className='h-8 w-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center'>
										<ImageIcon className='w-4 h-4' />
									</div>
									<h3 className='font-bold text-zinc-900'>
										Gallereya (Bir nechta rasm)
									</h3>
								</div>
								<div className='relative'>
									<input
										type='file'
										multiple
										accept='image/*'
										onChange={handleGalleryUpload}
										disabled={isUploading}
										className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
									/>
									<Button
										type='button'
										disabled={isUploading}
										size='sm'
										className='bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-none rounded-xl'
									>
										{isUploading ? (
											<Loader2 className='w-4 h-4 animate-spin' />
										) : (
											<>
												<Camera className='w-4 h-4 mr-2' /> Rasm qo'shish
											</>
										)}
									</Button>
								</div>
							</div>
							<CardContent className='p-6'>
								{formData.gallery.length > 0 ? (
									<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
										{formData.gallery.map((url, idx) => (
											<div
												key={idx}
												className='relative group aspect-square rounded-xl overflow-hidden border border-zinc-200'
											>
												<Image
													src={url}
													alt={`Gallery ${idx}`}
													fill
													className='object-cover'
												/>
												<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
													<button
														type='button'
														onClick={() => removeGalleryImage(idx)}
														className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors'
													>
														<Trash2 className='w-4 h-4' />
													</button>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className='py-8 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50'>
										<ImageIcon className='w-8 h-8 text-zinc-300 mb-2' />
										<p className='text-sm text-zinc-500'>
											Hozircha rasmlar kiritilmagan
										</p>
									</div>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Map Details */}
					<Card className='border-none shadow-sm rounded-2xl bg-white'>
						<div className='px-6 py-5 border-b border-zinc-100 flex items-center gap-3'>
							<div className='h-8 w-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center'>
								<MapPin className='w-4 h-4' />
							</div>
							<h3 className='font-bold text-zinc-900'>Manzil va Xarita</h3>
						</div>
						<CardContent className='p-6 space-y-4'>
							<div className='space-y-2 max-w-xl'>
								<Label htmlFor='address' className='text-zinc-700 font-medium'>
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

							<Label className='text-zinc-700 font-medium block pt-2'>
								Xaritadan belgilang
							</Label>
							<div className='h-[300px] w-full rounded-xl overflow-hidden border border-zinc-200 relative'>
								{typeof window !== 'undefined' && (
									<MapContainer
										center={[formData.location.lat, formData.location.lng]}
										zoom={13}
										style={{ height: '100%', width: '100%' }}
									>
										<TileLayer
											attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
											url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
										/>
										<LocationMarker
											position={formData.location}
											setPosition={pos =>
												setFormData({ ...formData, location: pos })
											}
										/>
									</MapContainer>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
