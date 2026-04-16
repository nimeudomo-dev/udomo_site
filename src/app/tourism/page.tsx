'use client'
import ComingSoon from '@/components/ComingSoon'
import { useRouter } from 'next/navigation'
export default function TourismPage() {
  const router = useRouter()
  return <ComingSoon title="Туризм" onBack={() => router.push('/')} />
}
