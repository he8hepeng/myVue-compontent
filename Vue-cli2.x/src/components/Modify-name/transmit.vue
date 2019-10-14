<template>
  <div>
    {{message1}}
    {{message2}}
    {{message3}}
    {{message4}}
    {{message5}}
    {{message6}}
    <div>计数器   {{state}}</div>
    <el-button type="primary" @click="state++">计数器添加</el-button>
    <el-button type="primary" @click="submit">向父组件传递参数</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      state: 0
    }
  },
  props: {
    message1: {
      type: null,
      default: 3
    },
    message2: [String, Number],
    message3: {
      type: Boolean,
      default: false,
      required: true
    },
    message4: {
      type: Array,
      required: true
    },
    message5: {
      type: Object,
      default: () => {
        return {
          asd: 231
        }
      }
    },
    message6: {
      type: Function
    }
  },
  inject: ['parentClick'],
  mounted () {
    this.message6()
  },
  methods: {
    submit () {
      this.parentClick(this.state)
    }
  }
}
</script>

<style></style>
