import { reactive } from 'vue'
import axios from '@/axios'
import { host } from '@/const'

interface IFolder {
  id: string
  name: string
}

export const store = reactive({
  user: {
    id: '',
    name: '',
    login: '',
    email: ''
  },
  folders: [] as IFolder[],
  async getProfile () {
    const response = (await axios.get(host + '/users')).data
    this.user = response
  },
  async getFolders () {
    const response = (await axios.get(host + '/folders')).data
    this.folders = response
  }
})
