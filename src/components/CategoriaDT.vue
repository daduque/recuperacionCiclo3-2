<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="categorias"
      sort-by="rol"
      class="elevation-5"
      :loading="cargando"
      loading-text="Cargando... Por favor espere"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="mx-4">
            <h2>Categorias</h2>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar Categoría
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.descripcion"
                          label="Descripción"
                        ></v-text-field>
                      </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)">         
          <template v-if="item.estado">
            mdi-toggle-switch

            </template>
            <template v-else>
              mdi-toggle-switch-off-outline

            </template> 
        </v-icon>
        <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoriasDT",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    cargando : true,
    roles: ["Administrador", "Gestor"],
    headers: [
      { text: "ID", value: "_id", sortable: false },
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "nombre",
      },
      { text: "Descripcion", value: "descripcion" },
      { text: "Estado", value: "estado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    desserts: [],
    categorias: [],
    editedIndex: -1,
    editedItem: {
      _id : '',
      nombre: "",
      descripcion: "",
      estado: 0
    },
    defaultItem: {
      _id : '',
      nombre: "",
      descripcion: "",
      estado: 0
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Categoría" : "Editar Categoría";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.list();
    // this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          _id: "5165asdasdsa56",
          nombre: "principal",
          descripcion: "principal",
          estado: 1,
        },
      ];
    },

    list() {
      axios
        .get("http://localhost:3000/api/categoria/list")
        .then((response) => {
          // handle success
          this.categorias = response.data;
          this.cargando = false;
          // console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          return error;
        });
    },

    editItem(item) {
      this.editedIndex = this.categorias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },


    deleteItem(item) {
      this.editedIndex = this.categorias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // this.categorias.splice(this.editedIndex, 1);
      if (this.editedItem.estado === 1) {
        axios.put('http://localhost:3000/api/categoria/disabled', {
          _id: this.editedItem._id
        })
        .then(response => {
          this.list();
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        axios.put('http://localhost:3000/api/categoria/enabled', {
          _id: this.editedItem._id
        })
        .then(response => {
          this.list();
        })
        .catch(error => {
          console.log(error);
        });
      }
      this.closeDelete();

    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {

        // Object.assign(this.categorias[this.editedIndex], this.editedItem);
          axios.put('http://localhost:3000/api/categoria/update', {
          nombre: this.editedItem.nombre,
          descripcion: this.editedItem.descripcion,
          _id : this.editedItem._id,
        })
        .then(response => {
          this.list();
        })
        .catch(error => {
          console.log(error);
        });

      } else {
        // this.categorias.push(this.editedItem);

        axios.post('http://localhost:3000/api/categoria/add', {
          nombre: this.editedItem.nombre,
          descripcion: this.editedItem.descripcion,
        })
        .then(response => {
          this.list();
        })
        .catch(error => {
          console.log(error);
        });
      }
      this.close();
    },
  },
};
</script>