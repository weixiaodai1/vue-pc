import Vuex, { ActionObject, ActionMethod, Module } from "vuex";
import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  removeUserInfo,
} from "@/utils/auth";
import $api from "@/api/index";
import { getUserInfo } from "@/utils/auth";

const state = {
  token: "",
  footMenu: [],
  userInfo: {
    userId: 0,
    userName: '',
    userRealName: '',
    userType: '',
  },
  whCodeList: [],
  defaultWhCode: ''
}

const mutations = {
  SET_TOKEN: (state, data) => {
    state.token = data;
  },
  SET_FOOT_MENU: (state,data) => {
    state.footMenu = data
  },
  SET_USER_INFO: (state, loginData = {}) => {
    state.userInfo.userId = loginData.userID;
    state.userInfo.userName = loginData.loginName;
    state.userInfo.userType = loginData.userType;
    state.userInfo.companyId = loginData.companyID;
    state.userInfo.tenantId = loginData.tenantID;
  },
  SET_WH_CODE_LIST: (state,data) => {
    state.whCodeList = data
  },
  SET_DEFAULT_WH_CODE: (state,data) => {
    state.defaultWhCode = data
  },
  CLEAR_USER_INFO: (state) => {
    state.info = {}
    state.token = null
  },
}

const actions = {
  async login({ commit }, data) {
    let result = await $api.user.login(data);
    console.log(result.result.resultObj);

    commit('SET_TOKEN', result.result.resultObj.sessionID);
    commit('SET_FOOT_MENU', result.result.resultObj.menuListNew)
    commit('SET_USER_INFO', result.result.resultObj)
    commit('SET_WH_CODE_LIST', result.result.resultObj.externalInfo.whList)
    commit('SET_DEFAULT_WH_CODE', result.result.resultObj.externalInfo.WhCode)
    setToken(result.result.resultObj.sessionID);
  },
  async setDefaultWhCode({ commit }, data) {
    commit('SET_DEFAULT_WH_CODE', data)
  },
  logout({ commit }) {
    commit('CLEAR_USER_INFO');
    removeToken();
    // removeUserInfo();
  },
}
const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo,
  footMenu: state => state.footMenu,
  whCodeList: state => state.whCodeList,
  defaultWhCode: state => state.defaultWhCode
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
