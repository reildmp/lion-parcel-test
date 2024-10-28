<template>
  <div class="d-flex justify-between mt-4">
    <v-select
      v-model="sort"
      label="Sorting"
      :items="listSort"
      variant="outlined"
      @update:modelValue="handleSort"
      max-width="200px"
    />
  </div>
  <v-data-table-virtual
    :headers="headerList"
    :items="listMovie"
    item-value="name"
  >
    <template v-slot:[`item.action`]="{ item }">
      <v-btn size="small" @click="handleEdit(item)"> Edit </v-btn>
    </template>
  </v-data-table-virtual>
  <v-pagination
    :length="totalPage"
    v-model="page"
    @update:modelValue="handlePage"
    class="mt-8"
  />
  <!-- dialog edit -->
  <v-dialog v-model="dialogEdit" max-width="500">
    <v-card title="Edit Movie">
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
            text="Edit"
            variant="tonal"
            type="submit"
            color="green"
            @click="editData"
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const dialogEdit = ref(false);
const detailData = ref();

const headerList = [
  {
    title: "Title",
    align: "left",
    sortable: true,
    value: "title",
  },
  {
    title: "Description",
    align: "left",
    sortable: true,
    value: "desc",
  },
  {
    title: "Artist",
    align: "left",
    sortable: true,
    value: "artist",
  },
  {
    title: "Genre",
    align: "left",
    sortable: true,
    value: "genre",
  },
  {
    title: "Url",
    align: "left",
    sortable: true,
    value: "url",
  },
  {
    title: "Duration",
    align: "left",
    sortable: true,
    value: "duration",
  },
  {
    title: "Vote",
    align: "left",
    sortable: true,
    value: "vote",
  },
  {
    title: "View",
    align: "left",
    sortable: true,
    value: "view",
  },
  {
    title: "Action",
    align: "left",
    sortable: false,
    value: "action",
  },
];

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

const listSort = [
  { title: "Most View", value: "_sort=-view" },
  { title: "Lowest View", value: "_sort=view" },
  { title: "Most Vote", value: "_sort=-vote" },
  { title: "Lowest Vote", value: "_sort=vote" },
];

const sort = computed(() => {
  return store.getters.getSortMovie;
});

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

const clearForm = () => {
  form.value.title = "";
  form.value.desc = "";
  form.value.artist = "";
  form.value.genre = "";
  form.value.url = "";
  dialogEdit.value = false;
};

const handleEdit = (data) => {
  detailData.value = data;
  form.value.title = data.title;
  form.value.desc = data.desc;
  form.value.artist = data.artist;
  form.value.genre = data.genre;
  form.value.url = data.url;
  dialogEdit.value = true;
};

const editData = () => {
  const data = {
    ...detailData.value,
    title: form.value.title,
    desc: form.value.desc,
    artist: form.value.artist,
    genre: form.value.genre,
    url: form.value.url,
  };
  store.dispatch("callEditMovie", data).then(() => {
    clearForm();
  });
};

onMounted(async () => {
  store.commit("setPerPageMovie", 10);
  store.dispatch("callListMovie");
});
</script>