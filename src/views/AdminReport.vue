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
