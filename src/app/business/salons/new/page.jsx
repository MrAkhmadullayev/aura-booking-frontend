'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import BranchForm from '../components/BranchForm'

export default function NewBranchPage() {
	return (
		<DashboardLayout role='business'>
			<BranchForm isEdit={false} />
		</DashboardLayout>
	)
}
