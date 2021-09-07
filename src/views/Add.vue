<template>
  <div class="container">
    <nav class="navbar navbar-light">
      <div class="container row text-center">
        <div class="col col-lg-7 col-md-7 col-sm-12 col-12">
          <h1>MKCL’s Petty Cash Expenses</h1>
        </div>
        <div class="col col-lg-5 col-md-5 col-sm-12 col-12">
          <form class="nav-btn">
            <router-link
              to="/History"
            >
              <button
                class="btn btn-dark mx-2"
                type="submit"
              >
                History
              </button>
            </router-link>
            <button
              class="btn btn-dark mx-2"
              type="submit"
            >
              Report
            </button>
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
          >
        </div>
        <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
          <select
            v-model.lazy="info.office"
            class="custom-select"
            aria-label="Office wing"
          >
            <!-- <option selected></option> -->
            <option
              value=""
              disabled
              selected
            >
              Office wing
            </option>
            <option value="Wing A">
              A
            </option>
            <option value="Wing B">
              B
            </option>
          </select>
        </div>
      </div>
      <div class="container row add-detail">
        <div class="col-12 col-lg-6 col-md-6 col-sm-12">
          <label for="vendor-name">Vendor name :</label>
          <select
            id="vendor-name"
            v-model.lazy="info.vendor"
            class="custom-select"
          >
            <option
              v-for="vendor in vendors"
              :value="vendor._id"
              :key="vendor._id"
            >
              {{ vendor.vendorName }}
            </option>
          </select>
          <div>
            <button
              type="button"
              @click="showAddVendor = !showAddVendor"
            >
              Show
            </button>
            <div v-if="showAddVendor">
              <form @submit.prevent="CreateNewVendor">
                <input
                  type="text"
                  v-model="newVendorName"
                >
                <input
                  type="submit"
                  value="Add Vendor"
                >
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
          >
        </div>
      </div>

      <div class="container row add-detail">
        <div class="col-12 col-lg-6 col-md-6 col-sm-12">
          <label>Description :</label>
          <input
            v-model.lazy="info.description"
            type="text"
            class="form-control add-form"
          >
        </div>
        <div class="col-12 col-lg-6 col-md-6 col-sm-12">
          <label>Total amount :</label>
          <input
            v-model.lazy="info.amount"
            type="text"
            class="form-control add-form"
          >
        </div>
      </div>

      <div class="container row add-detail">
        <div class="col-12 col-lg-6 col-md-6 col-sm-12">
          <label>Expense Head :</label>
          <select
            v-model.lazy="info.head"
            class="custom-select"
          >
            <!-- <option selected></option> -->
            <option
              v-for="expenseHead in expenseHeads"
              :value="expenseHead._id"
              :key="expenseHead._id"
            >
              {{ expenseHead.headName }}
            </option>
          </select>
          <div>
            <button
              type="button"
              @click="showAddHead = !showAddHead"
            >
              Show
            </button>
            <div v-if="showAddHead">
              <form @submit.prevent="CreateNewHead">
                <input
                  type="text"
                  v-model="newHeadName"
                >
                <input
                  type="submit"
                  value="Add Head"
                >
              </form>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6 col-md-6 col-sm-12">
          <label
            for="formFile"
            class="form-label"
          >Choose File :</label>
          <input
            class="form-control add-form choose"
            type="file"
            id="formFile"
            @change="handleFileChange"
          >
          <button
            id="uploadtBtn"
            @click="uploadFile"
          >
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
import AddedTable from '@/components/AddedTable.vue'
import MQL from '@/plugins/mql.js'
import MQLCdn from '@/plugins/mqlCdn.js'
import { v4 as uuidv4 } from 'uuid'
export default {
  components: { AddedTable },
  name: 'Add',
  data () {
    return {
      vendors: [],
      expenseHeads: [],
      showAddVendor: false,
      showAddHead: false,
      newVendorName: '',
      newHeadName: '',
      formFile: null,
      uploadedFilePath: null,
      info: {
        vname: '',
        billno: '',
        description: '',
        head: '',
        amount: '',
        date: '',
        office: ''
      },
      data: []
    }
  },
  mounted () {
    this.GetAllVendors()
    this.GetAllExpenseHeads()
    // console.log('INSIDE ADMIn mounted ')
    // setInterval(() => {
    //   this.GetAllRequests()
    // }, 2000)
    // console.log(this.requests)
  },
  methods: {
    handleFileChange (e) {
      // console.log(e.target.files[0])
      this.formFile = e.target.files[0]
    },
    uploadFile () {
      let formData = new FormData()
      formData.append('file', this.formFile)
      new MQLCdn()
      // // FIXED: change this to directory path
      //   .setDirectoryPath('/demoFolder')// (optional field) if you want to save
      // // file to specific directory path
        .setFormData(formData) // (required) sets file data
        .setFileName('Pranjal') // (optional field) if you want to set name to
      // file that is being uploaded
      // FIXED: pass buckeyKey instead of name
        .setBucketKey('1xnt9sQlNf6XVS9zQHE8Tw05tzR')// (required) valid bucket key need to set in which file will be uploaded.
        .setPurposeId('1xnsw8jkWppWVLosh1cGnqbXPWJ')// (required) valid purposeId need to set in which file will be uploaded.
      // same as purposeID
        .setClientId('1xnsw8jkWppWVLosh1cGnqbXPWJ')// (required) valid purposeId need to set in which file will be uploaded.
        .uploadFile('uploadtBtn')
        .then(res => {
          // (required) this will upload file takes element id (optional param)
          // which will be blocked while file upload..
          console.log(res)
          if (res.isValid()) {
            this.uploadedFilePath = res.uploadedFileURL()// returns uploaded file url..
            console.log('res cdn path', this.uploadedFilePath)
            // this.$toasted.success('file uploaded.', {
            //   theme: 'bubble',
            //   position: 'top-center',
            //   duration: 5000
            // })
          } else {
            res.showErrorToast()
          }
        })
    },
    CreateNewForm () {
      // this.uploadFile()
      new MQL()
        .setActivity('o.[CreatePettyCashForms]')
        .setData('CreatePettyCashForms', {
          'Forms': [
            {
              'amount': 3244,
              'uploadFilePath': this.uploadFilePath,
              'billNumber': '27299',
              'date': '3/8/2021',
              'description': 'WD-40 chemical for office',
              'heads': 'Pantry Expenses',
              'vendor': 'Prnajal urban Kirana',
              'FormID': uuidv4()
            }
          ],
          'currentApprovalStatus': 'centeral manager',
          'month': 'March',
          'workflowStage': '1',
          'year': '2021'
        })
        .enablePageLoader(true)
        .showConfirmDialog(true)
        .fetch('a11')
        .then((res) => {
          console.log(res)
          // let r = res.getRaw(true)
          console.log(res.isValid())
        })
    },
    CreateNewVendor () {
      new MQL()
        .setActivity('o.[CreatePettyCashVendors]')
        .setData('CreatePettyCashVendors', {
          vendorName: this.newVendorName
        })
        .enablePageLoader(true)
        .showConfirmDialog(true)
        .fetch()
        .then(rs => {
          // console.log("Vendor new data", rs)
          console.log(rs.getActivity('CreatePettyCashVendors'))
        })
    },
    CreateNewHead () {
      new MQL()
        .setActivity('o.[CreatePettyCashHeads]')
        .setData('CreatePettyCashHeads', {
          headName: this.newHeadName
        })
        .enablePageLoader(true)
        .showConfirmDialog(true)
        .fetch()
        .then(rs => {
          // console.log("Vendor new data", rs)
          console.log(rs.getActivity('CreatePettyCashHeads'))
        })
    },
    GetAllVendors () {
      new MQL()
        .setActivity('o.[query_1xngjEpKzNb6dT7z4tFQnjry25L]')
        .enablePageLoader(false)
        .fetch()
        .then(rs => {
          let res = rs.getActivity('query_1xngjEpKzNb6dT7z4tFQnjry25L', true)
          console.log('Printing Vendors')
          console.log('Vendor details', res)
          this.vendors = res
        })
    },
    GetAllExpenseHeads () {
      new MQL()
        .setActivity('o.[query_1xnNEghekZ7jZ973K8pbNTLb639]')
        .enablePageLoader(false)
        .fetch()
        .then(rs => {
          let res = rs.getActivity('query_1xnNEghekZ7jZ973K8pbNTLb639', true)
          console.log('Printing Heads')
          console.log(res)
          this.expenseHeads = res
        })
    },
    adddata () {
      this.data.push({
        ...this.info
      })
    }
  }
}
</script>

<style scoped>
.row {
  margin: 0;
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
  margin: 40px;
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
</style>
/* eslint-disable */
