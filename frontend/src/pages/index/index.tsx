import { Folders } from '@/components/folders'
import { defineComponent, ref } from 'vue'
import './main-page.sass'

export const MainPage = defineComponent({
  setup () {
    const isFoldersOpen = ref<boolean>(true)
    const toggleFolder = () => {
      isFoldersOpen.value = !isFoldersOpen.value
    }
    return () => (
      <div class={isFoldersOpen.value ? 'main-page screen open' : 'main-page screen'}>
        <Folders toggle={toggleFolder} isOpen={isFoldersOpen.value}/>
        <div class='container'>
          main page
        </div>
      </div>
    )
  }
})