'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { MessageCircle, Reply, Star, Trash2 } from 'lucide-react'
import { useState } from 'react'

const initialReviews = [
	{
		id: 1,
		name: 'Sadriddin M.',
		rating: 5,
		date: 'Kecha',
		text: "Juda zo'r master ekan Alisher. Sochimni xuddi men xohlagandek qilib kesib berdi. Rahmat kattakon, doimiy mijozingiz bo'laman!",
		service: 'Soch kesish (Fade)',
		reply: 'Rahmat Sadriddin! Har doim xursandmiz. Yana kutamiz!',
	},
	{
		id: 2,
		name: 'Madina',
		rating: 5,
		date: '2 kun oldin',
		text: "Salon toza va shinam, xodimlar e'tiborli. Manikyur juda yoqdi.",
		service: 'Manikyur klassika',
		reply: null,
	},
	{
		id: 3,
		name: 'Aziz',
		rating: 4,
		date: '1 Hafta oldin',
		text: "Yaxshi kesdi, lekin men kutganimdan biroz ko'proq vaqt ketdi. Shunga qaramay natija a'lo.",
		service: 'Soqol tekislash',
		reply:
			"Kechiktirganimiz uchun uzr so'raymiz. Kelgusi safar yanada tezroq va sifatli qilib beramiz!",
	},
	{
		id: 4,
		name: 'Shoxrux',
		rating: 5,
		date: '2 Hafta oldin',
		text: 'Ajoyib! Xizmatlar oliy darajada.',
		service: 'Erkaklar soch kesish',
		reply: null,
	},
]

