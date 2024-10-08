<template>
  <div class="ticket">
    <div class="container">
      <div class="columns">
        <div class="column">
          <ol type="1">
            <li v-for="regla of configSite.fields" :key="regla.id">
              {{ regla.rule }}
            </li>
          </ol>
          <div v-if="configSite.altMsg">
            <div class="note" v-if="configSite.altMsg.nDef">
              <div v-html="configSite.altMsg.nDef"></div>
            </div>
          </div>
          <br />
          <div class="has-text-centered mt-3">
            <b-button
              type="is-info is-light"
              class="mr-2"
              size="is-small"
              @click="showTicketExample"
              v-if="configSite.img_example && configSite.img_example != ''"
              >Ejemplo de Ticket
            </b-button>
            <b-button
              type="is-warning is-light"
              size="is-small"
              @click="showPolicies"
              v-if="configSite.politics && configSite.politics.length != 0"
              >Políticas de Uso
            </b-button>
          </div>
        </div>
        <div class="column">
          <form action="" @submit="checkPolitics">
            <b-field label="Acción" label-position="on-border">
              <b-select
                expanded
                required
                v-model="local_action"
                icon-pack="fas"
                icon="info-circle"
                placeholder="Seleccione una opción"
              >
                <option :value="true" selected>Timbrar Factura</option>
                <option :value="false">Consulta de factura</option>
              </b-select>
            </b-field>
            <b-field
              v-for="field of configSite.fields"
              :key="field.fieldID"
              :label="field.name"
              label-position="on-border"
            >
              <b-input
                v-if="field.type != 'date'"
                :type="field.type"
                :icon-pack="field.icon_pack"
                :icon="field.icon"
                min="0.0"
                step="0.01"
                :id="field.fieldID"
                v-model="ticketSearch['custparam_' + field.fieldID]"
                @input="
                  (e) =>
                    (ticketSearch['custparam_' + field.fieldID] = upperText(
                      e,
                      field.fieldID
                    ))
                "
                required
              >
              </b-input>
              <b-datepicker
                v-if="field.type === 'date'"
                :icon-pack="field.icon_pack != '' ? field.icon_pack : 'fas'"
                :icon="field.icon"
                :icon-next="
                  field.icon_pack != '' && field.icon_pack === 'far'
                    ? 'caret-square-right'
                    : 'chevron-right'
                "
                :icon-prev="
                  field.icon_pack != '' && field.icon_pack === 'far'
                    ? 'caret-square-left'
                    : 'chevron-left'
                "
                :id="field.fieldID"
                :first-day-of-week="1"
                :v-model="
                  Date.parse(ticketSearch['custparam_' + field.fieldID])
                "
                locale="es-MX"
                editable
                required
                :date-formatter="
                  (date) =>
                    new Intl.DateTimeFormat('es-MX').format(new Date(date))
                "
                :date-parser="
                  (d) => {
                    new Date(Date.parse(d));
                  }
                "
                :date-creator="() => new Date()"
                @input="(d) => changeDate(field.fieldID, d)"
              >
              </b-datepicker>
            </b-field>
            <hr />
            <b-button
              type="is-primary"
              icon-pack="fas"
              icon-right="search"
              native-type="submit"
              expanded
              class="mb-5"
            >
              Buscar
            </b-button>
          </form>
        </div>
      </div>
      <b-modal
        v-model="modalPolicies"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
      >
        <div class="card">
          <div class="card-content">
            <div class="content">
              <section
                v-if="configSite.politics && configSite.politics.length > 0"
              >
                <div class="columns is-desktop">
                  <div class="column is-three-fifths is-offset-one-fifth">
                    <ol type="I">
                      <li
                        v-for="politic of configSite.politics"
                        :key="politic.id"
                      >
                        <div v-html="politic.label"></div>
                      </li>
                    </ol>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal
        v-model="modalExampleTicket"
        trap-focus
        :destroy-on-hide="false"
        :width="800"
        :can-cancel="['escape', 'outside']"
      >
        <div class="card">
          <div class="card-image">
            <!-- <figure class="image"> -->
              <!-- make image to use 100% of the modal -->
              <img :src="configSite.img_example" alt="Image" class="modal-image"  />
            <!-- </figure> -->
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import CustomMessage from "@/components/messages/CustomMessage";
import axios from "axios";

