<template>
  <div class="wrap">
    <label
      class="label"
      v-if="name !== ''"
      :for="id"
    >{{ name }}:</label>

    <select
      :id="id"
      class="select"
      :value="value"
      @change="$emit('input', $event.target.value)"
    >

      <option
        class="select__option"
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.text }}
      </option>

    </select>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: [],
    },
    value: String,
  },
};
</script>

<style lang="scss" scoped>
.select {
  padding: 0.5em 2em 0.5em 1em;
  font-size: 1rem;
  font-family: inherit;
  color: inherit;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #c3c3c3;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  flex-grow: 1;

  &__option {
    background-color: #424242;
  }

  &:focus {
    outline: none;
  }
}

.wrap {
  position: relative;
  display: flex;
  align-items: center;

  &::after {
    position: absolute;
    content: "";
    right: 0.5em;
    top: 1em;
    width: 0;
    height: 0;
    border-width: 0.5em 0.5em 0 0.5em;
    border-color: #c3c3c3 transparent transparent transparent;
    border-style: solid;
    pointer-events: none;
  }

  .label {
    margin-right: 1em;
  }
}
</style>