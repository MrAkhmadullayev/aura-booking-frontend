import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
	{
		question: 'Aura Booking orqali salonni qanday izlash mumkin?',
		answer:
			"Bosh sahifadagi 'Salonlarni izlash' tugmasi yordamida yoki qidiruv tizimida xizmat turi (masalan: Soch turmaklash, Manikur) orqali kasting asosida saralangan mutaxassislarni ko'rishingiz mumkin.",
	},
	{
		question: "Navbatni rad etish yoki o'zgartirish bepulmi?",
		answer:
			"Ha, rejangiz o'zgarsa, belgilangan vaqtdan kamida 2 soat oldin navbatni bekor qilish yoki boshqa vaqtga ko'chirish mutlaqo bepul.",
	},
	{
		question: 'Salon egalari uchun qanday qulayliklar bor?',
		answer:
			"Biz bizneslar uchun to'liq raqamli CRM tizimi, usta-mijoz kalendarlari, moliyaviy tahlil va VIP darajasidagi reklama imkoniyatlarini taqdim etamiz.",
	},
	{
		question: 'Reyting qanday shakllanadi?',
		answer:
			"Ustalar va salonlarning reytingi faqat ro'yxatdan o'tib, xizmatdan foydalangan real mijozlar tomonidan berilgan baholar yig'indisi asosida hisoblanadi.",
	},
]

export default function FAQAccordion() {
	return (
		<section className='py-24 bg-zinc-50 relative'>
			<div className='max-w-3xl mx-auto px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h2 className='text-sm font-semibold tracking-wider text-zinc-500 uppercase mb-3'>
						Ko'p Beriladigan Savollar
					</h2>
					<h3 className='text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight'>
						Biz siz uchun ochiqmiz
					</h3>
				</div>

				<Accordion type='single' collapsible className='w-full'>
					{faqs.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className='border-zinc-200'
						>
							<AccordionTrigger className='text-left text-lg font-medium text-zinc-800 hover:text-zinc-500 py-5'>
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className='text-zinc-500 leading-relaxed text-base pb-6'>
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}
