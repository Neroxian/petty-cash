<template>
  <div class="container-fluid g-0 row">
    <div class="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <img src="../assets/mkcl-main.png" alt="MKCL logo" />
    </div>
    <div class="col col-lg-6 col-md-6 col-sm-12 col-xs-12 login">
      <form>
        <h2>Login</h2>
        <div class="form-group">
          <label>Email address</label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Username"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter Password"
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" />
          <label class="form-check-label">Remember me</label>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
.row {
  background-color: rgb(92, 92, 92);
  padding: 0;
}
.col {
  height: 100vh;
}
img {
  height: 40vmin;
  width: 53vmin;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login {
  background-color: rgb(202, 202, 202);
}
form {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
}
.form-group {
  padding-top: 20px;
}
.btn {
  margin-top: 20px;
}
h2 {
  font-weight: bold;
}
</style>