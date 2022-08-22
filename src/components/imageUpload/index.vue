<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :file-list="fileList"
      :on-preview="preview"
      :on-remove="remove"
      :on-change="change"
      :before-upload="beforeUpload"
      :http-request="httpUpload"
      :class="{ disabled : fileLength }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible="showDialog" title="图片预览" type="flex" justify="center" @close="closeDialog()">
      <img :src="imgUrl" alt="" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import Cos from 'cos-js-sdk-v5'
const cos = new Cos({
  SecretId: 'AKIDELFwPefaRG6wc9VeaIl00mKeleJtOgos',
  SecretKey: '5zfIn7JNErGQUTL1SdZGivvhHckeKlxv'
})
export default {

  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      userId: this.$route.params.id,
      currentUid: ''
    }
  },
  computed: {
    fileLength() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      console.log(file.url)
      this.showDialog = true
      this.imgUrl = file.url
    },
    closeDialog() {
      this.showDialog = false
    },
    remove(file, filelist) {
      this.fileList = []
    },
    change(file, filelist) {
      this.fileList = filelist.map(item => item)
    },
    beforeUpload(file) {
      console.log(file)
      const type = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp']
      if (!type.some(item => item === file.type)) {
        this.$message.error('上传的图片格式错误')
        return false
      }
      const size = 5 * 1024 * 1024
      if (file.size > size) {
        this.$message.error('上传的图片不能大于5MB')
        return false
      }
      this.currentUid = file.uid
      return true
    },

    httpUpload(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'picture-1254136928',
          Region: 'ap-shanghai',
          Key: params.file.name,
          Body: params.file,
          StorageClass: 'STANDARD'
        },
        function(error, data) {
          console.log(error)
          if (data.statusCode === 200) {
            console.log(data.Location)
            const url1 = 'http://' + data.Location
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentUid) {
                return { url: url1, upload: true }
              }
              return item
            })
          }
        }

        )
      }
    }
  }
}
</script>

<style  >
  .disabled .el-upload--picture-card{
    display: none;
}
</style>
