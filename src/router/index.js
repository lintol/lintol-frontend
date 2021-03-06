import Vue from 'vue';
import Router from 'vue-router';
import Application from '@/components/Application';
import Profiles from '@/components/profiles/Profiles';
import ProfileTable from '@/components/profiles/ProfileTable';
import ManageProfile from '@/components/profiles/ManageProfile';
import Processors from '@/components/processors/Processors';
import ProcessorTable from '@/components/processors/ProcessorTable';
import Reports from '@/components/reports/Reports';
import ReportTable from '@/components/reports/ReportTable';
import ReportView from '@/components/reports/reportview/ReportView';
import MapDetails from '@/components/reports/reportview/map/MapDetails';
import ListReportView from '@/components/reports/reportview/ListReportView';
import TabularDetails from '@/components/reports/reportview/tabular/TabularDetails';
import ExceptionDetails from '@/components/reports/reportview/exception/ExceptionDetails';
import Resources from '@/components/resources/Resources';
import ResourceTable from '@/components/resources/ResourceTable';
import AddResource from '@/components/resources/AddResource';
import Users from '@/components/users/Users';
import UserTable from '@/components/users/UserTable';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/application/profiles/profiletable'
    },
    {
      path: '/application',
      name: 'Application',
      component: Application,
      children: [
        { name: 'profiles',
          path: 'profiles',
          component: Profiles,
          children: [
            { name: 'profileTable', path: 'profiletable', component: ProfileTable },
            { name: 'addProfile', path: 'addprofile', component: ManageProfile, props: true },
            { name: 'editProfile', path: 'editprofile/:profileId', component: ManageProfile, props: true }
          ]
        },
        { name: 'processors',
          path: 'processors',
          component: Processors,
          children: [
            { name: 'processorTable', path: 'processortable', component: ProcessorTable }
          ]
        },
        { name: 'reports',
          path: 'reports',
          component: Reports,
          children: [
            { name: 'reportTable', path: 'reporttable', component: ReportTable },
            { name: 'reportView',
              path: 'reportview/:reportId',
              component: ReportView,
              props: true,
              children: [
                { name: 'exceptionDetails', path: 'exceptiondetails', component: ExceptionDetails, props: true },
                { name: 'tabularDetails', path: 'tabulardetails', component: TabularDetails, props: true },
                { name: 'listReportView', path: 'listreportview', component: ListReportView, props: true },
                { name: 'mapDetails', path: 'mapdetails', component: MapDetails, props: true }
              ]
            }
          ]
        },
        { name: 'resources',
          path: 'resources',
          component: Resources,
          children: [
            { name: 'resourceTable', path: 'resourcetable', component: ResourceTable },
            { name: 'addResource', path: 'addresource', component: AddResource }
          ]
        },
        { name: 'users',
          path: 'users',
          component: Users,
          children: [
            { name: 'userTable', path: 'usertable', component: UserTable }
          ]
        }
      ]
    }
  ]
});
