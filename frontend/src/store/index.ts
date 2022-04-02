import { reactive } from 'vue'
import axios from '@/axios'
import { host } from '@/const'
import { IFolder } from '@/pages/index/types'

export const store = reactive({
  user: {
    id: '',
    name: '',
    login: '',
    email: ''
  },
  folders: [] as IFolder[],
  showPopup: false,
  popupType: 'todo' as 'todo' | 'folder',
  async getProfile () {
    const response = (await axios.get(host + '/users')).data
    this.user = response
  },
  async getFolders () {
    const response = (await axios.get(host + '/folders')).data
    this.folders = response
  },
  dispatchPopUp (value: 'todo' | 'folder') {
    this.popupType = value
    this.showPopup = !this.showPopup
  }
})
