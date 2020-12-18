<template>
  <div class="player-container">
    <video-player class="vjs-custom-skin" :options="playerOptions"></video-player>
  </div>

</template>
<script>

  //引入video样式
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  //引入hls.js
  import videojs from 'videojs-contrib-hls'
  export default {
    data () {

      return {
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
           // src:'vide'
            src: 'https://mdup.apdcdn.tc.qq.com/vcloud1022.tc.qq.com/1022_a8b72b503fde4ac3a2b919c8e60fdf76.f0.mp4?vkey=9AE1F87D4988331D3F196B5998982FF619955948619F9ACB1E241DAF2CDA11F1DCE310DEC4B4AA9F8E466E849B69A2E7B6EC05143FCFDECFB3F6D0625DB2D3A0DE562778C6EC4D105E3E7CE7C3',//你所放置的视频的地址，最好是放在服务器上

          }],
          poster: "http://outin-fa78a25b273211eb827100163e1c8dba.oss-cn-shanghai.aliyuncs.com/912736051e9d4ee3b29c223d84c45203/snapshots/53d4fb851f09410bad380314c7f3ace9-00001.jpg?Expires=1605956837&OSSAccessKeyId=LTAI8bKSZ6dKjf44&Signature=dRpe1Ny7BQssNY%2B39g1NuTo6UxE%3D", //你的封面地址（覆盖在视频上面的图片）
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        }
      }
    },
  }


</script>
<style scoped>
  .vjs-custom-skin{
    position: fixed; right:-10px; bottom: 0px;
    min-width: 100%; min-height: 100%;
    width: auto; height: auto;
  }
</style>
