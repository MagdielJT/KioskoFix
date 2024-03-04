<template>
  <div class="stamp">
    <article class="panel">
      <div class="panel-content">
        <div class="columns" v-if="response === null">
          <div class="column has-text-centered">
            <b-progress type="is-primary"></b-progress>
            <div class="columns">
              <div class="column is-half is-offset-one-quarter">
                <section>
                  <small>Su factura se esta generando</small>
                  <div class="is-inline-flex">
                    <HollowDotsSpinner
                      :animation-duration="1000"
                      :dot-size="8"
                      :dots-num="3"
                      color="#212121"
                    ></HollowDotsSpinner>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div class="content" v-else>
          <div class="columns is-desktop">
            <div class="column is-half is-offset-one-quarter">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content has-text-centered">
                      <b-icon
                        class="m-4 p-4"
                        custom-size="fa-4x"
                        icon="check-circle"
                        pack="far"
                        type="is-success"
                        v-if="success === true"
                      ></b-icon>
                      <b-icon
                        class="m-4 p-4"
                        custom-size="fa-4x"
                        icon="times-circle"
                        pack="far"
                        type="is-danger"
                        v-else
                      ></b-icon>
                    </div>
                  </div>
                  <div class="content has-text-centered">
                    <div v-if="success === true">
                      <p>{{ configSite.messages.successStamp }}</p>
                      <hr />
                      <div class="columns">
                        <div class="column is-6">
                          <b-button
                            type="is-link is-light"
                            icon-right="file-pdf"
                            icon-pack="far"
                            label="Descargar PDF"
                            @click="downloadPDF"
                          ></b-button>
                        </div>
                        <div class="column is-6">
                          <b-button
                            type="is-link is-light"
                            icon-right="file-code"
                            icon-pack="far"
                            label="Descargar XML"
                            @click="downloadXML"
                          ></b-button>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <p>{{ configSite.messages.errorStamp }}</p>
                      <div v-if="msg_alt">
                        <br />
                        <p>
                          <b>{{ msg_alt }}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-desktop">
            <div class="column is-half is-offset-one-quarter">
              <b-button
                type="is-success"
                label="Salir"
                expanded
                @click="goExit"
              ></b-button>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import "epic-spinners/dist/lib/epic-spinners.min.css";
