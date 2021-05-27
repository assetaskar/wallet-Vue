<template>
  <md-table
    v-model="getData"
    class="md-elevation-5 mb"
    v-if="getData.length"
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
          @click="$emit('open-dialog-edit', item.id)"
        >
          <md-icon>edit_note</md-icon>
        </md-button>
        <md-button
          class="md-icon-button"
          @click="$emit('open-dialog-delete', item.id)"
        >
          <md-icon>delete</md-icon>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StatisticDataTable",

  computed: {
    ...mapGetters(["getData"]),
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
