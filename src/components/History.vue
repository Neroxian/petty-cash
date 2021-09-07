<template>
<div class="container">
    <div>
    <h1 class="m-4">
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
                </tr>
            </tbody>
        </table>
        <div class="text-center">
            <button type="button" class="btn btn-outline-primary m-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Denomination</button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Denomination Form</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-bordered table-hover">
                <tbody>
                    <tr>
                        <td class="deno">₹2000 note</td>
                        <td class="deno"><input type="text" placeholder="0"></td>
                    </tr>
                    <tr>
                        <td class="deno">₹500 note</td>
                        <td class="deno"><input type="text" placeholder="0"></td>
                    </tr>
                    <tr>
                        <td class="deno">₹200 note</td>
                        <td class="deno"><input type="text" placeholder="0"></td>
                    </tr>
                    <tr>
                        <td class="deno">₹100 note</td>
                        <td class="deno"><input type="text" placeholder="0"></td>
                    </tr>
                    <tr>
                        <td class="deno">₹50 note</td>
                        <td class="deno"><input type="text" placeholder="0"></td>
                    </tr>
                    <tr>
                        <td class="deno">₹20 note</td>
                        <td class="deno"><input type="text" placeholder="0"></td>
                    </tr>
                    <tr>
                        <td class="deno">₹10 note/coin</td>
                        <td class="deno"><input type="text" placeholder="0"></td>
                    </tr>
                    <tr>
                        <td class="deno">₹5 note/coin</td>
                        <td class="deno"><input type="text" placeholder="0"></td>
                    </tr>
                    <tr>
                        <td class="deno">₹2 note/coin</td>
                        <td class="deno"><input type="text" placeholder="0"></td>
                    </tr>
                    <tr>
                        <td class="deno">₹1 note/coin</td>
                        <td class="deno"><input type="text" placeholder="0"></td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary">Submit</button>
            </div>
            </div>
        </div>
        </div>

       </div>
        <div class="text-center"><button class="btn btn-lg btn-outline-danger mb-3" type="submit">Submit report</button></div>
</div>
</template>

<style scoped>
.btn:focus{
    box-shadow: none;
}
.deno{
    width: 50%;
}
input{
    border-radius:5px;
    border: 1px solid rgb(190, 190, 190);
}
</style>

<script>
export default {
    name : 'History',
}
</script>