import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import FAQAccordion from '@/components/sections/FAQAccordion'
import FeaturesB2B from '@/components/sections/FeaturesB2B'
import FeaturesB2C from '@/components/sections/FeaturesB2C'
import Hero from '@/components/sections/Hero'

export default function Home() {
	return (
		<div className='min-h-screen flex flex-col font-sans bg-zinc-50 selection:bg-zinc-200 selection:text-zinc-900 overflow-x-hidden'>
			<Navbar />

			<main className='flex-grow'>
				<Hero />
				<FeaturesB2C />
				<FeaturesB2B />
				<FAQAccordion />
			</main>

			<Footer />
		</div>
	)
}
