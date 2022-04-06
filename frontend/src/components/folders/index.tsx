import axios from '@/axios'
import { host } from '@/const'
import { IFolder } from '@/pages/index/types'
import { store } from '@/store'
import { defineComponent, PropType } from 'vue'
import { LocationQueryValue, RouterLink, useRoute, useRouter } from 'vue-router'
import './folders.sass'

export const Folders = defineComponent({
  props: {
    isOpen: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true
    },
    dropAction: {
      type: Function as PropType<(id: string, from: 'folder') => void>,
      required: true
    }
  },
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    const getQueryParam = (value?: string): {[x: string]: LocationQueryValue | LocationQueryValue[]} => {
      const query = { ...route.query }
      value ? query.folder = value : delete query.folder
      delete query.page
      return query
    }

    const deleteFolder = async (id: string) => {
      if (route.query.folder === id) {
        const param = { ...route.query }
        delete param.folder
        router.push({ name: route.name as string, query: param })
      }

      await axios.delete(host + '/folders/' + id)
      store.getFolders()
    }

    return () => (
      <aside class={props.isOpen ? 'folders' : 'folders open'}>
        <div class='folders-list' onDragover={(e: DragEvent) => e.preventDefault()}>
          <div
            class={!route.query.folder ? 'folders-item active' : 'folders-item'}
            onDrop={() => props.dropAction('', 'folder')}
          >
            <RouterLink
              to={{ path: route.path, query: getQueryParam() }}
            >Все
            </RouterLink>
          </div>
          {
            store.folders.map((item: IFolder) =>
              <div
                class={route.query.folder === item.id ? 'folders-item active' : 'folders-item'}
                onDrop={() => props.dropAction(item.id, 'folder')}
              >
                <RouterLink
                  to={{ path: route.path, query: getQueryParam(item.id) }}
                >
                  {item.name}
                </RouterLink>
                <span onClick={() => deleteFolder(item.id)} class='delete'>x</span>
              </div>
            )
          }
        </div>
        <div onClick={props.toggle} class='arrow'>
          <img src={require('@/assets/img/arrow.png')} alt='arrow'/>
        </div>
      </aside>
    )
  }
})