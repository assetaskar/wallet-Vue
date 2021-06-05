<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-xsmall-size-100 mb">
        <div>
          <h3>Расходы:</h3>
        </div>

        <categories-list
          :data="categoriesExpenses"
          @edit="openEdit"
          @del="openDel"
        ></categories-list>
      </div>

      <div class="md-layout-item md-xsmall-size-100">
        <div>
          <h3>Доходы:</h3>
        </div>

        <categories-list
          :data="categoriesIncomes"
          @edit="openEdit"
          @del="openDel"
        ></categories-list>
      </div>
    </div>

    <div>
      <md-dialog
        :md-active.sync="showDialogEdit"
        @md-closed="close"
      >
        <div class="pd">
          <md-field>
            <md-input v-model="editCategoryName"></md-input>
          </md-field>

          Цвет:
          <span
            class="color"
            :style="{ backgroundColor: color }"
            @click="showDialogColor = true"
          ></span>
        </div>
        <md-dialog-actions>
          <md-button @click="close">Отмена</md-button>
          <md-button
            class="md-primary"
            @click="edit"
          >Изменить</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="showDialogColor">
        <div class="wrap_color-picker">
          <color-picker
            style="width: 220px"
            :color="color"
            @changeColor="changeColor"
          ></color-picker>
        </div>
        <md-dialog-actions>
          <md-button @click="showDialogColor = false">Отмена</md-button>
          <md-button
            class="md-primary"
            @click="setColor"
          >Ok</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog
        :md-active.sync="showDialogDel"
        @md-closed="close"
      >
        <md-dialog-title>Удалить категорию?</md-dialog-title>
        <md-dialog-content>
          Все содержащиеся в ней операции будут перемещены в категорию "Другое"
        </md-dialog-content>
        <md-dialog-actions>
          <md-button @click="close">Отмена</md-button>
          <md-button
            class="md-primary"
            @click="del"
          >Ok</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CategoriesList from "../components/CategoriesList.vue";
import ColorPicker from "@caohenghu/vue-colorpicker";

export default {
  name: "Categories",

  components: {
    CategoriesList,
    ColorPicker,
  },

  data: () => ({
    editCategoryName: null,
    deleteCategoryName: null,
    prevCategory: null,
    showDialogEdit: false,
    showDialogDel: false,
    showDialogColor: false,
    color: null,
    tempColor: null,
  }),

  computed: {
    ...mapState({
      categoriesExpenses: (state) => state.expenses.categories,
      categoriesIncomes: (state) => state.incomes.categories,
    }),
  },

  methods: {
    changeColor(color) {
      const {
        rgba: { r, g, b, a },
      } = color;
      this.tempColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    },
    setColor() {
      this.color = this.tempColor;
      this.showDialogColor = false;
    },
    openEdit(category) {
      this.prevCategory = this.editCategoryName = category.name;
      this.color = category.color;
      this.showDialogEdit = true;
    },
    close() {
      this.showDialogEdit = false;
      this.showDialogDel = false;
      this.reset();
    },
    edit() {
      if (this.editCategoryName.trim() !== "")
        this.$store.commit("EDIT_CATEGORY", {
          prev: this.prevCategory,
          next: {
            name: this.editCategoryName.trim(),
            color: this.color,
          },
        });
      this.close();
    },
    reset() {
      this.editCategoryName = this.deleteCategoryName = this.color = this.prevCategory = this.tempColor = null;
    },
    openDel(name) {
      this.deleteCategoryName = name;
      this.showDialogDel = true;
    },
    del() {
      this.$store.dispatch("deleteCategory", this.deleteCategoryName);
      this.close();
    },
  },
};
</script>

<style scoped>
.mb {
  margin-bottom: 30px;
}
.pd {
  padding: 0 1.5em;
}
.wrap_color-picker {
  padding: 1.5em 2em 0;
}
.color {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-left: 1em;
  cursor: pointer;
}
</style>
