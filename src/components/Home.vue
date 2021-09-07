<template>
  <div class="hello">
    <h1>MKCL’s Petty Cash Expenses</h1>
    <div class="login_button">
      <h3>Login as</h3>
      <router-link to="/login" class="nav-link"><button type="button" class="btn btn-lg btn-primary">Central Manager</button></router-link>
      <router-link to="/accountant_table" class="nav-link"><button type="button" class="btn btn-lg btn-primary">Accountant</button></router-link>
      <router-link to="/add" class="nav-link"><button type="button" class="btn btn-lg btn-primary">Management</button></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

}
</script>

<style scoped>
.btn{ 
  margin: auto;
  margin-bottom: 20px;
  display: block;
  width: 25vmax;
}
.login_button{
  padding: 10vh 0;
}
.hello{
  margin: 50px;
  text-align: center;
}
</style>
