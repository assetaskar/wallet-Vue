<template>
  <div class="auth">
    <div class="auth__card">
      <md-list>
        <md-list-item md-expand>
          <md-icon>account_circle</md-icon>
          <span class="md-list-item-text">Accounts</span>

          <md-list slot="md-expand">
            <md-list-item class="md-inset" @click="addUser">
              Askar
            </md-list-item>
            <md-list-item class="md-inset" @click="addUser">
              Nurika
            </md-list-item>
            <md-list-item class="md-inset" @click="addUser">
              <md-icon>person_add</md-icon>
            </md-list-item>
          </md-list>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    // this.$router.push({ name: "statistics", params: { userId: 123 } });
  },
  methods: {
    addUser() {
      console.log("ADD_USER");
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