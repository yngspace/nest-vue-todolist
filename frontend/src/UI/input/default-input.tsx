import { computed } from 'vue'
import './default-input.sass'

interface DefaultInputProps {
  label: string
  placeholder: string
  modelValue: string
  type?: 'text' | 'password' | 'textarea'
  error?: string
  className?: string
  onValueChange: (v: string) => void
}

export const DefaultInput = ({ label, placeholder, modelValue, type, error, className, onValueChange }: DefaultInputProps) => {
  const cls = computed((): string => {
    const classes: string[] = ['default-input']
    if (className) classes.push(className)
    if (error) classes.push('with-error')

    return classes.join(' ')
  })

  return (
    <label class={cls.value}>
      <div class='default-input-top-row'>
        <span class='default-input-label'>{label}</span>
        {error ? <span class='default-input-error'>{error}</span> : null}
      </div>
      {type === 'textarea'
        ? <textarea class='default-input-textarea'/>
        : <input
          class='default-input-input'
          type={type || 'text'}
          value={modelValue} placeholder={placeholder}
          onInput={(e: any) => onValueChange(e.target?.value)}
        />
      }
    </label>
  )
}
