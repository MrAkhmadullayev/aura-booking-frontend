'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'
import { Loader2, Lock, Save, User as UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ProfileView({ roleLabel }) {
	const { user } = useAuth()

	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState({ type: '', text: '' })

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		password: '',
		confirmPassword: '',
		about: '',
	})

	useEffect(() => {
		if (user) {
			setFormData(prev => ({
				...prev,
				name: user.name || '',
				phone: user.phone || '',
				about: user.about || '',
			}))
		}
	}, [user])

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setMessage({ type: '', text: '' })

		if (formData.password && formData.password !== formData.confirmPassword) {
			setMessage({ type: 'error', text: 'Parollar mos kelmadi!' })
			return
		}

		try {
			setIsLoading(true)
			await api.put('/users/profile', {
				name: formData.name,
				phone: formData.phone,
				about: formData.about,
				...(formData.password && { password: formData.password }),
			})

			setMessage({ type: 'success', text: 'Profil tahrirlandi!' })
			setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }))

			setTimeout(() => {
				window.location.reload()
			}, 1500)
		} catch (error) {
			console.error('Profile update error', error)
			setMessage({
				type: 'error',
				text:
					error.response?.data?.message ||
					'Xatolik yuz berdi. Qaytadan urining.',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='max-w-2xl mx-auto space-y-6 pb-20 pt-4'>
			<div>
				<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
					Profil Sozlamalari
				</h1>
				<p className='text-zinc-500 text-sm mt-1'>
					Shaxsiy ma'lumotlaringizni tahrirlash
				</p>
			</div>

			<div className='flex gap-4 items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-100'>
				<div className='h-16 w-16 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 border-4 border-white shadow-sm'>
					<UserIcon className='w-8 h-8' />
				</div>
				<div>
					<h2 className='text-xl font-bold text-zinc-900'>
						{user?.name || 'Foydalanuvchi'}
					</h2>
					<p className='text-zinc-500 text-sm'>{user?.phone}</p>
					<span className='inline-block px-2.5 py-1 bg-zinc-100 text-zinc-600 rounded-md text-xs font-medium mt-2 uppercase tracking-wide'>
						{roleLabel}
					</span>
				</div>
			</div>

			<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
				<CardContent className='p-6'>
					{message.text && (
						<div
							className={`p-4 mb-6 rounded-xl text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}
						>
							{message.text}
						</div>
					)}

					<form onSubmit={handleSubmit} className='space-y-5'>
						<div className='space-y-4'>
							<h3 className='text-lg font-semibold text-zinc-900 flex items-center gap-2'>
								<UserIcon className='w-5 h-5 text-zinc-400' /> Asosiy
								Ma'lumotlar
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label>Ism-sharif</Label>
									<Input
										name='name'
										value={formData.name}
										onChange={handleChange}
										className='h-12 rounded-xl bg-zinc-50/50'
										required
									/>
								</div>
								<div className='space-y-2'>
									<Label>Telefon raqam</Label>
									<Input
										name='phone'
										value={formData.phone}
										onChange={handleChange}
										className='h-12 rounded-xl bg-zinc-50/50 font-mono'
										required
									/>
								</div>
							</div>

							<div className='space-y-2 pt-2'>
								<Label>O'zingiz haqingizda</Label>
								<Textarea
									name='about'
									value={formData.about}
									onChange={handleChange}
									placeholder='Ozingiz haqingizda malumot bering...'
									className='min-h-[120px] rounded-xl bg-zinc-50/50 resize-none'
								/>
							</div>
						</div>

						<div className='pt-6 border-t border-zinc-100 space-y-4'>
							<h3 className='text-lg font-semibold text-zinc-900 flex items-center gap-2'>
								<Lock className='w-5 h-5 text-zinc-400' /> Parolni O'zgartirish
							</h3>
							<p className='text-xs text-zinc-500 mb-2'>
								Agar parolni o'zgartirishni xohlamasangiz, ushbu maydonlarni
								bo'sh qoldiring.
							</p>

							<div className='grid grid-cols-1 gap-4'>
								<div className='space-y-2'>
									<Label>Yangi parol</Label>
									<Input
										type='password'
										name='password'
										value={formData.password}
										onChange={handleChange}
										className='h-12 rounded-xl bg-zinc-50/50'
										placeholder='Yangi parol (ixtiyoriy)'
									/>
								</div>
								<div className='space-y-2'>
									<Label>Yangi parolni tasdiqlang</Label>
									<Input
										type='password'
										name='confirmPassword'
										value={formData.confirmPassword}
										onChange={handleChange}
										className='h-12 rounded-xl bg-zinc-50/50'
										placeholder='Parolni qayta kiriting'
									/>
								</div>
							</div>
						</div>

						<div className='pt-6 flex justify-end'>
							<Button
								type='submit'
								className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 px-8'
								disabled={isLoading}
							>
								{isLoading ? (
									<Loader2 className='w-5 h-5 animate-spin' />
								) : (
									<>
										<Save className='w-4 h-4 mr-2' /> Saqlash
									</>
								)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
