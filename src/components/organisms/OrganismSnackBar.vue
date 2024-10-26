<template>
  <v-snackbar v-model="showSnackbar" color="white" location="top right">
    {{ textSnackbar }}
    <template v-slot:actions>
      <v-btn
        :color="statusSnackbar === 200 ? 'green' : 'red'"
        variant="text"
        @click="close"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const showSnackbar = computed(() => {
  return store.getters.getShowSnackbar;
});

const textSnackbar = computed(() => {
  return store.getters.getTextSnackbar;
});

const statusSnackbar = computed(() => {
  return store.getters.getStatusSnackbar;
});

const closeTargetSnackbar = computed(() => {
  return store.getters.getCloseTargetSnackbar;
});

const close = () => {
  closeTargetSnackbar.value !== '' && router.push(closeTargetSnackbar.value)
  const close = {
    showSnackbar: false,
    textSnackbar: textSnackbar.value,
    statusSnackbar: statusSnackbar.value,
    closeTargetSnackbar: closeTargetSnackbar.value,
  };
  store.commit("setSnackbar", close);
};
</script>