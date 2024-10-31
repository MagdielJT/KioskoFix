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
                  <small style="font-size: 0.6rem">{{ process_msg }}</small>
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
      process_msg: "Procesando petición, por favor espere...",
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
        // this.sendTime(loadingTime, endTime);
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
      let auxRazonSocial = this.clientData.cliente.razonSocial.replace(
        /"/g,
        "*"
      );
      this.$store.commit("setClientData_razonSocial", auxRazonSocial);
      if (this.clientData.cliente.compania) {
        let auxCompania = this.clientData.cliente.compania.replace(/"/g, "*");
        this.$store.commit("setClientData_compania", auxCompania);
        console.log("compañia", auxCompania);
      }

      console.log("RAZON SOCIAL", auxRazonSocial);
      let copyClient = JSON.stringify(this.clientData);
      console.debug(self);
      console.log({ copyClient });
      this.process_msg = "Se está procesando su factura, por favor espere...";
      let copyCliente = JSON.parse(copyClient);
      let params2send = {
        actualizandoKiosko: true,
        recordType: copyCliente.transaccion.transType.toLowerCase(),
        idTransaccion: copyCliente.transaccion.transId,
      };
      // combine the objData and copyClient
      // let combinedData = { ...objData, ...copyClient };
      // add copyClient to objData
      Object.assign(objData, copyCliente);
      console.log({ objData });
      // console.log( combinedData );
      //       let str = `let urlModule = null;
      //       require(["N/https"], function(httpsModule){

      //     let response = httpsModule.post.promise({
      //       url: self.$store.state.kioskoConnectionUrl,
      //       body: ${JSON.stringify(objData)},
      //       headers: {
      //         'Content-Type': 'application/json'
      //       }
      //     })
      //   .then(response => {
      //     console.log('Response first stuff:', response.body);
      //     self.sendStampSecondStep(JSON.parse(response.body));
      //   })
      //   .catch(error => {
      //     console.log('Error:', error);
      //     self.checkIfKioskoInfoUpdated('${JSON.stringify(params2send)}');
      //   });
      // });
      // `;
      let str = "";
      str += "let urlModule = null;";
      str += 'require(["N/https"], function(httpsModule){';
      str += "let response = httpsModule.post.promise({";
      str += "  url: self.$store.state.kioskoConnectionUrl,";
      str += "  body: `" + JSON.stringify(objData) + "`,";
      str += "  headers: {";
      str += "    'Content-Type': 'application/json'";
      str += "  }";
      str += "})";
      str += ".then(response => {";
      str += "  console.log('Response first stuff:', response.body);";
      str += "  self.sendStampSecondStep(JSON.parse(response.body));";
      str += "})";
      str += ".catch(error => {";
      str += "  console.log('Error:', error);";
      str +=
        "  self.checkIfKioskoInfoUpdated('" +
        JSON.stringify(params2send) +
        "');";
      str += "});";
      str += "});";
      eval(str);
    },
    checkIfKioskoInfoUpdated(objData) {
      // Caso de que no es necesario crear una FV, y solo necesita actualizar datos de kiosko en transaccion
      console.log("OBJDATA 🦀:", objData);
      objData = JSON.parse(objData);
      if (objData.finishedKUpdate) {
        console.log(
          "finished updating kiosko info in transaction:",
          objData.finishedKUpdate
        );
        // second step pero entrando a caso de timbrado
        this.sendStampSecondStep(objData);
      } else {
        setTimeout(() => {
          let self = this;
          console.debug(self);
          // let str = "var httpsMode = null;";
          // str += 'require(["N/https"], function(httpsMode){';
          // str +=
          //   "console.log('ENTRA A CHECAR INFO KIOSKO ACTUALIZADA 🐣');var url = httpsMode.requestSuitelet.promise({";
          // str += 'scriptId: "customscript_efx_fe_kiosko_connection_sl",';
          // str += 'deploymentId: "customdeploy_efx_fe_kiosko_connection_sl",';
          // str += "method:'POST',external: true,";
          // str += "urlParams: " + JSON.stringify(objData);
          // str += ",body: ''";
          // str +=
          //   "}).then(function (resp){console.log('RESPONSE OF checkIfKioskoInfoUpdated:'+resp.body);setTimeout(self.checkIfKioskoInfoUpdated(resp.body),70000);}).catch(function(reason){console.log('error in checkIfKioskoInfoUpdated',reason); setTimeout(self.checkIfKioskoInfoUpdated(objData),50000)});";

          // str += "});";
          let str = `
          require(["N/https"],function(httpsMode){
          console.log('ENTRA A CHECAR INFO KIOSKO ACTUALIZADA 🐣');
          httpsMode.post.promise({
            url: self.$store.state.kioskoConnectionUrl,
            body: ${JSON.stringify(objData)},
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function(response){
          setTimeout(self.checkIfKioskoInfoUpdated(response.body),70000);
          }).catch(function(reason){
            console.log('error in checkIfKioskoInfoUpdated',reason);
            setTimeout(self.checkIfKioskoInfoUpdated(objData),50000);
          });
          });
          `;
          eval(str);
        }, 10000);
      }
    },
    sendStampSecondStep(bodyResponse) {
      let objData = bodyResponse;
      console.log("OBJDATA PARAMSTAMP sendStampSecondStep:", objData);
      if (objData.creaFactura == true || objData.creaFactura === "true") {
        this.process_msg = "Se está creando su factura, por favor espere...";
        let self = this;
        let data2send = objData;
        let backupData2Send = {
          checkIfFinished: "true",
          tipoTransaccion: data2send.tipoTransaccion,
          idTransaccion: data2send.bodyTransaccion,
        };
        let params2send = { creaFactura: "true" };
        // concat params2send to data2send
        let combinedData = { ...data2send, ...params2send };

        console.debug(self);
        // let str = "let httpsModule = null;";
        // str += 'require(["N/https"], function(httpsModule){';
        // str += "console.log('Trying to send request to create invoice 🔦');";
        // str += " console.log('typeof data2send:',typeof data2send);";
        // str += " console.log(' data2send:', data2send);";
        // str += "var createInv= httpsModule.requestSuitelet.promise({";
        // str += " scriptId: 'customscript_efx_fe_kiosko_connection_sl',";
        // str += " deploymentId: 'customdeploy_efx_fe_kiosko_connection_sl',";
        // str += "method: 'POST',";
        // str += " external: true,";
        // str += "headers: {";
        // str += "'Content-Type': 'application/json'},";
        // str += "urlParams: " + JSON.stringify(params2send) + ",";
        // str += "body: `" + JSON.stringify(data2send) + "`,";
        // str += "}).then(function (resp){";
        // str +=
        //   "console.log('Response of second step to create invoice:',resp.body);";
        // str += "self.sendStampSecondStepPDF(JSON.parse(resp.body));";
        // str += "}).catch(function(reason){";
        // str += "console.log('error in sendStampSecondStep',reason);";
        // str +=
        //   "self.resendCreatedRelatedInvoiceStatus(3,5000,`" +
        //   JSON.stringify(backupData2Send) +
        //   "`);";
        // str += "});";
        // str += "});";
        // let str=`
        // require(["N/https"],function(httpsMode){
        // httpsMode.post.promise({
        // url: self.$store.state.kioskoConnectionUrl,
        // body: ${JSON.stringify(combinedData)},
        // headers: {
        //   'Content-Type': 'application/json'
        // }

        // })
        // .then(function(response){
        //   console.log('Response of second step to create invoice:',response.body);
        //   self.sendStampSecondStepPDF(JSON.parse(response.body));
        // }).catch(function(reason){
        //   console.log('error in sendStampSecondStep',reason);
        //   self.resendCreatedRelatedInvoiceStatus(3,5000,${JSON.stringify(backupData2Send)});
        // });
        // });
        // `;
        let str = "";
        str += 'require(["N/https"],function(httpsMode){';
        str += "httpsMode.post.promise({";
        str += "url: self.$store.state.kioskoConnectionUrl,";
        str += "body: `" + JSON.stringify(combinedData) + "`,";
        str += "headers: {";
        str += "'Content-Type': 'application/json'";
        str += "}";
        str += "})";
        str += ".then(function(response){";
        str +=
          "console.log('Response of second step to create invoice:',response.body);";
        str += "self.sendStampSecondStep(JSON.parse(response.body));";
        str += "}).catch(function(reason){";
        str += "console.log('error in sendStampSecondStep',reason);";
        str +=
          "self.resendCreatedRelatedInvoiceStatus(3,5000," +
          JSON.stringify(backupData2Send) +
          ");";
        str += "});";
        str += "});";
        eval(str);
      } else {
        // timbrado
        this.process_msg = "Se está timbrando su factura, por favor espere...";
        let self2 = this;
        let data2send_ = {
          processingSaving: true,
          recordType: objData.recordType,
          idTransaccion: objData.idTransaccion,
        };
        console.debug(self2);
        // let str = "var httpsMode = null;";
        // str += 'require(["N/https"], function(httpsMode){';
        // str +=
        //   "console.log('ENTRA A MANDAR REQUEST 🌟');var url = httpsMode.requestSuitelet.promise({";
        // str += 'scriptId: "customscript_efx_fe_kiosko_connection_sl",';
        // str += 'deploymentId: "customdeploy_efx_fe_kiosko_connection_sl",';
        // str += "method:'POST',external: true,";
        // str += "urlParams: " + JSON.stringify(objData);
        // str += ",body: `" + JSON.stringify(objData) + "`,";
        // str +=
        //   "}).then(function (resp){console.log('RESPONSE OF SECOND step to Stamp:'+resp.body);self2.sendStampSecondStepPDF(JSON.parse(resp.body));})";
        // str += ".catch(function(reason){";
        // str += "console.log('error in sendStampSecondStep',reason);";
        // str +=
        //   "self2.checkStampingHasSaved(`" + JSON.stringify(data2send_) + "`);";
        // str += "});";

        // str += "});";
        // let str = `
        // require(["N/https"],function(httpsMode){
        // console.log('ENTRA A MANDAR REQUEST 🌟');
        // httpsMode.post.promise({
        //   url: self2.$store.state.kioskoConnectionUrl,
        //   body: ${JSON.stringify(objData)},
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // }).then(function(response){
        //   console.log('RESPONSE OF SECOND step to Stamp:',response.body);
        //   self2.sendStampSecondStepPDF(JSON.parse(response.body));
        // }).catch(function(reason){
        //   console.log('error in sendStampSecondStep',reason);
        //   self2.checkStampingHasSaved(${JSON.stringify(data2send_)});
        // });

        // });
        // `;
        let str = "";
        str += 'require(["N/https"],function(httpsMode){';
        str += "console.log('ENTRA A MANDAR REQUEST 🌟');";
        str += "httpsMode.post.promise({";
        str += "  url: self2.$store.state.kioskoConnectionUrl,";
        str += "  body: `" + JSON.stringify(objData) + "`,";
        str += "  headers: {";
        str += "    'Content-Type': 'application/json'";
        str += "  }";
        str += "}).then(function(response){";
        str +=
          "  console.log('RESPONSE OF SECOND step to Stamp:',response.body);";
        str += "  self2.sendStampSecondStepPDF(JSON.parse(response.body));";
        str += "}).catch(function(reason){";
        str += "  console.log('error in sendStampSecondStep',reason);";
        str +=
          "  self2.checkStampingHasSaved(" + JSON.stringify(data2send_) + ");";
        str += "});";
        str += "});";
        eval(str);
      }
    },
    checkStampingHasSaved(objData) {
      console.log("OBJDATA ⛳:", objData);
      this.process_msg =
        "Se está actualizando datos para timbrado, por favor espere...";
      setTimeout(() => {
        objData = JSON.parse(objData);
        if (objData.finishedStamping) {
          console.log("finished saving stamping data:", objData.finished);
          this.sendStampSecondStepPDF(objData);
        } else if (objData.errorKiosko) {
          this.success = false;
          this.response = 0;
          this.msg_alt = objData.msgDetail;

          this.setStatusRequestStamp(false);
          this.setMessageStamp(objData.msgDetail);
          return;
        } else {
          let self = this;
          console.debug(self);
          console.log({ title: "objData", details: objData });
          // let str = "var httpsMode = null;";
          // str += 'require(["N/https"], function(httpsMode){';
          // str +=
          //   "console.log('ENTRA A CHECAR TIMBRADO GUARDADO 📫🪼');var url = httpsMode.requestSuitelet.promise({";
          // str += 'scriptId: "customscript_efx_fe_kiosko_connection_sl",';
          // str += 'deploymentId: "customdeploy_efx_fe_kiosko_connection_sl",';
          // str += "method:'POST',external: true,";
          // str += "urlParams: " + JSON.stringify(objData);
          // str += ",body: ''";
          // str +=
          //   "}).then(function (resp){console.log('RESPONSE OF checkStampingHasSaved:'+resp.body);setTimeout(self.checkStampingHasSaved(resp.body),70000);}).catch(function(reason){console.log('error in checkStampingHasSaved',reason); setTimeout(self.checkStampingHasSaved(objData),50000)});";
          // str += "});";
          let str = `
          require(["N/https"],function(httpsMode){
          console.log('ENTRA A CHECAR TIMBRADO GUARDADO 📫🪼');
          httpsMode.post.promise({
            url: self.$store.state.kioskoConnectionUrl,
            body: ${JSON.stringify(objData)},
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function(response){
            console.log('RESPONSE OF checkStampingHasSaved:',response.body);
            setTimeout(self.checkStampingHasSaved(response.body),70000);
          }).catch(function(reason){
            console.log('error in checkStampingHasSaved',reason);
            setTimeout(self.checkStampingHasSaved(objData),50000);
          });
          });
          `;
          eval(str);
        }
      }, 10000);
    },
    resendCreatedRelatedInvoiceStatus(retries, delay, objData) {
      console.log("RETRIES:", retries);
      console.log("DELAY:", delay);
      this.process_msg = "Se está guardando su factura, por favor espere...";

      console.log("OBJDATA:", objData);
      setTimeout(() => {
        objData = JSON.parse(objData);
        console.log("OBJDATA POST Parse:", objData);

        if (objData.finished) {
          console.log("finished:", objData.finished);
          this.sendStampSecondStep(objData);
        } else {
          if (retries == 0) {
            this.success = false;
            this.response = 0;
            this.msg_alt =
              "No se pudo timbrar la factura, por favor intente de nuevo";

            this.setStatusRequestStamp(false);
            this.setMessageStamp(
              "No se pudo timbrar la factura, por favor intente de nuevo"
            );
            return;
          } else {
            let self = this;
            console.debug(self);
            console.log({ title: "objData", details: objData });
            // let str = "var httpsMode = null;";
            // str += 'require(["N/https"], function(httpsMode){';
            // str +=
            //   "console.log('ENTRA A CHECAR');var url = httpsMode.requestSuitelet.promise({";
            // str += 'scriptId: "customscript_efx_fe_kiosko_connection_sl",';
            // str += 'deploymentId: "customdeploy_efx_fe_kiosko_connection_sl",';
            // str += "method:'POST',external: true,";
            // str += "urlParams: " + JSON.stringify(objData);
            // str += ",body: ''";
            // str +=
            //   "}).then(function (resp){console.log('RESPONSE OF resendCreatedRelatedInvoiceStatus:'+resp.body);setTimeout(self.resendCreatedRelatedInvoiceStatus(2,50000,(resp.body)),70000);}).catch(function(reason){console.log('error in sendStampSecondStep',reason); setTimeout(self.resendCreatedRelatedInvoiceStatus(2,5000),50000)});";
            // str += "});";
            // let str = `
            // require(["N/https"],function(httpsMode){
            // console.log('ENTRA A CHECAR');
            // httpsMode.post.promise({
            //   url: self.$store.state.kioskoConnectionUrl,
            //   body: ${JSON.stringify(objData)},
            //   headers: {
            //     'Content-Type': 'application/json'
            //   }
            // }).then(function(response){
            //   console.log('RESPONSE OF resendCreatedRelatedInvoiceStatus:',response.body);
            //   setTimeout(self.resendCreatedRelatedInvoiceStatus(2,50000,(response.body)),70000);
            // }).catch(function(reason){
            //   console.log('error in sendStampSecondStep',reason);
            //   setTimeout(self.resendCreatedRelatedInvoiceStatus(2,5000),50000);
            // });
            // });
            // `;
            let str = "";
            str += 'require(["N/https"],function(httpsMode){';
            str += "console.log('ENTRA A CHECAR');";
            str += "httpsMode.post.promise({";
            str += "  url: self.$store.state.kioskoConnectionUrl,";
            str += "  body: `" + JSON.stringify(objData) + "`,";
            str += "  headers: {";
            str += "    'Content-Type': 'application/json'";
            str += "  }";
            str += "}).then(function(response){";
            str +=
              "  console.log('RESPONSE OF resendCreatedRelatedInvoiceStatus:',response.body);";
            str +=
              "  setTimeout(self.resendCreatedRelatedInvoiceStatus(2,50000,(response.body)),70000);";
            str += "}).catch(function(reason){";
            str += "  console.log('error in sendStampSecondStep',reason);";
            str +=
              "  setTimeout(self.resendCreatedRelatedInvoiceStatus(2,5000),50000);";
            str += "});";
            str += "});";
            eval(str);
          }
        }
      }, 10000);
    },
    sendStampSecondStepEmail(bodyResponse) {
      let objData = bodyResponse;
      objData.email = true;
      console.log("OBJDATA PARAMSTAMP sendStampSecondStepEmail:", objData);
      this.process_msg =
        "Se está enviando por correo su XML y PDF, por favor espere...";
      let self = this;
      console.debug(self);
      // backup
      // let str = "var httpsMode = null;";
      // str += 'require(["N/https"], function(httpsMode){';
      // str +=
      //   "console.log('ENTRA A MANDAR REQUEST EMAIL 📫');var url = httpsMode.requestSuitelet.promise({";
      // str += 'scriptId: "customscript_efx_fe_kiosko_connection_sl",';
      // str += 'deploymentId: "customdeploy_efx_fe_kiosko_connection_sl",';
      // str += "method:'POST',external: true,";
      // str += "urlParams: " + JSON.stringify(objData);
      // str += ",body: ''";
      // str +=
      //   "}).then(function (resp){console.log('RESPONSE OF fourth step to Stamp:'+resp.body);self.processResultStamp(JSON.parse(resp.body));}).catch(function(reason){console.log('error in sendStampSecondStepEmail',reason); self.catchError(reason.message);});";

      // str += "});";
      // let str = `
      // require(["N/https"],function(httpsMode){
      // console.log('ENTRA A MANDAR REQUEST EMAIL 📫');
      // httpsMode.post.promise({
      //   url: self.$store.state.kioskoConnectionUrl,
      //   body: ${JSON.stringify(objData)},
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }).then(function(response){
      //   console.log('RESPONSE OF fourth step to Stamp:',response.body);
      //   self.processResultStamp(JSON.parse(response.body));
      // }).catch(function(reason){
      //   console.log('error in sendStampSecondStepEmail',reason);
      //   self.catchError(reason.message);
      // });
      // });
      // `;
      let str = "";
      str += 'require(["N/https"],function(httpsMode){';
      str += "console.log('ENTRA A MANDAR REQUEST EMAIL 📫');";
      str += "httpsMode.post.promise({";
      str += "  url: self.$store.state.kioskoConnectionUrl,";
      str += "  body: `" + JSON.stringify(objData) + "`,";
      str += "  headers: {";
      str += "    'Content-Type': 'application/json'";
      str += "  }";
      str += "}).then(function(response){";
      str +=
        "  console.log('RESPONSE OF fourth step to Stamp:',response.body);";
      str += "  self.processResultStamp(JSON.parse(response.body));";
      str += "}).catch(function(reason){";
      str += "  console.log('error in sendStampSecondStepEmail',reason);";
      str += "  self.catchError(reason.message);";
      str += "});";
      str += "});";
      eval(str);
    },
    sendStampSecondStepPDF(bodyResponse) {
      let objData = bodyResponse;
      console.log("sendStampSecondStepPDF", bodyResponse);
      if (objData.success === true || objData.success === "true") {
        console.log("OBJDATA PARAMSTAMP sendStampSecondStepPDF:", objData);
        this.process_msg = "Se está generando su PDF, por favor espere...";
        let self = this;
        console.debug(self);
        let data2send = {
          checkingPDF: true,
          idTransaccion: objData.idTransaccion,
          recordType: objData.recordType,
        };
        // backup
        // let str = "var httpsMode = null;";
        // str += 'require(["N/https"], function(httpsMode){';
        // str +=
        //   "console.log('ENTRA A MANDAR REQUEST PDF 🪼');var url = httpsMode.requestSuitelet.promise({";
        // str += 'scriptId: "customscript_efx_fe_kiosko_connection_sl",';
        // str += 'deploymentId: "customdeploy_efx_fe_kiosko_connection_sl",';
        // str += "method:'POST',external: true,";
        // str += "urlParams: " + JSON.stringify(objData);
        // str += ",body: `" + JSON.stringify(objData) + "`,";
        // str +=
        //   "}).then(function (resp){console.log('RESPONSE OF third step to Stamp:'+resp.body);self.sendStampSecondStepEmail(JSON.parse(resp.body));}).catch(function(reason){console.log('error in sendStampSecondStepPDF',reason); self.checkPDFIsSaved(`" +
        //   JSON.stringify(data2send) +
        //   "`);});";

        // str += "});";
        // let str = `
        // require(["N/https"],function(httpsMode){
        // console.log('ENTRA A MANDAR REQUEST PDF 🪼');
        // httpsMode.post.promise({
        //   url: self.$store.state.kioskoConnectionUrl,
        //   body: ${JSON.stringify(objData)},
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // }).then(function(response){
        //   console.log('RESPONSE OF third step to Stamp:',response.body);
        //   self.sendStampSecondStepEmail(JSON.parse(response.body));
        // }).catch(function(reason){
        //   console.log('error in sendStampSecondStepPDF',reason);
        //   self.checkPDFIsSaved(${JSON.stringify(data2send)});
        // });
        // });
        // `;
        let str = "";
        str += 'require(["N/https"],function(httpsMode){';
        str += "console.log('ENTRA A MANDAR REQUEST PDF 🪼');";
        str += "httpsMode.post.promise({";
        str += "  url: self.$store.state.kioskoConnectionUrl,";
        str += "  body: `" + JSON.stringify(objData) + "`,";
        str += "  headers: {";
        str += "    'Content-Type': 'application/json'";
        str += "  }";
        str += "}).then(function(response){";
        str +=
          "  console.log('RESPONSE OF third step to Stamp:',response.body);";
        str += "  self.sendStampSecondStepEmail(JSON.parse(response.body));";
        str += "}).catch(function(reason){";
        str += "  console.log('error in sendStampSecondStepPDF',reason);";
        str += "  self.checkPDFIsSaved(" + JSON.stringify(data2send) + ");";
        str += "});";
        str += "});";
        eval(str);
      } else {
        this.success = false;
        this.response = 0;
        this.msg_alt = objData.respuestaPac;
        const endTime = new Date();
        const loadingTime = endTime - this.startTimeLoadingStamp;
        console.log("LOADING TIME  STAMP on error:", loadingTime);
        this.setStatusRequestStamp(false);
        this.setMessageStamp(objData.respuestaPac);
        // this.sendTime(loadingTime, endTime);
        return;
      }
    },
    checkPDFIsSaved(objData) {
      console.log("OBJDATA ⛳:", objData);
      setTimeout(() => {
        objData = JSON.parse(objData);
        if (objData.finishedPDF) {
          console.log("finished saving pdf:", objData.finishedPDF);
          this.sendStampSecondStepEmail(objData);
        } else {
          let self = this;
          console.debug(self);
          console.log({ title: "objData", details: objData });
          // let str = "var httpsMode = null;";
          // str += 'require(["N/https"], function(httpsMode){';
          // str +=
          //   "console.log('ENTRA A CHECAR PDF');var url = httpsMode.requestSuitelet.promise({";
          // str += 'scriptId: "customscript_efx_fe_kiosko_connection_sl",';
          // str += 'deploymentId: "customdeploy_efx_fe_kiosko_connection_sl",';
          // str += "method:'POST',external: true,";
          // str += "urlParams: " + JSON.stringify(objData);
          // str += ",body: `" + JSON.stringify(objData) + "`,";
          // str +=
          //   "}).then(function (resp){console.log('RESPONSE OF checkPDFIsSaved:'+resp.body);setTimeout(self.checkPDFIsSaved(resp.body),70000);}).catch(function(reason){console.log('error in checkPDFIsSaved',reason); setTimeout(self.checkPDFIsSaved(objData),50000)});";
          // str += "});";
          let str = `
          require(["N/https"],function(httpsMode){
          console.log('ENTRA A CHECAR PDF');
          httpsMode.post.promise({
            url: self.$store.state.kioskoConnectionUrl,
            body: ${JSON.stringify(objData)},
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function(response){
            console.log('RESPONSE OF checkPDFIsSaved:',response.body);
            setTimeout(self.checkPDFIsSaved(response.body),70000);
          }).catch(function(reason){
            console.log('error in checkPDFIsSaved',reason);
            setTimeout(self.checkPDFIsSaved(objData),50000);
          });
          });
          `;
          eval(str);
        }
      }, 10000);
    },
    processResultStamp(result) {
      if (result.success === true || result.success === "true") {
        this.success = true;
        this.response = result;
        const endTime = new Date();
        const loadingTime = endTime - this.startTimeLoadingStamp;
        console.log("LOADING TIME  STAMP:", loadingTime);
        this.setStatusRequestStamp(true);
        this.setMessageStamp("Factura timbrada con éxito");
        // this.sendTime(loadingTime, endTime);
      } else {
        this.success = false;
        this.response = 0;
        this.msg_alt = result.respuestaPac;
        const endTime = new Date();
        const loadingTime = endTime - this.startTimeLoadingStamp;
        console.log("LOADING TIME  STAMP on error:", loadingTime);
        this.setStatusRequestStamp(false);
        this.setMessageStamp(result.respuestaPac);
        // this.sendTime(loadingTime, endTime);
      }
    },
    catchError(message) {
      this.success = false;
      this.response = 0;
      // const endTime = new Date();
      // const loadingTime = endTime - this.startTimeLoadingStamp;
      let aux_msg = JSON.parse(message);
      this.setStatusRequestStamp(false);
      this.setMessageStamp(aux_msg.message);
      // this.sendTime(loadingTime, endTime);
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
        // let str = "var httpsMode = null;";
        // str += 'require(["N/https"], function(httpsMode){';
        // str += "var url = httpsMode.requestSuitelet({";
        // str += 'scriptId: "customscript_efx_kiosko_service_files",';
        // str += 'deploymentId: "customdeploy_efx_kiosko_service_files",';
        // str += "external: true,";
        // str += "urlParams: " + JSON.stringify({ docType: type, docID: id });
        // str += "});";
        // str += "console.log(url);";
        // // str += "redirectModule.redirect({url: body.url});";
        // str += "self.openUrl(JSON.parse(url.body));";
        // str += "});";
        // let str = `
        // require(["N/https"],function(httpsMode){
        // httpsMode.post.promise({
        //   url: self.$store.state.kioskoConnectionUrl,
        //   body: ${JSON.stringify({ docType: type, docID: id })},
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // }).then(function(response){
        //   console.log('RESPONSE OF checkPDFIsSaved:',response.body);
        //   self.openUrl(JSON.parse(response.body));
        // }).catch(function(reason){
        //   console.log('error in checkPDFIsSaved',reason);
        //   self.openUrl(JSON.parse(response.body));
        // });
        // });
        // `;
        let str = "";
        str += 'require(["N/https"],function(httpsMode){';
        str += "httpsMode.post.promise({";
        str += "  url: self.$store.state.downloadFilesUrl,";
        str +=
          "  body: `" + JSON.stringify({ docType: type, docID: id }) + "`,";
        str += "  headers: {";
        str += "    'Content-Type': 'application/json'";
        str += "  }";
        str += "}).then(function(response){";
        str += "  console.log('RESPONSE OF checkPDFIsSaved:',response.body);";
        str += "  self.openUrl(JSON.parse(response.body));";
        str += "}).catch(function(reason){";
        str += "  console.log('error in checkPDFIsSaved',reason);";
        str += "  self.openUrl(JSON.parse(response.body));";
        str += "});";
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
      link.setAttribute("target", "_blank");
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
