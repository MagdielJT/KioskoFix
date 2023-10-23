<template>
  <div class="client">
    <div class="columns" v-if="configSite.altMsg.displayCustom">
      <div class="column">
        <b-message type="is-info" has-icon icon-pack="fas" :auto-close="false">
          <div id="customNote">
            {{ txtEstilizado }}
          </div>
        </b-message>
      </div>
    </div>
    <form action="" @submit="sendClient">
      <article class="panel">
        <p class="panel-heading">Información General</p>
        <div class="panel-content">
          <div class="columns is-desktop container">
            <div class="column is-3">
              <b-field label="R.F.C." label-position="on-border" expanded>
                <b-input
                  v-model="clientData.cliente.rfc"
                  value=""
                  type="text"
                  required
                  :change="getLengthRFC(clientData.cliente.rfc)"
                  maxlength="13"
                  disabled
                ></b-input>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field
                label="Tipo de persona"
                label-position="on-border"
                expanded
              >
                <section style="padding-top: 1rem">
                  <div class="block">
                    <b-radio
                      name="person"
                      :native-value="true"
                      v-model="clientData.cliente.tipo"
                      required
                      :disabled="true"
                    >
                      Física
                    </b-radio>
                    <b-radio
                      name="person"
                      :native-value="false"
                      v-model="clientData.cliente.tipo"
                      required
                      :disabled="true"
                    >
                      Moral
                    </b-radio>
                  </div>
                </section>
              </b-field>
            </div>
            <div class="column is-3" v-if="clientData.cliente.tipo">
              <b-field
                label="Nombre (s)"
                v-if="clientData.cliente.tipo"
                label-position="on-border"
                expanded
              >
                <b-input
                  value=""
                  type="text"
                  v-model="clientData.cliente.nombre"
                  required
                ></b-input>
              </b-field>
            </div>
            <div class="column is-3" v-if="clientData.cliente.tipo">
              <b-field
                label="Apellidos"
                v-if="clientData.cliente.tipo"
                label-position="on-border"
                expanded
              >
                <b-input
                  value=""
                  type="text"
                  v-model="clientData.cliente.apellido"
                  required
                ></b-input>
              </b-field>
            </div>
            <div class="column is-6" v-if="!clientData.cliente.tipo">
              <b-field
                label="Razón Social"
                v-if="!clientData.cliente.tipo"
                label-position="on-border"
                expanded
              >
                <b-input
                  value=""
                  type="text"
                  v-model="clientData.cliente.compania"
                  required
                ></b-input>
              </b-field>
            </div>
          </div>
        </div>
        <div class="panel-content">
          <div class="columns is-desktop container">
            <div
              class="column"
              v-bind:class="{
                'is-3': configSite.ieps === true,
                'is-4': configSite.ieps === false,
              }"
            >
              <b-field label="Uso de CFDI" label-position="on-border" expanded>
                <b-select
                  placeholder="Seleccione uno"
                  v-model="clientData.cliente.uso_cfdi.value"
                  expanded
                  v-bind="{
                    required: configSite.customerForm['uso_cfdi'].required,
                    disabled: configSite.customerForm['uso_cfdi'].disabled,
                  }"
                >
                  <option
                    v-for="cfdi in billingInformation.uso_cfdi"
                    :key="cfdi.id"
                    :value="cfdi.id"
                  >
                    {{ cfdi.value }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div
              class="column"
              v-bind:class="{
                'is-3': configSite.ieps === true,
                'is-4': configSite.ieps === false,
              }"
            >
              <b-field
                label="Método de Pago"
                label-position="on-border"
                expanded
              >
                <b-select
                  placeholder="Seleccione uno"
                  expanded
                  v-model="clientData.cliente.metodo_pago.value"
                  v-bind="{
                    required: configSite.customerForm['metodo_pago'].required,
                    disabled: configSite.customerForm['metodo_pago'].disabled,
                  }"
                >
                  <option
                    v-for="method in billingInformation.paymt_method"
                    :key="method.id"
                    :value="method.id"
                  >
                    {{ method.value }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div
              class="column"
              v-bind:class="{
                'is-3': configSite.ieps === true,
                'is-4': configSite.ieps === false,
              }"
            >
              <b-field
                label="Forma de Pago"
                label-position="on-border"
                expanded
              >
                <b-select
                  placeholder="Seleccione uno"
                  expanded
                  v-model="clientData.cliente.forma_pago.value"
                  v-bind="{
                    required: configSite.customerForm['forma_pago'].required,
                    disabled: configSite.customerForm['forma_pago'].disabled,
                  }"
                >
                  <option
                    v-for="term in billingInformation.paymt_term"
                    :key="term.id"
                    :value="term.id"
                  >
                    {{ term.value }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div
              class="column"
              v-bind:class="{
                'is-3': configSite.ieps === true,
                'is-4': configSite.ieps === false,
              }"
              v-if="configSite.ieps === true"
            >
              <b-field expanded>
                <b-checkbox v-model="clientData.cliente.ieps"
                  >Desglose de IEPS</b-checkbox
                >
              </b-field>
            </div>
          </div>
        </div>
        <div class="panel-content">
          <div class="columns is-desktop container">
            <div class="column is-4">
              <b-field
                label="Regimen Fiscal"
                label-position="on-border"
                expanded
              >
                <b-select
                  placeholder="Seleccione uno"
                  expanded
                  required
                  v-model="clientData.cliente.regFiscal.value"
                >
                  <option
                    v-for="regF in billingInformation.industry_type"
                    :key="regF.id"
                    :value="regF.id"
                  >
                    {{ regF.value }}
                  </option>
                </b-select>
              </b-field>
            </div>
          </div>
        </div>
      </article>
      <article class="panel">
        <p class="panel-heading">Dirección</p>
        <div class="panel-content">
          <div class="columns is-desktop container">
            <div class="column is-5">
              <b-field label="Calle" label-position="on-border" expanded>
                <b-input
                  value=""
                  type="text"
                  required
                  v-model="clientData.direccion.calle"
                ></b-input>
              </b-field>
            </div>
            <div class="column is-2">
              <b-field label="No. Exterior" label-position="on-border" expanded>
                <b-input
                  value=""
                  type="text"
                  min="0"
                  required
                  v-model="clientData.direccion.n_exterior"
                ></b-input>
              </b-field>
            </div>
            <div class="column is-2">
              <b-field label="No. Interior" label-position="on-border" expanded>
                <b-input
                  value=""
                  type="text"
                  min="0"
                  v-model="clientData.direccion.n_interior"
                ></b-input>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="C.P." label-position="on-border" expanded>
                <b-input
                  value=""
                  type="text"
                  required
                  v-model="clientData.direccion.cp"
                ></b-input>
              </b-field>
            </div>
          </div>
        </div>
        <div class="panel-content">
          <div class="columns is-desktop container">
            <div class="column is-3">
              <b-field label="Pais" label-position="on-border" expanded>
                <b-select
                  placeholder="Seleccione uno"
                  expanded
                  required
                  @input="changeCountry"
                  v-model="clientData.direccion.pais"
                >
                  <option
                    v-for="country in local_countries"
                    :key="country.id"
                    :value="country.id"
                  >
                    {{ country.text }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Estado" label-position="on-border" expanded>
                <b-select
                  placeholder="Seleccione uno"
                  expanded
                  required
                  v-model="clientData.direccion.estado"
                >
                  <option
                    v-for="state in local_states"
                    :key="state.id"
                    :value="state.value"
                  >
                    {{ state.name }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Municipio" label-position="on-border" expanded>
                <b-input
                  type="text"
                  expanded
                  required
                  v-model="clientData.direccion.municipio"
                ></b-input>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Colonia" label-position="on-border" expanded>
                <b-input
                  type="text"
                  expanded
                  required
                  v-model="clientData.direccion.colonia"
                ></b-input>
              </b-field>
            </div>
          </div>
        </div>
      </article>
      <article class="panel">
        <p class="panel-heading">Contacto</p>
        <div class="panel-content">
          <div class="columns is-desktop container">
            <div class="column is-6">
              <b-field label="Nombre" label-position="on-border" expanded>
                <b-input
                  type="text"
                  expanded
                  v-model="contact_local.nombre"
                ></b-input>
              </b-field>
            </div>
            <div class="column is-6">
              <b-field label="Email" label-position="on-border" expanded>
                <b-input
                  type="email"
                  expanded
                  v-model="contact_local.correo"
                ></b-input>
                <p class="control">
                  <b-button
                    type="is-primary"
                    icon-pack="fas"
                    icon-right="plus"
                    @click="addContact"
                  ></b-button>
                </p>
              </b-field>
            </div>
          </div>
        </div>
        <div class="panel-content">
          <div class="columns is-desktop container">
            <div class="column">
              <b-field label="Emails" label-position="on-border" expanded>
                <b-select
                  multiple
                  v-model="action"
                  expanded
                  required
                  native-size="3"
                >
                  <option
                    v-for="contact in clientData.contactos"
                    :key="contact.correo"
                    :value="contact"
                  >
                    {{ contact.nombre }} - {{ contact.correo }}
                  </option>
                </b-select>
              </b-field>
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
            outlined
            @click="returnStep"
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
    <br />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapState([
      "ticketId",
      "ticketDate",
      "ticketCantidad",
      "ticketRfc",
      "statusRequestClient",
      "countries",
      "billingInformation",
      "clientData",
      "step",
      "emailSelecteds",
      "configSite",
      "startTimeLoadingClient",
      "messageClient"
    ]),
    action: {
      get() {
        return this.$store.getters.action;
      },
      set(newValue) {
        this.$store.dispatch("setEmailsSelecteds", newValue);
      },
    },
  },
  beforeCreate() {},
  created() {
    this.getCountriesData();
    this.getBillingInformation();

    // this.assingCountriesResultLocal(this.countries)
  },
  beforeMount() {
    let country = this.clientData.direccion.pais;
    if (country && this.local_states.length) {
      // console.log('Pais en carga', this.clientData.direccion.pais);
      this.local_states = this.countries[country].states;
    }
  },
  mounted() {
    this.styleText();
  },
  name: "Client",
  data() {
    return {
      isPerson: true,
      emails: [],
      local_countries: [],
      local_states: [],
      local_data: {
        country: "",
      },
      contact_local: {
        nombre: "",
        correo: "",
      },
      txtEstilizado: "",
    };
  },
  methods: {
    sendTime(time, date) {
      try {
        let objSendTime = {
          custrecord_loading_url: window.location.href,
          custrecord_loading_date: date,
          custrecord_loading_time: time,
          custrecord_loading_step: "Cliente",
          custrecord_loading_status: this.statusRequestClient,
          custrecord_loading_message: this.messageClient,
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
    changeCountry(evt) {
      if (evt) {
        this.local_states = this.countries[evt].states;
      }
    },
    styleText() {
      let styledText = document.getElementById("customNote");
      styledText.innerHTML = this.configSite.altMsg.customNote;
      this.txtEstilizado = styledText;
    },
    getCountriesData() {
      try {
        let self = this;
        console.debug(self);
        let str = "";
        // str += 'var url = require(["N/url","N/https"], function (url,https) {';
        // str += "try {";
        // str += "setTimeout( () => {";
        // str += "var urlGotten = url.resolveScript({";
        // str += 'scriptId: "customscript_efx_kiosko_service_config",';
        // str += 'deploymentId: "customdeploy_efx_kiosko_service_config",';
        // str += "returnExternalUrl: true,";
        // str += 'params: { custparam_mode: "configurationData"}';
        // str += "});";
        // str += "https.post.promise({";
        // str += "url: url,";
        // str += "body: {custparam_mode: 'getCountries'},";
        // str +=
        //   "headers:{ }}).then(function(response) {self.assingCountriesResult(JSON.parse(response.body));}).catch(function(reason){console.log(reason)});";
        // str += " }, 3000);";
        // str += "} catch (err) {";
        // str += 'self.errorOccurred("An error occurred:", err.message);';
        // str += " }";
        // str += "});";

        // Version Anterior
        // let str = "var https = null;";
        str += "var urlModule = null;";
        str += 'require(["N/url", "N/https"], function(urlModule, https){';
        str += "var url = urlModule.resolveScript({";
        str += 'scriptId: "customscript_efx_kiosko_service_config",';
        str += 'deploymentId: "customdeploy_efx_kiosko_service_config",';
        str += "returnExternalUrl: true";
        str += "});";
        str += "https.post.promise({";
        str += "url: url,";
        str += "body: {custparam_mode: 'getCountries'},";
        str +=
          "headers:{ }}).then(function(response) {self.assingCountriesResult(JSON.parse(response.body));}).catch(function(reason){console.log(reason)});";
        str += "});";
        eval(str);
        // this.setStatusRequestClient(true);
      } catch (err) {
        console.error(err);
        this.setStatusRequestClient(false);
        this.setMessageClient("Error al realizar petición para obtener listado de países");
      }
    },
    assingCountriesResult(data) {
      if (data.success === true) {
        this.setAllCountries(data.results);
        this.setStatusRequestClient(true);
        this.setMessageClient("Obtuvo listado de países con éxito");
        let countryKey = Object.keys(this.countries);
        if (countryKey.length > 0) {
          for (let key in countryKey) {
            this.local_countries.push({
              id: this.countries[countryKey[key]].value,
              text: this.countries[countryKey[key]].name,
            });
          }
        }
        if (this.clientData.direccion.pais) {
          let country = this.clientData.direccion.pais;
          if (country) {
            this.local_states = this.countries[country].states;
          }
        }
      }else{
        this.setStatusRequestClient(false);
        this.setMessageClient("Error al realizar búsqueda de países");
      }
    },
    assingCountriesResultLocal(data) {
      this.setAllCountries(data);
      let countryKey = Object.keys(this.countries);
      if (countryKey.length > 0) {
        for (let key in countryKey) {
          this.local_countries.push({
            id: this.countries[countryKey[key]].value,
            text: this.countries[countryKey[key]].name,
          });
        }
      }
      if (this.clientData.direccion.pais) {
        let country = this.clientData.direccion.pais;
        if (country) {
          this.local_states = this.countries[country].states;
        }
      }
    },
    getBillingInformation() {
      try {
        let self = this;
        console.debug(self);
        let str = "var https = null;";
        str += "var urlModule = null;";
        str += 'require(["N/url", "N/https"], function(urlModule, https){';
        str += "var url = urlModule.resolveScript({";
        str += 'scriptId: "customscript_efx_kiosko_service_config",';
        str += 'deploymentId: "customdeploy_efx_kiosko_service_config",';
        str += "returnExternalUrl: true";
        str += "});";

        // str += "var start=new Date();";
        // str += "self.setStart(start);";

        str += "https.post.promise({";
        str += "url: url,";
        str += "body: {custparam_mode: 'getBillingData'},";
        str +=
          "headers:{ }}).then(function(response) {self.assingBillingInfoResult(JSON.parse(response.body));}).catch(function(reason){console.log(reason)});";
        str += "});";
        eval(str);
        // this.setStatusRequestClient(true);
      } catch (err) {
        console.error(err);
        this.setStatusRequestClient(false);
        this.setMessageClient("Error al realizar petición para obtener información de facturación");

      }
    },

    assingBillingInfoResult(data) {
      if (data.success === true) {
        this.setBillingInformation(data.results);
        const endTime = new Date();
        console.log("Reprinted client time:", this.startTimeLoadingClient);
        const loadingTime = endTime - this.startTimeLoadingClient;
        console.log("LOADING TIME CLIENT:", loadingTime);
        this.setStatusRequestClient(true);
        this.setMessageClient("Obtuvo información de facturación con éxito");
        this.sendTime(loadingTime, endTime);
      }else{
        this.setStatusRequestClient(false);
        this.setMessageClient(data.details);
      }
    },
    sendClient(evt) {
      evt.preventDefault();
      this.nextStep();
    },
    returnStep() {
      this.setClientData({});
      this.clearTicketSearch();
      this.setStep(null);
    },
    nextStep() {
      // this.setLoading(false);
      // console.log(dat)
      // this.setClientData(dat);
      this.setStep(2);
      let start=new Date();
        this.setStartTimeLoadingResume(start);
    },
    addContact() {
      if (this.contact_local.nombre != "" && this.contact_local.correo != "") {
        this.setAddContact(JSON.parse(JSON.stringify(this.contact_local)));
        this.contact_local.nombre = "";
        this.contact_local.correo = "";
      } else {
        this.$toast.warning(
          "Para agregar contactos debes llenar los campos de Email y Nombre>",
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
    },
    getLengthRFC(rfc) {
      if (rfc) {
        this.setTypePerson(rfc.length === 13);
      } else {
        this.setTypePerson(true);
      }
    },
    ...mapMutations([
      "setMessageClient",
      "setStatusRequestClient",
      "setAllCountries",
      "setBillingInformation",
      "setStep",
      "setAddContact",
      "setClientData",
      "setTypePerson",
      "setStartTimeLoadingResume"
    ]),
    ...mapActions(["clearTicketSearch"]),
  },
};
</script>

<style scoped>
.field {
  padding: 0.2rem;
}

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
