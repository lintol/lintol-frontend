<template>
  <div style="background-color: #F8F8F8;">
    <div>
       <router-link id="home" :to="{name: 'Application' }">
         <img class="logo center" src="~@/assets/images/logo.svg" title="Home">
       </router-link>
       <router-link id="resourcesButton" class="addResourceButton" :to="{name: 'resourceTable' }">
         <div>
           <img src="~@/assets/images/plus-icon.svg" />
           <label>Add new Resource/ File</label>
         </div>
       </router-link>
    </div>
  <nav>
    <ul>
      <li id="profilesLink" class="menuEntry" :class="{ menuEntryActive: currentView == 'profileTable'}" >
         <router-link id="profiles" :to="{name: 'profileTable' }">
            <img src="~@/assets/images/data-profiles.svg" />
            <label>Data Profiles</label>
         </router-link>
      </li>
      <li id="resourceLink" class="menuEntry" :class="{ menuEntryActive: currentView == 'resourceTable'}">
         <router-link id="resources" :to="{name: 'resourceTable' }">
           <img src="~@/assets/images/resources.svg" />
            <label>Resources/ Files</label>
         </router-link>
      </li>
      <li id="processorsLink" class="menuEntry" :class="{ menuEntryActive: currentView == 'processorTable'}">
         <router-link id="processors" :to="{name: 'processorTable' }">
           <img src="~@/assets/images/data-processors.svg" />
            <label>Data Processors</label>
         </router-link>
      </li>
      <li id="reportsLink" class="menuEntry" :class="{ menuEntryActive: currentView == 'reportTable'}">
         <router-link id="reports" :to="{name: 'reportTable' }">
           <img src="~@/assets/images/validation-reports.svg" />
            <label>Validation Reports</label>
         </router-link>
      </li>
      <li id="usersLink" class="menuEntry" :class="{ menuEntryActive: currentView == 'userTable'}">
        <router-link id="users" :to="{name: 'userTable' }">
           <img src="../assets/images/users.svg" />
           <label>Users</label>
        </router-link>
      </li>
      <li id="settingsLink" class="menuEntry" :class="{ menuEntryActive: currentView == 'settings'}">
         <router-link id="settings" :to="{name: 'settings' }">
           <img  src="~@/assets/images/settings.svg" />
           <label>Settings</label>
         </router-link>
      </li>
    </ul>
  </nav>

  <div class="navFooter">
      <div class="version">
          <label>Version {{ version }}</label>
          <label><a id="logout" href="/logout" v-if="user">Logout</a></label>
      </div>
      <div class="activityBanner" v-if="user">
          <div class="loggedInUser">{{ user.name }}</div>
          <div class="loggedInUser">{{ user.email }}</div>
          <div class="loggedInUserServer" v-if="user.driver">via <a :href="user.driverServer">{{ user.driver.toUpperCase() }}</a></div>
      </div>
  </div>
  </div>
</template>

<script>
import { LOAD_LOGGED_IN_USER } from '@/state/action-types';

export default {
  name: 'Navigation',
  data () {
    return {
      currentView: 'profileTable',
      version: 0.10
    };
  },
  computed: {
    user: function () {
      return this.$store.state.loggedInUser;
    }
  },
  watch: {
    $route: function () {
      console.log('New route:' + this.$route.name);
      this.currentView = this.$route.name;
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_LOGGED_IN_USER);
    this.currentView = this.$route.name;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';

.navFooter {
  width: 120px;
  position: absolute;
  bottom: 30px;
  padding: 10px;
}

.loggedInUser {
  font-size: 80%;
}

.loggedInUserServer {
  font-weight: bold;
  font-size: 60%;
}

.version {
  margin: 0 auto;
  font-size: 0.75em;
}

.activityBanner {
  color: #333333;
  > a {
    text-decoration: none;
    cursor: pointer;
  }
}

.addResourceButton {
   display: flex;
   flex-direction: row;
   margin-top: 20px;
   margin-left: 10px;
   border: 1px solid #333333;
   border-radius: 2px;
   text-decoration: none;
   font-weight: bold;
   padding-top: 3px;
   padding-left: 10px;
   > div {
     > img {
        width: 1em;
        height: 1em;
        cursor: pointer;
     }
     > label {
       padding-left: 0.625em;
       color: #333333;
       font-size: 0.625em;
       cursor: pointer;
     }
   }
}


.menuEntry {
  margin: 10px 0px;
  padding-left: 4px;
  &:hover{
    background-color: #EDEDED;
    border-radius: 5px;
    & a label{
      color: black;
    }
  }
  > a {
    display: flex;
    flex-direction: row;
    padding-top: 7px;
    text-decoration: none;
    cursor: pointer;
    > img {
      width: 1.25em;
      height: 1.25em;
      cursor: pointer;
    }
    > label {
      margin: 0px 10px;
      font-size: 0.75em;
      color: #777776;
      cursor: pointer;
    }
  }
}

.menuEntryActive {
  background-color: #EDEDED;
  border-radius: 5px;
  color: #333333;
  & a label {
    color: black;
  }
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0px 10px;
}


.logo {
  margin-left: 17px;
  margin-top: 25px;
  display: block;
}

.user {
}

.user-server {
}

</style>
