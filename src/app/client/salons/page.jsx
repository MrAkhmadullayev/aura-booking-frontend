'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import useFetch from '@/hooks/useFetch'
import { motion } from 'framer-motion'
import { MapPin, Search, SlidersHorizontal, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function ClientSalonsDirectory() {
	const { data: rawSalons, isLoading } = useFetch('/salons')

	const [searchQuery, setSearchQuery] = useState('')
	const [activeTags, setActiveTags] = useState([])
	const [visibleCount, setVisibleCount] = useState(6)

	// New Filter States
	const [maxDistance, setMaxDistance] = useState(3000) // in meters
	const [priceRange, setPriceRange] = useState([0, 500000])

	// Derive formatted salons from cached SWR data
	const salons = rawSalons
		? rawSalons.map(salon => ({
				...salon,
				id: salon._id,
				distance: '', // Keep static visually since geolocation not available
				services: salon.services || [],
				minPrice: null,
				rating: salon.rating || 5.0,
				reviews: salon.reviewCount || 0,
				image:
					salon.coverImage ||
					salon.gallery?.[0] ||
					'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80',
			}))
		: []

	const handleTagClick = tag => {
		setActiveTags(prev =>
			prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
		)
	}

	const formatPriceToNumber = priceString => {
		return parseInt(priceString.replace(/\D/g, ''))
	}

	const getDistanceInMeters = distanceString => {
		if (distanceString?.includes('km')) return parseFloat(distanceString) * 1000
		return parseInt(distanceString) || 0
	}

	const filteredSalons = salons.filter(salon => {
		// Text search
		const matchesSearch =
			salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			salon.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
			salon.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(salon.services &&
				salon.services
					.join(' ')
					.toLowerCase()
					.includes(searchQuery.toLowerCase()))

		// Quick Tags
		const matchesTags =
			activeTags.length === 0 ||
			activeTags.some(tag => {
				if (tag === 'Sizga yaqin (1km)')
					return getDistanceInMeters(salon.distance) <= 1000
				if (tag === 'Erkaklar uchun')
					return (
						salon.type.toLowerCase().includes('erkak') ||
						salon.type.toLowerCase().includes('barber') ||
						salon.type.toLowerCase().includes('sartarosh')
					)
				if (tag === 'Ayollar uchun')
					return (
						salon.type.toLowerCase().includes('ayol') ||
						salon.type.toLowerCase().includes('vizaj') ||
						salon.type.toLowerCase().includes("go'zallik") ||
						salon.type.toLowerCase().includes("go'zal")
					)
				if (tag === 'Top Reyting') return salon.rating >= 4.8
				if (tag === 'Manikur & Pedikur')
					return (
						salon.type.toLowerCase().includes('manikur') ||
						salon.type.toLowerCase().includes('pedikur') ||
						(salon.services &&
							salon.services.join(' ').toLowerCase().includes('manikur'))
					)
				return false
			})

		// Advanced Filters
		let matchesPrice = true
		if (salon.minPrice) {
			const salonPrice = formatPriceToNumber(salon.minPrice)
			matchesPrice = salonPrice >= priceRange[0] && salonPrice <= priceRange[1]
		}

		const salonDist = getDistanceInMeters(salon.distance)
		const matchesDistance = salonDist <= maxDistance

		return matchesSearch && matchesTags && matchesPrice && matchesDistance
	})

	return (
		<DashboardLayout role='client'>
			<div className='max-w-7xl mx-auto space-y-8 pb-10'>
				{/* Header & Search */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='mb-6'
				>
					<div className='flex flex-col md:flex-row gap-4 justify-between items-start md:items-end mb-6'>
						<div>
							<h1 className='text-3xl font-bold text-zinc-900 tracking-tight'>
								Barcha Salonlar
							</h1>
							<p className='text-zinc-500 mt-1'>
								O'zingizga ma'qul joyni toping va to'g'ridan-to'g'ri yoziling.
							</p>
						</div>
					</div>

					<div className='flex flex-col md:flex-row gap-4'>
						{/* Search Bar */}
						<div className='relative flex-grow'>
							<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
								<Search className='h-5 w-5 text-zinc-400' />
							</div>
							<input
								type='text'
								className='block w-full pl-12 pr-4 py-3.5 rounded-xl border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-medium text-zinc-800 shadow-sm'
								placeholder='Salon nomi, manzil yoki xizmat turini kiriting...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
							/>
						</div>

						{/* Filter Button & Sidebar (Sheet) */}
						<Sheet>
							<SheetTrigger asChild>
								<Button
									size='lg'
									variant='outline'
									className='h-[50px] px-6 rounded-xl border-zinc-200 gap-2 bg-white text-zinc-700 hover:bg-zinc-50 font-medium whitespace-nowrap shadow-sm'
								>
									<SlidersHorizontal className='h-5 w-5' />
									Filtrlar
								</Button>
							</SheetTrigger>
							<SheetContent className='w-full sm:max-w-[400px] overflow-y-auto flex flex-col h-full bg-white border-l border-zinc-100 shadow-2xl p-0'>
								<SheetHeader className='mb-8 mt-6 px-6'>
									<SheetTitle className='text-xl font-bold tracking-tight text-zinc-900'>
										Kengaytirilgan Filtrlar
									</SheetTitle>
									<SheetDescription className='text-zinc-500 mt-1 text-sm'>
										O'zingizga qulay narx va masofadagi salonlarni toping.
									</SheetDescription>
								</SheetHeader>

								<div className='space-y-10 flex-grow px-6'>
									{/* Distance Filter */}
									<div className='space-y-6'>
										<div className='flex justify-between items-center'>
											<h3 className='text-sm font-semibold text-zinc-900 flex items-center gap-2'>
												<MapPin className='w-4 h-4 text-zinc-500' />
												Maksimal Masofa
											</h3>
											<Badge
												variant='secondary'
												className='bg-zinc-100 text-zinc-900 hover:bg-zinc-200 font-semibold px-2.5 py-1 rounded-lg'
											>
												{maxDistance < 1000
													? `${maxDistance} m`
													: `${(maxDistance / 1000).toFixed(1)} km`}
											</Badge>
										</div>
										<div className='px-1 mt-6'>
											<Slider
												defaultValue={[3000]}
												max={3000}
												min={500}
												step={500}
												value={[maxDistance]}
												onValueChange={val => setMaxDistance(val[0])}
												className='[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-zinc-900 [&_[role=slider]]:bg-white [&_.bg-primary]:bg-zinc-900 [&_.bg-secondary]:bg-zinc-200 cursor-pointer'
											/>
										</div>
									</div>

									<div className='w-full h-px bg-zinc-100'></div>

									{/* Price Range Filter */}
									<div className='space-y-6'>
										<div className='flex justify-between items-center'>
											<h3 className='text-sm font-semibold text-zinc-900 flex items-center gap-2'>
												Xizmat Narxi
											</h3>
										</div>

										<div className='grid grid-cols-2 gap-4'>
											<div className='space-y-1.5'>
												<label className='text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-1'>
													Dan
												</label>
												<div className='relative'>
													<input
														type='number'
														value={priceRange[0]}
														onChange={e =>
															setPriceRange([
																parseInt(e.target.value) || 0,
																priceRange[1],
															])
														}
														className='w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 outline-none'
													/>
												</div>
											</div>
											<div className='space-y-1.5'>
												<label className='text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-1'>
													Gacha
												</label>
												<div className='relative'>
													<input
														type='number'
														value={priceRange[1]}
														onChange={e =>
															setPriceRange([
																priceRange[0],
																parseInt(e.target.value) || 0,
															])
														}
														className='w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 outline-none'
													/>
												</div>
											</div>
										</div>

										<div className='px-1 pt-4'>
											<Slider
												defaultValue={[0, 500000]}
												max={1000000}
												min={0}
												step={10000}
												value={priceRange}
												onValueChange={setPriceRange}
												className='[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-zinc-900 [&_[role=slider]]:bg-white [&_.bg-primary]:bg-zinc-900 [&_.bg-secondary]:bg-zinc-200 cursor-pointer'
											/>
										</div>
									</div>
								</div>

								<SheetFooter className='mt-8 p-6 border-t border-zinc-100 bg-zinc-50/50'>
									<Button className='w-full rounded-xl h-12 bg-zinc-900 text-white font-medium text-sm shadow-sm hover:bg-zinc-800 transition-all'>
										Natijalarni ko'rish ({filteredSalons.length})
									</Button>
								</SheetFooter>
							</SheetContent>
						</Sheet>
					</div>

					{/* Quick Filter Tags */}
					<div className='flex flex-wrap gap-2 mt-4'>
						{[
							{
								label: 'Sizga yaqin (1km)',
								icon: <MapPin className='w-3 h-3' />,
							},
							{ label: 'Erkaklar uchun' },
							{ label: 'Ayollar uchun' },
							{
								label: 'Top Reyting',
								icon: (
									<Star className='w-3 h-3 mr-1 inline-block text-yellow-500 fill-yellow-500' />
								),
							},
							{ label: 'Manikur & Pedikur' },
						].map((tag, idx) => (
							<Badge
								key={idx}
								variant='secondary'
								onClick={() => handleTagClick(tag.label)}
								className={`px-3 py-1.5 rounded-full cursor-pointer border font-medium text-xs transition-colors flex items-center gap-1.5 ${
									activeTags.includes(tag.label)
										? 'bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800'
										: 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100'
								}`}
							>
								{tag.icon && tag.icon}
								{tag.label}
							</Badge>
						))}
					</div>
				</motion.div>

				{/* Salons Grid */}
				{isLoading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[1, 2, 3, 4, 5, 6].map(i => (
							<div
								key={i}
								className='rounded-3xl bg-zinc-100 h-[320px] animate-pulse border border-zinc-200 shadow-sm'
							/>
						))}
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredSalons.length === 0 ? (
							<div className='col-span-full text-center py-20 text-zinc-500 bg-white rounded-3xl border border-zinc-100 shadow-sm'>
								Kechirasiz, bunday salon topilmadi.
							</div>
						) : (
							filteredSalons.slice(0, visibleCount).map((salon, index) => (
								<motion.div
									key={salon.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: index * 0.05 }}
									className='h-full'
								>
									<Card className='overflow-hidden group border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 rounded-[1.5rem] bg-white flex flex-col h-full'>
										{/* Image Area */}
										<div className='relative aspect-[4/3] overflow-hidden bg-zinc-100'>
											<Image
												src={salon.image}
												alt={salon.name}
												fill
												className='object-cover group-hover:scale-105 transition-transform duration-500 ease-out'
											/>
											{/* Overlays */}
											<div className='absolute top-3 left-3'>
												<Badge className='bg-white/90 text-zinc-900 border-none shadow-sm font-semibold flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md'>
													<Star className='w-3 h-3 text-amber-500 fill-amber-500' />
													{salon.rating}{' '}
													<span className='text-zinc-500 font-normal ml-0.5'>
														({salon.reviews})
													</span>
												</Badge>
											</div>
											<div className='absolute bottom-3 right-3'>
												<Badge
													variant='secondary'
													className='bg-zinc-900 text-white border-none font-medium text-[10px] px-2 py-0.5 flex items-center gap-1 rounded-md shadow-sm opacity-90'
												>
													<MapPin className='w-3 h-3 text-white/80' />{' '}
													{salon.distance}
												</Badge>
											</div>
										</div>

										{/* Content Area */}
										<CardContent className='p-5 flex-grow flex flex-col'>
											<div className='mb-2'>
												<p className='text-[10px] font-bold tracking-wider text-zinc-400 uppercase mb-0.5'>
													{salon.type}
												</p>
												<h3 className='text-lg font-bold text-zinc-900 line-clamp-1'>
													{salon.name}
												</h3>
											</div>

											<p className='text-xs text-zinc-500 mb-4 flex-grow flex items-start gap-1'>
												<MapPin className='w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5' />
												<span className='line-clamp-2'>{salon.address}</span>
											</p>

											{/* Footer of Card */}
											<div className='pt-4 border-t border-zinc-100 mt-auto flex items-center justify-between'>
												<div>
													{salon.minPrice ? (
														<>
															<p className='text-[10px] text-zinc-500 mb-0.5 font-medium'>
																Xizmatlar
															</p>
															<p className='text-sm text-zinc-900 font-bold'>
																{salon.minPrice}{' '}
																<span className='text-zinc-400 text-xs font-normal'>
																	dan
																</span>
															</p>
														</>
													) : (
														<p className='text-[11px] text-zinc-400 font-medium italic mb-0.5'>
															Narxlar xizmatga qarab
														</p>
													)}
												</div>

												<Button
													asChild
													size='default'
													className='rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium px-4 shadow-sm h-9 text-xs'
												>
													<Link href={`/salons/${salon.id}`}>Bron qilish</Link>
												</Button>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))
						)}
					</div>
				)}

				{/* Pagination / Load More */}
				{!isLoading && filteredSalons.length > visibleCount && (
					<div className='mt-8 flex justify-center'>
						<Button
							variant='outline'
							onClick={() => setVisibleCount(prev => prev + 6)}
							className='rounded-xl px-6 h-10 border-zinc-200 text-zinc-700 font-medium hover:bg-zinc-50 shadow-sm'
						>
							Yana ko'rsatish
						</Button>
					</div>
				)}
			</div>
		</DashboardLayout>
	)
}
