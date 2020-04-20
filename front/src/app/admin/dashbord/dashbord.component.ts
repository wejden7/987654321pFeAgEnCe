import {  Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import{AuthService} from '../../service/auth.service'
import{HighchartserviceService}from '../../service/Highcharts/highchartservice.service'
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
 
nbuser:any;
  constructor(private highcharts: HighchartserviceService,private auth:AuthService) { }
  ngOnInit(){
    this.highcharts.createChart(this.chartpil.nativeElement, this.myOptionspil);
    this.highcharts.createChart(this.chartcolumn.nativeElement, this.myOptionsColumn);
    this.highcharts.createChart(this.pilchart2.nativeElement, this.myOptionpilchart2);
    this.user();
  }
user(){
this.auth.get_all().subscribe(
      (data)=>{this.nbuser=data;console.log(data)},
      (err)=>{console.log(err);
      })
}

  //chart 
  //pil chart
  @ViewChild('chartspil', {static: true}) public chartpil: ElementRef;
   myOptionspil = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Stacked bar chart'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Chrome',
        y: 61.41,
        sliced: true,
        selected: true
      }, {
        name: 'Internet Explorer',
        y: 11.84
      }, {
        name: 'Firefox',
        y: 10.85
      }, {
        name: 'Edge',
        y: 4.67
      }, {
        name: 'Safari',
        y: 4.18
      }, {
        name: 'Sogou Explorer',
        y: 1.64
      }, {
        name: 'Opera',
        y: 1.6
      }, {
        name: 'QQ',
        y: 1.2
      }, {
        name: 'Other',
        y: 2.61
      }]
    }]
  }
  //column chart
  @ViewChild('chartscolumn', {static: true}) public chartcolumn: ElementRef;
  myOptionsColumn = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Monthly Average Rainfall'
  },
  subtitle: {
    text: 'Source: WorldClimate.com'
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Rainfall (mm)'
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [{
    name: 'Tokyo',
    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 250.4]

  }, {
    name: 'New York',
    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

  }, {
    name: 'London',
    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

  }, {
    name: 'Berlin',
    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

  }]
}
//pilchart2
@ViewChild('pilchart2', {static: true}) public pilchart2: ElementRef;
myOptionpilchart2 = {
 chart: {
   plotBackgroundColor: null,
   plotBorderWidth: null,
   plotShadow: false,
   type: 'pie'
 },
 title: {
   text: 'Stacked bar chart'
 },
 tooltip: {
   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
 },
 accessibility: {
   point: {
     valueSuffix: '%'
   }
 },
 plotOptions: {
   pie: {
     allowPointSelect: true,
     cursor: 'pointer',
     dataLabels: {
       enabled: false
     },
     showInLegend: true
   }
 },
 series: [{
   name: 'Brands',
   colorByPoint: true,
   data: [{
     name: 'Chrome',
     y: 61.41,
     sliced: true,
     selected: true
   }, {
     name: 'Internet Explorer',
     y: 11.84
   }, {
     name: 'Firefox',
     y: 10.85
   }, {
     name: 'Edge',
     y: 4.67
   }, {
     name: 'Safari',
     y: 4.18
   }, {
     name: 'Sogou Explorer',
     y: 1.64
   }, {
     name: 'Opera',
     y: 1.6
   }, {
     name: 'QQ',
     y: 1.2
   }, {
     name: 'Other',
     y: 2.61
   }]
 }]
}
}
