<template>
  <div class="container">
    <div>
      <h1 class="mb-4">
        <router-link to="/Add" style="color: black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            /></svg
        ></router-link>
        MKCL’s Petty Cash Expenses
      </h1>
    </div>

    <div>
      <form @submit.prevent="searchForms">
        <input class="p-2" type="date" v-model="date" />
        <input class="p-2" type="submit" value="Search!" />
      </form>
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

    <div class="text-center">
      <button
        type="button"
        class="btn btn-outline-primary m-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Denomination
      </button>

      <!-- Modal -->
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
            <div class="modal-body">
              <table class="table table-bordered table-hover">
                <tbody>
                  <tr>
                    <td class="deno">₹2000 note</td>
                    <td class="deno">
                      <input
                        type="text"
                        placeholder="0"
                        v-model="expenses.twoThousands.num"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="deno">₹500 note</td>
                    <td class="deno">
                      <input
                        type="text"
                        placeholder="0"
                        v-model="expenses.fiveHundreds.num"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="deno">₹200 note</td>
                    <td class="deno">
                      <input
                        type="text"
                        placeholder="0"
                        v-model="expenses.twoHundreds.num"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="deno">₹100 note</td>
                    <td class="deno">
                      <input
                        type="text"
                        placeholder="0"
                        v-model="expenses.oneHundreds.num"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="deno">₹50 note</td>
                    <td class="deno">
                      <input
                        type="text"
                        placeholder="0"
                        v-model="expenses.fifties.num"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="deno">₹20 note</td>
                    <td class="deno">
                      <input
                        type="text"
                        placeholder="0"
                        v-model="expenses.twenties.num"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="deno">₹10 note/coin</td>
                    <td class="deno">
                      <input
                        type="text"
                        placeholder="0"
                        v-model="expenses.tens.num"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="deno">₹5 note/coin</td>
                    <td class="deno">
                      <input
                        type="text"
                        placeholder="0"
                        v-model="expenses.fives.num"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="deno">₹2 note/coin</td>
                    <td class="deno">
                      <input
                        type="text"
                        placeholder="0"
                        v-model="expenses.twos.num"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="deno">₹1 note/coin</td>
                    <td class="deno">
                      <input
                        type="text"
                        placeholder="0"
                        v-model="expenses.ones.num"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <h5>Total amount remaining : {{ totalAmount }}</h5>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button class="btn btn-lg btn-outline-danger mb-3" type="submit">
        Submit report
      </button>
    </div>
  </div>
</template>

<style scoped>
b-pagination {
  border: 1px solid black;
}
.btn:focus {
  box-shadow: none;
}
.deno {
  width: 50%;
}
input {
  border-radius: 5px;
  border: 1px solid rgb(190, 190, 190);
}
td {
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
  name: "Historynew",
  data() {
    return {
      perPage: 3,
      date: "2021-09-30",
      currentPage: 1,
      formData: [],
      expenses: {
        twoThousands: {
          num: 0,
          value: 2000,
        },
        fiveHundreds: {
          num: 0,
          value: 500,
        },
        twoHundreds: {
          num: 0,
          value: 200,
        },
        oneHundreds: {
          num: 0,
          value: 100,
        },
        fifties: {
          num: 0,
          value: 50,
        },
        twenties: {
          num: 0,
          value: 20,
        },
        tens: {
          num: 0,
          value: 10,
        },
        fives: {
          num: 0,
          value: 5,
        },
        twos: {
          num: 0,
          value: 2,
        },
        ones: {
          num: 0,
          value: 1,
        },
      },
    };
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
    searchForms() {
      this.GetAllRequests();
    },
  },
  computed: {
    infone: function () {
      //   console.log(this.allRequests)
      return this.allRequests.filter((i) => i.status == false);
    },
    totalAmount: function () {
      return Object.keys(this.expenses).reduce((prevValue, key) => {
        // console.log(this.expenses[b])
        return (
          prevValue +
          parseInt(this.expenses[key].num || 0, 10) * this.expenses[key].value
        );
      }, 0);
    },
  },
};
</script>
