import axios from '@/axios'
import { Folders } from '@/components/folders'
import { Tabs } from '@/components/tabs'
import { host } from '@/const'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Todoes } from './types'
import moment from 'moment'
import { DetailTodo } from '@/components/detail-todo'
import './main-page.sass'

export const MainPage = defineComponent({
  setup () {
    const route = useRoute()
    const todoList = ref<Todoes[]>([])
    const isFoldersOpen = ref<boolean>(false)
    const acitveTodo = ref<Todoes|null>(null)
    let dragItem: Todoes|null = null
    const toggleFolder = (): void => {
      isFoldersOpen.value = !isFoldersOpen.value
    }

    const loadTodoes = async (): Promise<void> => {
      todoList.value = (await axios.get(host + '/todoes', { params: route.query })).data.results
    }

    const compareDate = (value: Date): number => {
      return moment().diff(value, 'hour')
    }

    const setDragItem = (item: Todoes|null): void => {
      if (item) {
        isFoldersOpen.value = true
        dragItem = item
      } else dragItem = null
    }

    const replaceValue = (value: Todoes, current: Todoes): void => {
      const idx = todoList.value.findIndex((item) => item.id === current?.id)
      todoList.value.splice(idx, 1, value)
      if (value.id === acitveTodo.value?.id) acitveTodo.value = value
      dragItem = null
    }

    const onChangeTodo = async (todo: Todoes): Promise<void> => {
      const response = (await axios.patch(host + '/todoes/' + todo.id,
        { ...todo, folder: todo.folder?.id || null })
      ).data
      replaceValue(response, todo)
    }

    const dropAction = async (value: string, from: 'folder'|'tab'): Promise<void> => {
      if (!dragItem) return
      const endpoint = host + '/todoes/' + dragItem.id

      if (from === 'folder') {
        const response = (await axios.patch(endpoint,
          { ...dragItem, folder: value || null })
        ).data
        replaceValue(response, dragItem)
      } else {
        const response = (await axios.patch(endpoint,
          { ...dragItem, status: value, folder: dragItem.folder?.id || null })
        ).data
        replaceValue(response, dragItem)
      }
    }

    onMounted(() => loadTodoes())

    watch(route, () => loadTodoes())

    return () => (
      <div class={isFoldersOpen.value ? 'main-page screen open' : 'main-page screen'}>
        <Folders
          toggle={toggleFolder} isOpen={isFoldersOpen.value}
          dropAction={dropAction}
        />
        <div class='container'>
          <div class='row'>
            <div class='col'>
              <Tabs dropAction={dropAction}/>
              <div class='todo-list'>
                {todoList.value.length
                  ? todoList.value.map(item =>
                    <div
                      class={compareDate(item.deadline) > 12 && item.status !== 'done' ? 'todo-item danger' : 'todo-item'}
                      draggable={true}
                      onDragstart={() => setDragItem(item)}
                      onClick={() => { acitveTodo.value = item }}
                    >
                      <span>{item.name}</span>
                      {item.folder ? <span class='todo-label'>{item.folder.name}</span> : null}
                    </div>
                  )
                  : <p>Не найдено:(</p>
                }
              </div>
            </div>
            <div class='col'>
              <DetailTodo todo={acitveTodo.value} onChangeTodo={onChangeTodo}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
