<style scoped>
</style>

<template>
<div>
    <h2>Approved Bill</h2>
    <table class="table table-secondary text-center mt-3">
    <thead class="table-dark">
      <tr>
        <th scope="col">Sr no.</th>
        <th scope="col">Date</th>
        <th scope="col">Month</th>
        <th scope="col">Vendor</th>
        <th scope="col">Description</th>
        <th scope="col">Bill no.</th>
        <th scope="col">Amount</th>
        <th scope="col">Head</th>
        <th scope="col">Remark</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Hello</td>
        <td>Hello</td>
        <td>Hello</td>
        <td>Hello</td>
        <td>Hello</td>
        <td>Hello</td>
        <td>Hello</td>
        <td>Hello</td>
        <td width="20%">Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello </td>
      </tr>
    </tbody>
  </table>

    <h2 class="mt-3">Rejected Bill</h2>
    <table class="table table-secondary text-center mt-3">
    <thead class="table-dark">
      <tr>
        <th scope="col">Sr no.</th>
        <th scope="col">Date</th>
        <th scope="col">Month</th>
        <th scope="col">Vendor</th>
        <th scope="col">Description</th>
        <th scope="col">Bill no.</th>
        <th scope="col">Amount</th>
        <th scope="col">Head</th>
        <th scope="col">Remark</th>
        <th scope="col">Edit</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ghvhhgv</td>
        <td>ghvhhgv</td>
        <td>ghvhhgv</td>
        <td>ghvhhgv</td>
        <td>ghvhhgv</td>
        <td>ghvhhgv</td>
        <td>ghvhhgv</td>
        <td>ghvhhgv</td>
        <td width="20%">Hello Hello Hello Hello Hello Hello Hello Hello </td>
        <td><button class="btn btn-dark" type="submit">Edit</button></td>
      </tr>
    </tbody>
  </table>
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
export default {
    name: 'Response',
}
</script>