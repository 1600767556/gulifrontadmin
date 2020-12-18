<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="marginbottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>


<el-form label-width="120px">
  <el-form-item label="课程标题">
    <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从 基础到搭建项目"></el-input>
  </el-form-item>
  <!--所属分类 TODO-->
  <el-form-item label="课程分类">
    <el-select
      v-model="courseInfo.subjectParentId"
      placeholder="一级分类" @change="subjectLevelOneChanged">
      <el-option
        v-for="subject in subjectOneList"
        :key="subject.id"
        :label="subject.title"
        :value="subject.id"/>

    </el-select>

    <!-- 二级分类 -->
    <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
      <el-option
        v-for="subject in subjectTwoList"
        :key="subject.id"
        :label="subject.title"
        :value="subject.id"/>
    </el-select>
  </el-form-item>

  <!--课程讲师 TODO-->
  <el-form-item label="课程讲师">
    <el-select
      v-model="courseInfo.teacherId"
      placeholder="请选择">

      <el-option
        v-for="teacher in teacherList"
        :key="teacher.id"
        :label="teacher.name"
        :value="teacher.id"/>

    </el-select>
  </el-form-item>

 <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" aria-placeholder="数"/>
      </el-form-item>
      <!-- 课程简介  -->
  <el-form-item label="课程简介">
    <tinymce :height="300" v-model="courseInfo.description"/>
  </el-form-item>
      <!-- 课程封面 -->
  <el-form-item label="课程封面">
    <el-upload
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :action="BASE_API+'/eduoss/fileoss'"
      class="avatar-uploader">
      <img :src="courseInfo.cover">
    </el-upload>
  </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import course from "@/api/teacher/course";
  import subject from "@/api/teacher/subject";
  import Tinymce from '@/components/Tinymce' //引入组件
  export default {
    //必须声明组件
    components: { Tinymce },
    data() {
      return {
        saveBtnDisabled: false, // 保存按钮是否禁用
        courseInfo:{
          title: '',
          subjectId: '',
          subjectParentId:'',
          teacherId: '',
          lessonNum: 0,
          description: '',
          cover: '/static/3.png',
          price: 0
        },
        courseId:'',
        BASE_API: process.env.BASE_API, // 接口API地址
        teacherList:[], //封装所有的讲师的数据
        subjectOneList:[] ,//封装所有的讲师的数据
        subjectTwoList:[] //封装所有的讲师的数据
      }
    },
    created() {
      if(this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        //调用根据id查询课程的方法
        this.getInfo()
      }else {
        this.getListTeacher()
        this.getOneSubject()
      }
    },
    watch: {
      $route(to, from) {
        this.init()
      }
    },
    methods: {
      init() {
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id
          this.getInfo(id)
        } else {
          this.courseInfo = {}
        }
      },
      //根据课程信息查询
      getInfo() {
        course.getCourseInfoId(this.courseId)
          .then(response => {
          this.courseInfo = response.data.courseInfoVo
            subject.getSubjectList()
            .then(response =>{
             this.subjectOneList =  response.data.list
              for (var i = 0; i <this.subjectOneList.length; i++) {
                var oneSubject = this.subjectOneList[i]
                if (this.courseInfo.subjectParentId == oneSubject.id) {
                  this.subjectTwoList = oneSubject.children
                }
              }
            })
              this.getListTeacher()
        })
      },

      //上传成功调用的方法
      handleAvatarSuccess(res,file) {
        this.courseInfo.cover = res.data.url

      },
      //上传之前调用的方法
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt10M = file.size / 1024 / 1024 < 10
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!')
        }
        return isJPG && isLt10M

      },

      subjectLevelOneChanged(value) { //value 就是一级分类的id
        for (var i = 0; i < this.subjectOneList.length; i++) {
          var oneSubject =this.subjectOneList[i]
          if (value === oneSubject.id) {
           this.subjectTwoList =  oneSubject.children
            this.courseInfo.subjectId = ""
          }
        }
      },
      getOneSubject() {
        subject.getSubjectList()
        .then(response =>{
          this.subjectOneList = response.data.list
        })

      },
      //查询所有的讲师
      getListTeacher() {
        course.getListTeacher()
          .then(response => {
            this.teacherList = response.data.items
          })
      },
      addCourse() {
        course.addCourseInfo(this.courseInfo)
          .then(response => {
            //提示
            this.$message({
              type: 'success',
              message: '添加课程信息成功!'
            });
            //跳转到第二步
            this.$router.push({path:'/course/chapter/'+response.data.courseId})
          })
      },
      updateCourse() {
        course.updateCourseInfo(this.courseInfo)
        .then(response =>{
          this.$message({
            type: 'success',
            message: '添加课程信息成功!'
          });
        })

      },
      saveOrUpdate() {
        //判断是修改还是添加
        if (!this.courseInfo.id) {
          this.addCourse()
        } else {
          this.updateCourse()
        }
        this.$router.push({path:'/course/chapter/'+this.courseId})
      }
    }
  }
</script>
<style scoped>
  .tinymce-container {
    line-height: 29px;
  }
</style>
