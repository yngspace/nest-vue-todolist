import { store } from '@/store'
import { RouterLink } from 'vue-router'
import './header.sass'

interface IHeaderProps {
  onLogout: () => void
}

export const Header = ({ onLogout }: IHeaderProps) => {
  const routes = [
    { name: 'На главную', path: '/' },
    { name: 'Добавить', path: '/create' }
  ]

  return (
    <header class='header'>
      <div class='container'>
        <div class='row'>
          <RouterLink to='/'>
            <img class='logo' src={require('@/assets/img/logo.svg')} alt="logo"/>
          </RouterLink>
          <nav class='nav'>
            <a href='#' onClick={() => store.dispatchPopUp('todo')}>
              Создать Todo
            </a>
            <a href='#' onClick={() => store.dispatchPopUp('folder')}>
              Создать Папку
            </a>
          </nav>
          <div class='user'>
            Привет, {store.user.name}
          </div>
          <button onClick={onLogout} class='blue-button'>Выйти</button>
        </div>
      </div>
    </header>
  )
}
