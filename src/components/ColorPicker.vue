<template>
  <div>
    Цвет:
    <span
      class="color"
      :style="{ backgroundColor: value }"
      @click="showColorPicker = true"
    ></span>

    <md-dialog
      :md-active.sync="showColorPicker"
      style="z-index: 100"
    >
      <md-dialog-content>
        <v-color-picker
          style="width: 220px"
          :color="value"
          @changeColor="changeColor"
        ></v-color-picker>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="close">Отмена</md-button>
        <md-button
          class="md-primary"
          @click="setColor"
        >Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import VColorPicker from "@caohenghu/vue-colorpicker";
export default {
  components: {
    VColorPicker,
  },

  props: {
    value: String,
  },

  data: () => ({
    showColorPicker: false,
    tempColor: null,
  }),

  methods: {
    changeColor(color) {
      const {
        rgba: { r, g, b, a },
      } = color;
      this.tempColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    },
    setColor() {
      this.$emit("input", this.tempColor);
      this.close();
    },
    close() {
      this.showColorPicker = false;
      this.reset();
    },
    reset() {
      this.tempColor = null;
    },
  },
};
</script>

<style scoped>
.color {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-left: 1em;
  cursor: pointer;
}
</style>