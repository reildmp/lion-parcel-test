<template>
  <OrganismTopbar />
  <div class="container mx-auto my-8">
    <OrganismListMovie />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import OrganismTopbar from "@/components/organisms/OrganismTopBar.vue";
import OrganismListMovie from "@/components/organisms/OrganismListMovie.vue";

const store = useStore();

onMounted(async () => {
  store.dispatch("callListMovie");
});
</script>