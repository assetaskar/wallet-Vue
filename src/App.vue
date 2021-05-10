<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine";
@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(blue, 400),
    accent: md-get-palette-color(red, A200),
    theme: dark,
  )
);
@import "~vue-material/dist/theme/all";

// a:hover {
//   text-decoration: none !important;
// }
// li {
//   list-style: none;
// }
// a:not(.md-button).router-link-exact-active {
//   color: coral;
// }
</style>
