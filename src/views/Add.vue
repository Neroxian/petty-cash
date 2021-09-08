<template>
  <div class="container">
    <nav class="navbar navbar-light">
      <div class="container row text-center">
        <div class="col col-lg-7 col-md-7 col-sm-12 col-12">
          <h2>MKCL’s Petty Cash Expenses</h2>
        </div>
        <div class="col col-lg-5 col-md-5 col-sm-12 col-12">
          <form class="nav-btn">
            <router-link to="/Historyn">
              <button class="btn btn-dark mx-2" type="submit">History</button>
            </router-link>
            <router-link to="/Response">
              <button class="btn btn-dark mx-2" type="submit">Response</button>
            </router-link>
          </form>
        </div>
      </div>
    </nav>
    <form>
      <div class="container row text-center">
        <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
          <input
            v-model.lazy="info.date"
            class="form-control"
            type="date"
            name="Date"
            min="1999-12-31"
            max="2030-12-31"
          />
        </div>
        <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
          <select
            v-model.lazy="info.office"
            class="custom-select"
            aria-label="Office wing"
          >
            <!-- <option selected></option> -->
            <option value="" disabled selected>Office wing</option>
            <option value="Wing A">A</option>
            <option value="Wing B">B</option>
          </select>
        </div>
      </div>
      <div class="container row add-detail">
        <div class="col-12 col-lg-6 col-md-6 col-sm-12">
          <label for="vendor-name">Vendor name :</label>
          <select
            id="vendor-name"
            v-model.lazy="info.vname"
            class="custom-select"
          >
            <option
              v-for="vendor in vendors"
              :value="vendor.vendorName"
              :key="vendor._id"
            >
              {{ vendor.vendorName }}
            </option>
          </select>
          <div>
            <button
              class="btn btn-sm btn-outline-dark"
              type="button"
              @click="showAddVendor = !showAddVendor"
            >
              Add vendor
            </button>
            <div v-if="showAddVendor" class="optional">
              <form @submit.prevent="CreateNewVendor">
                <input
                  class="form-control add-form add-form-list"
                  type="text"
                  v-model="newVendorName"
                /><button class="btn btn-sm btn-danger m-1 ml-1" type="submit">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6 col-md-6 col-sm-12">
          <label>Bill number :</label>
          <input
            v-model.lazy="info.billno"
            type="text"
            class="form-control add-form"
          />
        </div>
      </div>

      <div class="container row add-detail">
        <div class="col-12 col-lg-6 col-md-6 col-sm-12">
          <label>Description :</label>
          <input
            v-model.lazy="info.description"
            type="text"
            class="form-control add-form"
          />
        </div>
        <div class="col-12 col-lg-6 col-md-6 col-sm-12">
          <label>Total amount :</label>
          <input
            v-model.lazy="info.amount"
            type="text"
            class="form-control add-form"
          />
        </div>
      </div>

      <div class="container row add-detail">
        <div class="col-12 col-lg-6 col-md-6 col-sm-12">
          <label>Expense Head :</label>
          <select v-model.lazy="info.head" class="custom-select">
            <!-- <option selected></option> -->
            <option
              v-for="expenseHead in expenseHeads"
              :value="expenseHead.headName"
              :key="expenseHead._id"
            >
              {{ expenseHead.headName }}
            </option>
          </select>
          <div>
            <button
              class="btn btn-sm btn-outline-dark"
              type="button"
              @click="showAddHead = !showAddHead"
            >
              Add Head
            </button>
            <div v-if="showAddHead" class="optional">
              <form @submit.prevent="CreateNewHead">
                <input
                  class="form-control add-form add-form-list"
                  type="text"
                  v-model="newHeadName"
                />
                <button class="btn btn-sm btn-danger m-1 ml-1" type="button">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6 col-md-6 col-sm-12">
          <label for="formFile" class="form-label">Upload bill :</label>
          <input
            class="form-control add-form choose ml-1"
            type="file"
            id="formFile"
            style="border: 1px solid black; padding: 5px"
            @change="handleFileChange"
          />
          <button type="button" id="uploadtBtn" @click="uploadFile">
            Upload file
          </button>
        </div>
      </div>

      <div class="text-center">
        <button
          @click.prevent="CreateNewForm()"
          class="btn btn-success mb-3"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
    <AddedTable :data="data" />
  </div>
</template>

