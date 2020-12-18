import request from '@/utils/request'

export default {
  //根据课程id获取小节数据列表
  addVideo(video) {
    return request({
      url: `/eduservice/video/addVideo`,
      method: 'post',
      data:video
    })
  },
  //删除小节
  deleteVideo(id) {
    return request({
      url: `/eduservice/video/${id}`,
      method: 'delete',
    })
  },
  //修改小节
  updateVideo(video) {
    return request({
      url: `/eduservice/video/updateVideo`,
      method: 'post',
      data:video
    })
  },
  //根据Id查询小节
  getVideo(videoId) {
    return request({
      url: `/eduservice/video/getVideoInfo/${videoId}`,
      method: 'get',
    })
  },
  //修改视频
  deletealiyunvod(id) {
    return request({
      url: `/eduvod/video/removeAliyunVideo/${id}`,
      method: 'delete',
    })
  },
  //获取视频id地址
  getAliyunVideoAddress(id) {
    return request({
      url: `/eduvod/video/getAliyunVideoAddress/${id}`,
      method: 'get',
    })
  },
}

