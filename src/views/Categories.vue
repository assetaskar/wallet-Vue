<template>
  <div class="fix">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-xsmall-size-100 mb">
        <div>
          <h3>Расходы:</h3>
        </div>

        <categories-list
          :data="categoriesExpenses"
          category-type="expenses"
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
          category-type="incomes"
          @edit="openEdit"
          @del="openDel"
        ></categories-list>
      </div>
    </div>

    <div>
      <md-dialog :md-active.sync="showDialogEdit" @md-closed="close">
        <md-dialog-content>
          <md-field>
            <md-input v-model="editCategoryName"></md-input>
          </md-field>

          <color-picker v-model="color"></color-picker>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button @click="close">Отмена</md-button>
          <md-button class="md-primary" @click="edit">Изменить</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="showDialogDel" @md-closed="close">
        <md-dialog-title>Удалить категорию?</md-dialog-title>
        <md-dialog-content>
          Все содержащиеся в ней операции будут перемещены в категорию "Другое"
        </md-dialog-content>
        <md-dialog-actions>
          <md-button @click="close">Отмена</md-button>
          <md-button class="md-primary" @click="del">Ok</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>

    <categories-add></categories-add>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CategoriesList from "../components/CategoriesList.vue";
import CategoriesAdd from "../components/CategoriesAdd.vue";
import ColorPicker from "../components/ColorPicker.vue";

export default {
  name: "Categories",

  components: {
    CategoriesList,
    CategoriesAdd,
    ColorPicker,
  },

  data: () => ({
    editCategoryName: null,
    editCategoryType: null,
    deleteCategoryName: null,
    deleteCategoryType: null,
    prevCategory: null,
    showDialogEdit: false,
    showDialogDel: false,
    color: null,
  }),

  computed: {
    ...mapState({
      categoriesExpenses: (state) => state.expenses.categories,
      categoriesIncomes: (state) => state.incomes.categories,
    }),
  },

  methods: {
    openEdit(category) {
      this.editCategoryType = category.categoryType;
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
          categoryType: this.editCategoryType,
        });
      this.close();
    },
    reset() {
      this.editCategoryName =
        this.deleteCategoryName =
        this.color =
        this.prevCategory =
        this.editCategoryType =
          null;
    },
    openDel(name, categoryType) {
      this.deleteCategoryName = name;
      this.deleteCategoryType = categoryType;
      this.showDialogDel = true;
    },
    del() {
      this.$store.dispatch("deleteCategory", {
        name: this.deleteCategoryName,
        type: this.deleteCategoryType,
      });
      this.close();
    },
  },
};
</script>

<style scoped>
.mb {
  margin-bottom: 30px;
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
.fix {
  margin: 0 3px;
}
</style>
