import layout from '@/layout'
export default {
  path: '/social',
  name: 'social',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      meta: {
        title: '社保'
      } // 路由原信息  可以放任何内容
    }
  ]

}