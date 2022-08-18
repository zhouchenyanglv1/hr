import pagetools from '@/components/Pagrtools'
import uploadExcel from '@/components/uploadExcel'
export default {
  install(vue) {
    vue.component('pagetools', pagetools)
    vue.component('uploadExcel', uploadExcel)
  }
}
