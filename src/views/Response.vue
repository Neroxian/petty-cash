<style scoped>
.row{
        margin: 0;
        padding: 0;
    }
    td{
        padding: 0.4rem;
        border: 1px solid gray; 
    }
</style>

<template>
<div>
    <h2>Approved Bill</h2>
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
            </tr>
            </tbody>
        </table>
        </div>

    <h2 class="mt-3">Rejected Bill</h2>
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
                <td>Update</td>
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
                <td> {{ data.heads }} </td>
                <td>
                <a :href="data.uploadFilePath" target="_blank"><button class="btn btn-sm btn-primary">View</button></a>
                </td>
                <td><button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button></td>
            </tr>
            </tbody>
        </table>
        </div>

        <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Denomination Form
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
    
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>

    <div class="m-1">
        <label for="myfile">Upload R Form: </label>
        <input type="file" id="myfile" name="myfile">
    </div>
    <div class="m-1">
        <label for="myfile">Upload T Form: </label>
        <input type="file" id="myfile" name="myfile">
    </div>

    <div class="text-center">
        <button
          class="btn btn-primary mb-3"
          type="submit"
        >
          Download Report
        </button>
      </div>
</div>
</template>

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
    name: 'Response',
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
  }
}
</script>