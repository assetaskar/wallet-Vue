<template>
  <div class="home">
    <md-toolbar class="md-transparent mb">
      <md-tabs :md-active-tab="'tab-' + tabs">
        <md-tab
          id="tab-expenses"
          md-label="Расходы"
          @click="SET_TABS('expenses')"
        ></md-tab>
        <md-tab
          id="tab-incomes"
          md-label="Доходы"
          @click="SET_TABS('incomes')"
        ></md-tab>
      </md-tabs>
      <div class="md-toolbar-section-end">
        <simple-select
          name="Фильтры"
          id="filter"
          :options="filters"
          v-model="v_filter"
        ></simple-select>
      </div>
    </md-toolbar>
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        class="md-layout"
        v-if="!Object.keys(dataCollectionForBar).length"
        key="empty"
      >
        <div class="md-layout-item mb">
          <md-content class="md-elevation-5">
            <md-empty-state
              md-icon="stacked_line_chart"
              :md-label="message"
              md-description="..."
            ></md-empty-state>
          </md-content>
        </div>
      </div>
      <div
        class="md-layout md-gutter mb"
        v-else
        key="chart"
      >
        <div class="md-layout-item">
          <md-content class="md-elevation-5">
            <chart-doughnut :chart-data="dataCollectionForDoughnut"></chart-doughnut>
          </md-content>
        </div>
        <div class="md-layout-item">
          <md-content class="md-elevation-5">
            <chart-bar :chart-data="dataCollectionForBar"></chart-bar>
          </md-content>
        </div>
      </div>
    </transition>
    <data-table @open-dialog="openDialogEdit"></data-table>
    <data-add></data-add>
    <data-edit
      :show-dialog="showDialogEdit"
      :id="editId"
      @show-dialog="closeDialogEdit"
    ></data-edit>
  </div>
</template>

<script>
import ChartDoughnut from "../components/charts/Doughnut";
import ChartBar from "../components/charts/Bar";
import SimpleSelect from "../components/SimpleSelect";
import DataAdd from "../components/StatisticDataAdd";
import DataTable from "../components/StatisticDataTable";
import DataEdit from "../components/StatisticDataEdit";

import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "MainStatistics",

  components: {
    ChartDoughnut,
    ChartBar,
    SimpleSelect,
    DataAdd,
    DataTable,
    DataEdit,
  },

  data() {
    return {
      message: "Нет данных",
      filters: [
        {
          value: "today",
          text: "Сегодня",
        },
        {
          value: "week",
          text: "За эту неделю",
        },
        {
          value: "month",
          text: "За этот месяц",
        },
        {
          value: "year",
          text: "За этот год",
        },
      ],
      editId: null,
      showDialogEdit: false,
    };
  },

  computed: {
    ...mapState({
      filter: (state) => state.filter,
      tabs: (state) => state.tabs,
    }),
    ...mapGetters(["dataCollectionForBar", "dataCollectionForDoughnut"]),

    v_filter: {
      get() {
        return this.filter;
      },
      set(value) {
        this.SET_FILTER(value);
      },
    },
  },

  methods: {
    ...mapMutations(["SET_FILTER", "SET_TABS"]),

    openDialogEdit(id) {
      this.editId = id;
      this.showDialogEdit = true;
    },
    closeDialogEdit() {
      this.showDialogEdit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin: 0 3px;
}

.mb {
  margin-bottom: clamp(8px, 2vw, 48px);
}

.md-content {
  height: 100%;
}
</style>
