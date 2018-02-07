import Vue from 'vue';
import Router from 'vue-router';
import Application from '@/components/Application';
import Profiles from '@/components/profiles/Profiles';
import ProfileTable from '@/components/profiles/ProfileTable';
import EditProfile from '@/components/profiles/EditProfile';
import AddProfile from '@/components/profiles/AddProfile';
import Processors from '@/components/processors/Processors';
import ProcessorTable from '@/components/processors/ProcessorTable';
import Reports from '@/components/reports/Reports';
import ReportTable from '@/components/reports/ReportTable';
import ReportView from '@/components/reports/reportview/ReportView';
import MapDetails from '@/components/reports/reportview/map/MapDetails';
import ProcessorReportView from '@/components/reports/reportview/ProcessorReportView';
import ListReportView from '@/components/reports/reportview/ListReportView';
import TabularDetails from '@/components/reports/reportview/tabular/TabularDetails';
import Resources from '@/components/resources/Resources';
import ResourceTable from '@/components/resources/ResourceTable';
import AddResource from '@/components/resources/AddResource';
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
                { name: 'processorReportView', path: 'processorReportView/:reportId', component: ProcessorReportView },
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
        { name: 'users', path: 'users', component: Users },
        { name: 'settings', path: 'settings', component: Settings }
      ]
    }
  ]
});
