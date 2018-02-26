<template>
  <div style="background-color: #F8F8F8;">
    <div>
       <router-link id="home" :to="{name: 'Application' }">
         <img class="logo center" src="../assets/images/logo.svg" title="Home">
       </router-link>
       <router-link id="resourcesButton" class="addResourceButton" :to="{name: 'addResource' }">
           <img src="../assets/images/plus-icon.svg" />
           <label>Add new Resource/ File</label>
       </router-link>
    </div>
  <nav>
    <ul>
      <li id="profilesLink" class="menuEntry" :class="{ active: currentView == 'profileTable'}" >
         <router-link id="profiles" :to="{name: 'profileTable' }">
            <img src="../assets/images/data-profiles.svg" />
            <label>Data Profiles</label>
         </router-link>
      </li>
      <li id="resourceLink" class="menuEntry" :class="{ active: currentView == 'resourceTable'}">
         <router-link id="resource" :to="{name: 'resourceTable' }">
           <img src="../assets/images/resources.svg" />
            <label>Resources/ Files</label>
         </router-link>
      </li>
      <li id="processorsLink" class="menuEntry" :class="{ active: currentView == 'processorTable'}">
         <router-link id="processors" :to="{name: 'processorTable' }">
           <img src="../assets/images/data-processors.svg" />
            <label>Data Processors</label>
         </router-link>
      </li>
      <li id="reportsLink" class="menuEntry" :class="{ active: currentView == 'reportTable'}">
         <router-link id="reports" :to="{name: 'reportTable' }">
           <img src="../assets/images/validation-reports.svg" />
            <label>Validation Reports</label>
         </router-link>
      </li>
      <li id="usersLink" class="menuEntry" :class="{ active: currentView == 'users'}">
        <router-link id="users" :to="{name: 'users' }">
           <img src="../assets/images/users.svg" />
           <label>Users</label>
        </router-link>
      </li>
      <li id="settingsLink" class="menuEntry" :class="{ active: currentView == 'settings'}">
         <router-link id="settings" :to="{name: 'settings' }">
           <img  src="../assets/images/settings.svg" />
           <label>Settings</label>
         </router-link>
      </li>
    </ul>
  </nav>
  
  <div class="version">
      <label>Version {{ version }}</label>
  </div>
  <div class="activityBanner">
      <label>{{ user }}</label>
      <router-link id="logout" :to="{name: 'logout' }">
        <label>Logout</label>
      </router-link>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      currentView: 'profileTable',
      version: 0.6,
      user: 'Bob Barker'
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
@import '~@/assets/scss/application.scss';

.version {
  width: 120px; 
  margin: 0 auto;
  padding: 10px;
  font-size: 12px;
  position: absolute;
  bottom: 30px;
}

.activityBanner {
  position: absolute;
  color: #333333;
  bottom: 20px;
  > label {
    font-size: 12px;
    color: #333333;
  }
  > a {
    > label {
      font-size: 12px;
      color: #333333;
      text-decoration:: none;
      cursor: pointer; 
    }
  }
}

.addResourceButton {	
   display: flex;
   flex-direction: row;
   height: 35px;
   width: 186px;
   margin-top: 20px;
   margin-left: 10px;
   border: 1px solid #333333;
   border-radius: 2px;
   text-decoration: none;
   font-weight: bold;
   > img {
     padding-left: 20px;
     padding-top: 10px;
     height: 12px;
     width: 12px;
   }
   > label {
     padding-left: 10px;
     padding-top: 10px;
     color: #333333;
     font-size: 10px;
     cursor: pointer;
   }
}

.active {
  background-color: #EDEDED;
  border-radius: 5px;
  width: 186px;
  height: 35px;
}

.menuEntry {
  width: 186px;
  height: 35px;
  &:hover {
    background-color: #EDEDED;
    border-radius: 5px;
  }
  > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 10px;
    padding-top: 7px;
    text-decoration: none;
    color: black;
    > img {
      width: 20px;
      height: 20px;
    }
    > label {
      margin-left: 10px;
      cursor: pointer;
      font-size: 12px;
    }
  }
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0px 10px;
}


.logo {
  height: 29px;	
  width: 101px;
  margin-left: 17px;
  margin-top: 25px;
  display: block;
}

</style>
