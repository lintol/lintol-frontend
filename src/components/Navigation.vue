<template>
  <div>
     <router-link id="home" :to="{name: 'Application' }">
       <img class="logo center" src="../assets/images/logo.svg" title="Home">
     </router-link>
     <p>Version {{ version }}</p>
  <nav>
    <ul>
      <li id="profilesLink" class="menuEntry" :class="{ active: currentView == 'profileTable'}" >
         <router-link id="profiles" class="menuLink"  :to="{name: 'profileTable' }">
            <img class="menuIcon" src="../assets/images/data-profiles.svg" />
            <label>Data Profiles</label>
         </router-link>
      </li>
      <li id="processorsLink" class="menuEntry" :class="{ active: currentView == 'processorTable'}">
         <router-link id="processors" class="menuLink" :to="{name: 'processorTable' }">
           <img class="menuIcon" src="../assets/images/reports.svg" />
            <label>Processors</label>
         </router-link>
      </li>
      <li id="reportsLink" class="menuEntry" :class="{ active: currentView == 'reportTable'}">
         <router-link id="reports" class="menuLink" :to="{name: 'reportTable' }">
           <img class="menuIcon" src="../assets/images/reports.svg" />
            <label>Reports</label>
         </router-link>
      </li>
      <li id="resourceLink" class="menuEntry" :class="{ active: currentView == 'resourceTable'}">
         <router-link id="resource" class="menuLink" :to="{name: 'resourceTable' }">
           <img class="menuIcon" src="../assets/images/reports.svg" />
            <label>Resources</label>
         </router-link>
      </li>
      <li id="usersLink" class="menuEntry" :class="{ active: currentView == 'users'}">
        <router-link id="users" class="menuLink" :to="{name: 'users' }">
           <img class="menuIcon"  src="../assets/images/users.svg" />
           <label>Users</label>
        </router-link>
      </li>
      <li id="settingsLink" class="menuEntry" :class="{ active: currentView == 'settings'}">
         <router-link id="settings" class="menuLink" :to="{name: 'settings' }">
           <img class="menuIcon" src="../assets/images/settings.svg" />
           <label>Settings</label>
         </router-link>
      </li>
    </ul>
  </nav>
    <router-link id="resourcesButton" :to="{name: 'addResource' }" tag="button" class="addButton" style="float: left">Add Resource</router-link>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      currentView: 'profileTable',
      version: 0.3
    };
  },
  watch: {
    $route: function () {
      console.log('New route:' + this.$route.name);
      this.currentView = this.$route.name;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/application.scss';

.active {
  background-color: #EDEDED;
  border-radius: 5px;
}

.logo {
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0px 10px;
}

.menuIcon {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}

.menuEntry:hover {
  background-color: #EDEDED;
  border-radius: 5px;
}

.menuLink {
  display: flex;
  align-items: center;
  margin: 10px 10px;
  text-decoration: none;
  color: black;
  > label {
    cursor: pointer;
  }
}



</style>
