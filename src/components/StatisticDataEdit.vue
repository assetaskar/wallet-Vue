<template>
  <md-dialog :md-active="showDialog">
    <md-dialog-title>Редактирование</md-dialog-title>

    <div class="pd">
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
        <md-textarea v-model="v_comment"></md-textarea>
      </md-field>
    </div>

    <md-dialog-actions>
      <md-button
        class="md-primary"
        @click="close"
      >Отмена</md-button>
      <md-button
        class="md-primary"
        @click="edit"
      >Изменить</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import SimpleSelect from "./SimpleSelect";

export default {
  name: "StatisticDataEdit",

  components: {
    SimpleSelect,
  },

  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    id: Number,
  },

  data: () => ({
    amount: null,
    category: null,
    date: null,
    disabledDates: (date) => {
      return date.getTime() > new Date().getTime();
    },
    comment: null,
  }),

  computed: {
    ...mapGetters(["getData"]),
    ...mapGetters({
      categories: "getCategories",
    }),

    dataById() {
      return this.getData.find((data) => data.id === this.id);
    },

    v_amount: {
      get() {
        return this.amount ?? this.dataById?.amount;
      },
      set(value) {
        this.amount = parseInt(value) !== value ? "0" : value;
      },
    },
    v_categories: {
      get() {
        return this.category || this.dataById?.category;
      },
      set(value) {
        this.category = value;
      },
    },
    v_date: {
      get() {
        return this.date || new Date(this.dataById?.date);
      },
      set(value) {
        this.date = value;
      },
    },
    v_comment: {
      get() {
        return this.comment ?? this.dataById?.comment;
      },
      set(value) {
        this.comment = value;
      },
    },
  },

  methods: {
    reset() {
      this.amount = this.category = this.date = this.comment = null;
    },
    close() {
      this.reset();
      this.$emit("show-dialog");
    },
    edit() {
      const oldData = this.dataById;
      const data = {
        id: this.dataById.id,
        amount: this.amount ?? oldData.amount,
        category: this.category || oldData.category,
        comment: this.comment ?? oldData.comment,
        date: this.date.toJSON(),
      };

      this.$store.commit("EDIT_DATA", data);

      this.reset();
      this.$emit("show-dialog");
    },
  },
};
</script>

<style scoped>
.pd {
  padding: 0 1.5em;
}
</style>