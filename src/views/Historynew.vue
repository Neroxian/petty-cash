<template>
  <div class="container">
    <Navbar /><br />

    <div>
      <form @submit.prevent="searchForms">
        <input class="p-2" type="date" v-model="date" />
        <input class="p-2" type="submit" value="Search!" />
      </form>
    </div>

    <div class="overflow-auto text-center">
      <table class="table mt-2">
        <thead class="table-dark">
          <tr>
            <td>Sr no.</td>
            <td>Date</td>
            <td>Vendor name</td>
            <td>Bill No.</td>
            <td>Description</td>
            <td>Amount</td>
            <td>Expense Head</td>
            <td>File</td>
            <td>Actions</td>
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
              <a :href="data.uploadFilePath" target="_blank"
                ><button class="btn btn-sm btn-primary">View</button></a
              >
            </td>
            <td>
              <b-button
                size="sm"
                v-b-modal.modal-1
                @click="selectForm(data.FormID)"
                >Edit</b-button
              >
              <b-modal id="modal-1" title="Update Form" @ok="updateForm">              
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td class="deno">Date</td>
                      <td class="deno">
                        <input
                          type="date"
                          placeholder="0"
                          v-model="toBeUpdated.date"
                        />
                      </td>
                    </tr>
                    <!-- <tr>
                      <td class="deno">Office Wing</td>
                      <td class="deno">
                        <input type="text" placeholder="0" />
                      </td>
                    </tr> -->
                    <tr>
                      <td class="deno">Vendor name</td>
                      <td class="deno">
                        <input
                          type="text"
                          placeholder="0"
                          v-model="toBeUpdated.vendor"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="deno">Bill number</td>
                      <td class="deno">
                        <input
                          type="text"
                          placeholder="0"
                          v-model="toBeUpdated.billNumber"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="deno">Description</td>
                      <td class="deno">
                        <input
                          type="text"
                          placeholder="0"
                          v-model="toBeUpdated.description"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="deno">Total Amount</td>
                      <td class="deno">
                        <input
                          type="text"
                          placeholder="0"
                          v-model="toBeUpdated.amount"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="deno">Head</td>
                      <td class="deno">
                        <input
                          type="text"
                          placeholder="0"
                          v-model="toBeUpdated.heads"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="deno">Bill</td>
                      <td class="deno">
                        <input
                          class="file-input"
                          type="file"
                          placeholder="0"
                          @change="handleFileChange"
                        />
                        <button @click="uploadNewFile">Upload new file</button>
                        <p>
                          Selected file:
                          <a :href="toBeUpdated.uploadFilePath" target="_blank"
                            >File</a
                          >
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-modal>
              <button class="btn btn-sm btn-danger ml-1">Delete</button>
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
              />
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
      <button
        class="btn btn-lg btn-outline-danger mb-3"
        type="submit"
        @click="monthReportSub"
      >
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
import MQLCdn from "@/plugins/mqlCdn.js";
import Navbar from '@/components/common/Navbar.vue'
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
  components:{
   Navbar
  },
  data() {
    return {
      perPage: 3,
      toBeUpdated: {},
      toBeUpdatedFile: null,
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
      // console.log(month);
      const year = this.date.split("-")[0];
      // console.log(year);
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
          const queryId = Object.keys(res.result)[0];
          if (res.result[queryId] !== null) {
            this.formData = res.result[queryId][0].Forms;
            console.log(this.formData);
          } else {
            this.formData = [];
          }
          // console.log(formData)
        });
    },
    monthReportSub(){
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
          currentApprovalStatus: "Accountant"
        })
        .fetch()
        .then((res) => {
          console.log(res);
          this.$bvToast.toast(`Bill Approved successfully`, {
            toaster: "b-toaster-top-right",
            title: "Successful",
            autoHideDelay: 4000,
            variant: "success",
            solid: true,
            toastClass: "toast",
          });
        });
    },   
    updateRequest(FormID) {
      this.expenses = this.expenses.filter((r) => r._FormID !== FormID);
    },
    searchForms() {
      this.GetAllRequests();
    },
    selectForm(id) {
      this.toBeUpdated = {
        ...this.toBeUpdated,
        ...this.formData.find((f) => f.FormID === id),
      };
    },
    handleFileChange(e) {
      // console.log(e.target.files[0])
      this.toBeUpdatedFile = e.target.files[0];
    },
    uploadNewFile() {
      let formData = new FormData();
      formData.append("file", this.toBeUpdatedFile);
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
            this.toBeUpdated = {
              ...this.toBeUpdated,
              uploadFilePath:
                res.uploadedFileURL().cdnServer +
                "/" +
                res.uploadedFileURL().filePath,
            };
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
    updateForm() {
      // console.log("UPDATE");
      const month = MONTHS[parseInt(this.toBeUpdated.date.split("-")[1], 10) - 1];
      const year = this.toBeUpdated.date.split("-")[0];
      new MQL()
        .setActivity("o.[UpdatePettyCashDailyForms]")
        .showConfirmDialog(true)

        .setData({
          FormID: this.toBeUpdated.FormID,
          month: month,
          year: year,
          Forms: [
            {
              ...this.toBeUpdated,
            },
          ],
        })
        .fetch()
        .then((res) => {
          console.log(res);
          this.$bvToast.toast(`Bill Approved successfully`, {
            toaster: "b-toaster-top-right",
            title: "Successful",
            autoHideDelay: 4000,
            variant: "success",
            solid: true,
            toastClass: "toast",
          });
        });
    },
  },
  computed: {
    infone: function () {
      //   console.log(this.allRequests)
      return this.allRequests.filter((i) => i.status === false);
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
