import pagetools from '@/components/Pagrtools'
import uploadExcel from '@/components/uploadExcel'
import imageUpload from '@/components/imageUpload'
import prints from 'vue-print-nb'
export default {
  install(vue) {
    vue.component('pagetools', pagetools)
    vue.component('uploadExcel', uploadExcel)
    vue.component('imageUpload', imageUpload)
    vue.use(prints)
  }
}
