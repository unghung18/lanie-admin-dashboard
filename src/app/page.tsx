"use client"
import { FormLogin } from '@/components/FormLogin'
import Cookies from "js-cookie";
import { redirect } from 'next/navigation';

export default function Home() {
  const token = Cookies.get("token")
  console.log(token)
  if (token) {
    redirect("/dashboard")
  }
  return (
    <>
      <FormLogin />
    </>
  )
}