export default function BusinessReviews() {
	const [reviews, setReviews] = useState(initialReviews)
	const [filter, setFilter] = useState('all')

	const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
	const [currentReplyId, setCurrentReplyId] = useState(null)
	const [replyText, setReplyText] = useState('')

	const filteredReviews = reviews.filter(r => {
		if (filter === 'all') return true
		if (filter === 'unanswered') return r.reply === null
		return true
	})

	const handleReplySubmit = e => {
		e.preventDefault()
		setReviews(
			reviews.map(r =>
				r.id === currentReplyId ? { ...r, reply: replyText } : r,
			),
		)
		setIsReplyModalOpen(false)
		setReplyText('')
	}

	const deleteReview = id => {
		if (window.confirm("Rostdan ham bu sharhni o'chirib yubormoqchimisiz?")) {
			setReviews(reviews.filter(r => r.id !== id))
		}
	}

	return (
		<DashboardLayout role='business'>
			<div className='space-y-6'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-zinc-900 tracking-tight'>
							Sharhlar va Baholar
						</h1>
						<p className='text-zinc-500 text-sm mt-1'>
							Mijozlarning fikrlari va salon reytingi.
						</p>
					</div>
				</div>

				{/* Rating Summary Header */}
				<Card className='border-none shadow-sm rounded-2xl bg-white overflow-hidden'>
					<CardContent className='p-8 flex flex-col md:flex-row gap-8 items-center md:items-start justify-between'>
						{/* Average */}
						<div className='text-center md:text-left flex-shrink-0'>
							<p className='text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider'>
								Umumiy Reyting
							</p>
							<div className='flex items-center gap-4 justify-center md:justify-start'>
								<h2 className='text-6xl font-black text-zinc-900 tracking-tighter'>
									4.8
								</h2>
								<div className='flex flex-col items-start gap-1 text-amber-500'>
									<div className='flex gap-1'>
										<Star className='w-5 h-5 fill-current' />
										<Star className='w-5 h-5 fill-current' />
										<Star className='w-5 h-5 fill-current' />
										<Star className='w-5 h-5 fill-current' />
										<Star className='w-5 h-5 fill-current opacity-50' />
									</div>
									<p className='text-sm font-medium text-zinc-500 ml-1'>
										Jami {reviews.length} ta sharh
									</p>
								</div>
							</div>
						</div>

						<div className='w-px h-24 bg-zinc-100 hidden md:block'></div>

						{/* Breakdown Bars */}
						<div className='flex-1 w-full max-w-sm space-y-2.5'>
							{[
								{
									stars: 5,
									perc: 85,
									count: reviews.filter(r => r.rating === 5).length,
								},
								{
									stars: 4,
									perc: 10,
									count: reviews.filter(r => r.rating === 4).length,
								},
								{
									stars: 3,
									perc: 3,
									count: reviews.filter(r => r.rating === 3).length,
								},
								{
									stars: 2,
									perc: 1,
									count: reviews.filter(r => r.rating === 2).length,
								},
								{
									stars: 1,
									perc: 2,
									count: reviews.filter(r => r.rating === 1).length,
								},
							].map(bar => (
								<div
									key={bar.stars}
									className='flex items-center gap-3 text-sm'
								>
									<span className='font-medium text-zinc-600 w-3'>
										{bar.stars}
									</span>
									<Star className='w-3.5 h-3.5 text-zinc-400 fill-zinc-400' />
									<div className='flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden'>
										<div
											className='h-full bg-amber-400 rounded-full'
											style={{ width: `${bar.perc}%` }}
										></div>
									</div>
									<span className='font-medium text-zinc-400 w-6 text-right'>
										{bar.count}
									</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Review List */}
				<div className='space-y-4'>
					<div className='flex items-center gap-2 mb-2 bg-zinc-100 p-1 rounded-xl w-fit'>
						<button
							onClick={() => setFilter('all')}
							className={`px-4 py-2 text-sm rounded-lg transition-colors ${filter === 'all' ? 'font-bold bg-white text-zinc-900 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Barchasi ({reviews.length})
						</button>
						<button
							onClick={() => setFilter('unanswered')}
							className={`px-4 py-2 text-sm rounded-lg transition-colors ${filter === 'unanswered' ? 'font-bold bg-white text-zinc-900 shadow-sm' : 'font-medium text-zinc-500 hover:text-zinc-900'}`}
						>
							Javobsiz ({reviews.filter(r => !r.reply).length})
						</button>
					</div>

					{filteredReviews.map(review => (
						<Card
							key={review.id}
							className='border-none shadow-sm rounded-2xl bg-white'
						>
							<CardContent className='p-6'>
								<div className='flex items-start gap-4'>
									<div className='w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-500 text-lg flex-shrink-0'>
										{review.name.charAt(0)}
									</div>

									<div className='flex-1'>
										<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2'>
											<div>
												<h4 className='font-bold text-zinc-900 text-lg'>
													{review.name}
												</h4>
												<p className='text-xs text-zinc-500 font-medium'>
													Xizmat: {review.service} • {review.date}
												</p>
											</div>
											<div className='flex text-amber-500'>
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-zinc-200 fill-zinc-200'}`}
													/>
												))}
											</div>
										</div>

										<p className='text-zinc-700 leading-relaxed mb-4 mt-2'>
											{review.text}
										</p>

										{/* Actions / Replies */}
										{review.reply ? (
											<div className='bg-zinc-50 p-4 rounded-xl border border-zinc-100 relative group'>
												<div className='flex justify-between items-start mb-1'>
													<p className='text-xs font-bold text-emerald-600 flex items-center gap-1.5 uppercase tracking-wider'>
														<MessageCircle className='w-3.5 h-3.5' /> Aura
														Premium (Sen)
													</p>
													<div className='flex gap-2'>
														<button
															onClick={() => {
																setCurrentReplyId(review.id)
																setReplyText(review.reply)
																setIsReplyModalOpen(true)
															}}
															className='text-[10px] text-zinc-400 hover:text-zinc-700 font-semibold uppercase tracking-wider transition-colors'
														>
															Tahrirlash
														</button>
													</div>
												</div>
												<p className='text-sm text-zinc-800 mt-2'>
													{review.reply}
												</p>
											</div>
										) : (
											<div className='flex items-center gap-4 border-t border-zinc-100 pt-4'>
												<Button
													onClick={() => {
														setCurrentReplyId(review.id)
														setReplyText('')
														setIsReplyModalOpen(true)
													}}
													variant='outline'
													className='h-9 px-4 rounded-xl text-zinc-700 font-medium shadow-none border-zinc-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'
												>
													<Reply className='w-4 h-4 mr-2' /> Javob yozish
												</Button>
											</div>
										)}

										<div className='flex justify-end mt-2 opacity-0 hover:opacity-100 transition-opacity'>
											<Button
												onClick={() => deleteReview(review.id)}
												variant='ghost'
												size='sm'
												className='text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2'
											>
												<Trash2 className='w-3 h-3 mr-1' /> O'chirish
											</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}

					{filteredReviews.length === 0 && (
						<div className='text-center py-20 bg-white rounded-2xl border-none shadow-sm'>
							<p className='text-zinc-500 font-medium'>Bunday sharhlar yo'q.</p>
						</div>
					)}
				</div>
			</div>

			{/* Reply Modal */}
			<Dialog open={isReplyModalOpen} onOpenChange={setIsReplyModalOpen}>
				<DialogContent className='sm:max-w-md bg-white rounded-2xl'>
					<DialogHeader>
						<DialogTitle>Mijozga javob yo'llash</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleReplySubmit} className='space-y-4 py-4'>
						<textarea
							required
							autoFocus
							value={replyText}
							onChange={e => setReplyText(e.target.value)}
							placeholder='Rahmat, yana kelib turing!'
							className='w-full min-h-[120px] p-4 rounded-xl border border-zinc-200 text-sm focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none resize-none'
						/>
						<DialogFooter className='pt-2 sm:justify-end gap-2 text-right'>
							<Button
								type='button'
								variant='outline'
								onClick={() => setIsReplyModalOpen(false)}
								className='rounded-xl h-11 w-full sm:w-auto'
							>
								Bekor qilish
							</Button>
							<Button
								type='submit'
								className='bg-zinc-900 text-white rounded-xl h-11 w-full sm:w-auto'
							>
								Yuborish
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</DashboardLayout>
	)
}
