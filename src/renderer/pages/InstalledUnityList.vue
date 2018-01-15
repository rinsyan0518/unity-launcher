<template>
  <el-table
    ref="singleTable"
    :data="unitys"
    @row-click="handleRowClick"
    v-loading.fullscreen.lock="fullscreenLoading"
    :row-style="tableRowStyle"
    style="width: 100%">
    <el-table-column
      property="version"
      label="Version"
      :show-overflow-tooltip="true"
      width="100"/>
    <el-table-column
      property="path"
      :show-overflow-tooltip="true"
      label="Path">
    </el-table-column>
  </el-table>
</template>

<script>
import { exec } from 'child_process'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'InstalledUnityList',

  data () {
    return {
      fullscreenLoading: false,
      tableRowStyle: {
        cursor: 'pointer'
      }
    }
  },

  created () {
    this.getInstalledUnitys()
  },

  computed: {
    ...mapGetters({
      unitys: 'allUnitys'
    })
  },

  methods: {
    handleRowClick (item) {
      this.fullscreenLoading = true
      exec(`open -n ${item.appPath}`, (err, stdout, stderr) => {
        console.log(`executed => ${err} ${stdout} ${stderr}`)
        this.fullscreenLoading = false
      })
    },
    ...mapActions([
      'getInstalledUnitys'
    ])
  }
}
</script>

<style scoped>

</style>
