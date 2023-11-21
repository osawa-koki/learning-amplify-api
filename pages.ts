interface Page {
  emoji: string
  path: string
  name: string
}

const pages: Page[] = [
  {
    emoji: '🏠',
    path: '/',
    name: 'Home'
  },
  {
    emoji: '📚',
    path: '/list/',
    name: 'List'
  },
  {
    emoji: '📝',
    path: '/create/',
    name: 'Create'
  }
]

export default pages
