import { store } from '@/store'
import { defineComponent, PropType } from 'vue'
import './folders.sass'

export const Folders = defineComponent({
  props: {
    isOpen: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup (props) {
    return () => (
      <aside class={props.isOpen ? 'folders open' : 'folders'}>
        <div class='folders-list'>
          {
            store.folders.map(item =>
              <div class='folders-item'>{item.name}</div>
            )
          }
        </div>
        <div onClick={props.toggle} class='arrow'>&gt;</div>
      </aside>
    )
  }
})