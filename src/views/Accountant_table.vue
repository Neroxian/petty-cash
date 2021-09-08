<template>
<div class="container">
    <div>
    <h1 class="">
        <router-link to="/Add" style="color:black">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg></router-link>
    MKCL’s Petty Cash Expenses</h1>
    </div>
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
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td><button class="btn btn-sm btn-success m-1" type="submit">Approve</button><button class="btn btn-sm btn-danger m-1" type="submit">Reject</button></td>
                </tr>
            </tbody>
        </table>
         <div class="row container form-group ">
            <div class="col-lg-1 col-md-1 col-12 p-0"><label for="exampleFormControlTextarea1">Remark :</label></div>
            <div class="col-lg-11 col-md-11 col-12 p-0"><textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div>
        </div>
        <div class="text-center"><button class="btn btn-danger m-3" type="submit">Approve</button></div>
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
</style>

<script>
export default {
    name : 'Accountant_table',
}
</script>