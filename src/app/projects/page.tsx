'use client'
import ComingSoon from '@/components/ComingSoon'
import { useRouter } from 'next/navigation'
export default function ProjectsPage() {
  const router = useRouter()
  return <ComingSoon title="Проекты" onBack={() => router.push('/')} />
}
