
<template>
  <v-card class="w-full">
    <YouTube
      :src="props.detail.url"
      @state-change="handlePlay"
      @ready="onPlayerReady"
      ref="youtube"
      width="100%"
    />
    <div class="d-flex px-3 mt-1 justify-space-between">
      <div class="d-flex items-center">
        <v-icon icon="mdi-eye-outline" class="mr-1" /> {{ props.detail.view }}
      </div>
      <div class="d-flex items-center">
        {{ props.detail.vote }} <v-icon icon="mdi-vote" class="ml-1" />
      </div>
    </div>
    <v-card-title> {{ props.detail.title }} </v-card-title>
    <v-card-subtitle> {{ props.detail.desc }} </v-card-subtitle>
  </v-card>
</template>
<!-- eslint-disable no-undef -->
<script setup>
import { ref } from "vue";
const props = defineProps(["detail"]);
const emits = defineEmits(["incrementView"]);
const youtube = ref();
const isEnd = ref(false);

const handlePlay = () => {
  if (youtube.value.getPlayerState() === -1) {
    return emits("incrementView", props.detail);
  }
  if (youtube.value.getPlayerState() === 0) {
    return (isEnd.value = true);
  }
  if (isEnd.value && youtube.value.getPlayerState() === 1) {
    emits("incrementView", props.detail);
    return (isEnd.value = false);
  }
};
</script>