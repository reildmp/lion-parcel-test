
<template>
  <v-card class="w-full">
    <YouTube
      :src="props.detail.url"
      @state-change="handlePlay"
      @ready="onPlayerReady"
      ref="youtube"
      width="100%"
    />
    <div class="d-flex px-3 mt-2 justify-space-between">
      <div class="d-flex items-center">
        <v-icon icon="mdi-eye-outline" class="mr-1" /> {{ props.detail.view }}
      </div>
      <v-btn
        prepend-icon="mdi-vote"
        variant="tonal"
        :color="wasVoted ? 'red' : 'green'"
        v-if="account.length !== 0 && account.type === 1"
        @click="handleVote(wasVoted ? 'vote' : 'unvote')"
      >
        {{ props.detail.vote }} {{ wasVoted ? "Unvote" : "Vote" }}
      </v-btn>
      <div class="d-flex items-center" v-else>
        {{ props.detail.vote }} <v-icon icon="mdi-vote" class="ml-1" />
      </div>
    </div>
    <v-card-title> {{ props.detail.title }} </v-card-title>
    <v-card-subtitle> {{ props.detail.desc }} </v-card-subtitle>
  </v-card>
</template>
<!-- eslint-disable no-undef -->
<script setup>
import { computed, ref } from "vue";
const props = defineProps(["detail", "account"]);
const emits = defineEmits(["incrementView", "handleVote"]);
const youtube = ref();
const isEnd = ref(false);

const wasVoted = computed(() => {
  if (props.account.length !== 0) {
    const found = props.account.voted.find((id) => id == props.detail.id);
    if (found !== undefined) {
      return false;
    }
    return true;
  }
  return false;
});

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

const handleVote = (data) => {
  const payload = {
    ...props.detail,
    vote: data === "vote" ? props.detail.vote + 1 : props.detail.vote - 1,
  };
  return emits("handleVote", payload);
};
</script>