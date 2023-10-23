<template>
  <div class="resume">
    <form action="" @submit="sendStamp">
      <article class="panel">
        <div class="panel-content">
          <div class="container">
            <div class="columns is-desktop">
              <div class="column is-three-fifths is-offset-one-fifth">
                <section>
                  <b-field horizontal label="Ticket">
                    <b-input
                      name="ticket"
                      disabled
                      type="text"
                      :value="clientData.transaccion.transName"
                      class="has-text-"
                    ></b-input>
                  </b-field>
                  <b-field horizontal label="Cliente">
                    <b-input
                      name="cliente"
                      disabled
                      type="text"
                      v-if="clientData.cliente.tipo"
                      :value="
                        clientData.cliente.nombre +
                        ' ' +
                        clientData.cliente.apellido
                      "
                      class="has-text-"
                    ></b-input>
                    <b-input
                      name="cliente"
                      disabled
                      type="text"
                      v-else
                      :value="clientData.cliente.compania"
                      class="has-text-"
                    ></b-input>
                  </b-field>
                  <b-field horizontal label="R.F.C.">
                    <b-input
                      name="rfc"
                      disabled
                      type="text"
                      :value="clientData.cliente.rfc"
                      class="has-text-"
                    ></b-input>
                  </b-field>
                  <b-field horizontal label="Total">
                    <b-input
                      name="total"
                      disabled
                      type="text"
                      :value="clientData.transaccion.amount"
                      class="has-text-"
                    ></b-input>
                  </b-field>
                  <b-field horizontal label="Contactos de envío">
                    <b-select
                      multiple
                      expanded
                      native-size="3"
                      disabled
                      class="has-text-"
                    >
                      <option
                        v-for="mail in emailSelecteds"
                        :key="mail.correo"
                        :value="mail.correo"
                        selected
                      >
                        {{ mail.nombre }} - {{ mail.correo }}
                      </option>
                    </b-select>
                  </b-field>
                </section>
              </div>
            </div>
          </div>
        </div>
      </article>
      <div class="columns is-desktop">
        <div class="column is-6">
          <b-button
            type="is-danger"
            expanded
            icon-left="arrow-left"
            icon-pack="fas"
            label="Regresar"
            @click="returnStep"
            outlined
          ></b-button>
        </div>
        <div class="column is-6">
          <b-button
            type="is-primary"
            expanded
            icon-right="arrow-right"
            icon-pack="fas"
            label="Continuar"
            native-type="submit"
          ></b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Resume",
  computed: {
    ...mapState([
      "ticketId",
      "ticketDate",
      "ticketCantidad",
      "ticketRfc",
      "messageResume",
      "statusRequestResume",
      "clientData",
      "ticketSearch",
      "emailSelecteds",
      "step",
      "startTimeLoadingResume",
    ]),
  },
  created() {},
  mounted() {
    const endTime = new Date();
    const loadingTime = endTime - this.startTimeLoadingResume;
    console.log("LOADING TIME RESUMEN: ", loadingTime);
    this.sendTime(loadingTime, endTime);
  },
  data() {
    return {
      emails: [],
    };
  },
  methods: {
    sendTime(time, date) {
      try {
        let objSendTime = {
          custrecord_loading_url: window.location.href,
          custrecord_loading_date: date,
          custrecord_loading_time: time,
          custrecord_loading_step: "Resumen",
          custrecord_loading_status: this.statusRequestResume,
          custrecord_loading_message: this.messageResume,
          custrecord_loading_ticket_id:this.ticketId,
          custrecord_loading_ticket_date:this.ticketDate,
          custrecord_loading_ticket_cantidad:this.ticketCantidad,
          custrecord_loading_ticket_rfc:this.ticketRfc
        };
        let strObjSendTime = JSON.stringify(objSendTime);
        let self = this;
        console.log("sendTime -self:", self);
        let str = `
                var urlMode=null;
                require(["N/url"],function(urlMode){
                    var url=urlMode.resolveScript({
                        scriptId:'customscript_efx_fe_kioskopageload_sl',
                        deploymentId:"customdeploy_efx_fe_kioskopageload_sl",
                        returnExternalUrl:true,
                        params:{sendTime:'${strObjSendTime}'}
                    });
                    self.getSendTimeResponse(url)
                });
            `;
        eval(str);
      } catch (err) {
        console.log("An error occurred on SendTime() in Ticket");
      }
    },
    getSendTimeResponse(e) {
      const t = {
        method: "GET",
        url: e,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,OPTIONS",
          "Access-Control-Allow-Headers": "authorization",
        },
      };
      axios
        .request(t)
        .then((b) => {
          console.log("RESP time: ", b.data);
        })
        .catch((err) => {
          console.log("Hubo errores: ", err);
        });
    },
    sendStamp(evt) {
      evt.preventDefault();
      this.setEmailSelected();
      this.setStep(this.step + 1);
      let start = new Date();
      this.setStartTimeLoadingStamp(start);
    },
    returnStep() {
      this.setStep(this.step - 1);
    },
    ...mapMutations([
      "setStatusRequestResume",
      "setStep",
      "setStartTimeLoadingResume",
      "setStartTimeLoadingStamp",
    ]),
    ...mapActions(["setEmailSelected"]),
  },
};
</script>

<style scoped>
.panel-content {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #363636;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  padding: 0.75em 0.75em;
  width: 100%;
}
</style>