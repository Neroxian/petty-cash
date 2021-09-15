<template>
  <div id="Report">
    <Navbar /><br />
    <form @submit.prevent="testfuc">
      <p class="h4 text-center mb-4">Find Report</p>
      <b-row align-h="center" rows="1">
        <b-col cols="2">
          <label for="monthEx" class="grey-text">Month</label>
        </b-col>
        <b-col cols="3">
          <b-form-select for="monthEx" v-model="month" :options="MONTHS" />
        </b-col> </b-row
      ><br />
      <b-row align-h="center" rows="2">
        <b-col cols="2">
          <label for="yearEX" class="grey-text">Year</label>
        </b-col>
        <b-col cols="3">
          <input
            type="number"
            id="yearEx"
            v-model="year"
            class="form-control"
          />
        </b-col>
      </b-row>
      <div class="text-center mt-4">
        <button class="btn btn-success" type="submit">Download Report</button>
      </div>
    </form>
    <div class="container" style="height: 100vh; width: 100vw"></div>
  </div>
</template>
<script>
import Navbar from "@/components/common/Navbar.vue";
import PSPDFKit from "pspdfkit";
import MQL from '@/plugins/mql.js'

// const baseUrl = `${window.location.protocol}//${window.location.host}/`;
export default {
  name: "Report",
  components: {
    Navbar,
  },
  data() {
    return {
      MONTHS: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      month: null,
      instance: null,
      year: null,
    };
  },
  mounted() {
    this.ReportGenration();
    this.GetAllRequests();
  },
  methods: {
    ReportGenration() {
      PSPDFKit.load({
        document:
         "https://testcdncs.mkcl.org/1xnt9sQlNf6XVS9zQHE8Tw05tzR/PettyCashReimbursementForm/1631553338801_bill.pdf",
        container: ".container",
      }).then((instance) => {
        this.instance = instance;
        // console.log(this.instance)
      });
    },
    testfuc() {
      console.log(this.instance);
      fetch("https://testcdncs.mkcl.org/1xnt9sQlNf6XVS9zQHE8Tw05tzR/PettyCashReimbursementForm/1631553338801_bill.pdf")
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res;
        })
        .then((res) => res.blob())
        .then((blob) => {
          this.instance.applyOperations([
            {
              type: "importDocument",
            //   importedPageIndexes: [2, 4, [7, 10]],
              beforePageIndex: 3,
              document: blob,
              treatImportedDocumentAsOnePage: false,
            },
          ]);
        });
    },
    GetAllRequests () {   
    new MQL()
      .setActivity('o.[query_1xqD5W4b5HEjiQW66cUXvoJy8e7]')
      .setData({
        fetchId: '1xqD5W4b5HEjiQW66cUXvoJy8e7',
        year:"October",
        month: "2021"
      })
      .enablePageLoader(false)
      .fetch()
      .then((rs) => {
        let res = rs.getActivity('FetchQueryData', true)
        const queryId = Object.keys(res.result)[0]
        if (res.result[queryId] !== null) {
          this.formData = res.result[queryId][0]
          console.log(this.formData)
          
        } else {
          this.formData = []
        
        }
      })
    },

  },
};
</script>
