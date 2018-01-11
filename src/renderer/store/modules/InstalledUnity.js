import Fs from 'fs'
import Plist from 'plist'
import Path from 'path'

import * as types from '../mutation-types'

const SEARCH_PATH = '/Applications'
const UNITY_APP = 'Unity.app'
const UNITY_PLIST_PATH = 'Unity.app/Contents/Info.plist'

const existsUnityApp = path => {
  if (Fs.statSync(path).isDirectory()) {
    return Fs.existsSync(Path.join(path, UNITY_APP))
  }
  return false
}

const state = {
  unitys: []
}

const getters = {
  allUnitys: state => state.unitys,
  getUnityPathByVersion: state => version => state.unitys.find(v => v.version === version)
}

const actions = {
  getInstalledUnitys ({ commit }) {
    Fs.readdir(SEARCH_PATH, (err, files) => {
      if (err) throw err

      const unitys = files
        .map(file => Path.join(SEARCH_PATH, file))
        .filter(path => existsUnityApp(path))
        .map(path => {
          const text = Fs.readFileSync(Path.join(path, UNITY_PLIST_PATH), 'utf-8')
          const p = Plist.parse(text)

          return {
            version: p['CFBundleVersion'],
            path: path,
            appPath: Path.join(path, UNITY_APP)
          }
        })

      commit(types.RECEIVE_INSTALLED_UNITY, { unitys })
    })
  }
}

const mutations = {
  [types.RECEIVE_INSTALLED_UNITY] (state, { unitys }) {
    state.unitys = unitys
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
