import { computed } from 'vue'
import './checkbox.sass'

interface IProps {
  label: string
  modelValue: boolean
  onValueChange: () => void
  class?: string
}

export const DefaultCheckbox = ({ class: className, label, modelValue, onValueChange }: IProps): JSX.Element => {
  const cls = computed((): string => {
    const c: string[] = ['default-checkbox']
    if (modelValue) c.push('checked')
    if (className) c.push(className)

    return c.join(' ')
  })

  return (
    <label class={cls.value}>
      <span class='default-checkbox-label'>{label}</span>
      <input onChange={onValueChange} checked={modelValue} type='checkbox'/>
      <span class='default-checkbox-check'/>
    </label>
  )
}