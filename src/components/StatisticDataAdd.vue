<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Добавление операции</md-dialog-title>

      <div class="body">
        <md-radio
          v-model="v_finance"
          value="expenses"
        >Расходы</md-radio>
        <md-radio
          v-model="v_finance"
          value="incomes"
          class="md-primary"
        >Доходы</md-radio>

        <md-field>
          <label>Сумма</label>
          <span class="md-prefix">$</span>
          <md-input
            v-model.number="v_amount"
            type="number"
          ></md-input>
        </md-field>

        <simple-select
          id="category"
          name="Категория"
          :options="categories"
          v-model="v_categories"
        >
        </simple-select>

        <md-datepicker
          v-model="v_date"
          :md-model-type="Number"
          :md-disabled-dates="disabledDates"
          md-immediately
        ></md-datepicker>

        <md-field>
          <label>Комментарий</label>
          <md-textarea v-model="comment"></md-textarea>
        </md-field>
      </div>

      <md-dialog-actions>
        <md-button @click="close">Отмена</md-button>
        <md-button
          class="md-primary"
          @click="save"
        >Сохранить</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-speed-dial class="md-bottom-right z-i">
      <md-speed-dial-target @click="showDialog = true">
        <md-icon>add</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import SimpleSelect from "./SimpleSelect.vue";

export default {
  name: "StatisticDataAdd",

  components: { SimpleSelect },

  data: () => ({
    showDialog: false,
    category: null,
    amount: 0,
    date: null,
    comment: "",
    disabledDates: (date) => {
      return date.getTime() > new Date().getTime();
    },
  }),

  computed: {
    ...mapState(["tabs"]),
    ...mapGetters({
      categories: "getCategories",
    }),

    v_finance: {
      get() {
        return this.tabs;
      },
      set(value) {
        this.$store.commit("SET_TABS", value);
      },
    },
    v_categories: {
      get() {
        return this.category || this.categories[0].value;
      },
      set(value) {
        this.category = value;
      },
    },
    v_amount: {
      get() {
        return this.amount;
      },
      set(value) {
        this.amount = parseInt(value) !== value ? "0" : value;
      },
    },
    v_date: {
      get() {
        return this.date || Date.now();
      },
      set(value) {
        this.date = value;
      },
    },
  },

  methods: {
    reset() {
      this.amount = 0;
      this.comment = "";
      this.category = this.date = null;
    },
    close() {
      this.reset();
      this.showDialog = false;
    },
    save() {
      const data = {
        id: Date.now(),
        amount: this.amount,
        category: this.v_categories,
        date: new Date(this.v_date).toJSON(),
        comment: this.comment,
      };
      this.$store.commit(`ADD_DATA`, data);
      this.reset();
      this.showDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  padding: 0 1.5em;
}

.md-dialog /deep/.md-dialog-container {
  min-width: 320px;
}

.z-i {
  z-index: 10;
}
</style>
