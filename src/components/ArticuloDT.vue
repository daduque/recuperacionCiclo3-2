<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="articulos"
      sort-by="codigo"
      class="elevation-5"
      :loading="cargando"
      loading-text="Cargando... Por favor espere"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="mx-4">
            <h2>Artículos</h2>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar Artículo
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
                        v-model="editedItem.codigo"
                        label="Código"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>


                    <v-col cols="12" sm="6" md="4">
                      <v-select
                      item-text = "nombre"
                      item-value="_id"
                        v-model="editedItem.categoria"
                        :items="categorias"
                        :rules="[(v) => !!v || 'Category is required']"
                        label="Categorías"
                        required
                      ></v-select>
                    </v-col>

                    <v-col 
                      cols="12">
                        <v-textarea
                        no-resize
                        auto-grow
                        counter="255"
                          v-model="editedItem.descripcion"
                          label="Descripción"
                        ></v-textarea>
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
        <v-icon small class="mr-2" @click="deleteItem(item)"> mdi-delete </v-icon>
        <v-icon small @click="changeItemState(item)">         
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
  name: "ArticulosDT",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    cargando : true,
    categoria : '',
    categorias: [],
    headers: [
      { text: "Código", value: "codigo", sortable: false },
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "nombre",
      },
      { text: "Categoría", value: "categoria.nombre" },
      { text: "Descripción", value: "descripcion" },
      { text: "Estado", value: "estado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    desserts: [],
    articulos: [],
    editedIndex: -1,
    editedItem: {
      _id : '',
      nombre: "",
      codigo: "",
      categoria: {
          value : 0,
          text : ''
      },
      descripcion: "",
      estado: 0
    },
    defaultItem: {
      _id : '',
      nombre: "",
      codigo: "",
      categoria: {
          value : 0,
          text: ''
      },
      descripcion: "",
      estado: 1
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Artículo" : "Editar Artículo";
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
    this.categoriasListar();
    // this.initialize();
  },

  methods: {
    initialize() {
      this.articulos = [
            {
                _id: "616584d38d46107bf95bcb55",
                categoria: {
                    _id: "61643f76f71dfcde07178859",
                    nombre: "primera",
                    descripcion: "un texto de la categoría principal"
                },
                codigo: "0001",
                nombre: "leche entera",
                descripcion: "leche por litro",
                estado: 1,
                createdAt: "2021-10-12T12:51:31.109Z",
            }
        ]
    },

    list() {
      axios
        .get("http://localhost:3000/api/articulo/list")
        .then((response) => {
          // handle success
          this.articulos = response.data;
          this.cargando = false;
          // console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          return error;
        });
    },

    categoriasListar(){
        axios
            .get("http://localhost:3000/api/categoria/listactive")
            .then((response) => {
            // handle success
                this.categorias = response.data;
                // auxCat.map(item => {
                //     this.categorias.push({
                //         text : item.nombre,
                //         value : item._id
                //     })
                // })
            // console.log(response);
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            return error;
            });
    },

    editItem(item) {
        console.log(item.categoria);
      this.editedIndex = this.articulos.indexOf(item);
      this.categoria = Object.assign({}, item.categoria);;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },


    deleteItem(item) {
      this.editedIndex = this.articulos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    changeItemState(item){
        this.editedIndex = this.articulos.indexOf(item);
      this.editedItem = Object.assign({}, item);
        if (this.editedItem.estado === 1) {
        axios.put('http://localhost:3000/api/articulo/disabled', {
          _id: this.editedItem._id
        })
        .then(response => {
          this.list();
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        axios.put('http://localhost:3000/api/articulo/enabled', {
          _id: this.editedItem._id
        })
        .then(response => {
          this.list();
        })
        .catch(error => {
          console.log(error);
        });
      }

    },

    deleteItemConfirm() {
      // this.articulos.splice(this.editedIndex, 1);
      
        axios.delete('http://localhost:3000/api/articulo/remove', {
            data: {
                _id: this.editedItem._id
            }
        })
        .then(response => {
          this.list();
        })
        .catch(error => {
          console.log(error);
        });
     
      this.closeDelete();

    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.categoria = '';
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

        // Object.assign(this.articulos[this.editedIndex], this.editedItem);
          axios.put('http://localhost:3000/api/articulo/update', {
              _id : this.editedItem._id,
          nombre: this.editedItem.nombre,
          codigo: this.editedItem.codigo,
          categoria : this.editedItem.categoria,
          descripcion : this.editedItem.descripcion,
        })
        .then(response => {
          this.list();
        })
        .catch(error => {
          console.log(error);
        });

      } else {
        // this.articulos.push(this.editedItem);

        axios.post('http://localhost:3000/api/articulo/add', {
          nombre: this.editedItem.nombre,
          codigo: this.editedItem.codigo,
          categoria : this.editedItem.categoria,
          descripcion : this.editedItem.descripcion,
        })
        .then(response => {
          this.list();
          // this.articulos.push(response.data);
          // console.log(response);
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