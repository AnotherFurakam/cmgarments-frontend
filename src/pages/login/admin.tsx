import { Navbar } from '@/components/AdminLogin'
import LoginAdminForm from '@/components/AdminLogin/LoginAdminForm'
import { MainAdmin } from '@/components/AdminLogin/styled-components/MainStyles'
import React from 'react'

const LoginAdminPage = () => {
  return (
    <>
      <Navbar />
      <MainAdmin>
        <LoginAdminForm />
      </MainAdmin>
    </>
  )
}

export default LoginAdminPage