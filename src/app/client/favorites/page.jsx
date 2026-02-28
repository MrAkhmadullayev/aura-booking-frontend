'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Heart, MapPin, Star } from 'lucide-react'
import { useState } from 'react'

const initialFavorites = [
	{
		id: 1,
		name: 'Aura Premium Salon',
		type: 'Unisex',
		rating: 4.9,
		reviews: 124,
		address: 'Yunusobod, Amir Temur 108',
		distance: '1.2 km',
		image:
			'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop',
	},
	{
		id: 2,
		name: 'VIP Barbershop',
		type: 'Erkaklar uchun',
		rating: 4.8,
		reviews: 89,
		address: "Chilonzor, Muqimiy ko'chasi",
		distance: '4.5 km',
		image:
			'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop',
	},
	{
		id: 3,
		name: 'Lola Beauty Studio',
		type: 'Ayollar uchun',
		rating: 4.9,
		reviews: 210,
		address: "Yashnobod, Mahtumquli ko'chasi",
		distance: '3.1 km',
		image:
			'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop',
	},
]

export default function ClientFavorites() {
	const [favorites, setFavorites] = useState(initialFavorites)

	const toggleFavorite = id => {
		setFavorites(favorites.filter(f => f.id !== id))
	}

	return (
		<DashboardLayout role='client'>
			<div className='space-y-6'>
				<div>
					<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
						Saqlangan Salonlar
					</h1>
					<p className='text-zinc-500 text-sm mt-1'>
						Sizga yoqqan va tez-tez tashrif buyuradigan salonlar ro'yxati.
					</p>
				</div>

				{favorites.length === 0 ? (
					<div className='text-center py-20 bg-white rounded-2xl border-none shadow-sm'>
						<Heart className='w-12 h-12 text-zinc-300 mx-auto mb-4' />
						<p className='text-zinc-500 font-medium mb-4'>
							Hozircha saqlangan salonlar yo'q.
						</p>
						<Button className='bg-zinc-900 text-white rounded-xl'>
							Salon izlash
						</Button>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{favorites.map(salon => (
							<Card
								key={salon.id}
								className='border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300 group cursor-pointer bg-white'
							>
								<div className='relative h-48 w-full overflow-hidden'>
									<img
										src={salon.image}
										alt={salon.name}
										className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
									/>
									<div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm'>
										<Star className='h-3.5 w-3.5 fill-amber-400 text-amber-400' />
										<span className='text-sm font-semibold text-zinc-900'>
											{salon.rating}
										</span>
									</div>
									<div className='absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-white text-xs font-medium'>
										{salon.type}
									</div>

									<button
										onClick={e => {
											e.stopPropagation()
											toggleFavorite(salon.id)
										}}
										className='absolute bottom-4 right-4 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:bg-rose-50'
									>
										<Heart className='h-5 w-5 fill-rose-500 text-rose-500' />
									</button>
								</div>

								<CardContent className='p-5'>
									<h3 className='font-bold text-zinc-900 text-lg line-clamp-1'>
										{salon.name}
									</h3>

									<div className='mt-3 space-y-2'>
										<div className='flex items-start gap-2 text-zinc-500'>
											<MapPin className='h-4 w-4 mt-0.5 flex-shrink-0' />
											<span className='text-sm'>{salon.address}</span>
										</div>
										<div className='flex items-center gap-2 text-zinc-500'>
											<Clock className='h-4 w-4 flex-shrink-0' />
											<span className='text-sm'>09:00 - 21:00</span>
											<span className='w-1 h-1 bg-zinc-300 rounded-full mx-1'></span>
											<span className='text-sm text-emerald-600 font-medium'>
												{salon.distance}
											</span>
										</div>
									</div>

									<div className='mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between'>
										<p className='text-xs text-zinc-500'>
											{salon.reviews} ta sharh
										</p>
										<Button className='bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm h-9 px-4'>
											Yozilish
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</DashboardLayout>
	)
}
