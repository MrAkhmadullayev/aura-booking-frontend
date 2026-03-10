'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import ProfileView from '@/components/profile/ProfileView'

export default function AdminProfile() {
	return (
		<DashboardLayout role='admin'>
			<ProfileView roleLabel='Administrator' />
		</DashboardLayout>
	)
}
