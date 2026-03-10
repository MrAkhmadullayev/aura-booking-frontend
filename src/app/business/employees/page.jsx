'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import api from '@/lib/api'
import { Edit2, Plus, Search, Trash2, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function BusinessEmployees() {
	const [employees, setEmployees] = useState([])
	const [salons, setSalons] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [currentEmployee, setCurrentEmployee] = useState(null)

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		password: '',
		salonId: '',
		about: '',
	})

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			setIsLoading(true)
			const [empRes, salRes] = await Promise.all([
				api.get('/employees'),
				api.get('/salons/mine'),
			])
			setEmployees(empRes.data)
			setSalons(salRes.data)
			if (salRes.data.length > 0) {
				setFormData(prev => ({ ...prev, salonId: salRes.data[0]._id }))
			}
		} catch (error) {
			toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi")
		} finally {
			setIsLoading(false)
		}
	}

	const filteredEmployees = employees.filter(
		e =>
			e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			e.phone.includes(searchQuery),
	)

	const handleAddSubmit = async e => {
		e.preventDefault()
		try {
			const res = await api.post('/employees', formData)
			setEmployees([...employees, res.data])
			setIsAddModalOpen(false)
			setFormData({
				name: '',
				phone: '',
				password: '',
				salonId: salons[0]?._id || '',
				about: '',
			})
			toast.success("Yangi xodim qo'shildi")
		} catch (error) {
			toast.error(error.response?.data?.message || 'Xatolik yuz berdi')
		}
	}

	const handleEditClick = emp => {
		setCurrentEmployee({
			...emp,
			salonId: emp.salonId?._id || emp.salonId,
			password: '', // Don't show existing password
		})
		setIsEditModalOpen(true)
	}

	const handleEditSubmit = async e => {
		e.preventDefault()
		try {
			// Only send password if it was changed
			const payload = { ...currentEmployee }
			if (!payload.password) {
				delete payload.password
			}

			const res = await api.put(`/employees/${currentEmployee._id}`, payload)
			setEmployees(
				employees.map(emp => (emp._id === res.data._id ? res.data : emp)),
			)
			setIsEditModalOpen(false)
			toast.success("Xodim ma'lumotlari yangilandi")
		} catch (error) {
			toast.error(error.response?.data?.message || 'Xatolik yuz berdi')
		}
	}

	const handleDelete = async id => {
		if (!confirm("Xodimni o'chirishga ishonchingiz komilmi?")) return
		try {
			await api.delete(`/employees/${id}`)
			setEmployees(employees.filter(emp => emp._id !== id))
			toast.success("Xodim o'chirildi")
		} catch (error) {
			toast.error(error.response?.data?.message || 'Xatolik yuz berdi')
		}
	}

	return (
		<DashboardLayout>
			<div className='p-8 space-y-8 bg-zinc-50/50 min-h-full'>
				<div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight text-zinc-900 mb-2'>
							Xodimlar
						</h1>
						<p className='text-zinc-500'>
							Sizning saloningiz ustalarini boshqaring
						</p>
					</div>
					<div className='flex items-center gap-3'>
						<div className='relative flex-1 md:w-64'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400' />
							<input
								type='text'
								placeholder='Ism yoki raqam bo`yicha...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='h-10 w-full pl-10 pr-4 rounded-xl border border-zinc-200 text-sm focus:border-zinc-400 focus:ring-0 outline-none transition-colors'
							/>
						</div>
						<Button
							onClick={() => setIsAddModalOpen(true)}
							className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-10 px-5 flex-shrink-0'
						>
							<Plus className='h-4 w-4 mr-2' /> Yangi qo'shish
						</Button>
					</div>
				</div>

				{isLoading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								className='bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm'
							>
								<div className='flex items-start gap-4 mb-4'>
									<Skeleton className='w-12 h-12 rounded-full flex-shrink-0' />
									<div className='space-y-2 w-full'>
										<Skeleton className='h-5 w-3/4' />
										<Skeleton className='h-4 w-1/2' />
									</div>
								</div>
								<div className='space-y-3 mb-6'>
									<div className='flex justify-between'>
										<Skeleton className='h-4 w-16' />
										<Skeleton className='h-4 w-24' />
									</div>
									<div className='flex justify-between'>
										<Skeleton className='h-4 w-16' />
										<Skeleton className='h-4 w-20' />
									</div>
								</div>
								<div className='flex gap-2 pt-4 border-t border-zinc-100'>
									<Skeleton className='h-10 flex-1 rounded-xl' />
									<Skeleton className='h-10 w-12 flex-shrink-0 rounded-xl' />
								</div>
							</div>
						))}
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredEmployees.map(emp => (
							<div
								key={emp._id}
								className='bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm relative group'
							>
								<div className='flex items-start justify-between mb-4'>
									<div className='flex items-center gap-4'>
										<div className='w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600 font-bold text-lg'>
											{emp.name.charAt(0)}
										</div>
										<div>
											<h3 className='font-semibold text-zinc-900 leading-none mb-1.5'>
												{emp.name}
											</h3>
											<p className='text-sm text-zinc-500'>{emp.phone}</p>
											{emp.about && (
												<p className='text-xs text-zinc-400 mt-2 line-clamp-2 italic'>
													"{emp.about}"
												</p>
											)}
										</div>
									</div>
								</div>

								<div className='space-y-3 mb-6'>
									<div className='flex justify-between text-sm'>
										<span className='text-zinc-500'>Filial:</span>
										<span className='font-medium text-zinc-900'>
											{emp.salonId?.name || 'Belgilanmagan'}
										</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-zinc-500'>Holati:</span>
										<span
											className={`font-medium ${emp.isBlocked ? 'text-red-600' : 'text-green-600'}`}
										>
											{emp.isBlocked ? 'Bloklangan' : 'Faol'}
										</span>
									</div>
								</div>

								<div className='flex items-center gap-2 pt-4 border-t border-zinc-100'>
									<Button
										variant='outline'
										onClick={() => handleEditClick(emp)}
										className='flex-1 border-zinc-200 hover:bg-zinc-50 rounded-xl'
									>
										<Edit2 className='w-4 h-4 mr-2' /> Tahrirlash
									</Button>
									<Button
										variant='outline'
										onClick={() => handleDelete(emp._id)}
										className='px-3 border-zinc-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl'
									>
										<Trash2 className='w-4 h-4' />
									</Button>
								</div>
							</div>
						))}

						{filteredEmployees.length === 0 && (
							<div className='col-span-full py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-zinc-200 rounded-[2rem]'>
								<Users className='w-12 h-12 text-zinc-300 mb-4' />
								<h3 className='text-lg font-medium text-zinc-900 mb-1'>
									Xodimlar topilmadi
								</h3>
								<p className='text-zinc-500'>
									Yangi xodim qo'shish tugmasi orqali profil yarata olasiz
								</p>
							</div>
						)}
					</div>
				)}

				{/* Add Modal */}
				<Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
					<DialogContent className='sm:max-w-[425px] rounded-[2rem] p-6'>
						<DialogHeader>
							<DialogTitle className='text-xl'>Yangi xodim</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleAddSubmit} className='space-y-4 py-4'>
							<div className='space-y-2'>
								<Label>Ism Familiya</Label>
								<Input
									required
									value={formData.name}
									onChange={e =>
										setFormData({ ...formData, name: e.target.value })
									}
									className='rounded-xl h-11'
								/>
							</div>
							<div className='space-y-2'>
								<Label>Telefon raqam</Label>
								<Input
									required
									value={formData.phone}
									onChange={e =>
										setFormData({ ...formData, phone: e.target.value })
									}
									placeholder='+998...'
									className='rounded-xl h-11'
								/>
							</div>
							<div className='space-y-2'>
								<Label>Parol (xodim kirishi uchun)</Label>
								<Input
									required
									type='password'
									value={formData.password}
									onChange={e =>
										setFormData({ ...formData, password: e.target.value })
									}
									className='rounded-xl h-11'
								/>
							</div>
							<div className='space-y-2'>
								<Label>Biriktirilgan Filial</Label>
								<Select
									required
									value={formData.salonId}
									onValueChange={v => setFormData({ ...formData, salonId: v })}
								>
									<SelectTrigger className='rounded-xl h-11'>
										<SelectValue placeholder='Filialni tanlang' />
									</SelectTrigger>
									<SelectContent className='rounded-xl'>
										{salons.map(s => (
											<SelectItem key={s._id} value={s._id}>
												{s.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className='space-y-2'>
								<Label>Xodim haqida (ixtiyoriy)</Label>
								<Textarea
									value={formData.about}
									onChange={e =>
										setFormData({ ...formData, about: e.target.value })
									}
									placeholder='Xodim haqida qisqacha...'
									className='rounded-xl resize-none'
								/>
							</div>
							<div className='pt-4'>
								<Button
									type='submit'
									className='w-full rounded-xl h-11 bg-zinc-900 hover:bg-zinc-800 text-white'
								>
									Qo'shish
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>

				{/* Edit Modal */}
				<Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
					<DialogContent className='sm:max-w-[425px] rounded-[2rem] p-6'>
						<DialogHeader>
							<DialogTitle className='text-xl'>Xodimni tahrirlash</DialogTitle>
						</DialogHeader>
						{currentEmployee && (
							<form onSubmit={handleEditSubmit} className='space-y-4 py-4'>
								<div className='space-y-2'>
									<Label>Ism Familiya</Label>
									<Input
										required
										value={currentEmployee.name}
										onChange={e =>
											setCurrentEmployee({
												...currentEmployee,
												name: e.target.value,
											})
										}
										className='rounded-xl h-11'
									/>
								</div>
								<div className='space-y-2'>
									<Label>Telefon raqam</Label>
									<Input
										required
										value={currentEmployee.phone}
										onChange={e =>
											setCurrentEmployee({
												...currentEmployee,
												phone: e.target.value,
											})
										}
										className='rounded-xl h-11'
									/>
								</div>
								<div className='space-y-2'>
									<Label>Yangi Parol (ixtiyoriy)</Label>
									<Input
										type='password'
										placeholder="O'zgartirish shart bo'lmasa, bo'sh qoldiring"
										value={currentEmployee.password}
										onChange={e =>
											setCurrentEmployee({
												...currentEmployee,
												password: e.target.value,
											})
										}
										className='rounded-xl h-11'
									/>
								</div>
								<div className='space-y-2'>
									<Label>Biriktirilgan Filial</Label>
									<Select
										required
										value={currentEmployee.salonId}
										onValueChange={v =>
											setCurrentEmployee({ ...currentEmployee, salonId: v })
										}
									>
										<SelectTrigger className='rounded-xl h-11'>
											<SelectValue placeholder='Filialni tanlang' />
										</SelectTrigger>
										<SelectContent className='rounded-xl'>
											{salons.map(s => (
												<SelectItem key={s._id} value={s._id}>
													{s.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className='space-y-2'>
									<Label>Xodim haqida (ixtiyoriy)</Label>
									<Textarea
										value={currentEmployee.about}
										onChange={e =>
											setCurrentEmployee({
												...currentEmployee,
												about: e.target.value,
											})
										}
										placeholder='Xodim haqida qisqacha...'
										className='rounded-xl resize-none'
									/>
								</div>
								<div className='flex items-center justify-between pt-2 pb-4'>
									<Label
										className='text-sm font-medium text-zinc-700 cursor-pointer'
										htmlFor='block-user'
									>
										Bloklash (platformaga kira olmaydi)
									</Label>
									<Switch
										id='block-user'
										checked={currentEmployee.isBlocked}
										onCheckedChange={c =>
											setCurrentEmployee({ ...currentEmployee, isBlocked: c })
										}
									/>
								</div>
								<div className='pt-2'>
									<Button
										type='submit'
										className='w-full rounded-xl h-11 bg-zinc-900 hover:bg-zinc-800 text-white'
									>
										Saqlash
									</Button>
								</div>
							</form>
						)}
					</DialogContent>
				</Dialog>
			</div>
		</DashboardLayout>
	)
}
