import Vue from "vue";
import Vuex from "vuex";

import expenses from "@/store/modules/expenses";
import incomes from "@/store/modules/incomes";
import users from "@/store/modules/users";
import * as getters from "@/store/getters";
import * as mutations from "@/store/mutations";
import * as actions from "@/store/actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabs: "expenses",
    filter: "week",
  },

  getters,

  mutations,

  actions,

  modules: {
    expenses,
    incomes,
    users,
  },
});
