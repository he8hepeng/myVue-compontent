import moment from 'moment'
export default {
  // 格式化时间
  _getTimeY (velue = new Date()) {
    return moment(velue).format('YYYY-MM-DD')
  },
  _getTimeH (velue = new Date()) {
    return moment(velue).format('h:mm:ss')
  },
  _getSetTime (velue = 'YYYY-MM-DD h:mm:ss') {
    return moment().format(velue)
  }
}
