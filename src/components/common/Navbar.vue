<template>
  <div id="Navbar">
    <b-navbar fixed="top" type="light" variant="light">
      <b-navbar-brand>
        <img
          src="../../assets/logo_mkcl_w.svg"
          class="logo"
          alt="Kitten "
          style="max-height: 50px; max-width: 50px"
        />
        MKCL’s Petty Cash Expenses
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item >
          <router-link v-if="role==='Central Manager'" to="/response">Response </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link v-if="role==='Central Manager'" to="/historyn"> History </router-link>
        </b-nav-item>
        <b-nav-item>
          <a v-if=" role !=null"  @click="logout">Logout</a>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
// import {Sidebar}  from '@/components/common/Sidebar.vue'

export default {
  Name: "Navbar",
  components: {
    // Sidebar
  },
  data(){
      return{
          role:null
      }
  },
  methods:{
      logout(){
          this.$store.dispatch('AUTH_LOGOUT')         
      }
  },
  created(){
      this.role=sessionStorage.getItem('role')
  }
};
</script>
