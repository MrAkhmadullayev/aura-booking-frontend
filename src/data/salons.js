export const mockSalons = [
	{
		id: 1,
		name: 'Aura Premium Salon',
		type: "VIP Go'zallik Markazi",
		distance: '1.2 km',
		rating: 4.9,
		reviews: 128,
		image: '/images/hero.png',
		address: "Yunusobod tumani, 4-daha, Amir Temur ko'chasi",
		services: [
			'Soch turmaklash',
			'Manikur',
			'Makiyaj',
			'Spa muolajalar',
			'Yuz parvarishi',
		],
		status: "Bo'sh joylar bor",
		minPrice: "100 000 so'm",
		about:
			"Aura Premium Salon - Toshkentdagi eng hashamatli go'zallik markazlaridan biri. Bizning malakali mutaxassislarimiz mijozlarga eng yuqori darajadagi xizmatlarni taqdim etadi. Zamonaviy asbob-uskunalar va premium kosmetika vositalari yordamida biz sizning go'zalligingizni yanada boyitamiz.",
		workHours: 'Dush - Yak, 09:00 dan 21:00 gacha',
		gallery: ['/images/hero.png', '/images/client.png', '/images/master.png'],
		contacts: {
			phone: '+998 90 123 45 67',
			instagram: 'https://instagram.com/aura_premium',
			telegram: 'https://t.me/aura_premium',
			youtube: 'https://youtube.com/@aura_salon',
		},
		location: {
			lat: 41.311081,
			lng: 69.240562,
			mapUrl:
				'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.3!2d69.240562!3d41.311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzM5LjkiTiA2OcKwMTQnMjYuMCJF!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s',
		},
		comments: [
			{
				id: 1,
				author: 'Malika Alieva',
				rating: 5,
				date: '12 Oktabr, 2023',
				text: "Juda ajoyib salon! Xodimlar xushmuomala, xizmat ko'rsatish darajasi eng yuqori saviyada. Manikur va soch turmaklash xizmatlaridan foydalandim, natijadan juda mamnunman.",
			},
			{
				id: 2,
				author: 'Jasur Karimov',
				rating: 5,
				date: '5 Noyabr, 2023',
				text: "Ayolimga sovg'a sifatida sertifikat olib bergandim, u bu salondan juda katta taassurotlar bilan qaytdi. Barchasi chiroyli va toza.",
			},
			{
				id: 3,
				author: 'Zarina Umarova',
				rating: 4,
				date: '20 Dekabr, 2023',
				text: "Makiyaj ustasi juda yengil qo'l ekan, to'y uchun qilingan obrazim hammaga yoqdi. Lekin navbat kutish biroz uzoq cho'zildi.",
			},
		],
	},
	{
		id: 2,
		name: 'Elegance Hair Studio',
		type: 'Sartaroshxona',
		distance: '500 m',
		rating: 4.7,
		reviews: 84,
		image: '/images/client.png',
		address: "Chilonzor tumani, Muqimiy ko'chasi 43-uy",
		services: ['Soch qirqish', "Soch bo'yash", 'Keratin', 'Bolalar sochi'],
		status: "Faqat kechga bo'sh",
		minPrice: "80 000 so'm",
		about:
			"Elegance Hair Studio o'zining professional soch ustalariga ega. Erkaklar, ayollar va bolalar uchun barcha turdagi sartaroshlik xizmatlari ko'rsatiladi.",
		workHours: 'Dush - Shan, 10:00 dan 20:00 gacha',
		gallery: ['/images/client.png', '/images/hero.png'],
		contacts: {
			phone: '+998 71 234 56 78',
			telegram: 'https://t.me/elegance_hair',
		},
		location: {
			mapUrl:
				'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.3!2d69.240562!3d41.311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzM5LjkiTiA2OcKwMTQnMjYuMCJF!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s',
		},
		comments: [
			{
				id: 1,
				author: 'Sardor Qodirov',
				rating: 5,
				date: '10 Yanvar, 2024',
				text: "Juda zo'r sartaroshxona, tez va sifatli xizmat ko'rsatishdi.",
			},
			{
				id: 2,
				author: 'Bekzod Rahmonov',
				rating: 4,
				date: '2 Fevral, 2024',
				text: 'Soch qirqtirdim, menga yoqdi. Yana kelaman.',
			},
		],
	},
	{
		id: 3,
		name: 'Liza Beauty & Spa',
		type: 'Ayollar Saloni',
		distance: '3.4 km',
		rating: 4.8,
		reviews: 210,
		image: '/images/master.png',
		address: "Mirzo Ulug'bek tumani, Mustaqillik shoh ko'chasi",
		services: ['Spa', 'Yuz parvarishi', 'Massaj', 'Kiprik ulash'],
		status: "Bo'sh joylar bor",
		minPrice: "150 000 so'm",
		about:
			'Ruhiy tana tinchligini izlovchi xotin-qizlar uchun ideal maskan. Tabiiy va sifatli vositalardan tayyorlanga spa-muolajalar.',
		workHours: 'Xar kuni, 08:00 dan 22:00 gacha',
		gallery: ['/images/master.png'],
		contacts: {
			phone: '+998 99 987 65 43',
			instagram: 'https://instagram.com/liza_spa',
		},
		location: {
			mapUrl:
				'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.3!2d69.240562!3d41.311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzM5LjkiTiA2OcKwMTQnMjYuMCJF!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s',
		},
		comments: [
			{
				id: 1,
				author: 'Gulnora Alimova',
				rating: 5,
				date: '15 Mart, 2024',
				text: "Spa xizmati ajoyib! O'zimni juda yengil his qilyapman.",
			},
		],
	},
	{
		id: 4,
		name: "Gentleman's Barbershop",
		type: 'Erkaklar Saloni',
		distance: '2.1 km',
		rating: 4.9,
		reviews: 340,
		image: '/images/hero.png',
		address: "Yakkasaroy tumani, Shota Rustaveli ko'chasi",
		services: ['Soch qirqish', 'Soqol qirqish', 'Qora niqob', "Soch bo'yash"],
		status: "Bugunga to'la",
		minPrice: "60 000 so'm",
		about:
			"Faqat haqiqiy erkaklar uchun mo'ljallangan qulay va sokin atmosfera.",
		workHours: 'Dush - Yak, 09:00 dan 23:00 gacha',
		gallery: ['/images/hero.png'],
		contacts: {
			phone: '+998 93 111 22 33',
			telegram: 'https://t.me/gentleman_barber',
			youtube: 'https://youtube.com/@gentleman_barber',
		},
		location: {
			mapUrl:
				'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.3!2d69.240562!3d41.311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzM5LjkiTiA2OcKwMTQnMjYuMCJF!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s',
		},
		comments: [
			{
				id: 1,
				author: 'Alisher Usmonov',
				rating: 5,
				date: '20 Aprel, 2024',
				text: "Zo'r joy, atmosferasi juda qulay.",
			},
		],
	},
	{
		id: 5,
		name: 'Nail Art Studio Tashkent',
		type: 'Tirnoq servisi',
		distance: '800 m',
		rating: 4.6,
		reviews: 56,
		image: '/images/client.png',
		address: "Shayxontohur tumani, Navoiy ko'chasi",
		services: ['Klassik Manikur', 'Gel lak', 'Pedikur', 'Nail Art (Dizayn)'],
		status: "Bo'sh joylar bor",
		minPrice: "70 000 so'm",
		about:
			"Sizning tirnoqlaringiz bizning e'tiborimiz markazida. 1000 xildan ortiq ranglar va turli zamonaviy dizaynlar mavjud.",
		workHours: 'Dush - Shan, 10:00 dan 19:00 gacha',
		gallery: ['/images/client.png'],
		contacts: {
			phone: '+998 90 999 00 11',
			instagram: 'https://instagram.com/nail_art_tash',
		},
		location: {
			mapUrl:
				'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.3!2d69.240562!3d41.311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzM5LjkiTiA2OcKwMTQnMjYuMCJF!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s',
		},
		comments: [
			{
				id: 1,
				author: 'Nigina Rustamova',
				rating: 4,
				date: '5 May, 2024',
				text: 'Tirnoqlarim chiroyli chiqdi, rahmat!',
			},
		],
	},
	{
		id: 6,
		name: 'Royal Makeup Room',
		type: 'Vizajist studiyasi',
		distance: '4.5 km',
		rating: 5.0,
		reviews: 412,
		image: '/images/master.png',
		address: "Mirobod tumani, Nukus ko'chasi",
		services: [
			'Kechki makiyaj',
			"To'y makiyaji",
			'Soch turmaklash',
			'Qosh terish',
		],
		status: "Bo'sh joylar bor",
		minPrice: "300 000 so'm",
		about:
			'Har qanday muhim kunga qadar sizni malika kabi bezab tayyorlash qobiliyatiga ega studiya.',
		workHours: 'Dush - Yak, 07:00 dan 20:00 gacha',
		gallery: ['/images/master.png'],
		contacts: {
			phone: '+998 97 888 77 66',
			instagram: 'https://instagram.com/royal_makeup',
			telegram: 'https://t.me/royal_makeup',
		},
		location: {
			mapUrl:
				'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.3!2d69.240562!3d41.311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzM5LjkiTiA2OcKwMTQnMjYuMCJF!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s',
		},
		comments: [
			{
				id: 1,
				author: 'Sevara Qosimova',
				rating: 5,
				date: '10 Iyun, 2024',
				text: "To'yim uchun makiyaj qildirdim, hammaga juda yoqdi! Qizlarga katta rahmat.",
			},
		],
	},
]
