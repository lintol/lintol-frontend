import Vue from 'vue';
import Router from 'vue-router';
import Application from '@/components/Application';
import Profiles from '@/components/profiles/Profiles';
import ProfileTable from '@/components/profiles/ProfileTable';
import EditProfile from '@/components/profiles/EditProfile';
import AddProfile from '@/components/profiles/AddProfile';
import Processors from '@/components/processors/Processors';
import ProcessorTable from '@/components/processors/ProcessorTable';
import AddProcessor from '@/components/processors/AddProcessor';
import Reports from '@/components/reports/Reports';
import ReportTable from '@/components/reports/ReportTable';
import ReportView from '@/components/reports/ReportView';
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
        { name: 'profiles',
          path: 'profiles',
          component: Profiles,
          children: [
            { name: 'profileTable', path: 'profiletable', component: ProfileTable },
            { name: 'addProfile', path: 'addprofile', component: AddProfile },
            { name: 'editProfile', path: 'editprofile/:profileId', component: EditProfile, props: true }
          ]
        },
        { name: 'processors',
          path: 'processors',
          component: Processors,
          children: [
            { name: 'processorTable', path: 'processortable', component: ProcessorTable },
            { name: 'addProcessor', path: 'addprocessor', component: AddProcessor }
          ]
        },
        { name: 'reports',
          path: 'reports',
          component: Reports,
          children: [
            { name: 'reportTable', path: 'reporttable', component: ReportTable },
            { name: 'reportView', path: 'reportview', component: ReportView, props: true }
          ]
        },
        { name: 'users', path: 'users', component: Users },
        { name: 'settings', path: 'settings', component: Settings }
      ]
    }
  ]
});
