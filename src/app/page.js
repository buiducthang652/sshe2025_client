import { redirect } from 'next/navigation'
import { fallbackLng } from '@/i18n/settings'
import Image from "next/image";

export default function Home() {
  redirect(`/${fallbackLng}`)
}
