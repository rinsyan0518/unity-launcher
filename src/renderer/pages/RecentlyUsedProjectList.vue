<template>
  <el-table
    ref="singleTable"
    :data="projects"
    @row-click="handleRowClick"
    v-loading.fullscreen.lock="fullscreenLoading"
    :row-style="tableRowStyle"
    style="width: 100%">
    <el-table-column
      property="projectName"
      label="Project Name"
      :show-overflow-tooltip="true"
      width="150" />
    <el-table-column
      property="unityVersion"
      label="Version"
      :show-overflow-tooltip="true"
      width="100" />
    <el-table-column
      property="path"
      :show-overflow-tooltip="true"
      label="Path" />
  </el-table>
</template>

<script>
import { exec } from 'child_process'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RecentlyUsedProjectList',

  data () {
    return {
      fullscreenLoading: false,
      tableRowStyle: {
        cursor: 'pointer'
      }
    }
  },

  created () {
    this.getRecentlyUsedProjects()
  },

  computed: {
    ...mapGetters({
      projects: 'allProjects'
    }),
    ...mapGetters([
      'getUnityPathByVersion'
    ])
  },

  methods: {
    handleRowClick (item) {
      const unity = this.getUnityPathByVersion(item.unityVersion)
      if (unity) {
        this.fullscreenLoading = true
        exec(`open -n '${unity.appPath}' --args -projectPath '${item.path}'`, (err, stdout, stderr) => {
          console.log(`executed => ${err} ${stdout} ${stderr}`)
          this.fullscreenLoading = false
        })
      }
    },
    ...mapActions([
      'getRecentlyUsedProjects'
    ])
  }
}
</script>

<style scoped>

</style>
