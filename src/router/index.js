import Vue from 'vue';
import Router from 'vue-router';
import Application from '@/components/Application';
import Profiles from '@/components/profiles/Profiles';
import ProfileTable from '@/components/profiles/ProfileTable';
import EditProfile from '@/components/profiles/EditProfile';
import AddProfile from '@/components/profiles/AddProfile';
import Reports from '@/components/reports/Reports';
import Users from '@/components/users/Users';
import Settings from '@/components/settings/Settings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Application',
      component: Application,
      children: [
        { name: 'profiles', path: 'profiles', component: Profiles },
        { name: 'profiles',
          path: 'profiles',
          component: Profiles,
          children: [
            { name: 'profileTable', path: 'profiletable', component: ProfileTable },
            { name: 'addProfile', path: 'addprofile', component: AddProfile },
            { name: 'editProfile', path: 'editprofile', component: EditProfile }
          ]
        },
        { name: 'reports', path: 'reports', component: Reports },
        { name: 'users', path: 'users', component: Users },
        { name: 'settings', path: 'settings', component: Settings }
      ]
    }
  ]
});
