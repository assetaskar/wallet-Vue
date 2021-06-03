<template>
  <md-content class="md-elevation-5 pd">
    <div
      class="md-layout md-gutter md-alignment-center"
      v-for="item in data"
      :key="item.name"
    >
      <div
        class="md-layout-item"
        style="flexGrow: 0"
      >
        <span
          :style="{backgroundColor: item.color}"
          class="color"
        ></span>
      </div>
      <div class="md-layout-item">
        {{ item.name }}
      </div>
      <div
        class="md-layout-item"
        style="flexGrow: 0"
      >
        <md-menu md-direction="bottom-end">
          <md-button
            class="md-icon-button"
            md-menu-trigger
          >
            <md-icon>more_vert</md-icon>
          </md-button>

          <md-menu-content>
            <md-menu-item @click="$emit('edit', item)">
              <span>Редактировать</span>
              <md-icon>edit</md-icon>
            </md-menu-item>

            <md-menu-item @click="del(item.name)">
              <span>Удалить</span>
              <md-icon>delete</md-icon>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </div>
  </md-content>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      validator: function (arr) {
        return arr.every(
          (item) =>
            typeof item.name === "string" && typeof item.color === "string"
        );
      },
    },
  },

  methods: {
    del(name) {
      console.log(name);
    },
  },
};
</script>

<style>
.pd {
  padding: 0 1em;
}
.color {
  display: block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
</style>