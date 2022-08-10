import layout from '@/layout'
export default {
  path: '/salarys',
  name: 'salarys',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: {
        title: '工资',
        icon: 'money'
      } // 路由原信息  可以放任何内容
    }
  ]

}
