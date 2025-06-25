import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export const useAuth = () => {
  const router = useRouter()

  function isAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem('isAuthenticated') || 'false')
  }

  function checkAuth() {
    if (isAuthenticated()) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  function onLogout() {
    localStorage.setItem('isAuthenticated', JSON.stringify(false))
    ElMessage.success('You successfully logout')
    router.push('/')
  }

  return { checkAuth, onLogout, isAuthenticated }
}
