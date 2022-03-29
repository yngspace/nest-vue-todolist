import { Ref, ref } from 'vue'

interface IFields {
  login: string
  password: string
  email: string
  name: string
}

export class AuthForm {
  fields: Ref<IFields> = ref({
    login: '',
    password: '',
    email: '',
    name: ''
  })

  errors: Ref<{[code: string]: string}> = ref({})

  getError (value: string) {
    return this.errors.value[value]
  }

  reset () {
    this.fields = ref({
      login: '',
      password: '',
      email: '',
      name: ''
    })

    this.errors = ref({})
  }
}
