import BPlistParser from 'bplist-parser'
import Fs from 'fs'
import Path from 'path'

import * as types from '../mutation-types'

const state = {
  projects: []
}

const getters = {
  allProjects: state => state.projects
}

const actions = {
  getRecentlyUsedProjects ({ commit }) {
    const plistPath = Path.join(process.env.HOME, 'Library/Preferences', 'com.unity3d.UnityEditor5.x.plist')
    const projects = []

    Fs.readFile(plistPath, (err, data) => {
      if (err) throw err

      const plist = BPlistParser.parseBuffer(data)[0]
      const recentlyUsedProjectPathList = Object.keys(plist)
        .filter(key => {
          return /^RecentlyUsedProjectPaths-*/.test(key)
        })
        .sort((a, b) => {
          const aNum = parseInt(a.split('-')[1])
          const bNum = parseInt(b.split('-')[1])
          if (aNum < bNum) return -1
          if (aNum > bNum) return 1
          return 0
        })
        .map(val => {
          return val
        })
        .reduce((obj, key) => {
          obj.push(plist[key])
          return obj
        }, [])
        .map(val => {
          const projectVersionPath = Path.join(val, 'ProjectSettings/ProjectVersion.txt')

          if (!Fs.existsSync(projectVersionPath)) {
            return null
          }

          const projectVersionText = Fs.readFileSync(projectVersionPath, 'utf-8')
          const unityVersion = projectVersionText.split('\n')[0].replace(/m_EditorVersion: */, '')
          return {
            projectName: Path.basename(val),
            unityVersion: unityVersion,
            path: val
          }
        })

      projects.push(...recentlyUsedProjectPathList.filter(v => v))

      commit(types.RECEIVE_RECENTLY_USED_PROJECTS, { projects })
    })
  }
}

const mutations = {
  [types.RECEIVE_RECENTLY_USED_PROJECTS] (state, { projects }) {
    state.projects = projects
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
