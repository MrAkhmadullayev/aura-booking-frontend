export default function TermsOfUse() {
	return (
		<div className='min-h-screen bg-zinc-50 py-20 px-4 sm:px-6 lg:px-8 font-sans'>
			<div className='max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-8 sm:p-12 lg:p-16'>
				<div className='text-center mb-16'>
					<h1 className='text-4xl sm:text-5xl font-black text-zinc-900 tracking-tight mb-6'>
						Foydalanish Shartlari
					</h1>
					<p className='text-lg text-zinc-500 max-w-2xl mx-auto'>
						So'nggi yangilanish: 12 Aprel, 2024-yil. Iltimos, Aura Booking
						platformasidan foydalanishdan oldin ushbu shartlarni diqqat bilan
						o'qib chiqing.
					</p>
				</div>

				<div className='space-y-12 text-zinc-700 leading-relaxed max-w-3xl mx-auto'>
					<section>
						<h2 className='text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3'>
							<span className='flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-sm font-black text-zinc-900'>
								1
							</span>
							Shartnomaga Rozilik
						</h2>
						<p className='mb-4'>
							Ushbu sahifada keltirilgan Foydalanish Shartlari (Terms of
							Service, keyingi o'rinlarda qisqacha "Shartlar") siz va Aura
							("Aura Booking," "Biz" yoki "Platforma") o'rtasidagi yuridik
							hujjat hisoblanadi.
						</p>
						<div className='bg-zinc-50 p-6 rounded-2xl border-l-[3px] border-zinc-900'>
							<p className='font-medium text-zinc-900'>
								Saytga kirish orqali yoki platformaning har qanday xizmatidan
								foydalanishni boshlash bilan Siz ushbu shartlarga to'liq, hech
								qanday istisnolarsiz rozi bo'lasiz. Agar qaysidir qoidaga rozi
								bo'lmasangiz, iltimos platformadan foydalanishni to'xtating.
							</p>
						</div>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3'>
							<span className='flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-sm font-black text-zinc-900'>
								2
							</span>
							Platformaning Vazifasi
						</h2>
						<p className='mb-4'>
							Aura - bu Mijozlar va turli Go'zallik Salonlari / Ustalar ("Xizmat
							Ko'rsatuvchilar") o'rtasida vositachi bo'lib xizmat qiladigan
							onlayn bron tizimidir. Platformaning o'zi bevosita kosmetik
							yordam, sochni kesish, tibbiy yordam kabi bevosita xizmatlarni
							taqdim etmaydi.
						</p>
						<p>
							Shu sababli, taqdim etilgan xizmat sifati, ustalarning harakatlari
							va mijozlarga tibbiy/gigienik talablarning bajarilishi uchun
							to'liq javobgarlik faqat va faqat{' '}
							<strong className='text-zinc-900'>Xizmat Ko'rsatuvchiga</strong>{' '}
							yuklanadi.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3'>
							<span className='flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-sm font-black text-zinc-900'>
								3
							</span>
							Mijozlarning Majburiyatlari
						</h2>
						<p className='mb-4'>
							Aura platformasidan ro'yxatdan o'tayotganda va xizmatlarni band
							qilayotganda siz:
						</p>
						<ul className='space-y-4'>
							<li className='flex gap-4 p-4 rounded-xl border border-zinc-100 bg-white'>
								<div className='w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 text-zinc-500 font-bold'>
									A
								</div>
								<p>
									<strong className='text-zinc-900 block mb-1'>
										Haqiqiy Ma'lumot:
									</strong>{' '}
									O'zingiz haqingizda (ism, familiya, telefon raqami) to'g'ri va
									doim aloqada bo'ladigan malumotlarni kiritishga.
								</p>
							</li>
							<li className='flex gap-4 p-4 rounded-xl border border-zinc-100 bg-white'>
								<div className='w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 text-zinc-500 font-bold'>
									B
								</div>
								<p>
									<strong className='text-zinc-900 block mb-1'>
										Vaqtga rioya qilish:
									</strong>{' '}
									O'zingiz band qilgan usta qabuliga aniq vaqtida yetib borishga
									yoki kela olmasangiz darhol "Mening Yozuvlarim" orqali bekor
									qilishga.
								</p>
							</li>
							<li className='flex gap-4 p-4 rounded-xl border border-zinc-100 bg-white'>
								<div className='w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 text-zinc-500 font-bold'>
									C
								</div>
								<p>
									<strong className='text-zinc-900 block mb-1'>
										Odob-Axsloq:
									</strong>{' '}
									Platforma ichidagi sharhlarda qo'pol, haqoratomuz va adekvat
									bo'lmagan mazmundagi fikrlarni qoldirmaslikka majbur bo'lasiz.
								</p>
							</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3'>
							<span className='flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-sm font-black text-zinc-900'>
								4
							</span>
							Biznes (Usta) Egalarining Majburiyatlari
						</h2>
						<p className='mb-4'>
							Aura tizimidan "Biznes Rolida" foydalanuvchilar o'z ustaxonalariga
							taaluqli bo'lgan xizmat turlarini, narxlarni va taqvim
							jadvallarini erkin boshqarishi mumkin. Shuningdek:
						</p>
						<p>
							Agar "Salon Egasi" o'z xizmat ko'rsatuvchi sahifasida firibgarlik
							ustida ishlasa yoki platforma obro'siga ataylab ziyon yetkazmoqchi
							bo'lsa (yolg'on baxolar yozish va x.k), Aura Adminlari u biznesni{' '}
							<strong className='text-red-500'>
								ogohlantirishsiz xizmatdan bloklash huquqiga
							</strong>{' '}
							ega.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3'>
							<span className='flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-sm font-black text-zinc-900'>
								5
							</span>
							Intellektual Mulk
						</h2>
						<p className='mb-4'>
							Platformada ishlatilgan barcha intellektual ob'ektlar, ilova
							kodlari, dizaynlar, "Aura" brendi logotipi kabi xususiyatlar
							himoyalangan va ular mualliflik huquqi ostida.
						</p>
					</section>
				</div>

				<div className='mt-16 pt-8 border-t border-zinc-100 text-center'>
					<p className='text-sm text-zinc-400'>
						© {new Date().getFullYear()} Aura Booking. Pochtaga xat yoziing:
						hi@aura.uz
					</p>
				</div>
			</div>
		</div>
	)
}
