<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="轮播图名称">
        <el-input v-model="banner.title"/>
      </el-form-item>
      <el-form-item label="图片地址">
        <el-input v-model="banner.linkUrl" placeholder="如果本地上传可不写"/>
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input v-model="banner.imageUrl" />
      </el-form-item>
      <el-form-item label="轮播图排序">
        <el-input-number v-model="banner.sort" controls-position="right"
                         :min="0"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item label="图片上传">
        <!-- 头衔缩略图 -->
        <!--<img :src="banner.imageUrl" width="50%" height="50%"/>-->
        <!--<pan-thumb :image="banner.imageUrl"/>-->
        <!-- 文件上传按钮 -->
     <!--   <el-button type="primary" icon="el-icon-upload"
                   @click="imagecropperShow=true">上传图片
        </el-button>
-->


        <el-form-item label="">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :action="BASE_API+'/eduoss/fileoss'"
            class="avatar-uploader">
            <img :src="banner.imageUrl">
          </el-upload>
        </el-form-item>
















        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary"
                   @click="savebanner">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import bannerApi from '@/api/banner'
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'
  export default {
    components: { ImageCropper, PanThumb },
    data() {
      return {
        banner: {
          title: '',
          linkUrl: '',
          sort:0,
          imageUrl: '/static/3.png',

          //这些可加可不加
        },
        imagecropperShow:false,
        imagecropperKey:0,
        BASE_API:process.env.BASE_API,
        saveBtnDisabled: false,




      }
    },
    created() {
      this.init()

    },
    watch: {
      $route(to, from) {
        this.init()
      }
    },
    methods: {
      close() { //关闭上传弹框
        this.imagecropperShow=false
        //上传组件初始化
        this.imagecropperKey = this.imagecropperKey+1
      },
      cropSuccess(data) { //上传成功
        this.imagecropperShow=false
        console.log(data.action)
        this.banner.imageUrl = data.action
        this.imagecropperKey = this.imagecropperKey+1

      },

      // 保存
      savebanner() {
        bannerApi.addBanner(this.banner)
          .then(response =>{
            this.$message({
              type:'success',
              message:'添加成功！'
            });
            //回到列表页面 路由跳转
            this.$router.push({path:'/dashboard'})
          })
      },



      handleAvatarSuccess(res,file) {
        this.banner.imageUrl = res.data.url

      },
      //上传之前调用的方法
      beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
       // const ispng = file.type === 'image/png'
        const isLt10M = file.size / 1024 / 1024 < 10
      /*  if ( !isJPG ){
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }*/
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!')
        }
        return isJPG && isLt10M

      },






    }
  }


</script>
