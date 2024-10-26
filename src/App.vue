<template>
  <v-app>
    <v-main>
      <template-loading v-if="loading"/>
      <router-view/>
      <organism-snackbar />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import TemplateLoading from "./templates/TemplateLoading.vue";
import OrganismSnackbar from "./components/organisms/OrganismSnackBar.vue";

const store = useStore();

const loading = computed(() => {
  return store.getters.getLoading;
});

onMounted(async () => {
  const token = window.localStorage.getItem("movieFestival");
  let expired = false;
  if (token !== null) {
    expired = Date.now() > JSON.parse(token).expired;
  } else {
    expired = true;
  }
  if (expired) {
    store.commit("setDetailAuth", []);
  } else {
    store.commit("setDetailAuth", JSON.parse(token));
  }
});
</script>
