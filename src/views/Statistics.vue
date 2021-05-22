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
    <md-table
      v-model="getData"
      class="md-elevation-5"
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
      >
        <md-table-cell
          md-label="Категория"
          md-sort-by="category"
        >
          {{ item.category }}
        </md-table-cell>
        <md-table-cell
          md-label="Комментарии"
          md-sort-by="comment"
        >
          {{ item.comment }}
        </md-table-cell>
        <md-table-cell
          md-label="Дата"
          md-sort-by="date"
        >
          {{ item.date | toDateString }}
        </md-table-cell>
        <md-table-cell
          md-label="Сумма"
          md-sort-by="amount"
        >
          {{ item.amount }}
        </md-table-cell>
      </md-table-row>
    </md-table>
    <statistic-add-data></statistic-add-data>
  </div>
</template>

<script>
import ChartDoughnut from "../components/charts/Doughnut";
import ChartBar from "../components/charts/Bar";
import SimpleSelect from "../components/SimpleSelect";
import StatisticAddData from "../components/StatisticAddData";

import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "MainStatistics",

  components: {
    ChartDoughnut,
    ChartBar,
    SimpleSelect,
    StatisticAddData,
  },

  filters: {
    toDateString: function (value) {
      if (!value) return "";
      value = value.toString();
      return new Date(Date.parse(value)).toLocaleDateString();
    },
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
    };
  },

  computed: {
    ...mapState({
      filter: (state) => state.filter,
      tabs: (state) => state.tabs,
    }),
    ...mapGetters([
      "dataCollectionForBar",
      "dataCollectionForDoughnut",
      "getData",
    ]),

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
