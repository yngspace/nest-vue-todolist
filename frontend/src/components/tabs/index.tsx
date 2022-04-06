import { defineComponent, PropType } from 'vue'
import { LocationQueryValue, RouterLink, useRoute } from 'vue-router'
import './tab.sass'

export const Tabs = defineComponent({
  props: {
    dropAction: {
      type: Function as PropType<(value: string, from: 'tab') => void>,
      required: true
    }
  },
  setup (props) {
    const route = useRoute()
    const getQueryParam = (value?: string): {[x: string]: LocationQueryValue | LocationQueryValue[]} => {
      const query = { ...route.query }
      delete query.page
      value ? query.status = value : delete query.status
      return query
    }

    return () => (
      <div class='tab-list' onDragover={(e: DragEvent) => e.preventDefault()}>
        <div
          class={!route.query.status ? 'tab-item active' : 'tab-item'}
        >
          <RouterLink
            to={{ path: route.path, query: getQueryParam() }}
          > Все
          </RouterLink>
        </div>
        <div
          class={route.query.status === 'done' ? 'tab-item active' : 'tab-item' }
          onDrop={() => props.dropAction('done', 'tab')}
        >
          <RouterLink
            to={{ path: route.path, query: getQueryParam('done') }}
          > Выполнено
          </RouterLink>
        </div>
        <div
          class={route.query.status === 'undone' ? 'tab-item active' : 'tab-item'}
          onDrop={() => props.dropAction('undone', 'tab')}
        >
          <RouterLink
            to={{ path: route.path, query: getQueryParam('undone') }}
          > В работе
          </RouterLink>
        </div>
      </div>
    )
  }
})