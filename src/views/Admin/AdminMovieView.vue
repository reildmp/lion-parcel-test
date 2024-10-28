<template>
  <OrganismTopbar />
  <div class="container mx-auto my-8">
    <div class="d-flex justify-between">
      <p class="text-2xl">Data Movie</p>
      <v-btn @click="dialogAdd = true" prepend-icon="mdi-plus">
        Add Data
      </v-btn>
    </div>
    <OrganismListMovieAdmin /> 
    <!-- dialog add -->
    <v-dialog v-model="dialogAdd" max-width="500">
      <v-card title="Add Movie">
        <v-form @submit.prevent>
          <v-card-text>
            <v-text-field
              v-model="form.title"
              :rules="[(v) => !!v || 'Required']"
              label="Title"
              variant="underlined"
            />
            <v-select
              v-model="form.genre"
              :rules="[(v) => !!v || 'Required']"
              label="Genre"
              :items="listGenre"
              variant="underlined"
            />
            <v-text-field
              v-model="form.artist"
              :rules="[(v) => !!v || 'Required']"
              label="Artist"
              variant="underlined"
            />
            <v-text-field
              v-model="form.url"
              :rules="[(v) => !!v || 'Required']"
              label="Url"
              variant="underlined"
            />
            <v-textarea
              v-model="form.desc"
              :rules="[(v) => !!v || 'Required']"
              label="Description"
              variant="underlined"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Add Data"
              variant="tonal"
              type="submit"
              color="green"
              @click="addData"
            />
            <v-btn
              text="Close"
              variant="tonal"
              type="button"
              color="red"
              @click="clearForm"
            />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import OrganismTopbar from "@/components/organisms/OrganismTopBar.vue";
import OrganismListMovieAdmin from "@/components/organisms/OrganismListMovieAdmin.vue";

const store = useStore();
const dialogAdd = ref(false);

const form = ref({
  title: "",
  desc: "",
  artist: "",
  genre: "",
  url: "",
});

const listGenre = [
  { title: "Drama", value: "Drama" },
  { title: "Comedy", value: "Comedy" },
  { title: "Action", value: "Action" },
];

const clearForm = () => {
  form.value.title = "";
  form.value.desc = "";
  form.value.artist = "";
  form.value.genre = "";
  form.value.url = "";
  dialogAdd.value = false;
};

const addData = () => {
  store.dispatch("callAddMovie", form.value).then(() => {
    clearForm();
  });
};

onMounted(async () => {
  store.commit("setPerPageMovie", 10);
  store.dispatch("callListMovie");
});
</script>