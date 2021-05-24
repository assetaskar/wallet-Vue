<template>
  <md-dialog-confirm
    :md-active="showDialog"
    md-title="Подтверждение"
    md-content="Действительно хотите удалить?"
    md-confirm-text="Да"
    md-cancel-text="Отмена"
    @md-cancel="$emit('close-dialog')"
    @md-confirm="onConfirm"
  ></md-dialog-confirm>
</template>

<script>
export default {
  name: "StatisticDataDelete",

  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    id: Number,
  },

  methods: {
    onConfirm() {
      this.$store.commit("DELETE_DATA", this.id);
      this.$emit("close-dialog");
    },
  },
};
</script>

<style>
</style>