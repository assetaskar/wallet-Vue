<template>
  <md-content class="md-elevation-5 pd">
    <div
      class="md-layout md-gutter md-alignment-center height"
      v-for="item in data"
      :key="item.name"
    >
      <div class="md-layout-item" style="flex-grow: 0">
        <span :style="{ backgroundColor: item.color }" class="color"></span>
      </div>
      <div class="md-layout-item">
        {{ item.name }}
      </div>
      <div class="md-layout-item" style="flex-grow: 0">
        <md-menu md-direction="bottom-end" v-if="!item.service">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>

          <md-menu-content>
            <md-menu-item @click="$emit('edit', { ...item, categoryType })">
              <span>Редактировать</span>
              <md-icon>edit</md-icon>
            </md-menu-item>

            <md-menu-item @click="$emit('del', item.name, categoryType)">
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
    categoryType: {
      type: String,
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
.height {
  min-height: 3.5em;
}
</style>