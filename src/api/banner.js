import request from '@/utils/request'

export default {
  //添加轮播图
  addBanner(banner) {
    return request({
      url: `/educms/banneradmin/addBanner`,
      method: 'post',
      data:banner
    })
  },

}

