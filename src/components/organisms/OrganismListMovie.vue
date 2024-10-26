<template>
  <div class="grid grid-cols-6 gap-8 mt-8">
    <v-select
      v-model="sort"
      label="Sorting"
      :items="listSort"
      variant="outlined"
      @update:modelValue="handleSort"
    />
  </div>
  <div class="grid grid-cols-3 gap-8 mt-8">
    <div v-for="item in listMovie" :key="item.id">
      <MoleculeCardMovie :detail="item" @increment-view="handleIncrementView" />
    </div>
  </div>
  <v-pagination
    :length="totalPage"
    v-model="page"
    @update:modelValue="handlePage"
    class="mt-8"
  />
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import MoleculeCardMovie from "../molecules/MoleculeCardMovie.vue";

const store = useStore();

const sort = computed(() => {
  return store.getters.getSortMovie;
});

const listSort = [
  { title: "Most View", value: "_sort=-view" },
  { title: "Lowest View", value: "_sort=view" },
  { title: "Most Vote", value: "_sort=-vote" },
  { title: "Lowest Vote", value: "_sort=vote" },
];

const listMovie = computed(() => {
  return store.getters.getListMovie;
});

const page = computed(() => {
  return store.getters.getPageMovie;
});

const totalPage = computed(() => {
  return store.getters.getTotalPageMovie;
});

const handleSort = (data) => {
  store.commit("setSortMovie", data);
  store.dispatch("callListMovie");
};

const handlePage = (data) => {
  store.commit("setPageMovie", data);
  store.dispatch("callListMovie");
};

const handleIncrementView = (data) => {
  store.commit("setLoading", true);
  store.dispatch("callAddView", data);
};
</script>
