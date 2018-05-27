<script>

export default {
  name: 'DateTimeField',
  props: [
    'value',
    'name',
    'label',
    'errorMessages',
    'menuClass',
    'activatorClass',
  ],
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    onChange(value = null) {
      this.$emit('input', value);
      this.menu = false;
    },
  },
};
</script>
<template>
  <div class="date-time-field">
    <v-menu
      v-bind:class="['date-time-field__menu', menuClass ? menuClass : '']"
      content-class="date-time-field__menu-content"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      full-width
    >
      <div slot="activator" v-bind:class="['date-activator', activatorClass ? activatorClass : '']">
        <v-text-field
          :label="label"
          :value="value"
          prepend-icon="event"
          :error-messages="errorMessages"
          readonly
        ></v-text-field>
      </div>
      <v-date-picker
        :value="value"
        v-on:input="(value) => onChange(value)"
      >
      </v-date-picker>
    </v-menu>
  </div>
</template>
<style lang="scss" prescoped>
  .date-activator {
    position: relative;
  }
  .field--short {
    .input-group {
      padding: 0;
    }
    .date-clear {
      top: 0;
    }
  }
  .date-clear {
    position: absolute;
    top: 20px;
    right: 6px;
    color: #707070;
  }
  .date-time-field__menu-content {
    min-width: auto !important;
    width: auto !important;
  }
  .date-time-field__menu-content {
    z-index: 1000 !important;
  }
</style>
