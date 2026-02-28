'use client'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
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
import { MapPin, Search, SlidersHorizontal, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { mockSalons } from '@/data/salons'

export default function SalonsPage() {
	const [searchQuery, setSearchQuery] = useState('')
	const [activeTags, setActiveTags] = useState([])
	const [visibleCount, setVisibleCount] = useState(6)

	// New Filter States
	const [maxDistance, setMaxDistance] = useState(3000) // in meters
	const [priceRange, setPriceRange] = useState([0, 500000])

	const handleTagClick = tag => {
		setActiveTags(prev =>
			prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
		)
	}

	const formatPriceToNumber = priceString => {
		return parseInt(priceString.replace(/\D/g, ''))
	}

	const getDistanceInMeters = distanceString => {
		if (distanceString.includes('km')) return parseFloat(distanceString) * 1000
		return parseInt(distanceString)
	}

	const filteredSalons = mockSalons.filter(salon => {
		// Text search
		const matchesSearch =
			salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			salon.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
			salon.services.join(' ').toLowerCase().includes(searchQuery.toLowerCase())

		// Quick Tags
		const matchesTags =
			activeTags.length === 0 ||
			activeTags.some(tag => {
				if (tag === 'Sizga yaqin (1km)')
					return getDistanceInMeters(salon.distance) <= 1000
				if (tag === 'Erkaklar uchun')
					return (
						salon.type.includes('Erkaklar') ||
						salon.type.includes('Sartaroshxona')
					)
				if (tag === 'Ayollar uchun')
					return (
						salon.type.includes('Ayollar') ||
						salon.type.includes('Vizajist') ||
						salon.type.includes("VIP Go'zallik")
					)
				if (tag === 'Top Reyting') return salon.rating >= 4.8
				if (tag === 'Manikur & Pedikur')
					return (
						salon.services.join(' ').toLowerCase().includes('manikur') ||
						salon.services.join(' ').toLowerCase().includes('pedikur')
					)
				return false
			})

		// Advanced Filters (Sidebar)
		const salonPrice = formatPriceToNumber(salon.minPrice)
		const matchesPrice =
			salonPrice >= priceRange[0] && salonPrice <= priceRange[1]

		const salonDist = getDistanceInMeters(salon.distance)
		const matchesDistance = salonDist <= maxDistance

		return matchesSearch && matchesTags && matchesPrice && matchesDistance
	})

	return (
		<div className='min-h-screen flex flex-col font-sans bg-zinc-50 selection:bg-zinc-200 selection:text-zinc-900'>
			<Navbar />

			{/* Main Content */}
			<main className='flex-grow pt-28 pb-20'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8'>
					{/* Header & Search */}
					<div className='mb-10'>
						<h1 className='text-3xl md:text-4xl font-semibold text-zinc-900 mb-6 font-serif'>
							Sizga eng yaqin salonlar
						</h1>

						<div className='flex flex-col md:flex-row gap-4'>
							{/* Search Bar */}
							<div className='relative flex-grow'>
								<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
									<Search className='h-5 w-5 text-zinc-400' />
								</div>
								<input
									type='text'
									className='block w-full pl-12 pr-4 py-4 rounded-xl border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-medium text-zinc-800 shadow-sm'
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
										className='h-14 px-6 rounded-xl border-zinc-200 gap-2 bg-white text-zinc-700 hover:bg-zinc-50 font-medium whitespace-nowrap'
									>
										<SlidersHorizontal className='h-5 w-5' />
										Filtrelovchilar
									</Button>
								</SheetTrigger>
								<SheetContent className='w-full sm:max-w-md overflow-y-auto flex flex-col h-full bg-white border-l border-zinc-100 shadow-2xl'>
									<SheetHeader className='mb-10 mt-4 px-2'>
										<SheetTitle className='text-2xl font-semibold tracking-tight text-zinc-900'>
											Kengaytirilgan Filtrlar
										</SheetTitle>
										<SheetDescription className='text-zinc-500 mt-2 text-base'>
											O'zingizga qulay narx va masofadagi salonlarni toping.
										</SheetDescription>
									</SheetHeader>

									<div className='space-y-12 flex-grow px-2'>
										{/* Distance Filter */}
										<div className='space-y-6'>
											<div className='flex justify-between items-center'>
												<h3 className='text-sm font-semibold text-zinc-900 flex items-center gap-2'>
													<MapPin className='w-4 h-4 text-zinc-500' />
													Maksimal Masofa
												</h3>
												<Badge
													variant='secondary'
													className='bg-zinc-100 text-zinc-900 hover:bg-zinc-200 font-semibold px-3 py-1 rounded-full shadow-sm'
												>
													{maxDistance < 1000
														? `${maxDistance} m`
														: `${(maxDistance / 1000).toFixed(1)} km`}
												</Badge>
											</div>
											<div className='px-2 mt-8'>
												<Slider
													defaultValue={[3000]}
													max={3000}
													min={500}
													step={500}
													value={[maxDistance]}
													onValueChange={val => setMaxDistance(val[0])}
													className='[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-zinc-900 [&_[role=slider]]:bg-white [&_.bg-primary]:bg-zinc-900 [&_.bg-secondary]:bg-zinc-200 cursor-pointer py-4'
												/>
											</div>
											<div className='flex justify-between text-[11px] font-medium text-zinc-400 px-2 pt-2 select-none'>
												<span>500m</span>
												<span>1km</span>
												<span>1.5km</span>
												<span>2km</span>
												<span>2.5km</span>
												<span>3km+</span>
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
												<div className='space-y-2'>
													<label className='text-[11px] font-semibold text-zinc-500 uppercase tracking-wider pl-1'>
														Dan
													</label>
													<div className='relative group'>
														<input
															type='number'
															value={priceRange[0]}
															onChange={e =>
																setPriceRange([
																	parseInt(e.target.value) || 0,
																	priceRange[1],
																])
															}
															className='w-full px-4 py-3.5 bg-zinc-50/50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all hover:border-zinc-300'
														/>
														<div className='absolute inset-y-0 right-4 flex items-center pointer-events-none'>
															<span className='text-xs font-medium text-zinc-400'>
																so'm
															</span>
														</div>
													</div>
												</div>
												<div className='space-y-2'>
													<label className='text-[11px] font-semibold text-zinc-500 uppercase tracking-wider pl-1'>
														Gacha
													</label>
													<div className='relative group'>
														<input
															type='number'
															value={priceRange[1]}
															onChange={e =>
																setPriceRange([
																	priceRange[0],
																	parseInt(e.target.value) || 0,
																])
															}
															className='w-full px-4 py-3.5 bg-zinc-50/50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all hover:border-zinc-300'
														/>
														<div className='absolute inset-y-0 right-4 flex items-center pointer-events-none'>
															<span className='text-xs font-medium text-zinc-400'>
																so'm
															</span>
														</div>
													</div>
												</div>
											</div>

											<div className='px-2 pt-6'>
												<Slider
													defaultValue={[0, 500000]}
													max={1000000}
													min={0}
													step={10000}
													value={priceRange}
													onValueChange={setPriceRange}
													className='[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-zinc-900 [&_[role=slider]]:bg-white [&_.bg-primary]:bg-zinc-900 [&_.bg-secondary]:bg-zinc-200 cursor-pointer py-4'
												/>
											</div>
										</div>
									</div>

									<SheetFooter className='mt-8 pt-6 pb-2 border-t border-zinc-100 bg-white'>
										<Button className='w-full rounded-xl h-14 bg-zinc-900 text-white font-medium text-base shadow-md hover:shadow-lg hover:bg-zinc-800 transition-all'>
											Natijalarni ko'rish ({filteredSalons.length})
										</Button>
									</SheetFooter>
								</SheetContent>
							</Sheet>
						</div>

						{/* Quick Filter Tags */}
						<div className='flex flex-wrap gap-2 mt-6'>
							{[
								{
									label: 'Sizga yaqin (1km)',
									icon: <MapPin className='w-3.5 h-3.5' />,
								},
								{ label: 'Erkaklar uchun' },
								{ label: 'Ayollar uchun' },
								{
									label: 'Top Reyting',
									icon: (
										<Star className='w-3.5 h-3.5 mr-1 inline-block text-yellow-500 fill-yellow-500' />
									),
								},
								{ label: 'Manikur & Pedikur' },
							].map((tag, idx) => (
								<Badge
									key={idx}
									variant='secondary'
									onClick={() => handleTagClick(tag.label)}
									className={`px-4 py-2 rounded-full cursor-pointer border font-medium text-sm transition-colors flex items-center gap-1.5 ${
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
					</div>

					{/* Salons Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'>
						{filteredSalons.length === 0 ? (
							<div className='col-span-full text-center py-20 text-zinc-500'>
								Kechirasiz, bunday salon topilmadi.
							</div>
						) : (
							filteredSalons.slice(0, visibleCount).map(salon => (
								<Card
									key={salon.id}
									className='overflow-hidden group border-zinc-100/80 shadow-sm hover:shadow-xl transition-all duration-300 rounded-[1.5rem] bg-white flex flex-col'
								>
									{/* Image Area */}
									<div className='relative aspect-[4/3] overflow-hidden bg-zinc-100'>
										<Image
											src={salon.image}
											alt={salon.name}
											fill
											className='object-cover group-hover:scale-105 transition-transform duration-500'
										/>
										{/* Overlays */}
										<div className='absolute top-4 left-4'>
											<Badge className='bg-white/90 text-zinc-900 hover:bg-white backdrop-blur-sm border-none shadow-sm font-semibold flex items-center gap-1'>
												<Star className='w-3.5 h-3.5 text-yellow-500 fill-yellow-500' />
												{salon.rating}{' '}
												<span className='text-zinc-500 font-normal'>
													({salon.reviews})
												</span>
											</Badge>
										</div>
										<div className='absolute bottom-4 right-4'>
											<Badge
												variant='secondary'
												className='bg-zinc-900/80 text-white hover:bg-zinc-900 backdrop-blur-md border-none font-medium text-xs px-2.5 py-1 flex items-center gap-1.5 rounded-lg shadow-md'
											>
												<MapPin className='w-3 h-3 text-white/80' />{' '}
												{salon.distance}
											</Badge>
										</div>
									</div>

									{/* Content Area */}
									<CardContent className='p-6 flex-grow flex flex-col'>
										<div className='flex justify-between items-start mb-2'>
											<div>
												<p className='text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-1'>
													{salon.type}
												</p>
												<h3 className='text-xl font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors line-clamp-1'>
													{salon.name}
												</h3>
											</div>
										</div>

										<p className='text-sm text-zinc-500 mb-4 flex-grow flex items-start gap-1.5 mt-1'>
											<MapPin className='w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5' />
											<span className='line-clamp-2'>{salon.address}</span>
										</p>

										<div className='space-y-3 mb-6'>
											<div className='flex flex-wrap gap-1.5'>
												{salon.services.slice(0, 3).map((service, idx) => (
													<span
														key={idx}
														className='inline-flex items-center px-2 py-1 rounded bg-zinc-50 text-xs font-medium text-zinc-600 border border-zinc-100'
													>
														{service}
													</span>
												))}
												{salon.services.length > 3 && (
													<span className='inline-flex items-center px-2 py-1 rounded bg-zinc-50 text-xs font-medium text-zinc-600 border border-zinc-100'>
														+{salon.services.length - 3}
													</span>
												)}
											</div>
										</div>

										{/* Footer of Card */}
										<div className='pt-4 border-t border-zinc-100 mt-auto flex items-center justify-between'>
											<div>
												<p className='text-xs text-zinc-400 mb-0.5'>
													Xizmatlar narxi
												</p>
												<p className='text-zinc-900 font-semibold'>
													{salon.minPrice}{' '}
													<span className='text-zinc-400 text-sm font-normal'>
														dan
													</span>
												</p>
											</div>

											<Button
												asChild
												className='rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium px-5 shadow-sm'
											>
												<Link href={`/salons/${salon.id}`}>Bron qilish</Link>
											</Button>
										</div>
									</CardContent>
								</Card>
							))
						)}
					</div>

					{/* Pagination / Load More */}
					{filteredSalons.length > visibleCount && (
						<div className='mt-12 flex justify-center'>
							<Button
								variant='outline'
								onClick={() => setVisibleCount(prev => prev + 6)}
								className='rounded-full px-8 h-12 border-zinc-200 text-zinc-700 font-medium hover:bg-zinc-50'
							>
								Yana ko'rsatish
							</Button>
						</div>
					)}
				</div>
			</main>

			<Footer />
		</div>
	)
}
