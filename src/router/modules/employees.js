import layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: {
        title: '员工',
        icon: 'people'
      } // 路由原信息  可以放任何内容
    }
  ]

}
