<template>
  <div class="container">
    <nav class="navbar navbar-light">
      <div class="container row text-center">
        <div class="col col-lg-7 col-md-7 col-sm-12 col-12">
          <h1>MKCL’s Petty Cash Expenses</h1>
        </div>
        <div class="col col-lg-5 col-md-5 col-sm-12 col-12">
          <form class="nav-btn">
            <router-link to="/History"
              ><button class="btn btn-dark mx-2" type="submit">
                History
              </button></router-link
            >
            <button class="btn btn-dark mx-2" type="submit">Report</button>
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
          <b-form-select v-model="selected" :options="options"></b-form-select>
          <select
            v-model.lazy="info.office"
            class="form-select"
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
          <label>Vendor name :</label>
          <input
            v-model.lazy="info.vname"
            type="text"
            class="form-control add-form"
          />
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
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-12 col-lg-6 col-md-6 col-sm-12">
          <label for="formFile" class="form-label">Choose File :</label>
          <input
            class="form-control add-form choose"
            type="file"
            id="formFile"
          />
        </div>
      </div>

      <div class="text-center">
        <button
          v-on:click.prevent="adddata()"
          class="btn btn-success mb-3"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
    <AddedTable :data="data"></AddedTable>
  </div>
</template>

<script>
import AddedTable from "@/components/AddedTable.vue";

export default {
  components: { AddedTable },
  name: "Add",
  data() {
    return {
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
  methods: {
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