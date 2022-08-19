import layout from '@/layout'
export default {
  path: '/import',
  name: 'import',
  component: layout,
  hidden: true,
  children: [
    {
      path: '',
      component: () => import('@/views/import')
    }
  ]

}
