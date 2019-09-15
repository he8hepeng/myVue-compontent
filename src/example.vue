<template>
  <div class="about">
    <h1>通过vuex 模拟 登录人名称 为 {{userName}}</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      list: [{ x: 2 }, { x: 3 }, { x: 4 }]
    }
  },
  computed: {
    // 注入 state 数据 注意 publics 为全局 其余数据应当新建Model
    ...mapState({
      userName: state => state.publics.userInfo.userName
    })
  },
  created () {
    // 公共 Element 方法 具体去 assets/js/mixin/globalMinxin.js 去看
    this._messages('success', '错误了', 2000)
    // 全局的 lodash 具体其他操作去 Lodash官网去看
    this._removeListData(this.list, 'x', { x: 3 })
    this.setaaa().then(res => {
      // 修改vuex数据
      this.setUser(res.userinfo)
    })
  },
  methods: {
    // 注入 vuex 方法
    ...mapActions(['setUser']),
    setaaa () {
      return this._promise((resolve, reject) => {
        this.axios.get('/user/userInfo', { a: 2 }, { c: 4 }, res => {
          resolve(res.content)
        })
      })
    }
  }
}
</script>
