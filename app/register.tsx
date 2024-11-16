import AuthBackgroud from '@/components/general/AuthBackgroud'
import RegisterForm from '@/components/register/RegisterForm'
import RegisterToLogin from '@/components/register/RegisterToLogin'
import React from 'react'

export default function Register() {
  return (
    <AuthBackgroud>
        <RegisterForm/>
        <RegisterToLogin />
    </AuthBackgroud>
  )
}
