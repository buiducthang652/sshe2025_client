export const languages = ['en', 'vi']
export const defaultLanguage = 'vi'
export const defaultNS = 'common'

export function getOptions(lng = defaultLanguage, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng: defaultLanguage,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}