<template>
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
          Month
        </th>
        <th scope="col">
          Vendor
        </th>
        <th scope="col">
          Description
        </th>
        <th scope="col">
          Bill no.
        </th>
        <th scope="col">
          Amount
        </th>
        <th scope="col">
          Head
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(info, idx) in data"
        :key="idx"
      >
        <td>{{ idx }}</td>
        <td>{{ info.mydate }}</td>
        <td>{{ info.office }}</td>
        <td>{{ info.vname }}</td>
        <td>{{ info.description }}</td>
        <td>{{ info.billno }}</td>
        <td>{{ info.amount }}</td>
        <td>{{ info.head }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'AddedTable',
  props: ['data']
}
</script>

<style scoped>
</style>
/* eslint-disable */
