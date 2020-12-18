<template>
  <div class="app-container">
    <video-player class="vjs-custom-skin" :options="playerOptions"></video-player>
    <el-input  v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;"  />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"

    />
    <!--     //default-expand-all-->
  </div>
</template>

<script>
  import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
//引入hls.js
import videojs from 'videojs-contrib-hls'
  import subject from "@/api/teacher/subject";
  export default {

    data() {
      return {
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
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
            src: 'https://outin-fa78a25b273211eb827100163e1c8dba.oss-cn-shanghai.aliyuncs.com/sv/2bafc1eb-175e9ebd6fa/2bafc1eb-175e9ebd6fa.mp4?Expires=1608212131&OSSAccessKeyId=LTAI8bKSZ6dKjf44&Signature=nX%2BYGOqK10oNOsY2ezKaXf7NMSQ%3D',//你所放置的视频的地址，最好是放在服务器上

          }],
          poster: "http://outin-fa78a25b273211eb827100163e1c8dba.oss-cn-shanghai.aliyuncs.com/4037d55121ee4b04a6fe42c46f10d414/snapshots/2743a304321440c48de5b1a66d7546d5-00002.jpg?Expires=1605956796&OSSAccessKeyId=LTAI8bKSZ6dKjf44&Signature=fddBcmbQ4IUPLAOcpAm%2FmWVZzek%3D", //你的封面地址（覆盖在视频上面的图片）
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        }
      }
    },
    created() {
      this.getAllSubjectList()
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },

    methods: {
      getAllSubjectList() {
        subject.getSubjectList()
          .then(response => {
           this.data2 =  response.data.list
        })
      },

      filterNode(value, data) {
        if (!value) return true
        return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
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
