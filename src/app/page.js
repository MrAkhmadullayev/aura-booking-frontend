import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import BusinessGoals from '@/components/sections/BusinessGoals'
import CTA from '@/components/sections/CTA'
import EcosystemFeatures from '@/components/sections/EcosystemFeatures'
import FAQAccordion from '@/components/sections/FAQAccordion'
import FeaturesB2B from '@/components/sections/FeaturesB2B'
import FeaturesB2C from '@/components/sections/FeaturesB2C'
import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import SalonsList from '@/components/sections/SalonsList'
import ServicesCarousel from '@/components/sections/ServicesCarousel'
import Stats from '@/components/sections/Stats'
import Testimonials from '@/components/sections/Testimonials'

export default function Home() {
	return (
		<div className='min-h-screen flex flex-col font-sans bg-zinc-50 selection:bg-zinc-200 selection:text-zinc-900 overflow-x-hidden'>
			<Navbar />

			<main className='flex-grow'>
				<Hero />
				<ServicesCarousel />
				<SalonsList />
				<Stats />
				<EcosystemFeatures />
				<BusinessGoals />
				<FeaturesB2C />
				<FeaturesB2B />
				<HowItWorks />
				<Testimonials />
				<FAQAccordion />
				<CTA />
			</main>

			<Footer />
		</div>
	)
}
