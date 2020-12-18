import request from '@/utils/request'

export default {
  //添加课程信息
  addCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/addCourseInfo`,
      method: 'post',
      data:courseInfo
    })
  },
  //查询所有讲师
  getListTeacher() {
    return request({
      url: `/eduservice/teacher/findAll`,
      method: 'get',
    })
  },
  //根据id查询课程的基本信息
  getCourseInfoId(id) {
    return request({
      url: `/eduservice/course/getCourseInfo/${id}`,
      method: 'get',
    })
  },
  //修改课程的基本信息
  updateCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/updateCourseInfo/`,
      method: 'post',
      data:courseInfo
    })
  },
  //课程信息确认
  getPublishCourseInfo(id) {
    return request({
      url: `/eduservice/course/getPublishCourseInfo/${id}`,
      method: 'get'

    })
  },
  //课程最终发布
  publishCourse1(id) {
    return request({
      url: `/eduservice/course/publishCourse/${id}`,
      method: 'post'
    })
  },
  //课程列表
  getCourseListPage(current, limit, courseQuery) {
    return request({
      url: `/eduservice/course/pageCourseCondition/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },
  //根据id课程信息
  deleteCourseById(courseId) {
    return request({
      url: `/eduservice/course/${courseId}`,
      method: 'delete',
    })
  },
}

