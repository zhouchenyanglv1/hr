import layout from '@/layout'
export default {
  path: '/approvals',
  name: 'approvals',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: {
        title: '审批',
        icon: 'tree-table'
      } // 路由原信息  可以放任何内容
    }
  ]

}