import { HollowDotsSpinner } from "epic-spinners";
import router from "@/router";
import { mapState, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Stamp",
  components: {
    HollowDotsSpinner,
  },
  computed: {
    ...mapState([
      "ticketId",
      "ticketDate",
      "ticketCantidad",
      "ticketRfc",
      "messageStamp",
      "statusRequestStamp",
      "clientData",
      "paramsStamp",
      "configSite",
      "allConfigs",
      "ticketSearch",
      "startTimeLoadingStamp",
    ]),
  },
  data() {
    return {
      success: true,
      response: null,
      msg_alt: "",
    };
  },
  created() {
    // var aux_start = new Date();
    // this.setStartTimeLoadingStamp(aux_start);
  },
  mounted() {
    if (Object.keys(this.clientData).length) {
      if (
        this.clientData.transaccion.consulta === true &&
        this.clientData.transaccion.uuid != ""
      ) {
        this.response = this.clientData.transaccion;
        this.success = true;
        const endTime = new Date();
        const loadingTime = endTime - this.startTimeLoadingStamp;
        console.log("LOADING TIME  STAMP:", loadingTime);
        this.setStatusRequestStamp(true);
        this.setMessageStamp("Factura consultada con éxito");
        this.sendTime(loadingTime, endTime);
      } else {
        this.sendStamp();
      }
    }
  },
  methods: {
    sendTime(time, date) {
      try {
        let objSendTime = {
          custrecord_loading_url: window.location.href,
          custrecord_loading_date: date,
          custrecord_loading_time: time,
          custrecord_loading_step: "Factura",
          custrecord_loading_status: this.statusRequestStamp,
          custrecord_loading_message: this.messageStamp,
          custrecord_loading_ticket_id: this.ticketId,
          custrecord_loading_ticket_date: this.ticketDate,
          custrecord_loading_ticket_cantidad: this.ticketCantidad,
          custrecord_loading_ticket_rfc: this.ticketRfc,
        };
        let strObjSendTime = JSON.stringify(objSendTime);
        let self = this;
        console.log("sendTime -self:", self);
        let str = `
        var httpsMode=null;
        require(['N/https'],function(httpsMode){
          var url=httpsMode.requestSuitelet({
                        scriptId:'customscript_efx_fe_kioskopageload_sl',
                        deploymentId:"customdeploy_efx_fe_kioskopageload_sl",
                        external:true,
                        urlParams:{sendTime:'${strObjSendTime}'}
                    });
                    console.log("RESP time: ", url.body);
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
    goExit() {
      this.setClientData({});
      this.setEmails([]);
      this.setStep(0);
      this.clearFieldsValue();
      this.clearTicketSearch();
      this.clearParamsStamp();
      if (this.allConfigs.length > 1) {
        this.setConfigSite({});
      }
      let aux_NewStart = new Date();
      this.setStartTimeLoading(aux_NewStart);
      router.push({ name: "Pasos", params: { id: 1 } });

      // router.push({ path: "/" });
    },
    sendStamp() {
      let objData = this.paramsStamp;
      console.log("OBJDATA PARAMSTAMP:", objData);
      console.log("OBJDATA CLIENTE:", this.clientData.cliente);
      let key = Object.keys(this.ticketSearch);
      // console.log({
      //   objData: objData,
      //   key: key
      // });
      for (let i in key) {
        if (key[i] != "custparam_getinfo" && key[i] != "custparam_accion") {
          objData[key[i]] = this.ticketSearch[key[i]];
        }
      }
      let self = this;
      let copyClient = JSON.stringify(this.clientData);
      console.debug(self);
      // let str = "var https = null;";
      // str += "var urlModule = null;";
      // str += 'require(["N/url", "N/https"], function(urlModule, https){';
      // str += "var url = urlModule.resolveScript({";
      // str += 'scriptId: "customscript_efx_fe_kiosko_connection_sl",';
      // str += 'deploymentId: "customdeploy_efx_fe_kiosko_connection_sl",';
      // str += "returnExternalUrl: true,";
      // str += "params: " + JSON.stringify(objData);
      // str += "});";
      // str += "https.post.promise({";
      // str += "url: url,";
      // str += "body: `" + copyClient + "`,";
      // str +="headers:{'Content-Type': 'application/json'}}).then(function(response) {console.log('response in sendstamp', response); self.processResultStamp(JSON.parse(response.body));}).catch(function(reason){console.log('error in sendstamp',reason); self.catchError(reason.message);});";
      // str += "});";

      // backup
      let str = "var httpsMode = null;";
      // str += "var urlModule = null;";
      str += 'require(["N/https"], function(httpsMode){';
      // str += "setTimeout( () => {";
      str +=
        "console.log('ENTRA A MANDAR REQUEST 🦕');var url = httpsMode.requestSuitelet.promise({";
      str += 'scriptId: "customscript_efx_fe_kiosko_connection_sl",';
      str += 'deploymentId: "customdeploy_efx_fe_kiosko_connection_sl",';
      str += "method:'POST',external: true,";
      str += "urlParams: " + JSON.stringify(objData);
      str += ",body: `" + copyClient + "`";
      str +=
        "}).then(function (resp){console.log('RESPONSE OF STAMP:'+resp.body);self.processResultStamp(JSON.parse(resp.body));}).catch(function(reason){console.log('error in sendstamp',reason); self.catchError(reason.message);});";
      // str += "}, 360000);";
      // str += "https.post.promise({";
      // str += "url: url,";
      // str += "body: `" + copyClient + "`,";
      // str +=
      //   "headers:{'Content-Type': 'application/json'}}).then(function(response) {console.log('response in sendstamp', response); self.processResultStamp(JSON.parse(response.body));}).catch(function(reason){console.log('error in sendstamp',reason); self.catchError(reason.message);});";
      str += "});";
      eval(str);
    },
    processResultStamp(result) {
      if (result.success === true) {
        this.success = true;
        this.response = result;
        const endTime = new Date();
        const loadingTime = endTime - this.startTimeLoadingStamp;
        console.log("LOADING TIME  STAMP:", loadingTime);
        this.setStatusRequestStamp(true);
        this.setMessageStamp("Factura timbrada con éxito");
        this.sendTime(loadingTime, endTime);
      } else {
        this.success = false;
        this.response = 0;
        this.msg_alt = result.respuestaPac;
        const endTime = new Date();
        const loadingTime = endTime - this.startTimeLoadingStamp;
        console.log("LOADING TIME  STAMP on error:", loadingTime);
        this.setStatusRequestStamp(false);
        this.setMessageStamp(result.respuestaPac);
        this.sendTime(loadingTime, endTime);
      }
    },
    catchError(message) {
      this.success = false;
      this.response = 0;
      const endTime = new Date();
      const loadingTime = endTime - this.startTimeLoadingStamp;
      let aux_msg = JSON.parse(message);
      this.setStatusRequestStamp(false);
      this.setMessageStamp(aux_msg.message);
      this.sendTime(loadingTime, endTime);
    },
    downloadPDF() {
      if (this.response.pdf) {
        console.log(this.response);
        this.downloadItem("pdf", this.response.pdf);
        /*let name = this.response.pdf_name;
        let link = document.createElement("a");
        link.download = name;
        link.href = this.response.pdf;
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);*/
      }
    },
    downloadXML() {
      if (this.response.xml) {
        this.downloadItem("xml", this.response.xml);
      }
    },
    downloadItem(type, id) {
      try {
        console.log("data in download", { type: type, id: id });
        let self = this;
        console.debug(self);
        let str = "var httpsMode = null;";
        str += 'require(["N/https"], function(httpsMode){';
        str += "var url = httpsMode.requestSuitelet({";
        str += 'scriptId: "customscript_efx_kiosko_service_files",';
        str += 'deploymentId: "customdeploy_efx_kiosko_service_files",';
        str += "external: true,";
        str += "urlParams: " + JSON.stringify({ docType: type, docID: id });
        str += "});";
        str += "console.log(url);";
        // str += "redirectModule.redirect({url: body.url});";
        str += "self.openUrl(JSON.parse(url.body));";
        str += "});";

        eval(str);
      } catch (err) {
        console.error(err);
      }
    },
    openUrl: (url) => {
      // window.open(url, "_blank");
      let name = url.name;
        let link = document.createElement("a");
        link.download = name;
        link.href = url.url;
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      
    },
    ...mapMutations([
      "setMessageStamp",
      "setStatusRequestStamp",
      "setClientData",
      "setEmails",
      "setStep",
      "setConfigSite",
      "setStartTimeLoadingStamp",
      "setStartTimeLoading",
    ]),
    ...mapActions([
      "clearTicketSearch",
      "clearParamsStamp",
      "clearFieldsValue",
    ]),
  },
};
</script>

<style scoped>
</style>
