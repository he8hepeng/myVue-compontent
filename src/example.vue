<template>
  <div class="about">
    <h1>通过vuex 模拟 登录人名称 为 {{userName}}</h1>
    <el-button type="primary" @click="showType = true">修改用户名 按需加载</el-button>
    <template v-if="showType">
      <exampleCont/>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      showType: false,
      list: [{ x: 2 }, { x: 3 }, { x: 4 }]
    }
  },
  computed: {
    // 注入 state 数据 注意 publics 为全局 其余数据应当新建Model
    ...mapState({
      userName: state => state.publics.userInfo.userName
    })
  },
  components: {
    'exampleCont': () => import('@/components/ExampleComponents/exampleCont.vue')
  },
  created () {
    // 公共 Element 方法 具体去 assets/js/mixin/globalMinxin.js 去看
    this._messages('success', '欢迎使用', 2000)
    // 全局的 lodash 具体其他操作去 Lodash官网去看
    this._removeListData(this.list, 'x', { x: 3 })
    // 全局的 promise封装 这个并不强制使用
    this.asyncPromise().then(res => {
      // 修改vuex数据
      this.setUser(res.userinfo)
    })
    this.setAsync()
  },
  methods: {
    // 注入 vuex 方法
    ...mapActions(['setUser']),
    asyncPromise () {
      return this._promise((resolve, reject) => {
        this.axios.get('/user/userInfo', { a: 2 }, { c: 4 }, res => {
          resolve(res.content)
        })
      })
    },
    async setAsync () {
      console.log('...开始执行 4000ms')
      await this.setTime()
      console.log('...等待上方结束才执行')
    },
    setTime () {
      return this._promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 4000)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .about {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.3);
    padding: 10px;
  }
</style>
