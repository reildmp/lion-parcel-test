<template>
  <div class="h-screen w-screen">
    <div
      class="h-full flex items-center justify-center m-auto px-5 sm:px-0 sm:w-[640px]"
    >
      <div class="w-full bg-white rounded-xl py-5 px-5 sm:py-[70px] sm:px-16">
        <div class="w-full mt-8 sm:mt-12 flex flex-col justify-center">
          <v-card class="p-4">
            <h3 class="text-center text-3xl font-bold">Register</h3>
            <v-form @submit.prevent class="mt-4">
              <v-text-field
                v-model="form.name"
                class="mt-4"
                :rules="[(v) => !!v || 'Required']"
                label="Name"
                variant="underlined"
              />
              <v-text-field
                v-model="form.username"
                class="mt-4"
                :rules="[(v) => !!v || 'Required']"
                label="Username"
                variant="underlined"
              />
              <v-text-field
                v-model="form.password"
                class="mt-4"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[(v) => !!v || 'Required']"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                variant="underlined"
                @click:append="showPassword = !showPassword"
              />
              <v-btn
                type="submit"
                block
                class="mt-4"
                variant="tonal"
                @click="register"
              >
                Register
              </v-btn>
              <v-btn
                type="button"
                block
                class="mt-4"
                variant="outlined"
                to="/login"
              >
                Login
              </v-btn>
            </v-form>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const form = ref({
  name: "",
  username: "",
  password: "",
  type: 1,
  voted: [],
});

const showPassword = ref(false);

const register = () => {
  store.dispatch("callRegister", form.value);
};

onMounted(() => {
  store.commit("setLoading", false);
});
</script>