<script>
import AppBar from '@/components/common/AppBar';

export default {
  name: 'App',
  components: {
    'app-bar': AppBar,
  }
};
</script>

<template>
  <v-app>
    <app-bar />
    <main class="app__main">
      <router-view />
    </main>
  </v-app>
</template>

<style lang="scss">
</style>
