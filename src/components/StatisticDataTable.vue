<template>
  <div
    @click="onClick"
    v-if="getData.length"
  >
    <md-table
      v-model="getData"
      class="md-elevation-5 mb"
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
      >
        <md-table-cell md-label="Категория">
          {{ item.category }}
        </md-table-cell>
        <md-table-cell md-label="Комментарии">
          {{ item.comment }}
        </md-table-cell>
        <md-table-cell md-label="Дата">
          {{ item.date | toLocaleDateString }}
        </md-table-cell>
        <md-table-cell md-label="Сумма">
          {{ item.amount }}
        </md-table-cell>
        <md-table-cell class="w-col">
          <md-button
            class="md-icon-button"
            :data-id="item.id"
            data-event="edit"
          >
            <md-icon>edit_note</md-icon>
          </md-button>
          <md-button
            class="md-icon-button"
            :data-id="item.id"
            data-event="delete"
          >
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StatisticDataTable",

  computed: {
    ...mapGetters(["getData"]),
  },

  methods: {
    onClick(event) {
      const el = event.target.closest("[data-id]");
      if (!el) return false;
      switch (el.dataset.event) {
        case "edit":
          this.$emit("open-dialog-edit", +el.dataset.id);
          break;
        case "delete":
          this.$emit("open-dialog-delete", +el.dataset.id);
          break;
      }
    },
  },
};
</script>

<style>
.w-col {
  min-width: 150px;
  width: 10%;
  text-align: center;
}
</style>
<style scoped>
.mb {
  margin-bottom: 50px !important;
}
</style>
