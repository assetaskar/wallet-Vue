<template>
  <md-app
    md-waterfall
    md-mode="fixed"
  >
    <md-app-toolbar class="md-primary">
      <span v-if="!menuVisible">
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
        >
          <md-icon>menu</md-icon>
        </md-button>
      </span>
      <span
        class="md-title"
        v-if="!menuVisible"
      >
        <md-icon>attach_money</md-icon>
        <span>{{ total }}</span>
      </span>
      <div class="md-toolbar-section-end">{{ user.name }}</div>
    </md-app-toolbar>

    <md-app-drawer
      :md-active.sync="menuVisible"
      md-persistent="mini"
    >
      <md-toolbar md-elevation="0">
        <span class="md-title">
          <md-icon>attach_money</md-icon>
          <span>{{ total }}</span>
        </span>
        <div class="md-toolbar-section-end">
          <md-button
            class="md-icon-button md-dense"
            @click="toggleMenu"
          >
            <md-icon>keyboard_arrow_left</md-icon>
          </md-button>
        </div>
      </md-toolbar>

      <md-list>
        <md-list-item :to="{ name: 'statistics' }">
          <md-icon>bar_chart</md-icon>
          <span class="md-list-item-text">Статистика</span>
          <md-tooltip
            v-show="!menuVisible"
            md-direction="right"
            md-delay="500"
          >
            Статистика
          </md-tooltip>
        </md-list-item>
        <md-list-item :to="{ name: 'settings' }">
          <md-icon>settings</md-icon>
          <span class="md-list-item-text">Настройки</span>
          <md-tooltip
            v-show="!menuVisible"
            md-direction="right"
            md-delay="500"
          >
            Настройки
          </md-tooltip>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      <router-view />
    </md-app-content>
  </md-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      menuVisible: false,
      id: 123,
    };
  },

  computed: {
    ...mapGetters({
      user: "users/getActiveUserData",
      total: "total",
    }),
  },

  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
  },
};
</script>

<style lang="scss">
.md-app {
  height: 100vh;
}
</style>
