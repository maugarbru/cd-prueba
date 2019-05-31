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
        <b-button v-b-toggle.collapse-1 
        variant="success" class="btn-block" v-if="comprobarCampos" @click="limpiarCampos">Crear</b-button>
      </b-card>
    </b-collapse>
    <hr>
  </div>
</template>

<script>
export default {
  name: "manage",
  data() {
    return {
      nuevaD: "",
      nuevaF: "",
      nuevaP: "",
      descripcion: "",
      fecha: "",
      prioridad: "",
      prioridades: [
        { value: "Baja", text: "Baja" },
        { value: "Media", text: "Media" },
        { value: "Alta", text: "Alta" }
      ]
    };
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
      this.descripcion = ""
      this.fecha = ""
      this.prioridad = ""
      this.$root.$emit('bv::toggle::collapse', 'collapse-1')
    }
  },
};
</script>
