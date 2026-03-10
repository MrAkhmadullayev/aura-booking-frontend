'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import api from '@/lib/api'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SalonsList() {
	const [salons, setSalons] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchSalons = async () => {
			try {
				const res = await api.get('/salons')
				// Format data for display: limit to active/valid salons
				const formattedSalons = res.data.map(salon => ({
					...salon,
					id: salon._id,
					distance: '', // Still mock distance as location tracking is complex for landing page
					services: [], // Remove mock 'Soch kesish' and let it render based on type
					minPrice: null, // Removed mock price
					rating: salon.rating || 5.0,
					reviews: salon.reviewCount || 0,
					image:
						salon.coverImage ||
						salon.gallery?.[0] ||
						'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80',
				}))
				// Limit to 6 items for landing page
				setSalons(formattedSalons.slice(0, 6))
			} catch (error) {
				console.error('Error fetching salons:', error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchSalons()
	}, [])

	if (isLoading) {
		return (
			<section className='py-24 bg-zinc-50 overflow-hidden relative'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8 flex justify-center'>
					<div className='w-12 h-12 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin' />
				</div>
			</section>
		)
	}
	if (salons.length === 0) return null // Hide if no salons exist

	return (
		<section className='py-24 bg-zinc-50 overflow-hidden relative'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8 relative'>
				<div className='flex items-end justify-between mb-12'>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: '-50px' }}
						transition={{ duration: 0.6 }}
						className='max-w-xl'
					>
						<h2 className='text-3xl md:text-4xl font-semibold text-zinc-900 mb-4 tracking-tight'>
							Top{' '}
							<span className='italic font-serif text-zinc-500'>Filiallar</span>
						</h2>
						<p className='text-zinc-600 leading-relaxed font-light'>
							Eng yuqori baholangan va mashhur salonlarimiz bilan tanishing.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: '-50px' }}
						transition={{ duration: 0.6 }}
						className='hidden md:block'
					>
						<Link
							href='/salons'
							className='inline-flex items-center gap-2 text-zinc-900 font-medium hover:text-zinc-600 transition-colors group'
						>
							Barchasini ko'rish
							<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
						</Link>
					</motion.div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'>
					{salons.map((salon, index) => (
						<motion.div
							key={salon.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-50px' }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ y: -5 }}
						>
							<Card className='overflow-hidden group border-zinc-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-300 rounded-[1.5rem] bg-white flex flex-col h-full'>
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
											<span className='inline-flex items-center px-2 py-1 rounded bg-zinc-50 text-xs font-medium text-zinc-600 border border-zinc-100 uppercase tracking-wide'>
												{salon.type}
											</span>
											{salon.services &&
												salon.services.length > 0 &&
												salon.services.slice(0, 2).map((service, idx) => (
													<span
														key={idx}
														className='inline-flex items-center px-2 py-1 rounded bg-zinc-50 text-xs font-medium text-zinc-600 border border-zinc-100'
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
													<p className='text-xs text-zinc-400 mb-0.5'>
														Xizmatlar narxi
													</p>
													<p className='text-zinc-900 font-semibold'>
														{salon.minPrice}{' '}
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

										<Button
											asChild
											className='rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium px-5 shadow-sm'
										>
											<Link href={`/salons/${salon.id}`}>Bron qilish</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>

				<div className='mt-12 text-center md:hidden'>
					<Link href='/salons'>
						<Button variant='outline' className='rounded-full px-8'>
							Barchasini ko'rish
						</Button>
					</Link>
				</div>
			</div>
		</section>
	)
}
