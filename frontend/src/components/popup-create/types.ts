import { Ref, ref } from 'vue'

interface ITodo {
  name: string
  description: string
  deadline: string
}

class CreateTodo {
  fields: Ref<ITodo> = ref({
    name: '',
    description: '',
    deadline: ''
  })

  errors: Ref<{[code: string]: string}> = ref({})

  getError (value: string): string {
    return this.errors.value[value]
  }

  reset (): void {
    this.fields = ref({
      name: '',
      description: '',
      deadline: ''
    })

    this.errors = ref({})
  }
}

class CreateFolder {
  fields = ref({
    name: ''
  }) as Ref<{name: string}>

  errors: Ref<{[code: string]: string}> = ref({})

  getError (value: string): string {
    return this.errors.value[value]
  }

  reset (): void {
    this.fields = ref({
      name: ''
    })

    this.errors = ref({})
  }
}

export { CreateTodo, CreateFolder }