import { languages } from '@/i18n/settings'

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export function generateMetadata({ params: { lng } }) {
  return {
    title: lng === 'vi' ? 'SSHE2025 - Hội nghị khoa học quốc tế' : 'SSHE2025 - International Conference',
    description: lng === 'vi' 
      ? 'Khoa học xã hội, nhân văn và giáo dục trong bối cảnh chuyển đổi số'
      : 'Social Sciences, Humanities, and Education in the Context of Digital Transformation'
  }
} 