import { defineComponent } from 'vue'
import '@/styles/main.sass'

export default defineComponent({
  setup () {
    return () => (
      <div id='app'>
        Hello
      </div>
    )
  }
})