<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <v-text-field
      v-model="correo"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Contraseña"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>


    <v-btn
    block
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="ingresar"
    >
      Ingresar
    </v-btn>

    <v-btn
    block
    plain
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>

  </v-form>
</template>

<script>

import axios from 'axios'

  export default {
      name : 'TheLogin',
    data: () => ({
        mensaje : null,
      valid: true,
      password: '',
      correo: '',
      show1: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),

    methods: {
      ingresar() {
          axios.post('http://localhost:3000/api/usuario/login', {
              correo : this.correo,
              password : this.password
          })
          .then(respuesta =>{
              console.log(respuesta.data)
              return respuesta.data
          })
          .then(data => {
              localStorage.setItem('token', data.tokenReturn)
              this.$router.push({name : 'Admin'})
          })
          .catch(err =>{
              this.mensaje = null;
              console.log(err.response);
              if([404, 401].includes(err.response.status)){
                  this.mensaje = 'El correo o la contraseña son incorrectos'
              }else{
                  this.mensaje = 'Ocurrió un error interno, intente de nuevo en unos minutos'
              }
          });
      },
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>