<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>Movie Festival</v-app-bar-title>
    <div v-if="detailAuth.length !== 0">
      <v-btn
        prepend-icon="mdi-account-cog"
        to="/admin-movie"
        v-if="detailAuth.type === 0"
      >
        Admin
      </v-btn>
      <v-btn prepend-icon="mdi-login" @click="logout">Logout</v-btn>
    </div>
    <div v-else>
      <v-btn prepend-icon="mdi-login" to="/login">Login / Register</v-btn>
    </div>
  </v-app-bar>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const detailAuth = computed(() => {
  return store.getters.getDetailAuth;
});

const logout = () => {
  store.dispatch("callLogout");
};
</script>