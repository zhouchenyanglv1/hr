import layout from '@/layout'
export default {
  path: '/permission',
  name: 'permissions',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限',
        icon: 'lock'
      } // 路由原信息  可以放任何内容
    }
  ]

}

