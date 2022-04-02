import axios from '@/axios'
import { host } from '@/const'
import { store } from '@/store'
import { DefaultInput } from '@/UI/input/default-input'
import { PopUp } from '@/UI/pop-up'
import { CreateFolder, CreateTodo } from './types'

export const CreatePopup = (): JSX.Element => {
  const todo = new CreateTodo()
  const folder = new CreateFolder()

  const toggle = () => {
    store.popupType === 'folder' ? folder.reset() : todo.reset()
    store.dispatchPopUp(store.popupType)
  }

  const submit = async () => {
    const endpoint = store.popupType === 'todo' ? host + '/todoes/' : host + '/folders/'
    const data = store.popupType === 'todo' ? todo.fields.value : folder.fields.value
    const response = (await axios.post(endpoint, data)).data
    if (response.errors) {
      store.popupType === 'todo' ? todo.errors.value = response.errors : folder.errors.value = response.errors
    } else {
      store.popupType === 'todo' ? window.dispatchEvent(new Event('201 Create Todoes')) : store.getFolders()
      toggle()
    }
  }

  const createTodo = (): JSX.Element => (
    <>
      <DefaultInput
        className='mt-2'
        label='Название'
        placeholder='Введите название'
        onValueChange={(v: string) => { todo.fields.value.name = v }}
        modelValue={todo.fields.value.name}
        error={todo.getError('name')}
      />
      <DefaultInput
        className='mt-2'
        label='Описание'
        placeholder='Введите описание'
        onValueChange={(v: string) => { todo.fields.value.description = v }}
        modelValue={todo.fields.value.description}
        error={todo.getError('description')}
      />
      <input
        class='mt-2 date' type='date'
        onChange={(e: any) => { todo.fields.value.deadline = new Date(e.target.value).toString() }}
      />
    </>
  )

  const createFolder = (): JSX.Element => (
    <>
      <DefaultInput
        label='Название'
        placeholder='Введите название'
        onValueChange={(v: string) => { folder.fields.value.name = v }}
        modelValue={folder.fields.value.name}
        error={folder.getError('name')}
      />
    </>
  )

  return (
    <>
      <PopUp
        show={store.showPopup}
        title={store.popupType === 'todo' ? 'Новое Todo' : 'Новая папка'}
        toggle={toggle}
        body={() => (
          <div>{store.popupType === 'todo' ? createTodo() : createFolder()}</div>
        )}
        buttons={() => (
          <button onClick={submit} class='blue-button'>
            Сохранить
          </button>
        )}
      />
    </>
  )
}
