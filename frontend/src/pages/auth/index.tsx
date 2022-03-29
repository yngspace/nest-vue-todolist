import { DefaultInput } from '@/UI/input/default-input'
import { defineComponent, PropType, ref } from 'vue'
import { AuthForm } from './types'
import './auth.sass'
import { host } from '@/const'
import axios from '@/axios'

export const Auth = defineComponent({
  props: {
    onAuth: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup (props) {
    const form = new AuthForm()
    const action = ref<'reg' | 'auth'>('auth')
    const changeAction = () => {
      action.value === 'auth' ? action.value = 'reg' : action.value = 'auth'
      form.reset()
    }

    const sumbit = async (e: Event) => {
      e.preventDefault()

      const endpoint = action.value === 'auth' ? host + '/users/login' : host + '/users/reg'
      const response = (await axios.post(endpoint, form.fields.value)).data
      if (response?.errors) form.errors.value = response.errors
      else {
        localStorage.auth = response.token
        props.onAuth()
      }
    }

    return () => (
      <div class='auth-page screen'>
        <form class='form'>
          <img src={require('@/assets/img/logo.svg')} alt='logo'/>
          <h1 class='mt-2'>{action.value === 'auth' ? 'Авторизация' : 'Регистрация'}</h1>
          <DefaultInput
            label='Логин' placeholder='Введите логин' className='mt-3'
            modelValue={form.fields.value.login}
            onValueChange={(v: string) => { form.fields.value.login = v }}
            error={form.getError('login')}
          />
          {action.value === 'reg'
            ? <>
              <DefaultInput
                label='E-mail' placeholder='Введите e-mail' className='mt-1'
                modelValue={form.fields.value.email}
                onValueChange={(v: string) => { form.fields.value.email = v } }
                error={form.getError('email')}
              />
              <DefaultInput
                label='Имя' placeholder='Введите имя' className='mt-1'
                modelValue={form.fields.value.name}
                onValueChange={(v: string) => { form.fields.value.name = v } }
                error={form.getError('name')}
              />
            </>
            : null
          }
          <DefaultInput
            label='Пароль' placeholder='Введите пароль' className='mt-1'
            modelValue={form.fields.value.password} type='password'
            onValueChange={(v: string) => { form.fields.value.password = v }}
            error={form.getError('password')}
          />
          <button onClick={sumbit} class='blue-button mt-3'>Отправить</button>
          <span class='change-action mt-2' onClick={changeAction}>{
            action.value === 'auth' ? 'Нет аккаунта? Зарегестрируйстя!' : 'Есть аккаунт? Войди!'
          }</span>
        </form>
      </div>
    )
  }
})
