<template>
  <div id="Configuration_information_roulList">
    <div class="common_component_header"><span>规则列表</span></div>
    <template v-if="isShow">
      <div class="fd-operation">
        <el-button type="success">导出</el-button>
        <el-button type="increased">新增</el-button>
      </div>
      <div class="fd-information_roulList">
        <el-table
          :data="tableList"
          stripe
          @row-click="rowClick"
          height="100%"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="规则名称">
          </el-table-column>
          <el-table-column
            label="适用于案件传递"
            width="160">
            <template slot-scope="scope">
              {{scope.row.type == 1 ? '是' : '不是'}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="140">
            <template slot-scope="scope">
              <span @click.stop="handleEdit(scope.row)" class="fd-czTable">编辑</span>
              <span @click.stop="handleDelete(scope.row)" class="fd-czTable">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      tableList: []
    }
  },
  watch: {
    isShow (newV) {
      if (newV) {
        this.initDataList()
      } else {
        this.tableList = []
      }
    }
  },
  computed: {
    ...mapState({
      fatherItem: state => state.configurationInformation.ruleList.item,
      isShow: state => state.configurationInformation.ruleList.isShow
    })
  },
  created () {
  },
  methods: {
    initDataList () {
      this.axios.get('/roulList2', this.fatherItem, {}, res => {
        console.log(res, 'res')
        this.tableList = res.content
      })
    },
    handleEdit () {
      console.log(123)
    },
    handleDelete () {

    },
    rowClick (...data) {
      console.log(data)
    }
  }
}
</script>
<style lang="less">
  @import './list.less';
</style>
<style lang="less" scoped>
  #Configuration_information_roulList {
    width: 100%;
    height: 60%;
    background: #fff;
    .main-content_border;

    .fd-operation {
      height: 60px;
      line-height: 60px;
      text-align: right;
      padding:  0 10px;
    }
    .fd-information_roulList {
      height: calc(100% - 100px);
      padding: 10px;
    }
  }
</style>
