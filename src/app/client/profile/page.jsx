'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import ProfileView from '@/components/profile/ProfileView'

export default function ClientProfile() {
	return (
		<DashboardLayout role='client'>
			<ProfileView roleLabel='Mijoz' />
		</DashboardLayout>
	)
}
