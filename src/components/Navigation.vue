<template>
  <div style="background-color: #F8F8F8;" v-bind:class='{open : isOpen}'>
    <div class='icon-wrapper'>
      <div class='icon'v-bind:class='{"close-menu": !isOpen,"burger-menu": isOpen}'  v-on:click='openMenu'> </div>
    </div>
    <b-content v-bind:class='{ show: isOpen}'>
      <b-nav vertical>
         <b-nav-item id="home" :to="{name: 'profileTable' }">
           <img class="logo center" src="~@/assets/images/logo.svg" title="Home" />
         </b-nav-item>
         <b-button id="resourcesButton" class="addResourceButton" :to="{name: 'resourceTable' }">
           <img src="~@/assets/images/plus-icon.svg" />
           <label>Add new Resource / File</label>
         </b-button>
      </b-nav>
      <b-nav vertical>
        <b-nav-item id="profilesLink" class="menuEntry" :class="{ menuEntryActive: currentView == 'profileTable'}" :to="{name: 'profileTable' }">
              <img src="~@/assets/images/data-profiles.svg" />
              <label>Data Profiles</label>
        </b-nav-item>
        <b-nav-item id="resourcesLink" class="menuEntry" :class="{ menuEntryActive: currentView == 'resourceTable'}" :to="{name: 'resourceTable' }">
             <img src="~@/assets/images/resources.svg" />
             <label>Resources/ Files</label>
        </b-nav-item>
        <b-nav-item id="processorsLink" class="menuEntry" :class="{ menuEntryActive: currentView == 'processorTable'}" :to="{name: 'processorTable' }">
             <img src="~@/assets/images/data-processors.svg" />
             <label>Data Processors</label>
        </b-nav-item>
        <b-nav-item id="reportsLink" class="menuEntry" :class="{ menuEntryActive: currentView == 'reportTable'}" :to="{name: 'reportTable' }">
             <img src="~@/assets/images/validation-reports.svg" />
             <label>Validation Reports</label>
        </b-nav-item>
        <b-nav-item id="usersLink" class="menuEntry" :class="{ menuEntryActive: currentView == 'userTable'}" :to="{name: 'userTable' }">
             <img src="../assets/images/users.svg" />
             <label>Users</label>
        </b-nav-item>
        <!--<b-nav-item id="settingsLink" class="menuEntry" :class="{ menuEntryActive: currentView == 'settings'}" :to="{name: 'settings' }">
             <img  src="~@/assets/images/settings.svg" />
             <label>Settings</label>
        </b-nav-item> -->
      </b-nav>

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
  </b-content>
  </div>
</template>

<script>
import { LOAD_LOGGED_IN_USER } from '@/state/action-types';

export default {
  name: 'Navigation',
  data () {
    return {
      currentView: 'profileTable',
      version: '0.12',
      isOpen: true
    };
  },
  computed: {
    user: function () {
      return this.$store.state.loggedInUser;
    }
  },
  watch: {
    $route: function () {
      this.currentView = this.$route.name;
    }
  },
  mounted: function () {
    this.$store.dispatch(LOAD_LOGGED_IN_USER);
    this.currentView = this.$route.name;
  },
  methods: {
    openMenu: function () {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/assets/scss/application.scss';

.navFooter {
  width: 120px;
  overflow: hidden;
  position: absolute;
  bottom: 30px;
  padding: 10px;
}

.loggedInUser {
  font-size: 80%;
}

.loggedInUserServer {
  font-weight: $bold;
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
  display: block;
  margin: 20px 5px 0px 5px;
  padding: 0px 5px;
  border: 1px solid #333333;
  border-radius: 2px;
  text-decoration: none;
  font-weight: $bold;
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
    text-decoration: none;
    cursor: pointer;
    display: block;
    padding: 5px 0px;
    > img {
      width: 1.25em;
      height: 1.25em;
      cursor: pointer;
    }
    > label {
      margin-left: 5px;
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
  & a {
    cursor: default;
    & label {
      color: black;
      cursor: default;
    }
    & img {
      cursor: default;
    }
  }
}

.menuList {
  list-style-type: none;
  padding: 0px 10px;
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
#resourcesButton{
  background: #F8F8F8;
}
#resourcesButton:hover{
  background: #e8e8e8;
}
.icon{
    right: 0;
    float: right;
    position: relative;
}
.icon.burger-menu{

  width: 20px;
  height: 3px;
  background: black;
  top: 10px;
}
.icon.burger-menu::before{
  content: '';
  width: 20px;
  height: 2px;
  position: absolute;
  background: black;
  top: 5px;
}
.icon.burger-menu::after{
  content: '';
  width: 20px;
  height: 2px;
  position: absolute;
  background: black;
  top: -5px;
}
.icon.close-menu{
  width: 22px;
  height: 2px;
  background: black;
  top: 10px;
  transform: rotate(45deg);
}
.icon.close-menu::after{
  content: '';
  width: 22px;
  height: 2px;
  position: absolute;
  transform: rotate(90deg);
  background: black;
}
.open{
  padding: 5px;
}
.show{
  display: none;
}
.icon-wrapper{
  height: 30px;
}

@media (max-width: 376px){
  .icon{
    display: block;
  }
}
@media (min-width: 377px){
  .show{
    display: block;
  }
  .open{
    width: auto;
  }
}
</style>
