<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify Recuperación
        </h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a href="https://community.vuetifyjs.com" target="_blank"
            >Discord Community</a
          >
        </p>
      </v-col>
    </v-row>

    <v-row class="mt-5">
      <v-col v-for="item in articulos" :key="item._id" col="4">
        <main-info :item = 'item' />
      </v-col>
    </v-row>

    <!-- <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          What's next?
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Important Links
        </h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Ecosystem
        </h2>

        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-row>
      </v-col> -->
  </v-container>
</template>

<script>
import axios from "axios";
import MainInfo from './MainInfo.vue';

export default {
  components: { MainInfo },
  name: "HelloWorld",

  data: () => ({
    articulos: [],
    show: false,
  }),

  created() {
    this.list();
    // this.categoriasListar();
    // this.initialize();
  },

  methods: {
    list() {
      axios
        .get("http://localhost:3000/api/articulo/list")
        .then((response) => {
          // handle success
          this.articulos = response.data;
          // console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          return error;
        });
    },
  },
};
</script>


<style scoped>
.articulo__img {
  border-radius: 50%;
}
</style>