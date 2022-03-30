import { defineComponent, PropType, ref } from 'vue'
import { Todoes } from '@/pages/index/types'
import moment from 'moment'
import { DefaultCheckbox } from '@/UI/input/default-checkbox'

export const DetailTodo = defineComponent({
  props: {
    todo: {
      type: Object as unknown as PropType<Todoes|null>
    },
    onChangeTodo: {
      type: Function as PropType<(item: Todoes) => void>,
      required: true
    }
  },
  setup (props) {
    const formtDate = (value: Date): string => {
      return moment(value).locale('ru').format('YYYY-MM-DD')
    }

    const changeDate = (value: string) => {
      if (props.todo) {
        const updatedTodo: Todoes = { ...props.todo }
        updatedTodo.deadline = new Date(value)
        props.onChangeTodo(updatedTodo)
      }
    }

    const checkValue = (value: 'done' | 'undone'): boolean => {
      if (value === 'done') return true
      return false
    }

    const changeStatus = (value: 'done' | 'undone'): void => {
      if (!props.todo) return

      const updatedTodo: Todoes = { ...props.todo }
      if (value === 'done') updatedTodo.status = 'undone'
      else updatedTodo.status = 'done'

      props.onChangeTodo(updatedTodo)
    }

    return (): JSX.Element => (
      <div class='detail-todo mt-5'>
        {props.todo
          ? <>
            <h3>{props.todo?.name}</h3>
            <DefaultCheckbox
              class='mt-2' label='Статус: '
              modelValue={checkValue(props.todo?.status)}
              onValueChange={() => changeStatus(props.todo ? props.todo.status : 'done') }
            />
            <p class='mt-2'>Дата создания: {formtDate(props.todo?.createdAtt)}</p>
            <p class='mt-2'>Крайний срок:
              <input
                class='date ml-1' type="date"
                value={formtDate(props.todo.deadline)}
                onInput={(e: any) => changeDate(e.target?.value) }
              />
            </p>
            <p class='mt-2'>{props.todo?.description}</p>
          </>
          : null
        }
      </div>
    )
  }
})