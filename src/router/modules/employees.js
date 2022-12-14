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
    },
    {
      path: '/employees/detail/:id',
      component: () => import('@/views/employees/detail'),
      hidden: true,
      props: true
    },
    {
      path: '/print/:id',
      component: () => import('@/views/employees/departments/print'),
      hidden: true,
      meta: {
        title: '打印'
      }
    }
  ]

}
