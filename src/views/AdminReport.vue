<template>
  <div id="Report">
    <Navbar /><br />
    <form @submit.prevent="ReportGenration">
      <p class="h4 text-center mb-4">Find Report</p>
      <b-row align-h="center" rows="1">
        <b-col cols="2"
          ><label for="monthEx" class="grey-text"
            >Month</label
          ></b-col
        >
        <b-col cols="3">
          <b-form-select for="monthEx" v-model="month" :options="MONTHS"></b-form-select>
        </b-col>
      </b-row><br>
      <b-row align-h="center" rows="2">
        <b-col cols="2"
          ><label for="yearEX" class="grey-text"
            >Year</label
          ></b-col
        >
        <b-col cols="3"
          ><input
            type="number"
            id="yearEx"
            v-model="password"
            class="form-control"
        /></b-col>
      </b-row>
      <div class="text-center mt-4">
        <button class="btn btn-success" type="submit">Download Report</button>
      </div>
    </form>
  </div>
</template>
<script>
import Navbar from "@/components/common/Navbar.vue";

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
    };
  },
};
</script>
