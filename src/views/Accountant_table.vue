<template>
<div class="container">
    <div>
    <h1 class="">
        <router-link to="/Add" style="color:black">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg></router-link>
    MKCL’s Petty Cash Expenses</h1>
    </div>
        <div class="overflow-auto text-center">
        <table class="table mt-2">
            <thead class="table-dark">
            <tr >
                <td>Form ID</td>
                <td>Date</td>
                <td>Vendor name</td>
                <td>Bill No.</td>
                <td>Description</td>
                <td>Amount</td>
                <td>Expense Head</td>
                <td>File</td>
                <td>Status</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data, idx) in formData" :key="data.FormID">
                <td>{{ idx + 1 }}</td>
                <td>{{ data.date }}</td>
                <td>{{ data.vendor }}</td>
                <td>{{ data.billNumber }}</td>
                <td>{{ data.description }}</td>
                <td>₹ {{ data.amount }}</td>
                <td>{{ data.heads }}</td>
                <td>
                <a :href="data.uploadFilePath" target="_blank"><button class="btn btn-sm btn-primary">View</button></a>
                </td>
                <td>
                    <button class="btn btn-sm btn-success m-1">Approve</button>
                    <button class="btn btn-sm btn-danger m-1">Reject</button>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
        <h4>Rejected Bill</h4>
        <div class="overflow-auto text-center">
        <table class="table mt-2">
            <thead class="table-dark">
            <tr >
                <td>Form ID</td>
                <td>Date</td>
                <td>Vendor name</td>
                <td>Bill No.</td>
                <td>Description</td>
                <td>Amount</td>
                <td>Expense Head</td>
                <td>File</td>
                <td>Status</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data, idx) in formData" :key="data.FormID">
                <td>{{ idx + 1 }}</td>
                <td>{{ data.date }}</td>
                <td>{{ data.vendor }}</td>
                <td>{{ data.billNumber }}</td>
                <td>{{ data.description }}</td>
                <td>₹ {{ data.amount }}</td>
                <td>{{ data.heads }}</td>
                <td>
                <a :href="data.uploadFilePath" target="_blank"><button class="btn btn-sm btn-primary">View</button></a>
                </td>
                <td>Rejected</td>
            </tr>
            </tbody>
        </table>
        </div>
         <div class="row container form-group ">
            <div class="col-lg-1 col-md-1 col-12 p-0"><label for="exampleFormControlTextarea1">Remark :</label></div>
            <div class="col-lg-11 col-md-11 col-12 p-0"><textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div>
        </div>
        <div class="text-center"><button class="btn btn-danger m-3" type="submit">Approve</button></div>
</div>
</template>

<style scoped>
    textarea:focus{
        border: 1px solid black;
        box-shadow: none;
    }
    .row{
        margin: 0;
        padding: 0;
    }
    td{
        padding: 0.4rem;
        border: 1px solid gray; 
    }
</style>

<script>
import MQL from "@/plugins/mql.js";

const MONTHS = [
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
];

export default {
    name : 'Accountant_table',
    data(){
        return{
            formData: [],
            date: "2021-10-30",
        }
    },
    mounted() {
    this.GetAllRequests();
  },
  methods: {
    GetAllRequests() {
      const month = MONTHS[parseInt(this.date.split("-")[1], 10) - 1];
      console.log(month);
      const year = this.date.split("-")[0];
      console.log(year);
      new MQL()
        .setActivity("o.[query_1xqD5W4b5HEjiQW66cUXvoJy8e7]")
        .setData({
          fetchId: "1xqD5W4b5HEjiQW66cUXvoJy8e7",
          year: year,
          month: month,
        })
        .enablePageLoader(false)
        .fetch()
        .then((rs) => {
          // console.log(rs);
          let res = rs.getActivity("FetchQueryData", true);
          // console.log(rs.getActivity("FetchQueryData", true));
          // console.log(res.result);
          const queryId = Object.keys(res.result)[0]
          if (res.result[queryId] !== null) {
            this.formData = res.result[queryId][0].Forms
          } else {
            this.formData = []
          }
          // console.log(formData)
        });
    },
    updateRequest(FormID) {
      this.expenses = this.expenses.filter((r) => r._FormID !== FormID);
    },
  }
}
</script>