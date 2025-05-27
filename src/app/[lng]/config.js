import { languages } from '@/i18n/settings'

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export function generateMetadata({ params: { lng } }) {
  return {
    title: lng === 'vi' ? 'SSHE2025 - Hội nghị khoa học quốc tế' : 'SSHE2025 - International Conference',
    description: lng === 'vi' 
      ? 'Hội nghị khoa học quốc tế về Khoa học Xã hội, Nhân văn và Giáo dục lần thứ 2'
      : 'The 2nd International Conference on Social Sciences, Humanities and Education'
  }
} 