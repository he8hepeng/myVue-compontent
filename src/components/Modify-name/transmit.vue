<template>
  <div>
    {{message1}}
    {{message2}}
    {{message3}}
    {{message4}}
    {{message5}}
    {{message6}}
  </div>
</template>

<script>
export default {
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
  mounted () {
    this.message6()
  }
}
</script>

<style></style>
