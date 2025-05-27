import { languages } from '@/i18n/settings'

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export async function getTranslations(lng) {
  try {
    const translations = (await import(`../../../public/locales/${lng}/common.json`)).default
    return translations
  } catch (error) {
    console.error('Error loading translations:', error)
    return {}
  }
} 