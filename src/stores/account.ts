import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { users } from '@/constants'
import type { Credentials } from '@/types'
import { ElMessage } from 'element-plus'
import { SHA256 } from 'crypto-js'

export const useAccount = defineStore('accounts', {

  state: () => ({
    router: useRouter(),
    admin: {
      username: 'admin',
      password: SHA256('admin123!').toString(),
    },
  }),

  actions: {
    // creates users on mounted
    onCreateUsers() {
      try {
        localStorage.setItem('isAuthenticated', 'false')
        localStorage.setItem('students', JSON.stringify(users))
        localStorage.setItem('accounts', JSON.stringify(this.admin))
      } catch (error) {
        ElMessage.error(error)
      }
    },

    // check user credentials
    onLogin(credentials: Credentials) {
      const account = JSON.parse(localStorage.getItem('accounts') || 'null')
      const hashedPassword = SHA256(credentials.password).toString()

      try {
        if (account?.username === credentials.username && account?.password === hashedPassword) {
          localStorage.setItem('isAuthenticated', 'true')
          ElMessage.success('Successfully login')
          this.router.push('/dashboard')
        } else {
          ElMessage.error('Invalid Username or Password')
          this.router.push('/')
        }
      } catch (error) {
        console.error(error)
      }
    },

    // allows users to change their password into a new one
    onForgotPassword(username: string, newpassword: string) {
      const account = JSON.parse(localStorage.getItem('accounts') || 'null')

      if (account?.username === username) {
        const updatedAccount = {
          ...account,
          password: SHA256(newpassword).toString(),
        }

        localStorage.setItem('accounts', JSON.stringify(updatedAccount))
        localStorage.setItem('isAuthenticated', 'false')

        ElMessage.success('Successfully changed password')
        this.router.push('/')
      } else {
        ElMessage.error('Username not found')
      }
    }
  }
})



// export const useAccount = defineStore('accounts', () => {
//   const router = useRouter()
  
//   const admin = {
//     username: 'admin',
//     password: SHA256('admin123!').toString(),
//   }

//   // create users
//   function onCreateUsers() {
//     try {
//       localStorage.setItem('isAuthenticated', 'false')
//       localStorage.setItem('students', JSON.stringify(users))
//       localStorage.setItem('accounts', JSON.stringify(admin))
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   // check users credentials
//   function onLogin(credentials: Credentials) {
//     const account = JSON.parse(localStorage.getItem('accounts') || 'null')
//     const hashedPassword = SHA256(credentials.password).toString()
//     console.log(credentials);
//     try {
//       if (account.username === credentials.username && account.password === hashedPassword) {
//         localStorage.setItem('isAuthenticated', 'true')
//         ElMessage.success('Successfully login')
//         router.push('/dashboard')
//       } else {
//         ElMessage.error('Invalid Username or Password')
//         console.log('invalid :', credentials)
//         router.push('/')
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   // update password of the user
// function onForgotPassword(username: string, newpassword: string) {
//   const account = JSON.parse(localStorage.getItem('accounts') || 'null')

//   if (account?.username === username) {
//     const updatedAccount = {
//       ...account,
//       password: SHA256(newpassword).toString(),
//     }

//     localStorage.setItem('accounts', JSON.stringify(updatedAccount))
//     localStorage.setItem('isAuthenticated', 'false')

//     ElMessage.success('Successfully changed password')
//     router.push('/')
//   } else {
//     ElMessage.error('Username not found')
//   }
// }

//   return { onCreateUsers, onLogin, onForgotPassword }
// })





