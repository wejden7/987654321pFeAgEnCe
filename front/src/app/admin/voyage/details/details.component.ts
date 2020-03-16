import { Component, OnInit } from '@angular/core';
import{Categori}from '../../class/Categori';
import{VoyageService} from '../../../service/admin/voyage.service';
import{MessageService}from '../../../service/admin/message.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
id:string;
cat:Categori;
dataSource: Object;
  chartConfig: Object;
  constructor( private payerservice:VoyageService,private msg:MessageService, private route: ActivatedRoute) {
    this.chartConfig = {
        
      type: 'column2d',
      dataFormat: 'json',
  };

  this.dataSource = {
      "chart": {
        "caption": "Reservation Voyage par payer",
        "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Country",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "R",
        "theme": "fusion",
      },
      "data": [{
        "label": "Venezuela",
        "value": "290"
      }, {
        "label": "Saudi",
        "value": "260"
      }, {
        "label": "Canada",
        "value": "180"
      }, {
        "label": "Iran",
        "value": "140"
      }, {
        "label": "Russia",
        "value": "115"
      }, {
        "label": "UAE",
        "value": "100"
      }, {
        "label": "US",
        "value": "30"
      }, {
        "label": "China",
        "value": "30"
      }]
    };
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getpayebyid();
  }
  getpayebyid(){
    this.payerservice.getpayebyid(this.id).subscribe(
      (data)=>{this.cat=data;
      console.log(this.cat);},
      (err)=>{}
      );

  }

}
