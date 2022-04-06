import axios from '@/axios'
import { Folders } from '@/components/folders'
import { Tabs } from '@/components/tabs'
import { host } from '@/const'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Todoes } from './types'
import moment from 'moment'
import { DetailTodo } from '@/components/detail-todo'
import { PaginationParam, Paination } from '@/UI/pagination'
import './main-page.sass'

export const MainPage = defineComponent({
  setup () {
    const route = useRoute()
    const todoList = ref<Todoes[]>([])
    const isFoldersOpen = ref<boolean>(false)
    const acitveTodo = ref<Todoes|null>(null)
    const dragItem = ref<Todoes|null>(null)
    const paginationParam = ref(new PaginationParam())
    const toggleFolder = (): void => {
      isFoldersOpen.value = !isFoldersOpen.value
    }

    const loadTodoes = async (): Promise<void> => {
      const response = (await axios.get(host + '/todoes', { params: { ...route.query, perPage: 9 } })).data
      const { results, count, prev, next } = response
      todoList.value = results
      paginationParam.value = new PaginationParam(count, next, prev, 9, Number(route.query.page))
    }

    const compareDate = (value: Date): number => {
      return moment().diff(value, 'hour')
    }

    const compareTodoAndParam = (item: Todoes): boolean => {
      const { folder, status } = route.query

      if (!folder && !status) return true
      if ((folder !== undefined && folder !== item.folder) ||
        (status !== undefined && status !== item.status)) {
        return false
      }

      return true
    }

    const updateTodo = (item: Todoes): void => {
      if (compareTodoAndParam(item)) {
        const idx = todoList.value.findIndex((x) => x.id === item.id)
        todoList.value.splice(idx, 1, item)
        acitveTodo.value = item
      } else {
        acitveTodo.value = null
        loadTodoes()
      }
    }

    const setDragItem = (item: Todoes|null): void => {
      if (item) {
        isFoldersOpen.value = true
        dragItem.value = item
      } else dragItem.value = null
    }

    const onChangeTodo = async (todo: Todoes): Promise<void> => {
      const response = (await axios.patch(host + '/todoes/' + todo.id,
        { ...todo, folder: todo.folder?.id || null })).data

      updateTodo(response)
    }

    const dropAction = async (value: string, from: 'folder'|'tab'): Promise<void> => {
      if (!dragItem.value) return

      const endpoint = host + '/todoes/' + dragItem.value.id

      if (from === 'folder') {
        const response = (await axios.patch(endpoint, { ...dragItem.value, folder: value || null })).data
        updateTodo(response)
      } else {
        const response = (await axios.patch(endpoint,
          { ...dragItem.value, status: value, folder: dragItem.value.folder?.id || null })).data
        updateTodo(response)
      }
    }

    const deleteTodo = async (id: string) => {
      await axios.delete(host + '/todoes/' + id)
      loadTodoes()
    }

    onMounted(() =>
      window.addEventListener('201 Create Todoes', () => {
        loadTodoes()
      })
    )

    onMounted(() => loadTodoes())

    watch(route, () => loadTodoes())

    return () => (
      <div class={isFoldersOpen.value ? 'main-page screen open' : 'main-page screen'}>
        <Folders
          toggle={toggleFolder} isOpen={isFoldersOpen.value}
          dropAction={dropAction}
        />
        <div
          class={dragItem.value ? 'delete-todo active' : 'delete-todo'}
          onDragover={(e: DragEvent) => e.preventDefault()}
          onDrop={() => deleteTodo(dragItem.value?.id || '')}
        >
          <img src={require('@/assets/img/delete.png')} alt="delete" />
        </div>
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
                      onDragend={() => { dragItem.value = null }}
                      onClick={() => { acitveTodo.value = item }}
                    >
                      <span>{item.name}</span>
                      {compareDate(item.deadline) > 12 && item.status !== 'done'
                        ? <img class='fire' src={require('@/assets/img/fire.png')} alt="fire"/>
                        : null
                      }
                      {item.folder ? <span class='todo-label'>{item.folder.name}</span> : null}
                    </div>
                  )
                  : <p>Не найдено:(</p>
                }
              </div>
              <Paination params={paginationParam.value}/>
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
