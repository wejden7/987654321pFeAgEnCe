import { Component, OnInit } from '@angular/core';
import{Categori}from '../class/Categori';
import{VoyageService} from '../../service/admin/voyage.service';
import{MessageService}from '../../service/admin/message.service';
@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css']
})
export class VoyageComponent implements OnInit {
  cat:Categori[]=[];
  payer:string="";
  type:string="normale";
  image:File;
  selectfile:File=null;
  dataSource: Object;
  chartConfig: Object;

  constructor( private payerservice:VoyageService,private msg:MessageService) {
       this.chartConfig = {
          width: '700',
          height: '400',
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
    this.getAllPaye();
    this.msg.getMessage().subscribe((data)=>{
      this.getAllPaye();
    });
  }
  fileChange(event){

              this.selectfile=<File>event.target.files[0];
           
  }
  ajouter_payer(){
        const fr=new FormData();
          fr.append('image',this.selectfile,this.selectfile.name);
          fr.append('payer',this.payer);
          fr.append('type',this.type);
    this.payerservice.ajouter_payer(fr).subscribe((data)=>{
         this.payer="";
         this.image=null;
         this.msg.setMessage('something happen');
         });
                 }

 getAllPaye(){
                  this.payerservice.getpaye().subscribe((date)=>{
                  this.cat=date;
                  console.log(this.cat);
            
            });
            }            

}
