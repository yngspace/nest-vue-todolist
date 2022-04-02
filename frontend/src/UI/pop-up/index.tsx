import { defineComponent, PropType, watch, watchEffect } from 'vue'
import './pop-up.sass'

export const PopUp = defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    toggle: {
      type: Function as PropType<() => void>,
      required: true
    },
    body: {
      type: Function as PropType<() => JSX.Element>
    },
    buttons: {
      type: Function as PropType<() => JSX.Element>
    }
  },
  setup (props) {
    return (): JSX.Element => (
      <div class={props.show ? 'modal-background' : 'modal-background hidden'}>
        <div class='modal-content'>
          <div class='modal-top-row'>
            <span class='modal-title'>{props.title}</span>
            <span onClick={props.toggle} class='modal-close'>X</span>
          </div>
          <div class='modal-body'>
            {props.body ? props.body() : null}
          </div>
          <div class='modal-footer'>
            {props.buttons ? props.buttons() : <button class='default-button'>Понятно</button>}
          </div>
        </div>
      </div>
    )
  }
})
