<template>
   <div id='reportView'>
    <div >
      <h1>{{ title }}</h1>
      <p class='instructions'>
        Instructions
      </p>
      <!--<div id='columns' class='flexContainer'>
        <report-line :key='report.name' v-for='report in filteredReportLines' :report='report'></report-line>
      </div>-->
      <div id='report' />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ReportLine from './ReportLine';
import goodtablesUI from 'goodtables-ui';
export default {
  name: 'ReportView',
  props: {
    reportId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      title: 'Report',
      search: '',
      report: {
        'valid': false,
        'time': 0.027,
        'warnings': [
          'Dataset inspection has reached 100 table(s) limit'
        ],
        'tables': [
          {
            'valid': false,
            'time': '0.02',
            'errors': [
              {
                'message': 'Header in column 3 is blank',
                'column-number': 3,
                'row': null,
                'code': 'blank-header',
                'row-number': null
              },
              {
                'message': 'Header in column 4 is duplicated to header in column(s) 2',
                'column-number': '4',
                'row': null,
                'code': 'duplicate-header',
                'row-number': null
              },
              {
                'message': 'Row 2 has a missing value in column 3',
                'column-number': '3',
                'row': [
                  '1',
                  'english'
                ],
                'code': 'missing-value',
                'row-number': '2'
              },
              {
                'message': 'Row 2 has a missing value in column 4',
                'column-number': '4',
                'row': [
                  '1',
                  'english'
                ],
                'code': 'missing-value',
                'row-number': '2'
              },
              {
                'message': 'Row 3 is duplicated to row(s) 2',
                'column-number': null,
                'row': [
                  '1',
                  'english'
                ],
                'code': 'duplicate-row',
                'row-number': '3'
              },
              {
                'message': 'Row 4 is completely blank',
                'column-number': null,
                'row': [],
                'code': 'blank-row',
                'row-number': '4'
              },
              {
                'message': 'Row 5 has an extra value in column 5',
                'column-number': '5',
                'row': [
                  '2',
                  'german',
                  '1',
                  '2',
                  '3'
                ],
                'code': 'extra-value',
                'row-number': '5'
              }
            ],
            'row-count': '5',
            'headers': [
              'id',
              'name',
              '',
              'name'
            ],
            'error-count': '7',
            'source': 'data/invalid.csv'
          },
          {
            'valid': true,
            'time': 0.01,
            'errors': [],
            'row-count': 20,
            'headers': [
              'a',
              'b',
              'c'
            ],
            'error-count': 0,
            'source': 'https://raw.githubusercontent.com/frictionlessdata/ADB-User-Study/3ca0be9be25de1b3a7110ada06c84fa49b7cff96/_enrich_node1592.csv'
          }
        ],
        'table-count': 2,
        'error-count': 7
      }
    };
  },
  methods: {
    getReport: function () {
      axios.get(this.$apiPrefix + '/reports/' + this.reportId).then(response => {
        this.report = response.data;
      }, response => {
        console.log('Couldnt get report.');
      });
    }
  },
  components: {
    ReportLine: ReportLine
  },
  computed: {
    filteredReportLines: function () {
      return this.report.lines.filter((event) => {
        return event.name.startsWith(this.search);
      });
    }
  },
  mounted: function () {
    this.getReport();
    const element = document.getElementById('report');
    goodtablesUI.render(goodtablesUI.Report, {report: this.report}, element);
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../assets/scss/application.scss';

</style>
