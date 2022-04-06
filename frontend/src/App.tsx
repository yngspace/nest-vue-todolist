import { defineComponent, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { Auth } from './pages/auth'
import { Header } from './components/template/header'
import { Footer } from './components/template/footer'
import { store } from './store'
import '@/styles/main.sass'
import { CreatePopup } from './components/popup-create/index'

export default defineComponent({
  setup () {
    const auth = ref<string>('')
    const onAuth = () => {
      auth.value = localStorage.auth
      store.getProfile()
      store.getFolders()
    }

    const onLogout = () => {
      localStorage.clear()
      auth.value = ''
    }

    onMounted(() => {
      if (localStorage.auth) onAuth()
      window.addEventListener('401 Unauthorized', () => {
        localStorage.clear()
      })
    })

    return () => (
      <div id='app'>
        {
          auth.value
            ? <>
              <Header onLogout={onLogout}/>
              <RouterView/>
              <Footer/>
              <CreatePopup/>
            </>
            : <Auth onAuth={onAuth}/>
        }
      </div>
    )
  }
})
