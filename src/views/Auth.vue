<template>
  <div class="auth">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Регистрация</md-dialog-title>

      <form @submit.prevent="register">
        <md-card-content>
          <md-field :class="{ 'md-invalid': nameInvalid }">
            <label>Имя</label>
            <md-input
              v-model="name"
              required
            ></md-input>
            <span class="md-error">Обязательное поле</span>
          </md-field>
          <md-field>
            <label>Начальная сумма</label>
            <md-input
              v-model="startAmount"
              type="number"
              required
            ></md-input>
          </md-field>
        </md-card-content>

        <md-button
          class="md-raised md-primary"
          type="submit"
        >Ok</md-button>

        <md-button
          class="md-raised md-accent"
          @click="showDialog = false"
        >Отмена</md-button>
      </form>
    </md-dialog>

    <div class="auth__card">
      <md-list>
        <md-list-item md-expand>
          <md-icon>account_circle</md-icon>
          <span class="md-list-item-text">Accounts</span>

          <md-list slot="md-expand">
            <md-list-item
              class="md-inset"
              v-for="user of users"
              :key="user.id"
              @click="login(user.id)"
            >
              {{ user.name }}
            </md-list-item>
            <md-list-item
              class="md-inset"
              @click="showDialog = true"
            >
              <md-icon>person_add</md-icon>
            </md-list-item>
          </md-list>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    showDialog: false,
    name: "",
    nameInvalid: false,
    startAmount: "",
  }),

  computed: {
    ...mapState({
      users: (state) => state.users.usersAll,
    }),
  },

  methods: {
    ...mapMutations({
      ADD_USER: "users/ADD_USER",
    }),

    register() {
      this.nameInvalid = false;

      if (this.name.trim() === "") this.nameInvalid = true;

      !this.nameInvalid && this.addUser();
    },
    addUser() {
      const user = {
        id: Date.now().toString(),
        name: this.name.trim(),
        startAmount: +this.startAmount,
      };

      localStorage.setItem("users", JSON.stringify([...this.users, user]));
      localStorage.setItem("activeUserId", user.id);
      this.ADD_USER(user);

      this.showDialog = false;
      this.name = this.startAmount = "";

      this.$router.push({
        name: "statistics",
        params: {
          userId: user.id,
        },
      });
    },
    login(id) {
      localStorage.setItem("activeUserId", id);
      this.$router.push({
        name: "statistics",
        params: {
          userId: id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
