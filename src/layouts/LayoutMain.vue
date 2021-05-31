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

      <div class="md-toolbar-section-end">
        <md-menu
          md-size="auto"
          md-align-trigger
        >
          <md-button md-menu-trigger>
            {{ user.name }}
            <md-icon>expand_more</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item @click="logout">
              <md-icon>logout</md-icon>
              Выход
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
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
        <md-list-item
          v-for="item of links"
          :key="item.name"
          :to="item.to"
          :exact="item.exact"
        >
          <md-icon>{{ item.icon }}</md-icon>
          <span class="md-list-item-text">{{ item.name }}</span>
          <md-tooltip
            v-show="!menuVisible"
            md-direction="right"
            md-delay="500"
          >
            {{ item.name }}
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
      links: [
        {
          name: "Статистика",
          icon: "bar_chart",
          to: {
            name: "statistics",
          },
          exact: true,
        },
        {
          name: "Категории",
          icon: "category",
          to: {
            name: "categories",
          },
          exact: false,
        },
        {
          name: "Настройки",
          icon: "settings",
          to: {
            name: "settings",
          },
          exact: false,
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      user: "users/getActiveUserData",
      total: "total",
    }),
  },

  created() {
    this.$store.dispatch("users/updateUserData");
  },

  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    logout() {
      localStorage.removeItem("activeUserId");
      this.$store.commit("users/IS_SIGN_OUT");
      this.$router.push({ name: "auth" });
    },
  },
};
</script>

<style lang="scss">
.md-app {
  height: 100vh;
}
.md-active {
  max-width: 250px !important;
}
</style>
