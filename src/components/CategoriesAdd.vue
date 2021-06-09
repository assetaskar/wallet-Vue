<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Создание категории</md-dialog-title>

      <md-dialog-content>
        <md-field :class="messageClass">
          <label>Название категории</label>
          <md-input
            v-model="name"
            required
          ></md-input>
          <span class="md-error">Введите название категории</span>
        </md-field>

        <div>
          <md-radio
            v-model="operation"
            value="expenses"
            class="md-accent"
          >Расходы</md-radio>
          <md-radio
            v-model="operation"
            value="incomes"
            class="md-primary"
          >Доходы</md-radio>
        </div>

        <color-picker v-model="color"></color-picker>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="close">Отмена</md-button>
        <md-button
          class="md-primary"
          @click="add"
        >Добавить</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-speed-dial class="md-bottom-right">
      <md-speed-dial-target @click="showDialog = true">
        <md-icon>add</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker.vue";

export default {
  name: "CategoryAdd",

  components: {
    ColorPicker,
  },

  data: () => ({
    showDialog: false,
    name: "",
    hasMessages: false,
    operation: "expenses",
    color: "#ffffff",
  }),

  computed: {
    messageClass() {
      return {
        "md-invalid": this.hasMessages,
      };
    },
  },

  methods: {
    reset() {
      this.name = "";
      this.operation = "expenses";
      this.color = "#ffffff";
      this.hasMessages = false;
    },
    close() {
      this.showDialog = false;
      this.reset();
    },
    add() {
      if (this.name.trim() === "") {
        this.error();
      } else {
        this.$store.commit(`${this.operation}/ADD_CATEGORY`, {
          name: this.name.trim(),
          color: this.color,
        });
        this.close();
      }
    },
    error() {
      this.hasMessages = true;
    },
  },
};
</script>

<style>
</style>