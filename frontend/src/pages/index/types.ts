class Todoes {
  id: string = ''
  name: string = ''
  status: 'done' | 'undone' = 'undone'
  description: string = ''
  deadline: Date = new Date()
  createdAtt: Date = new Date()
  folder: IFolder|null = null
}

interface IFolder {
  id: string
  name: string
}

export { Todoes }