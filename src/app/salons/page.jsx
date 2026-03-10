'use client'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
	Loader2,
	MapPin,
	Scissors,
	Search,
	SlidersHorizontal,
	Star,
	Tag,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function SalonsPage() {
	const { data: rawSalons, isLoading: isSalonsLoading } = useFetch('/salons')
	const { data: allServices, isLoading: isServicesLoading } =
		useFetch('/services')

	const [searchQuery, setSearchQuery] = useState('')
	const [visibleCount, setVisibleCount] = useState(6)

	// Filter States
	const [priceRange, setPriceRange] = useState([0, 1000000])
	const [selectedCategories, setSelectedCategories] = useState([])
	const [selectedServices, setSelectedServices] = useState([])

	const isLoading = isSalonsLoading || isServicesLoading

	// Derive formatted salons from cached SWR data
	const salons = useMemo(() => {
		if (!rawSalons) return []
		return rawSalons.map(salon => {
			// Find services for this salon from allServices
			const salonServices = (allServices || [])
				.filter(s => s.salonId === salon._id)
				.map(s => s.name)

			const salonPrices = (allServices || [])
				.filter(s => s.salonId === salon._id)
				.map(s => parseInt(s.price))
				.filter(p => !isNaN(p))

			const dynamicMinPrice =
				salonPrices.length > 0 ? Math.min(...salonPrices) : null

			return {
				...salon,
				id: salon._id,
				services:
					salonServices.length > 0 ? salonServices : salon.services || [],
				minPrice: salon.minPrice || dynamicMinPrice,
				rating: salon.rating || 5.0,
				reviews: salon.reviewCount || 0,
				image:
					salon.coverImage ||
					salon.gallery?.[0] ||
					'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80',
			}
		})
	}, [rawSalons, allServices])

	// Derive dynamic filter options
	const categories = useMemo(() => {
		const types = salons.map(s => s.type).filter(Boolean)
		return [...new Set(types)]
	}, [salons])

	const availableServices = useMemo(() => {
		if (!allServices) return []
		const serviceNames = allServices.map(s => s.name).filter(Boolean)
		return [...new Set(serviceNames)]
	}, [allServices])

	const formatPriceToNumber = price => {
		if (typeof price === 'number') return price
		if (typeof price === 'string') {
			return parseInt(price.replace(/\D/g, '')) || 0
		}
		return 0
	}

	const filteredSalons = salons.filter(salon => {
		// Text search
		const matchesSearch =
			salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			salon.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(salon.type &&
				salon.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
			(salon.services &&
				salon.services
					.join(' ')
					.toLowerCase()
					.includes(searchQuery.toLowerCase()))

		// Category Filter
		const matchesCategory =
			selectedCategories.length === 0 || selectedCategories.includes(salon.type)

		// Services Filter
		const matchesServices =
			selectedServices.length === 0 ||
			selectedServices.some(service => salon.services?.includes(service))

		// Price Range Filter
		let matchesPrice = true
		if (salon.minPrice !== null) {
			const salonPrice = formatPriceToNumber(salon.minPrice)
			matchesPrice = salonPrice >= priceRange[0] && salonPrice <= priceRange[1]
		}

		return matchesSearch && matchesCategory && matchesServices && matchesPrice
	})

	const handleCategoryToggle = category => {
		setSelectedCategories(prev =>
			prev.includes(category)
				? prev.filter(c => c !== category)
				: [...prev, category],
		)
	}

	const handleServiceToggle = service => {
		setSelectedServices(prev =>
			prev.includes(service)
				? prev.filter(s => s !== service)
				: [...prev, service],
		)
	}

	return (
		<div className='min-h-screen flex flex-col font-sans bg-zinc-50 selection:bg-zinc-200 selection:text-zinc-900'>
			<Navbar />

			{/* Main Content */}
			<main className='flex-grow pt-28 pb-20'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8'>
					{/* Header & Search */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='mb-10'
					>
						<h1 className='text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight'>
							O'zingizga ma'qul joyni{' '}
							<span className='italic font-serif text-zinc-500'>tanlang</span>
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
											O'zingizga ma'qul narxdagi salonlarni toping.
										</SheetDescription>
									</SheetHeader>

									<div className='space-y-10 flex-grow px-2 pb-10'>
										{/* Categories Filter */}
										<div className='space-y-4'>
											<h3 className='text-sm font-semibold text-zinc-900 flex items-center gap-2 uppercase tracking-wider'>
												<Tag className='w-4 h-4 text-zinc-500' />
												Toifalar
											</h3>
											<div className='flex flex-wrap gap-2'>
												{categories.map(category => (
													<Badge
														key={category}
														variant='secondary'
														onClick={() => handleCategoryToggle(category)}
														className={`px-3 py-1.5 rounded-lg cursor-pointer border font-medium text-xs transition-all ${
															selectedCategories.includes(category)
																? 'bg-zinc-900 text-white border-zinc-900'
																: 'bg-zinc-50 border-zinc-100 text-zinc-600 hover:bg-zinc-100'
														}`}
													>
														{category}
													</Badge>
												))}
											</div>
										</div>

										<div className='w-full h-px bg-zinc-100'></div>

										{/* Services Filter */}
										<div className='space-y-4'>
											<h3 className='text-sm font-semibold text-zinc-900 flex items-center gap-2 uppercase tracking-wider'>
												<Scissors className='w-4 h-4 text-zinc-500' />
												Xizmatlar
											</h3>
											<div className='grid grid-cols-2 gap-3'>
												{availableServices.map(service => (
													<div
														key={service}
														className='flex items-center space-x-2'
													>
														<Checkbox
															id={`service-${service}`}
															checked={selectedServices.includes(service)}
															onCheckedChange={() =>
																handleServiceToggle(service)
															}
															className='border-zinc-300 data-[state=checked]:bg-zinc-900 data-[state=checked]:border-zinc-900'
														/>
														<label
															htmlFor={`service-${service}`}
															className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-600 cursor-pointer'
														>
															{service}
														</label>
													</div>
												))}
											</div>
										</div>

										<div className='w-full h-px bg-zinc-100'></div>

										{/* Price Range Filter */}
										<div className='space-y-6'>
											<div className='flex justify-between items-center'>
												<h3 className='text-sm font-semibold text-zinc-900 flex items-center gap-2 uppercase tracking-wider'>
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
															className='w-full px-4 py-3.5 bg-zinc-50/50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all hover:border-zinc-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
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
															className='w-full px-4 py-3.5 bg-zinc-50/50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all hover:border-zinc-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
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
													defaultValue={[0, 1000000]}
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

									<SheetFooter className='mt-8 pt-6 pb-2 border-t border-zinc-100 bg-white sticky bottom-0 z-20'>
										<Button className='w-full rounded-xl h-14 bg-zinc-900 text-white font-medium text-base shadow-md hover:shadow-lg hover:bg-zinc-800 transition-all'>
											Natijalarni ko'rish ({filteredSalons.length})
										</Button>
									</SheetFooter>
								</SheetContent>
							</Sheet>
						</div>

						{/* Quick Active Filters */}
						{(selectedCategories.length > 0 || selectedServices.length > 0) && (
							<div className='flex flex-wrap gap-2 mt-6'>
								{selectedCategories.map(cat => (
									<Badge
										key={cat}
										variant='secondary'
										className='bg-zinc-900 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1'
									>
										{cat}
										<span
											className='ml-1 cursor-pointer hover:text-zinc-300'
											onClick={() => handleCategoryToggle(cat)}
										>
											×
										</span>
									</Badge>
								))}
								{selectedServices.map(service => (
									<Badge
										key={service}
										variant='secondary'
										className='bg-zinc-200 text-zinc-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1'
									>
										{service}
										<span
											className='ml-1 cursor-pointer hover:text-zinc-500'
											onClick={() => handleServiceToggle(service)}
										>
											×
										</span>
									</Badge>
								))}
								<Button
									variant='ghost'
									size='sm'
									className='h-7 text-xs font-medium text-zinc-500 hover:text-zinc-900 px-2'
									onClick={() => {
										setSelectedCategories([])
										setSelectedServices([])
									}}
								>
									Hammasini tozalash
								</Button>
							</div>
						)}
					</motion.div>

					{/* Salons Grid */}
					{isLoading ? (
						<div className='flex justify-center items-center py-20'>
							<Loader2 className='w-8 h-8 animate-spin text-zinc-400' />
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'>
							{filteredSalons.length === 0 ? (
								<div className='col-span-full text-center py-20 text-zinc-500'>
									Kechirasiz, bunday salon topilmadi.
								</div>
							) : (
								filteredSalons.slice(0, visibleCount).map((salon, index) => (
									<motion.div
										key={salon.id}
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										whileHover={{ y: -5 }}
										className='h-full'
									>
										<Link
											href={`/salons/${salon.id}`}
											className='block h-full transition-all group'
										>
											<Card className='overflow-hidden border-zinc-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-300 rounded-[1.5rem] bg-white flex flex-col h-full'>
												{/* Image Area */}
												<div className='relative aspect-[4/3] overflow-hidden bg-zinc-100'>
													<Image
														src={salon.image}
														alt={salon.name}
														fill
														className='object-cover group-hover:scale-105 transition-transform duration-700 ease-out'
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
												</div>

												{/* Content Area */}
												<CardContent className='p-6 flex-grow flex flex-col'>
													<div className='flex justify-between items-start mb-2'>
														<div>
															<p className='text-xs font-bold tracking-wider text-black/40 uppercase mb-1 flex items-center gap-1'>
																{salon.type}
															</p>
															<h3 className='text-xl font-bold text-zinc-900 group-hover:text-black transition-colors line-clamp-1'>
																{salon.name}
															</h3>
														</div>
													</div>

													<p className='text-sm text-zinc-500 mb-4 flex-grow flex items-start gap-1.5 mt-1'>
														<MapPin className='w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5' />
														<span className='line-clamp-2'>
															{salon.address}
														</span>
													</p>

													<div className='space-y-3 mb-6'>
														<div className='flex flex-wrap gap-1.5'>
															{salon.services &&
																salon.services.length > 0 &&
																salon.services
																	.slice(0, 3)
																	.map((service, idx) => (
																		<span
																			key={idx}
																			className='inline-flex items-center px-2 py-1 rounded-lg bg-zinc-50 text-[10px] font-bold text-zinc-500 border border-zinc-100 uppercase tracking-tight'
																		>
																			{service}
																		</span>
																	))}
														</div>
													</div>

													{/* Footer of Card */}
													<div className='pt-4 border-t border-zinc-100 mt-auto flex items-center justify-between'>
														<div>
															{salon.minPrice ? (
																<>
																	<p className='text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5'>
																		Xizmatlar narxi
																	</p>
																	<p className='text-zinc-900 font-extrabold text-lg'>
																		{formatPriceToNumber(
																			salon.minPrice,
																		).toLocaleString()}{' '}
																		<span className='text-zinc-400 text-sm font-normal'>
																			dan
																		</span>
																	</p>
																</>
															) : (
																<p className='text-xs text-zinc-400 font-medium italic mb-0.5'>
																	Narxlar xizmatga qarab
																</p>
															)}
														</div>

														<div className='rounded-full bg-zinc-900 text-white font-bold px-6 py-2.5 shadow-sm group-hover:bg-black transition-colors text-sm'>
															Kirish
														</div>
													</div>
												</CardContent>
											</Card>
										</Link>
									</motion.div>
								))
							)}
						</div>
					)}

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