export default {
  name: "Ticket",
  computed: {
    ...mapState([
      "messageTicket",
      "statusRequestTicket",
      "configSite",
      "ticketSearch",
      "step",
      "action",
      "clientData",
      "startTimeLoading",
      "startTimeLoadingClient",
    ]),
    local_action: {
      get() {
        return this.$store.getters.action;
      },
      set(newValue) {
        this.$store.dispatch("setMyActions", newValue);
      },
    },
  },
  data() {
    return {
      modalPolicies: false,
      modalExampleTicket: false,
    };
  },
  created() {
    console.log("Datos en ticket created:", this.configSite);
  },
  mounted() {
    console.log("Datos en ticket created:", this.configSite);
    // const endTime = new Date();
    // const loadingTime = endTime - this.startTimeLoading;
    // if (loadingTime > 3000) {
    //   console.log("LOADING TIME TICKET: ", loadingTime);
    //   this.sendTime(loadingTime, endTime);
    // }
  },
  methods: {
    sendTime(time, date) {
      try {
        let objSendTime = {
          custrecord_loading_url: window.location.href,
          custrecord_loading_date: date,
          custrecord_loading_time: time,
          custrecord_loading_step: "Ticket",
          custrecord_loading_status: this.statusRequestTicket,
          custrecord_loading_message: this.messageTicket,
        };
        let strObjSendTime = JSON.stringify(objSendTime);
        let self = this;
        console.log("sendTime -self:", self);
        let str = `
                var httpsMode=null;
                require(["N/https"],function(httpsMode){
                    var url=httpsMode.requestSuitelet({
                        scriptId:'customscript_efx_fe_kioskopageload_sl',
                        deploymentId:"customdeploy_efx_fe_kioskopageload_sl",
                        external:true,
                        urlParams:{sendTime:'${strObjSendTime}'}
                    });
                    console.log("RESP time: ",url.data);
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
    checkPolitics(evt) {
      evt.preventDefault();
      if (this.configSite.politics.length) {
        let send = false;
        let enableCustomMsg = false;
        for (let i in this.configSite.politics) {
          switch (this.configSite.politics[i].type) {
            case "1":
              var dateNow = new Date().getTime();
              var dateInt = new Date(
                this.ticketSearch["custparam_trandate"]
              ).getTime();
              var diff = parseInt((dateNow - dateInt) / (1000 * 60 * 60 * 24));
              // console.log(diff)
              if (diff <= this.configSite.politics[i].value) {
                send = true;
                enableCustomMsg = false;
              }
              break;
            case "2":
              var dateStart = new Date(
                this.configSite.politics[i].value
              ).getTime();
              var dateInvoice = new Date(
                this.ticketSearch["custparam_trandate"]
              ).getTime();
              if (dateInvoice >= dateStart) {
                send = true;
              } else {
                send = false;
                enableCustomMsg = true;
              }
              break;
            case "3":
              var dateTransaction = new Date(
                this.ticketSearch["custparam_trandate"]
              );
              var dateNowSystem = new Date();
              if (
                dateTransaction.getMonth() + 1 ===
                dateNowSystem.getMonth() + 1
              ) {
                send = true;
              } else {
                send = false;
                enableCustomMsg = false;
              }
              break;
          }
        }
        if (send === true) {
          this.sendTicket();
        } else {
          if (enableCustomMsg === true) {
            this.$toast.info(
              {
                component: CustomMessage,
                props: { msg: this.configSite.messages.custom },
              },
              {
                position: "bottom-right",
                timeout: false,
                closeOnClick: false,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false,
              }
            );
          } else {
            this.$toast.error(
              "Algo no anda bien.\n Por favor revisa nuestras politicas y verifica la información de tu ticket",
              {
                position: "bottom-right",
                timeout: 10000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false,
              }
            );
          }
        }
      } else {
        this.sendTicket();
      }
      // this.setTicketId(this.ticketSearch.custparam_tranid);
      this.setTicketDate(this.ticketSearch.custparam_trandate);
      // if(this.ticketSearch.custparam_amount){
      //   this.setTicketCantidad(this.ticketSearch.custparam_amount);
      // }
      if (this.ticketSearch.custparam_custbody_efx_iy_total_amount) {
        this.setTicketCantidad(
          this.ticketSearch.custparam_custbody_efx_iy_total_amount
        );
      }
      if (this.ticketSearch.custparam_custbody_efx_iy_noticket) {
        this.setTicketId(this.ticketSearch.custparam_custbody_efx_iy_noticket);
      }
      this.setTicketRfc(this.ticketSearch.custparam_custentity_mx_rfc);
    },
    sendTicket() {
      this.setLoading(true);
      if (this.action === true) {
        this.setFilterAction("T");
      } else {
        this.setFilterAction("F");
      }

      let fields = this.configSite.fields;
      for (let i in fields) {
        if (fields[i].type === "date") {
          const dateSearch = new Date(
            this.ticketSearch["custparam_" + fields[i].fieldID]
          );
          let month = dateSearch.getMonth() + 1;
          let day = dateSearch.getDate();
          let d = month + "/" + day + "/" + dateSearch.getFullYear();
          // console.log(d.toString())
          // let d =  new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', dateStyle: 'short' }).format(dateSearch);
          this.setFormatDate({
            key: "custparam_" + fields[i].fieldID,
            newValue: d,
          });
          // console.log(dateSearch);
        }
      }

      // console.log(this.ticketSearch);
      if (this.ticketSearch.custparam_config === "") {
        this.setConfigParamSearch(this.configSite.id);
      }

      let self = this;
      console.debug('ticket self:',self);
      // let str = "";
      // str += 'require(["N/https"], function(httpsMode){';
      // str += "var url = httpsMode.requestSuitelet({";
      // str += 'scriptId: "customscript_efx_fe_kiosko_connection_sl",';
      // str += 'deploymentId: "customdeploy_efx_fe_kiosko_connection_sl",';
      // str += "external: true,";
      // str += "urlParams: " + JSON.stringify(this.ticketSearch);
      // str += "});";
      // str += "let start=new Date();";
      // str += "self.setStart(start);";
      // str += "self.nextStep(JSON.parse(url.body));";
      // // str += "https.post.promise({";
      // // str += "url: url,";
      // // str += "body: {},";
      // // str +=
      // //   "headers:{ }}).then(function(response) {self.nextStep(JSON.parse(response.body));}).catch(function(reason){console.log(reason); self.showError(reason);});";
      // str += "});";
      let str = `
      require(["N/https"],function(httpsMode){
      setTimeout(function(){
      console.log('KIOSKO URL Connection:',self.$store.state.kioskoConnectionUrl);
      httpsMode.post.promise({
        url:self.$store.state.kioskoConnectionUrl,
        body: JSON.stringify(self.ticketSearch),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        console.log(response.body);
        self.nextStep(JSON.parse(response.body));
      }).catch(function(reason){
        console.error(reason);
      self.showError(reason);
      });
      }, 200);
      });
      `;
      eval(str);
      // this.nextStep(this.clientData)
    },
    setStart(start) {
      this.setStartTimeLoadingClient(start);
      this.setStartTimeLoadingStamp(start);
    },
    setKioskoUrls(urlKioskoConnection,urlDownloadService) {
      console.log("URL KIOSKO: ",urlKioskoConnection);
      this.$store.commit('setKioskoConnectionUrl',urlKioskoConnection);
      // print kioskoConnectionUrl
      console.log("URL KIOSKO AFTER: ",this.$store.state.kioskoConnectionUrl);
      this.$store.commit('setDownloadFilesUrl',urlDownloadService);

    },
    nextStep(dat) {
      this.setLoading(false);
      if (dat.success === true) {
        this.setClientData(dat);
        this.changeDefaultValue();

        if (dat.transaccion.consulta === true && dat.transaccion.uuid != "") {
          this.setAction(false);
          this.setStep(3);
        } else {
          this.setStep(this.step + 1);
        }
      } else {
        if (this.configSite.showMsgDetail === true) {
          this.$toast.warning(
            this.configSite.messages.warning + "\n" + dat.msg,
            {
              position: "bottom-right",
              timeout: 10000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false,
            }
          );
        } else {
          this.$toast.warning(this.configSite.messages.warning, {
            position: "bottom-right",
            timeout: 10000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        }
      }
    },
    showPolicies() {
      this.modalPolicies = true;
    },
    showTicketExample() {
      this.modalExampleTicket = true;
    },
    showError(reason) {
      this.setLoading(false);
      console.error(reason);
      this.$toast.error(this.configSite.messages.error, {
        position: "bottom-right",
        timeout: 10000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
    changeDate(field, value) {
      const dateSearch = new Date(value);
      this.setFormatDate({
        key: "custparam_" + field,
        newValue: dateSearch,
      });
    },
    upperText: (value, id) => {
      if (id === "custentity_mx_rfc") {
        value = value.toUpperCase();
      }
      return value;
    },
    ...mapMutations([
      "setTicketId",
      "setTicketDate",
      "setTicketCantidad",
      "setTicketRfc",
      "setStep",
      "setClientData",
      "setLoading",
      "setFilterAction",
      "setAction",
      "setConfigParamSearch",
      "setStartTimeLoading",
      "setStartTimeLoadingClient",
      "setStartTimeLoadingStamp",
    ]),
    ...mapActions(["setFormatDate", "changeDefaultValue"]),
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}
.modal-image {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important; /* This ensures the image covers the entire area without distortion */
}
</style>
