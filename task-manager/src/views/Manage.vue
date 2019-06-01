<template>
  <div class="mt-5">
    <h1 class="text-center">Administrar Tareas</h1>
    <hr>
    <b-button
      v-b-toggle.collapse-1
      variant="light"
      class="btn-outline-success btn-block"
    >Nueva tarea</b-button>

    <b-collapse id="collapse-1" class="mt-2">
      <b-card header="Llenar TODOS los campos">
        <b-row>
          <b-col md="12">
            <p>Descripción:</p>
            <b-form-input type="text" v-model="descripcion" required></b-form-input>
            <br>
          </b-col>
          <b-col md="6">
            <p>Fecha:</p>
            <b-form-input type="date" v-model="fecha" :state="comprobarFecha"></b-form-input>
            <small>La fecha debe ser mayor al dia de hoy</small>
            <br>
          </b-col>
          <b-col md="6">
            <p>Prioridad:</p>
            <b-form-select v-model="prioridad" :options="prioridades"></b-form-select>
          </b-col>
        </b-row>
        <br>
        <b-button variant="success" class="btn-block" v-if="comprobarCampos" @click="addTask">Crear</b-button>
      </b-card>
    </b-collapse>
    <hr>

    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >Tarea eliminada!</b-alert>
    <b-alert
      :show="dismissCountDown2"
      dismissible
      variant="success"
      @dismissed="dismissCountDown2=0"
      @dismiss-count-down="countDownChanged2"
    >Tarea creada!</b-alert>
    <br>

    <small>Ordenado por fecha. Haga click en una tarea para eliminarla</small>
    <b-table
      small
      borderless
      outlined
      hover
      sort-by="fecha"
      selectable
      selectedVariant="success"
      @row-selected="rowSelected"
      select-mode="single"
      :items="tareas"
    ></b-table>
    <b-modal hide-footer id="modal-1" title="Task-Manager">
      <p class="my-4">Deseas eliminar la tarea?</p>
      <p class="my-4">Tarea: {{ selectedDesc }}</p>
      <b-button
        variant="light"
        class="btn-outline-danger btn-block"
        @click="deleteTask"
      >Eliminar tarea</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "manage",
  data() {
    return {
      descripcion: "",
      fecha: "",
      prioridad: "",
      tareas: [],
      selected: [],
      selectedID: "",
      selectedDesc: "",
      dismissSecs: 1,
      dismissCountDown: 0,
      dismissCountDown2: 0,
      prioridades: [
        { value: "Baja", text: "Baja" },
        { value: "Media", text: "Media" },
        { value: "Alta", text: "Alta" }
      ]
    };
  },
  mounted() {
    this.getAll();
  },
  computed: {
    comprobarFecha() {
      var dtToday = new Date();
      var month = dtToday.getMonth() + 1; // getMonth() is zero-based
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if (month < 10) month = "0" + month.toString();
      if (day < 10) day = "0" + day.toString();

      let fechaActual = year + "-" + month + "-" + day;
      return this.fecha > fechaActual ? true : false;
    },

    comprobarCampos() {
      if (this.descripcion == "" || this.fecha == "" || this.prioridad == "") {
        return false;
      } else if (this.comprobarFecha == false) {
        return false;
      }
      return true;
    }
  },
  methods: {
    limpiarCampos() {
      this.descripcion = "";
      this.fecha = "";
      this.prioridad = "";
      this.$root.$emit("bv::toggle::collapse", "collapse-1");
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    countDownChanged2(dismissCountDown2) {
      this.dismissCountDown2 = dismissCountDown2;
    },

    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },

    showAlert2() {
      this.dismissCountDown2 = this.dismissSecs;
    },

    formatDate(date) {
      var str = date.toString().split("T");
      return str[0];
    },

    getAll() {
      this.tareas = [];
      var url = "http://localhost:3000/tasks/";
      axios
        .get(url)
        .then(response => {
          var data = response.data;
          data.forEach(element => {
            element.fecha = this.formatDate(element.fecha);
            this.tareas.push(element);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    addTask() {
      var url = "http://localhost:3000/tasks/";
      var data = {
        id:
          "t" +
          Math.round(Math.random() * 100) +
          "k" +
          Math.round(Math.random() * 100),
        descripcion: this.descripcion,
        fecha: this.fecha,
        prioridad: this.prioridad
      };
      axios
        .post(url, data)
        .then(response => {})
        .catch(error => {
          console.log(error);
        })
        .then(() => {
          this.getAll();
          this.limpiarCampos();
        });
      this.showAlert2();
    },

    rowSelected(tareas) {
      this.selected = tareas;
      if (this.selected.length != 0) {
        this.selectedID = this.selected[0].id;
        this.selectedDesc = this.selected[0].descripcion;
        this.$bvModal.show("modal-1");
      }
    },

    deleteTask() {
      var data = {
        id: this.selectedID
      };
      var url = `http://localhost:3000/tasks/${data.id}`;
      axios
        .delete(url, data)
        .then(response => {})
        .catch(error => {
          console.log(error);
        })
        .then(() => {
          this.getAll();
        });
      this.selectedID = "";
      this.selectedDesc = "";
      this.$bvModal.hide("modal-1");
      this.showAlert();
    }
  }
};
</script>
