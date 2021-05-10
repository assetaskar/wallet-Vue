<template>
  <span>
    <label :for="id">{{ name }}</label>
    <select :id="id" :value="value" @change="propChange">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </span>
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
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    propChange(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>