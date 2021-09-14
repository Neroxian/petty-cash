<style scoped>
table{
  border: 1px solid black;
}
h3{
  font-weight: 600;
}
</style>

<template>
  <div>
    <Navbar /><br />
    <form @submit.prevent="searchForms">
      <input class="p-1" type="date" v-model="date" />
      <input class="p-1" type="submit" value="Search!" />
    </form>
    <h3 class="mt-2">Approved Bills</h3>
    <table class="table table-secondary text-center mt-1">
      <thead class="table-dark">
        <tr>
          <th scope="col">Sr no.</th>
          <th scope="col">Date</th>
          <th scope="col">Vendor</th>
          <th scope="col">Bill Number</th>
          <th scope="col">Description</th>
          <th scope="col">Amount</th>
          <th scope="col">Expense Head</th>
          <th scope="col">View</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, idx) in formData" :key="data.FormID">
          <template v-if="data.billStatus === 'approved'">
            <td>{{ idx + 1 }}</td>
            <td>{{ data.date }}</td>
            <td>{{ data.vendor }}</td>
            <td>{{ data.billNumber }}</td>
            <td>{{ data.description }}</td>
            <td>₹ {{ data.amount }}</td>
            <td>{{ data.expenseHead }}</td>
            <td>
              <a :href="data.uploadFilePath" target="_blank"
                ><button class="btn btn-sm btn-primary">View</button></a
              >
            </td>
          </template>
        </tr>
      </tbody>
    </table>

    <h3 class="mt-4">Rejected Bills</h3>
    <table class="table table-secondary text-center mt-1">
      <thead class="table-dark">
        <tr>
          <th scope="col">Sr no.</th>
          <th scope="col">Date</th>
          <th scope="col">Vendor</th>
          <th scope="col">Bill Number</th>
          <th scope="col">Description</th>
          <th scope="col">Amount</th>
          <th scope="col">Expense Head</th>
          <th scope="col">View</th>
          <th scope="col">Remark</th>
          <th scope="col">Update</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, idx) in formData" :key="data.FormID">
          <template v-if="data.billStatus === 'rejected'">
            <td>{{ idx + 1 }}</td>
            <td>{{ data.date }}</td>
            <td>{{ data.vendor }}</td>
            <td>{{ data.billNumber }}</td>
            <td>{{ data.description }}</td>
            <td>₹ {{ data.amount }}</td>
            <td>{{ data.expenseHead }}</td>
            <td>
              <a :href="data.uploadFilePath" target="_blank"
                ><button class="btn btn-sm btn-primary">View</button></a
              >
            </td>
            <td>{{ data.remark }}</td>
            <td><button>Update</button></td>
          </template>
        </tr>
      </tbody>
    </table>
    <div class="mt-5">
      <div class="m-1">
      <label for="myfile">Upload Reimbursement Form : </label>
      <input
        type="file"
        id="DataForm"
        name="myfile"
        @change="handleFileChange"
      />
    </div>
    <button class="btn btn-outline-dark btn-sm" type="button" id="uploadtBtn" @click="uploadFile('form1')">
      Upload file
    </button>
    <div class="m-1">
      <label for="myfile">Upload Settlement Form : </label>
      <input
        type="file"
        id="DataForm"
        name="myfile"
        @change="handleFileChange"
      />
    </div>
    </div>
    <button class="btn btn-outline-dark btn-sm" type="button" id="uploadtBtn" @click="uploadFile('form2')">
      Upload file
    </button>
     <div class="text-center">
      <button class="btn btn-primary mb-3" @click="formUpload">
        Submit
      </button>
    </div>
    
  </div>
</template>

<script>
import MQL from "@/plugins/mql.js";
import Navbar from "@/components/common/Navbar.vue";
import MQLCdn from "@/plugins/mqlCdn.js";
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
  name: "AccountantTable",
  components: { Navbar },
  data() {
    return {
      formData: [],
      date: "2021-12-30",
      // remark: 'Type remark if rejected!'
      DataForm: null,
      rembFormPath: null,
      settelFormPath: null,
    };
  },
  mounted() {
    this.GetAllRequests();
  },
  methods: {
    searchForms() {
      this.GetAllRequests();
    },
    handleFileChange(e) {
      console.log("Handle printing file data");
      console.log(e.target.files[0]);
      this.DataForm = e.target.files[0];
    },
    uploadFile(form) {
      let formData = new FormData();
      formData.append("file", this.DataForm);
      new MQLCdn()
        .setDirectoryPath("/PettyCashReimbursementForm")
        .setFormData(formData) // (required) sets file data
        .setFileName(Date.now() + "_bill") // (optional field) if you want to set name to
        .setBucketKey("1xnt9sQlNf6XVS9zQHE8Tw05tzR") // (required) valid bucket key need to set in which file will be uploaded.
        .setPurposeId("1xnsw8jkWppWVLosh1cGnqbXPWJ") // (required) valid purposeId need to set in which file will be uploaded.
        // same as purposeID
        .setClientId("1xnt9sQlNf6XVS9zQHE8Tw05tzR") // (required) valid purposeId need to set in which file will be uploaded.
        .uploadFile("uploadtBtn")
        .then((res) => {
          // (required) this will upload file takes element id (optional param)
          // which will be blocked while file upload..
          console.log(res.uploadedFileURL());
          if (res.isValid()) {
            if (form === "form1") {
              console.log("I am in form 1")
              this.rembFormPath =
                res.uploadedFileURL().cdnServer +
                "/" +
                res.uploadedFileURL().filePath; // returns uploaded file url..
              console.log("res cdn path", this.rembFormPath);
              this.$toasted.success("file uploaded.", {
                theme: "bubble",
                position: "top-center",
                duration: 5000,
              });
            } else if (form === "form2") {
              console.log("I am in form2")
              this.settelFormPath =
                res.uploadedFileURL().cdnServer +
                "/" +
                res.uploadedFileURL().filePath; // returns uploaded file url..
              console.log("res cdn path", this.settelFormPath);
              this.$toasted.success("file uploaded.", {
                theme: "bubble",
                position: "top-center",
                duration: 5000,
              });
            }
          } else {
            res.showErrorToast();
          }
        });
    },
    formUpload() {
      const month = MONTHS[parseInt(this.date.split("-")[1], 10) - 1];
      console.log(month);
      const year = this.date.split("-")[0];
      console.log(year);
      new MQL()
        .setActivity("o.[UpdatePettyCashForms]")
        .showConfirmDialog(true)

        .setData({
          month: month,
          year: year,
          rembFormPath: this.rembFormPath,
          settelFormPath: this.settelFormPath,
        })
        .fetch()
        .then((res) => {
          console.log(res);
        });
    },

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
          let res = rs.getActivity("FetchQueryData", true);
          const queryId = Object.keys(res.result)[0];
          if (res.result[queryId] !== null) {
            this.formData = res.result[queryId][0].Forms;
          } else {
            this.formData = [];
          }
        });
    },
  },
};
</script>