<script>
import AddedTable from "@/components/AddedTable.vue";
import MQL from "@/plugins/mql.js";
import { v4 as uuidv4 } from "uuid";
import MQLCdn from "@/plugins/mqlCdn.js";

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export default {
  components: { AddedTable },
  name: "Add",
  data() {
    return {
      vendors: [],
      expenseHeads: [],
      showAddVendor: false,
      showAddHead: false,
      newVendorName: "",
      newHeadName: "",
      formFile: null,
      uploadedFilePath: null,
      info: {
        vname: "",
        billno: "",
        description: "",
        head: "",
        amount: "",
        date: "",
        office: "",
      },
      data: [],
    };
  },
  mounted() {
    this.GetAllVendors();
    this.GetAllExpenseHeads();
  },
  methods: {
    handleFileChange(e) {
      console.log("Handle printing file data");
      console.log(e.target.files[0]);
      this.formFile = e.target.files[0];
    },
    uploadFile() {
      let formData = new FormData();
      formData.append("file", this.formFile);
      new MQLCdn()
        .setDirectoryPath("/PettyCashDailyFormData")
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
            this.uploadedFilePath = res.uploadedFileURL().cdnServer + '/' + res.uploadedFileURL().filePath; // returns uploaded file url..
            console.log("res cdn path", this.uploadedFilePath);
            this.$toasted.success("file uploaded.", {
              theme: "bubble",
              position: "top-center",
              duration: 5000,
            });
          } else {
            res.showErrorToast();
          }
        });
    },
    CreateNewForm() {
      // this.uploadFile()
      // console.log(this.info.date.split("-"))
      const month = MONTHS[parseInt(this.info.date.split("-")[1], 10) - 1]
      console.log(month)
      const year = this.info.date.split("-")[0]
      console.log(year)
      new MQL()
        .setActivity("o.[CreatePettyCashForms]")
        .setData("CreatePettyCashForms", {
          Forms: [
            {
              amount: this.info.amount,
              uploadFilePath: this.uploadedFilePath,
              billNumber: this.info.billno,
              date: this.info.date,
              description: this.info.description,
              heads: this.info.head,
              vendor: this.info.vname,
              FormID: uuidv4(),
            },
          ],
          currentApprovalStatus: "centeral manager",
          month: month,
          workflowStage: "1",
          year: year,
        })
        .enablePageLoader(true)
        .showConfirmDialog(true)
        .fetch("a11")
        .then((res) => {
          console.log(res);
          // let r = res.getRaw(true)
          console.log(res.isValid());
        });
    },
    CreateNewVendor() {
      console.log("FAK")
      new MQL()
        .setActivity("o.[CreatePettyCashVendors]")
        .setData("CreatePettyCashVendors", {
          vendorName: this.newVendorName,
        })
        .enablePageLoader(true)
        .showConfirmDialog(true)
        .fetch()
        .then((rs) => {
          // console.log("Vendor new data", rs)
          // console.log();
          // console.log(id)
          this.vendors.push({
            _id: rs.getActivity("CreatePettyCashVendors").result.objectId,
            vendorName: this.newVendorName
          })
        });
    },
    CreateNewHead() {
      new MQL()
        .setActivity("o.[CreatePettyCashHeads]")
        .setData("CreatePettyCashHeads", {
          headName: this.newHeadName,
        })
        .enablePageLoader(true)
        .showConfirmDialog(true)
        .fetch()
        .then((rs) => {
          // console.log("Vendor new data", rs)
          // console.log(rs.getActivity("CreatePettyCashHeads"));
          console.log(rs)
      });
    },
    GetAllVendors() {
      new MQL()
        .setActivity("o.[query_1xngjEpKzNb6dT7z4tFQnjry25L]")
        .enablePageLoader(false)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("query_1xngjEpKzNb6dT7z4tFQnjry25L", true);
          console.log("Printing Vendors");
          console.log("Vendor details", res);
          this.vendors = res;
        });
    },
    GetAllExpenseHeads() {
      new MQL()
        .setActivity("o.[query_1xnNEghekZ7jZ973K8pbNTLb639]")
        .enablePageLoader(false)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("query_1xnNEghekZ7jZ973K8pbNTLb639", true);
          this.expenseHeads = res;
        });
    },
    adddata() {
      this.data.push({
        ...this.info,
      });
    },
  },
};
</script>

<style scoped>
.row {
  margin: 0;
  padding: 0;
}
nav {
  margin: 10px 0 30px 0;
}
.form-select,
.form-control {
  width: 60%;
  border: 1px solid black;
  box-shadow: none;
  display: inline-block;
}
.add-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.3rem;
}
.add-form {
  padding: 0;
  border-radius: 0;
  border: none;
  width: 70%;
  border-bottom: 1px solid black;
}
.custom-select {
  width: 70%;
  border: none;
  border-bottom: 1px solid black;
}
.choose {
  padding-left: 10px;
  border-radius: 3px;
}
.add-form-list {
  width: 70%;
}
.optional {
  float: right !important;
}
</style>
/* eslint-disable */
