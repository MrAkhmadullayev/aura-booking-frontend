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
import { Bell, HelpCircle, Lock, User } from 'lucide-react'
import { useState } from 'react'

export default function ClientSettings() {
	const [activeTab, setActiveTab] = useState('profile')

	return (
		<DashboardLayout role='client'>
			<div className='space-y-6'>
				<div>
					<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
						Sozlamalar
					</h1>
					<p className='text-zinc-500 text-sm mt-1'>
						Shaxsiy ma'lumotlaringiz va ilova sozlamalarini boshqaring.
					</p>
				</div>

				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Settings Navigation */}
					<div className='w-full lg:w-64 flex-shrink-0'>
						<nav className='flex flex-col space-y-1'>
							<button
								onClick={() => setActiveTab('profile')}
								className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-zinc-900 text-white font-medium shadow-md' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 font-medium'}`}
							>
								<User className='h-5 w-5' />
								Shaxsiy Profil
							</button>
							<button
								onClick={() => setActiveTab('notifications')}
								className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'notifications' ? 'bg-zinc-900 text-white font-medium shadow-md' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 font-medium'}`}
							>
								<Bell className='h-5 w-5' />
								Bildirishnomalar
							</button>
							<button
								onClick={() => setActiveTab('security')}
								className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'security' ? 'bg-zinc-900 text-white font-medium shadow-md' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 font-medium'}`}
							>
								<Lock className='h-5 w-5' />
								Xavfsizlik
							</button>
							<button
								onClick={() => setActiveTab('help')}
								className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'help' ? 'bg-zinc-900 text-white font-medium shadow-md' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 font-medium'}`}
							>
								<HelpCircle className='h-5 w-5' />
								Yordam va Qoidalar
							</button>
						</nav>
					</div>

					{/* Settings Content */}
					<div className='flex-1'>
						{activeTab === 'profile' && (
							<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
								<CardHeader className='bg-white border-b border-zinc-100 px-6 py-5'>
									<CardTitle className='text-lg font-bold text-zinc-900'>
										Shaxsiy Profil
									</CardTitle>
									<CardDescription className='text-zinc-500'>
										Kontakt ma'lumotlaringizni tahrirlang.
									</CardDescription>
								</CardHeader>
								<CardContent className='p-6'>
									<div className='flex items-center gap-6 mb-8'>
										<div className='h-20 w-20 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center relative group overflow-hidden'>
											<User className='h-10 w-10 text-zinc-400 group-hover:opacity-0 transition-opacity' />
											<div className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs text-white font-medium'>
												O'zgartirish
											</div>
										</div>
										<div>
											<Button
												variant='outline'
												className='rounded-xl font-medium'
											>
												Rasm yuklash
											</Button>
											<p className='text-xs text-zinc-500 mt-2'>
												Kichik hajmda, JPG yoki PNG
											</p>
										</div>
									</div>

									<form className='space-y-6'>
										<div className='space-y-4'>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												<div className='space-y-2'>
													<Label
														htmlFor='firstName'
														className='text-zinc-700 font-medium'
													>
														Ism
													</Label>
													<Input
														id='firstName'
														defaultValue='Sadriddin'
														className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
													/>
												</div>
												<div className='space-y-2'>
													<Label
														htmlFor='lastName'
														className='text-zinc-700 font-medium'
													>
														Familiya
													</Label>
													<Input
														id='lastName'
														defaultValue='M.'
														className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
													/>
												</div>
											</div>

											<div className='space-y-2'>
												<Label
													htmlFor='phone'
													className='text-zinc-700 font-medium'
												>
													Kiritilgan telefon raqami
												</Label>
												<Input
													id='phone'
													defaultValue='+998 94 000 11 22'
													disabled
													className='h-12 bg-zinc-100 border-zinc-200 rounded-xl text-zinc-500 cursor-not-allowed'
												/>
												<p className='text-xs text-zinc-500 mt-1'>
													Telefon raqamni faqat Xavfsizlik bo'limidan
													o'zgartirish mumkin.
												</p>
											</div>

											<div className='space-y-2'>
												<Label
													htmlFor='email'
													className='text-zinc-700 font-medium'
												>
													Email manzil (Ixtiyoriy)
												</Label>
												<Input
													id='email'
													type='email'
													placeholder='example@mail.com'
													className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
												/>
											</div>
										</div>

										<div className='flex justify-end border-t border-zinc-100 pt-6'>
											<Button className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-11 px-6 font-medium'>
												Saqlash
											</Button>
										</div>
									</form>
								</CardContent>
							</Card>
						)}

						{activeTab === 'notifications' && (
							<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
								<CardHeader className='bg-white border-b border-zinc-100 px-6 py-5'>
									<CardTitle className='text-lg font-bold text-zinc-900'>
										Bildirishnomalar
									</CardTitle>
									<CardDescription className='text-zinc-500'>
										SMS va Push xabarnomalarni sozlang.
									</CardDescription>
								</CardHeader>
								<CardContent className='p-6'>
									<div className='space-y-6'>
										{[
											{
												id: 'n1',
												title: 'Yozuv tasdiqlangani haqida',
												desc: 'Salon sizning broningizni tasdiqlasa SMS yuborilsin',
											},
											{
												id: 'n2',
												title: 'Eslatma xabarlari',
												desc: 'Tashrifdan 2 soat oldin xabar kelsin',
											},
											{
												id: 'n3',
												title: 'Aksiya va chegirmalar',
												desc: 'Siz saqlagan salonlardagi yangiliklar haqida',
											},
										].map((item, idx) => (
											<div
												key={idx}
												className='flex items-center justify-between'
											>
												<div className='space-y-0.5'>
													<Label
														htmlFor={item.id}
														className='text-base text-zinc-900 font-semibold cursor-pointer'
													>
														{item.title}
													</Label>
													<p className='text-sm text-zinc-500'>{item.desc}</p>
												</div>
												<div className='relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in'>
													<input
														type='checkbox'
														name='toggle'
														id={item.id}
														defaultChecked
														className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-zinc-900 transition-all duration-300'
													/>
													<label
														htmlFor={item.id}
														className='toggle-label block overflow-hidden h-6 rounded-full bg-zinc-200 cursor-pointer'
													></label>
												</div>
											</div>
										))}
									</div>
									<div className='flex justify-end border-t border-zinc-100 pt-6 mt-6'>
										<Button className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-11 px-6 font-medium'>
											Saqlash
										</Button>
									</div>
								</CardContent>
							</Card>
						)}

						{activeTab === 'security' && (
							<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
								<CardHeader className='bg-white border-b border-zinc-100 px-6 py-5'>
									<CardTitle className='text-lg font-bold text-zinc-900'>
										Xavfsizlik
									</CardTitle>
									<CardDescription className='text-zinc-500'>
										Parolingiz va tizimga kirish xavfsizligi.
									</CardDescription>
								</CardHeader>
								<CardContent className='p-6'>
									<form className='space-y-6'>
										<div className='space-y-4'>
											<div className='space-y-2'>
												<Label
													htmlFor='currentPassword'
													className='text-zinc-700 font-medium'
												>
													Joriy Parol
												</Label>
												<Input
													id='currentPassword'
													type='password'
													className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
												/>
											</div>
											<div className='space-y-2'>
												<Label
													htmlFor='newPassword'
													className='text-zinc-700 font-medium'
												>
													Yangi Parol
												</Label>
												<Input
													id='newPassword'
													type='password'
													className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
												/>
											</div>
											<div className='space-y-2'>
												<Label
													htmlFor='confirmPassword'
													className='text-zinc-700 font-medium'
												>
													Yangi Parolni Tasdiqlang
												</Label>
												<Input
													id='confirmPassword'
													type='password'
													className='h-12 bg-zinc-50 border-zinc-200 rounded-xl'
												/>
											</div>
										</div>

										<div className='flex justify-end border-t border-zinc-100 pt-6'>
											<Button className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-11 px-6 font-medium'>
												Parolni yangilash
											</Button>
										</div>
									</form>

									<div className='mt-8 pt-6 border-t border-red-100'>
										<h4 className='text-red-600 font-bold mb-2'>
											Hisobni O'chirish
										</h4>
										<p className='text-sm text-zinc-500 mb-4'>
											Hisobingizni o'chirsangiz tizimdagi barcha
											ma'lumotlaringiz o'chib ketadi.
										</p>
										<Button
											variant='outline'
											className='text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl font-medium'
										>
											Hisobni butunlay o'chirish
										</Button>
									</div>
								</CardContent>
							</Card>
						)}

						{activeTab === 'help' && (
							<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
								<CardContent className='p-6'>
									<div className='text-center py-10'>
										<HelpCircle className='h-16 w-16 text-zinc-300 mx-auto mb-4' />
										<h2 className='text-xl font-bold text-zinc-900 mb-2'>
											Yordam Kerakmi?
										</h2>
										<p className='text-zinc-500 mb-6'>
											Aura tizimi bilan bog'liq har qanday savolingiz bo'lsa
											bizning qo'llab-quvvatlash jamoamizga bog'laning.
										</p>
										<Button className='bg-zinc-900 text-white rounded-xl'>
											Qo'llab-quvvatlash bilan bog'lanish
										</Button>
									</div>
								</CardContent>
							</Card>
						)}
					</div>
				</div>
			</div>

			<style
				dangerouslySetInnerHTML={{
					__html: `
				/* Custom toggle switch CSS (optional to inline vs using normal Tailwind utility) */
				.toggle-checkbox:checked { right: 0; border-color: #18181b; }
				.toggle-checkbox:checked + .toggle-label { background-color: #18181b; }
			`,
				}}
			/>
		</DashboardLayout>
	)
}
