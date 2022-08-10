import layout from '@/layout'
export default {
  path: '/departments',
  name: 'departments',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      meta: {
        title: '组织架构',
        icon: 'tree'
      } // 路由原信息  可以放任何内容
    }
  ]

}
