<template>
  <div id="exampleCont">
    <div class="fd-exampleCont__title">
      修改用户名
    </div>
    <div class="fd-exampleCont__userName">
      <el-input v-model="user" placeholder="请修改登录人名称"></el-input>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      user: ''
    }
  },
  computed: {
    ...mapState({
      userName: state => state.publics.userInfo.userName
    })
  },
  created () {
    this.user = this.userName
  },
  methods: {
    ...mapActions(['setUser']),
    submit () {
      if (this.user === '') {
        this._messages('error', '请填写同户名')
      } else {
        this.setUser({ userName: this.user })
        this._messages('success', '修改成功')
      }
    }
  }
}
</script>
<style scoped>
  @import url('./element.less');
</style>
<style lang="less" scoped>
  #exampleCont {
    .size(100%;100%);

    .fd-exampleCont__title {
      .hh(35px);
      text-align: left;
      text-indent: 20px;
      @{b_b}: .border(@color:#144069);
    }
    .fd-exampleCont__userName {
      .size(100%;40px);
      @{m_t}: 10px;
    }
  }
</style>
