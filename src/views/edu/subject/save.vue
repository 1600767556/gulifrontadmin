<template>
  <div class="app-container">
    <div class="player-container">
      <video-player class="vjs-custom-skin" :options="playerOptions"></video-player>
    </div>

    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'/static/write.xlsx'">点击下载模版</a>
        </el-tag>
      </el-form-item>
      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="5"
          :action="BASE_API+'/eduservice/edusubject/addSubject'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              :loading="loading"
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"> 上传到服务器 </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  //引入video样式
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  //引入hls.js
  import videojs from 'videojs-contrib-hls'
  export default {
    data() {
      return{
        BASE_API: process.env.BASE_API, // 接口API地址
        //OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
        importBtnDisabled: false, // 按钮是否禁用,
        loading: false,


        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: true, //如果true,浏览器准备好时开始回放。
          controls: false, //控制条
          preload: 'auto', //视频预加载
          muted:'muted' , //默认情况下将会消除任何音频。
          loop: true, //导致视频一结束就重新开始。
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: 'video/mp4',
           // src: 'https://mdup.apdcdn.tc.qq.com/vcloud1022.tc.qq.com/1022_981294b8d2c54a28adbcd3363ef38c74.f0.mp4',//你所放置的视频的地址，最好是放在服务器上
            src: 'https://outin-fa78a25b273211eb827100163e1c8dba.oss-cn-shanghai.aliyuncs.com/sv/399ca74a-175e9efc6e0/399ca74a-175e9efc6e0.mp4?Expires=1608212757&OSSAccessKeyId=LTAI8bKSZ6dKjf44&Signature=inuzbK2wC4KAbOlXvmuope1lpLs%3D',//你所放置的视频的地址，最好是放在服务器上

          }],
          poster: "http://outin-fa78a25b273211eb827100163e1c8dba.oss-cn-shanghai.aliyuncs.com/4eb078967507470088f180ca723c135f/snapshots/fa94f9c5cc834aca9221ffb14cd3de4d-00001.jpg?Expires=1605956767&OSSAccessKeyId=LTAI8bKSZ6dKjf44&Signature=UtcNeLtZ1Y8NrYQl1JNLc8wZO5s%3D", //你的封面地址（覆盖在视频上面的图片）
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        }

      }
    },
    created() {
    },
    methods:{
      //点击按钮上传文件到接口里面
      submitUpload() {
        this.importBtnDisabled = true
        this.loading = true
        this.$refs.upload.submit()
      },

      //上传成功
      fileUploadSuccess() {
          this.loading = false
          this.$message({
            type: 'success',
            message: '添加课程分类成功'
          })
          this.$router.push({path:'/subject/list'})
      },
      //上传失败
      fileUploadError() {
        this.loading = false
        this.$message({
          type: 'error',
          message: '添加课程分类失败'
        })
      }

    }
  }
</script>
<style scoped>
  .vjs-custom-skin{
    position: fixed; right:0px; bottom: 0px; left: 0px;
    min-width: 100%; min-height: 100%;
    width: auto; height: auto;
  }
</style>
