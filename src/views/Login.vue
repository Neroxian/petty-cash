<template>
  <div class="container-fluid g-0 row">
    <div class="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <img
        src="../assets/mkcl-main.png"
        alt="MKCL logo"
      >
    </div>
    <div class="col col-lg-6 col-md-6 col-sm-12 col-xs-12 login">
      <form>
        <h2>Login</h2>
        <div class="form-group">
          <label>Username</label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Username"
            v-model="username"
          >
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter Password"
            v-model="password"
          >
        </div>
        <div class="form-group form-check">
          <input
            type="checkbox"
            class="form-check-input"
          >
          <label class="form-check-label">Remember me</label>
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="btn btn-primary"
            @click="authenticate()"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    authenticate () {
      this.$store.dispatch('AUTH_REQUEST', { username: this.username, password: this.password }).then(res => {
        // Redirect to next page after suucessfull login
        let role=res.raw.LoginAuth.result.Role
        if (role=="Accountant"){
          this.$router.push({name:'Accountant_table'})
        }
        else if(role=="Central Manager"){
          this.$router.push({name:'Add'})
        }        
        else{
          alert('Invalide password and username')
        }
      })
        .catch(err => {
          alert(err)
          Vue.$log.error(err)
        })

  }
}
}  

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