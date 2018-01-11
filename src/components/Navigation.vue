<template>
  <div>
    <div>
       <router-link id="home" :to="{name: 'Application' }">
         <img class="logo center" src="../assets/images/logo.svg" title="Home">
       </router-link>
       <div class="version">
         <label>Version {{ version }}</label>
       </div>
       <div class="addResourceButton">
         <router-link id="resourcesButton" :to="{name: 'addResource' }">
           <label>  &#10133; </label>   Add new Resource/ File
         </router-link>
       </div>
    </div>
  <nav>
    <ul>
      <li id="profilesLink" class="menuEntry" :class="{ active: currentView == 'profileTable'}" >
         <router-link id="profiles" class="menuLink"  :to="{name: 'profileTable' }">
            <img class="menuIcon" src="../assets/images/data-profiles.svg" />
            <label>Data Profiles</label>
         </router-link>
      </li>
      <li id="resourceLink" class="menuEntry" :class="{ active: currentView == 'resourceTable'}">
         <router-link id="resource" class="menuLink" :to="{name: 'resourceTable' }">
           <img class="menuIcon" src="../assets/images/reports.svg" />
            <label>Resources/ Files</label>
         </router-link>
      </li>
      <li id="processorsLink" class="menuEntry" :class="{ active: currentView == 'processorTable'}">
         <router-link id="processors" class="menuLink" :to="{name: 'processorTable' }">
           <img class="menuIcon" src="../assets/images/reports.svg" />
            <label>Data Processors</label>
         </router-link>
      </li>
      <li id="reportsLink" class="menuEntry" :class="{ active: currentView == 'reportTable'}">
         <router-link id="reports" class="menuLink" :to="{name: 'reportTable' }">
           <img class="menuIcon" src="../assets/images/reports.svg" />
            <label>Validation Reports</label>
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

.version {
  width: 120px; 
  margin: 0 auto;
  padding: 10px;
}

.addResourceButton {
   width: 300px; 
   margin: 0px auto;
   & > a { 
     padding: 15px;
     width: 250px;
     background: white;
     border: solid 2px black;
     text-decoration: none;
     color: black;
     border-spacing: 30px;
     display: block;
     text-align: center;
   }
}

.active {
  background-color: #EDEDED;
  border-radius: 5px;
}

.logo {
  width: 60%;
  height: 60%;
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
  padding: 10px;
  text-decoration: none;
  color: black;
  > label {
    cursor: pointer;
  }
}



</style>
