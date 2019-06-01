<template>
  <div class="mt-5">
    <h1 class="text-center">Listado de Tareas</h1>
    <hr>

    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="info"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >Tarea cumplida!</b-alert>

    <b-row>
      <b-col>
        <h3 class="text-center">Tareas sin cumplir</h3>
        <small>Ordenado por fecha. Seleccionar para marcar como cumplidas</small>
        <b-table
          class="table-info"
          small
          borderless
          outlined
          hover
          sort-by="fecha"
          selectable
          selectedVariant="success"
          @row-selected="rowSelected"
          select-mode="multi"
          :items="tareasSinCumplir"
        ></b-table>
        <b-button
          variant="info"
          class="btn-block"
          v-if="selected.length != 0"
          @click="editTasks"
        >Marcar como cumplidas</b-button>
        <br>
      </b-col>
      <b-col>
        <h3 class="text-center">Tareas cumplidas</h3>
        <small>Ordenado por fecha.</small>
        <b-table
          class="table-success"
          small
          borderless
          outlined
          hover
          sort-by="fecha"
          :items="tareasCumplidas"
        ></b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      selected: [],
      selectedIDs: [],
      dismissSecs: 2,
      dismissCountDown: 0,
      tareasSinCumplir: [],
      tareasCumplidas: []
    };
  },
  mounted() {
    this.getTareasSinCumplir();
    this.getTareasCumplidas();
  },
  methods: {
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    formatDate(date) {
      var str = date.toString().split("T");
      return str[0];
    },

    rowSelected(tareasSinCumplir) {
      this.selected = [];
      this.selected = tareasSinCumplir;
      if (this.selected.length != 0) {
        this.selected.forEach(element => {
          if (this.selectedIDs.includes(element.id) == false) {
            this.selectedIDs.push(element.id);
          }
        });
      }
    },

    getTareasSinCumplir() {
      var url = "http://localhost:3000/tasks/completadas/false";
      axios
        .get(url)
        .then(response => {
          var data = response.data;
          this.tareasSinCumplir = [];
          data.forEach(element => {
            element.fecha = this.formatDate(element.fecha);
            this.tareasSinCumplir.push(element);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    getTareasCumplidas() {
      var url = "http://localhost:3000/tasks/completadas/true";
      axios
        .get(url)
        .then(response => {
          var data = response.data;
          this.tareasCumplidas = [];
          data.forEach(element => {
            element.fecha = this.formatDate(element.fecha);
            this.tareasCumplidas.push(element);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    editTasks() {
      if (this.selectedIDs.length != 0) {
        this.selectedIDs.forEach(element => {
          var data = {
            id: element
          };
          var url = `http://localhost:3000/tasks/${data.id}`;
          axios
            .put(url, data)
            .then(response => {})
            .catch(error => {
              console.log(error);
            })
            .then(() => {
              this.getTareasSinCumplir();
              this.getTareasCumplidas();
            });
        });
        this.selectedIDs = [];
        this.showAlert();
      }
    }
  }
};
</script>
