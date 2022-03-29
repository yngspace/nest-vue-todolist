import { defineComponent, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { Auth } from './pages/auth'
import '@/styles/main.sass'

export default defineComponent({
  setup () {
    const auth = ref<string>('')

    onMounted(() => {
      if (localStorage.auth) auth.value = localStorage.auth
    })

    return () => (
      <div id='app'>
        {
          auth.value
            ? <RouterView/>
            : <Auth onAuth={() => { auth.value = localStorage.auth }}/>
        }
      </div>
    )
  }
})
