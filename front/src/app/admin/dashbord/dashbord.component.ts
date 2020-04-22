import {  Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import{AuthService} from '../../service/auth.service'
import{VoyageService}from '../../service/admin/voyage.service';
import{ServiceHotelService} from '../../service/hotels/service-hotel.service'
import{HighchartserviceService}from '../../service/Highcharts/highchartservice.service'
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
 
nbuser:any;
nbvoyagr:any;
nbhotel:any;
date:Array<any>=[];
datevoyage:Array<any>=[];


constructor(private highcharts: HighchartserviceService,private auth:AuthService,private voyageserver:VoyageService,private serverhotel: ServiceHotelService) { }
ngOnInit(){
  this.get_count_reservation_of_hotel();
  this.get_count_reservation_voyage_of_pays()
  this.user();
    this.voyage();
    this.hotel();
    this.highcharts.createChart(this.pilchart2.nativeElement, this.myOptionpilchart2);
    
    
  }
  get_count_reservation_of_hotel(){
    this.serverhotel.get_count_reservation_of_hotel().subscribe(
        (data)=>{
          data.forEach(e => {
            this.date.push({
              'name':e.name,
              'data':e.data
          });
          });   
          this.highcharts.createChart(this.chartcolumn.nativeElement, this.myOptionsColumn);
          console.log(this.date)
        },
        (err)=>{console.log(err)});
  }
get_count_reservation_voyage_of_pays(){
this.voyageserver.get_count_reservation_voyage_of_pays().subscribe(
  (data)=>{
    data.forEach(e => {
      this.datevoyage.push({
        'name':e.pays,
        'y':e.nb
    });
    }); 
    this.highcharts.createChart(this.chartpil.nativeElement, this.myOptionspil);
console.log(this.datevoyage)
  },
  (err)=>{console.log(err)}
);
}
user(){
this.auth.get_all().subscribe(
      (data)=>{this.nbuser=data;console.log(data)},
      (err)=>{console.log(err);
      })
}
voyage(){
  this.voyageserver.voyage().subscribe(
        (data)=>{this.nbvoyagr=data; console.log(data)},
        (err)=>{console.log(err)})
}
hotel(){
  this.serverhotel.get_all_hotel().subscribe(
    (data)=>{this.nbhotel=Object.keys(data).length;},
    (err)=>{console.log(err)});
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
      text: 'Reservation des voyage par rapport pays'
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
      data: this.datevoyage
    }]
  }
  //column chart
  @ViewChild('chartscolumn', {static: true}) public chartcolumn: ElementRef;
  myOptionsColumn = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Reservation des Hotel'
  },
  subtitle: {
    text: ''
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px"></span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y} Resevation</b></td></tr>',
    footerFormat: '</table>',
    shared: false,
    useHTML: false
  },
  plotOptions: {
    column: {
      pointPadding: 0.1,
      borderWidth: 0
    }
  },
  series:this.date
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
