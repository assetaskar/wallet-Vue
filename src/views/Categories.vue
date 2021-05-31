<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-xsmall-size-100 mb">
        <div class="md-layout-item md-size-50">
          <h3>Расходы:</h3>
        </div>

        <categories-list :data="categoriesExpenses"></categories-list>
      </div>

      <div class="md-layout-item md-xsmall-size-100">
        <div class="md-layout-item md-size-50">
          <h3>Доходы:</h3>
        </div>

        <categories-list :data="categoriesIncomes"></categories-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CategoriesList from "../components/CategoriesList.vue";

export default {
  name: "Categories",

  components: {
    CategoriesList,
  },

  computed: {
    ...mapState({
      categoriesExpenses: (state) => state.expenses.categories,
      categoriesIncomes: (state) => state.incomes.categories,
    }),
  },
};
</script>

<style scoped>
.mb {
  margin-bottom: 30px;
}
</style>
