<template>
  <v-card
    class="mx-auto overflow-hidden"
    height="100vh"
  >
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Gestor de Administración Portafolio</v-toolbar-title>

      <v-spacer></v-spacer>

    <v-btn
        text
        @click="salir"
      >
        <span class="mr-2">Salir</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item exact :to="{name:'Home'}">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item exact :to="{name : 'Admin'}">
            <v-list-item-icon>
              <v-icon>mdi-key</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name : 'Usuarios' }"
          v-if="isAdmin">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name : 'Categorias' }">
            <v-list-item-icon>
              <v-icon>mdi-chart-donut</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Categorias</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name : 'Articulos' }">
            <v-list-item-icon>
              <v-icon>mdi-animation-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Articulos</v-list-item-title>
          </v-list-item>


        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>

      <section class="mt-6"
        v-show="['Admin'].includes($route.name)"
      >
        <welcom-admin />
      </section>

      <router-view/>
    </v-main>
  </v-card>
</template>

<script>
import decode from "jwt-decode";
import WelcomAdmin from '../components/WelcomAdmin.vue';

export default {
  components: { WelcomAdmin },
    name : 'Admin',
    data(){
    return{
        drawer: false,
        group: null,
        }
    },
    computed:{
        isAdmin(){
            let token = decode(localStorage.getItem('token'));
            return token.rol === 'Administrador'? true : false
        }
    },
    methods : {
        salir(){
            localStorage.removeItem('token');
            this.$router.push({
                name : 'Login'
            })
        }
    }

}
</script>