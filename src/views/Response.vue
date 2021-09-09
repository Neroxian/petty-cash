<style scoped>
</style>

<template>
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
    <h2>Approved Bills</h2>
    <table class="table table-secondary text-center mt-3">
      <thead class="table-dark">
        <tr>
          <th scope="col">
            Sr no.
          </th>
          <th scope="col">
            Date
          </th>
          <th scope="col">
            Vendor
          </th>
          <th scope="col">
            Bill Number
          </th>
          <th scope="col">
            Description
          </th>
          <th scope="col">
            Amount
          </th>
          <th scope="col">
            Expense Head
          </th>
          <th scope="col">
            View
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(data, idx) in formData"
          :key="data.FormID"
        >
          <template v-if="data.billStatus === 'approved'">
            <td>{{ idx+1 }}</td>
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
          </template>
        </tr>
      </tbody>
    </table>

    <h2 class="mt-3">
      Rejected Bills
    </h2>
    <table class="table table-secondary text-center mt-3">
      <thead class="table-dark">
        <tr>
          <th scope="col">
            Sr no.
          </th>
          <th scope="col">
            Date
          </th>
          <th scope="col">
            Vendor
          </th>
          <th scope="col">
            Bill Number
          </th>
          <th scope="col">
            Description
          </th>
          <th scope="col">
            Amount
          </th>
          <th scope="col">
            Expense Head
          </th>
          <th scope="col">
            View
          </th>
          <th scope="col">
            Remark
          </th>
          <th scope="col">
            Update
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(data, idx) in formData"
          :key="data.FormID"
        >
          <template v-if="data.billStatus === 'rejected'">
            <td>{{ idx+1 }}</td>
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
            <td>{{ data.remark }}</td>
            <td><button>Update</button></td>
          </template>
        </tr>
      </tbody>
    </table>
    <div class="m-1">
      <label for="myfile">Upload Reimbursement Form: </label>
      <input
        type="file"
        id="myfile"
        name="myfile"
      >
    </div>
    <div class="m-1">
      <label for="myfile">Upload T Form: </label>
      <input
        type="file"
        id="myfile"
        name="myfile"
      >
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
import MQL from '@/plugins/mql.js'
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
      formData: [],
      date: '2021-12-30'
      // remark: 'Type remark if rejected!'
    }
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
        } else {
          this.formData = []
        }
      })
  }
  }
}

</script>
