<script lang="ts" setup></script>

<template>
  <main class="home-page">
    <div>Home page</div>
    <v-btn color="primary">Test Vuetify</v-btn>
    <div>
      <v-text-field
        label="Test Vuetify"
        placeholder="Test Vuetify"
      ></v-text-field>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
