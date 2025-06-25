import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { users } from '@/constants'
import type { Credentials } from '@/types'
import { ElMessage } from 'element-plus'
import { SHA256 } from 'crypto-js'

export const useAccount = defineStore('accounts', () => {
  const router = useRouter()

  const admin = {
    username: import.meta.env.VITE_TEST_USER,
    password: SHA256(import.meta.env.VITE_TEST_USER_PASSWORD).toString(),
  }

  // create users
  function onCreateUsers() {
    try {
      localStorage.setItem('isAuthenticated', 'false')
      localStorage.setItem('students', JSON.stringify(users))
      localStorage.setItem('accounts', JSON.stringify(admin))
    } catch (error) {
      console.error(error)
    }
  }

  // check users credentials
  function onLogin(credentials: Credentials) {
    const account = JSON.parse(localStorage.getItem('accounts') || 'null')
    const hashedPassword = SHA256(credentials.password).toString()
    try {
      if (account.username === credentials.username && account.password === hashedPassword) {
        localStorage.setItem('isAuthenticated', 'true')
        ElMessage.success('Successfully login')
        router.push('/dashboard')
      } else {
        ElMessage.error('Invalid Username or Password')
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  // update password of the user
  function onForgotPassword(username: string, password: string, newpassword: string) {
    const account = JSON.parse(localStorage.getItem('accounts') || 'null')
    const hashedPassword = SHA256(password).toString()

    console.log('Input Credentials:', { username, hashedPassword, newpassword })
    console.log('Stored Account:', account)

    if (account.username === username && account.password === hashedPassword) {
      console.log('Account is being updated')
      const updatedAccount = {
        ...account,
        password: SHA256(newpassword).toString(),
      }

      localStorage.setItem('accounts', JSON.stringify(updatedAccount))
      localStorage.setItem('isAuthenticated', 'false')

      ElMessage.success('Successfully changed password')
      router.push('/')
    } else {
      ElMessage.error('Invalid Username or Password')
    }
  }

  return { onCreateUsers, onLogin, onForgotPassword }
})
