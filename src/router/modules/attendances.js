import layout from '@/layout'
export default {
  path: '/attendances',
  name: 'attendances',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      meta: {
        title: '考勤',
        icon: 'skill'
      } // 路由原信息  可以放任何内容
    }
  ]

}
