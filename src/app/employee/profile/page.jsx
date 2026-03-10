'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import ProfileView from '@/components/profile/ProfileView'

export default function EmployeeProfile() {
	return (
		<DashboardLayout role='employee'>
			<ProfileView roleLabel='Usta / Xodim' />
		</DashboardLayout>
	)
}
