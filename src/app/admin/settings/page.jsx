'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Database, Globe, ShieldCheck } from 'lucide-react'

export default function AdminSettings() {
	return (
		<DashboardLayout role='admin'>
			<div className='space-y-6 max-w-4xl'>
				<div>
					<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
						Tizim Sozlamalari
					</h1>
					<p className='text-zinc-500 text-sm mt-1'>
						Platformaning global qoidalari va konfiguratsiyasi.
					</p>
				</div>

				<div className='space-y-6'>
					{/* General Platform Settings */}
					<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
						<CardHeader className='bg-white border-b border-zinc-100 flex flex-row items-center gap-4 px-6 py-5'>
							<div className='h-10 w-10 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-xl'>
								<Globe className='h-5 w-5' />
							</div>
							<div>
								<CardTitle className='text-lg font-bold text-zinc-900'>
									Global Sozlamalar
								</CardTitle>
								<CardDescription className='text-zinc-500'>
									Ilovaning asosiy tillari va hududlari.
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent className='p-6'>
							<form className='space-y-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div className='space-y-2'>
										<Label
											htmlFor='appName'
											className='text-zinc-700 font-medium'
										>
											Ilova nomi
										</Label>
										<Input
											id='appName'
											defaultValue='Aura Booking Platform'
											className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
										/>
									</div>
									<div className='space-y-2'>
										<Label
											htmlFor='contactEmail'
											className='text-zinc-700 font-medium'
										>
											Qo'llab-quvvatlash emaili
										</Label>
										<Input
											type='email'
											id='contactEmail'
											defaultValue='support@aura.uz'
											className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
										/>
									</div>
									<div className='space-y-2'>
										<Label
											htmlFor='defaultCity'
											className='text-zinc-700 font-medium'
										>
											Birlamchi shahar
										</Label>
										<Input
											id='defaultCity'
											defaultValue='Toshkent'
											className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
										/>
									</div>
									<div className='space-y-2'>
										<Label
											htmlFor='currency'
											className='text-zinc-700 font-medium'
										>
											Pul Birligi
										</Label>
										<Input
											id='currency'
											defaultValue='UZS'
											disabled
											className='h-12 bg-zinc-100 border-zinc-200 rounded-xl'
										/>
									</div>
								</div>
								<div className='flex justify-end pt-2'>
									<Button className='bg-zinc-900 text-white rounded-xl'>
										Saqlash
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>

					{/* Security Settings */}
					<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
						<CardHeader className='bg-white border-b border-zinc-100 flex flex-row items-center gap-4 px-6 py-5'>
							<div className='h-10 w-10 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl'>
								<ShieldCheck className='h-5 w-5' />
							</div>
							<div>
								<CardTitle className='text-lg font-bold text-zinc-900'>
									Xavfsizlik va SMS
								</CardTitle>
								<CardDescription className='text-zinc-500'>
									SMS shlyuzi va autentifikatsiya.
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent className='p-6'>
							<div className='space-y-6'>
								<div className='flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100'>
									<div>
										<h4 className='font-bold text-zinc-900'>
											Eskiz.uz SMS Integratsiyasi
										</h4>
										<p className='text-sm text-zinc-500 mt-1'>
											Ro'yxatdan o'tishda tasdiqlash kodi uchun
										</p>
									</div>
									<Button
										variant='outline'
										className='rounded-xl border-zinc-200 bg-white'
									>
										Sozlash
									</Button>
								</div>

								<div className='flex flex-col gap-4'>
									<div className='flex items-center justify-between'>
										<div className='space-y-0.5'>
											<Label className='text-base text-zinc-900 font-semibold'>
												Ikki bosqichli autentifikatsiya (Mijozlar)
											</Label>
											<p className='text-sm text-zinc-500'>
												Mijozlar kirishi faqat SMS kod orqali (Parolsiz)
											</p>
										</div>
										<div className='relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in'>
											<input
												type='checkbox'
												name='toggle'
												id='t1'
												defaultChecked
												className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-zinc-900 transition-all duration-300'
											/>
											<label
												htmlFor='t1'
												className='toggle-label block overflow-hidden h-6 rounded-full bg-zinc-200 cursor-pointer'
											></label>
										</div>
									</div>
									<div className='flex items-center justify-between'>
										<div className='space-y-0.5'>
											<Label className='text-base text-zinc-900 font-semibold'>
												Admin Panelga ruxsat
											</Label>
											<p className='text-sm text-zinc-500'>
												Faqat ruxsat etilgan IP manzillardan
											</p>
										</div>
										<div className='relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in'>
											<input
												type='checkbox'
												name='toggle'
												id='t2'
												className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-zinc-900 transition-all duration-300'
											/>
											<label
												htmlFor='t2'
												className='toggle-label block overflow-hidden h-6 rounded-full bg-zinc-200 cursor-pointer'
											></label>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Database / Advanced */}
					<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden border border-red-100'>
						<CardHeader className='bg-red-50/50 border-b border-red-100 flex flex-row items-center gap-4 px-6 py-5'>
							<div className='h-10 w-10 bg-red-100 text-red-600 flex items-center justify-center rounded-xl'>
								<Database className='h-5 w-5' />
							</div>
							<div>
								<CardTitle className='text-lg font-bold text-red-600'>
									Xavfli Hudud
								</CardTitle>
								<CardDescription className='text-red-500'>
									Ma'lumotlar bazasi va keshlar bilan ishlash.
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent className='p-6'>
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<div>
										<h4 className='font-bold text-zinc-900'>
											Keshni tozalash (Clear Cache)
										</h4>
										<p className='text-sm text-zinc-500'>
											Tizimni tezlashtirish uchun barcha vaqtinchalik
											ma'lumotlarni o'chirish.
										</p>
									</div>
									<Button
										variant='outline'
										className='rounded-xl border-zinc-200 hover:bg-zinc-100'
									>
										Tozalash
									</Button>
								</div>
								<div className='flex items-center justify-between pt-4 border-t border-zinc-100'>
									<div>
										<h4 className='font-bold text-zinc-900'>
											Saytni texnik xizmat holatiga o'tkazish
										</h4>
										<p className='text-sm text-zinc-500'>
											Foydalanuvchilar tizimga kira olmaydi (Maintenance Mode).
										</p>
									</div>
									<Button
										variant='outline'
										className='rounded-xl border-red-200 text-red-600 hover:bg-red-50'
									>
										Faollashtirish
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
				.toggle-checkbox:checked { right: 0; border-color: #18181b; }
				.toggle-checkbox:checked + .toggle-label { background-color: #18181b; }
			`,
				}}
			/>
		</DashboardLayout>
	)
}
