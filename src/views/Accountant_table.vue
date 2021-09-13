<template>
  <div class="container">
    <Navbar/><br>
    <div>
      <h1 class="">
          <b-toaster
            name="b-toaster-top-right"
            class="position-absolute"
            style="top: 4px; right: 4px"
          />      
      </h1>
    </div>
    <div>
      <form @submit.prevent="searchForms">
        <input
          class="p-2"
          type="date"
          v-model="date"
        >
        <input
          class="p-2"
          type="submit"
          value="Search!"
        >
      </form>
    </div>
    <div class="overflow-auto text-center">
      <table class="table mt-2">
        <thead class="table-dark">
          <tr>
            <td>Sr. No</td>
            <td>Date</td>
            <td>Vendor name</td>
            <td>Bill No.</td>
            <td>Description</td>
            <td>Amount</td>
            <td>Expense Head</td>
            <td>File</td>
            <td>Status</td>
            <td>Remark</td>
          </tr>
        </thead>
                    
        <tbody  v-if=" status === 'Accountant'">
          <tr
            v-for="(data, idx) in formData"
            :key="data.FormID"
          >
          <template  v-if=" data.billStatus === 'pending'" >  
              <td>{{ idx }}</td>
              <td>{{ data.date }}</td>
              <td>{{ data.vendor }}</td>
              <td>{{ data.billNumber }}</td>
              <td>{{ data.description }}</td>
              <td>₹ {{ data.amount }}</td>
              <td>{{ data.expenseHead }}</td>
              <td>
                <a
                  :href="data.uploadFilePath"
                  target="_blank"
                ><button class="btn btn-sm btn-primary">View</button></a>
              </td>
              <td>
                <button
                  class="btn btn-sm btn-success m-1"
                  @click="approveBill(data)"
                >
                  Approve
                </button>
                <button
                  class="btn btn-sm btn-danger m-1"
                  @click="rejectBill(data)"
                >
                  Reject
                </button>
              </td>
              <td>
                <textarea
                  class="form-control"
                  rows="2"
                  placeholder="Type remark if rejected!"
                  v-model="remark"
                />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
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
import MQL from '@/plugins/mql.js'
import Navbar from '@/components/common/Navbar.vue'

import {
  BToaster
} from 'bootstrap-vue'
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
  name: 'AccountantTable',
  
  data () {
    return {
      status:null,
      formData: [],
      date: '2021-12-30'
      // remark: 'Type remark if rejected!'
    }
  },
  components: {
    'b-toaster': BToaster,
    Navbar
  },
  mounted () {
    this.GetAllRequests()  
  },
  methods: { searchForms () {
    this.GetAllRequests()   
  },
  GetAllRequests () {
    const month = MONTHS[parseInt(this.date.split('-')[1], 10) - 1]
    console.log(month)
    const year = this.date.split('-')[0]
    console.log(year)
    new MQL()
      .setActivity('o.[query_1xqD5W4b5HEjiQW66cUXvoJy8e7]')
      .setData({
        fetchId: '1xqD5W4b5HEjiQW66cUXvoJy8e7',
        year: year,
        month: month
      })
      .enablePageLoader(false)
      .fetch()
      .then((rs) => {
        let res = rs.getActivity('FetchQueryData', true)
        const queryId = Object.keys(res.result)[0]
        if (res.result[queryId] !== null) {
          this.formData = res.result[queryId][0].Forms
          this.status = res.result[queryId][0].currentApprovalStatus          
        } else {
          this.formData = []
          this.status=null          
        }
      })
  }, 

  updateRequest (FormID) {
    this.expenses = this.expenses.filter((r) => r._FormID !== FormID)
  },
  approveBill (bill) {
    const month = MONTHS[parseInt(this.date.split('-')[1], 10) - 1]
    const year = this.date.split('-')[0]
    new MQL()
      .setActivity('o.[UpdatePettyCashDailyForms]')
      .showConfirmDialog(true)

      .setData({
        'FormID': bill.FormID,
        'month': month,
        'year': year,
        'Forms': [
          {
            'FormID': bill.FormID,
            'amount': bill.amount,
            'billNumber': bill.billNumber,
            'date': bill.date,
            'description': bill.description,
            'expenseHead': bill.expenseHead,
            'uploadFilePath': bill.uploadFilePath,
            'vendor': bill.vendor,
            'billStatus': 'approved'
          }
        ]
      })
      .fetch()
      .then((res) => {
        console.log(res)
        this.$bvToast.toast(`Bill Approved successfully`, {
          toaster: 'b-toaster-top-right',
          title: 'Successful',
          autoHideDelay: 4000,
          variant: 'success',
          solid: true,
          toastClass: 'toast'
        })
      })
  },
  rejectBill (bill) {
    const month = MONTHS[parseInt(this.date.split('-')[1], 10) - 1]
    const year = this.date.split('-')[0]
    const remark = this.remark
    new MQL()
      .setActivity('o.[UpdatePettyCashDailyForms]')
      .showConfirmDialog(true)

      .setData({
        'FormID': bill.FormID,
        'month': month,
        'year': year,
        'Forms': [
          {
            'FormID': bill.FormID,
            'amount': bill.amount,
            'billNumber': bill.billNumber,
            'date': bill.date,
            'description': bill.description,
            'expenseHead': bill.expenseHead,
            'uploadFilePath': bill.uploadFilePath,
            'vendor': bill.vendor,
            'billStatus': 'rejected',
            'remark': remark
          }
        ]
      })
      .fetch()
      .then((res) => {
        console.log(res)
        this.$bvToast.toast(`Bill Rejected successfully`, {
          toaster: 'b-toaster-top-right',
          title: 'Successful',
          autoHideDelay: 4000,
          variant: 'success',
          solid: true,
          toastClass: 'toast'
        })
      })
  }
  }
}
</script>
