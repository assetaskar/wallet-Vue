<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-xsmall-size-100 mb">
        <div class="md-layout-item md-size-50">
          <h3>Расходы:</h3>
        </div>

        <categories-list
          :data="categoriesExpenses"
          @edit="openEdit"
        ></categories-list>
      </div>

      <div class="md-layout-item md-xsmall-size-100">
        <div class="md-layout-item md-size-50">
          <h3>Доходы:</h3>
        </div>

        <categories-list
          :data="categoriesIncomes"
          @edit="openEdit"
        ></categories-list>

        <div>
          <md-dialog :md-active.sync="showDialogEdit">
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
              <md-button @click="cancel">Отмена</md-button>
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
        </div>
      </div>
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
    showDialogEdit: false,
    color: null,
    tempColor: null,
    showDialogColor: false,
    prevCategory: null,
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
      this.prevCategory = category.name;
      this.editCategoryName = category.name;
      this.color = category.color;
      this.showDialogEdit = true;
    },
    cancel() {
      this.showDialogEdit = false;
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
      this.showDialogEdit = false;
      this.reset();
    },
    reset() {
      this.editCategoryName = this.deleteCategoryName = this.color = this.prevCategory = this.tempColor = null;
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
