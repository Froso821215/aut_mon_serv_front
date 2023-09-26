import { Component, OnInit } from '@angular/core';
import { CheckInstanciaService } from './check-instancia.service';
import { IInstance, IReportGen } from '../models/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-instancia',
  templateUrl: './check-instancia.component.html',
  styleUrls: ['./check-instancia.component.css']
})
export class CheckInstanciaComponent implements OnInit {
  instance!: IInstance;
  instances: IInstance[] = [];
  resportGen: IReportGen[] = [];
  repEstGoog: IReportGen[] = [];
  repEstError: IReportGen[] = [];
  repEstDisabled: IReportGen[] = [];
  constructor(private service: CheckInstanciaService, private modal: NgbModal) { }
  ngOnInit(): void {
    this.loadInstances();
  }

  loadInstances() {
    this.service.getInstances().subscribe(resp => {
      if (resp) {
        this.instances = resp;

      }
    })
  }

  openModalProgress(instance: IInstance, modal: any, modal2: any) {
    this.instance=instance;
    this.modal.open(modal, { backdrop: 'static', keyboard: false })
    this.service.getReportGen(instance).subscribe(resp => {
      if (resp) {
        this.resportGen=[];
        this.resportGen = resp;
       

        this.closeModal();
        if (this.resportGen.length > 0) {
          this.sortReport();
          this.modal.open(modal2, { size: 'lg', backdrop: 'static', keyboard: false })
        } else {
          Swal.fire(
            'Instancia no responde?',
            '',
            'question'
          )
        }


      }
    })
    
  }

  closeModal() {
    this.modal.dismissAll();
  }

  sortReport() {
    this.repEstGoog=[];
    this.repEstError=[];
    this.repEstDisabled=[];
    this.resportGen.forEach(element => {
      if (element.status == "Error") {
        this.repEstError.push(element)
      } else if (element.status == "Disabled") {
        this.repEstDisabled.push(element)
      } else {
        this.repEstGoog.push(element)
      }

    });
  }

  exportPdf(status: string) {
 
    if (status == "Error") {
      if(this.repEstError.length>0){
        this.export(this.repEstError, status);
      }else{
        this.getMassage();
      }
      
    }else if(status == "Disabled"){
      if(this.repEstDisabled.length>0){
        this.export(this.repEstDisabled, status);
      }else{
        this.getMassage();
      }
   
    }else{
      if(this.repEstGoog.length>0){
        this.export(this.repEstGoog, status);
      }else{
        this.getMassage();
      }
      
    }

  }

  getMassage(){
    Swal.fire(
      'Sin registros',
      '',
      'warning'
    )
  }

  export(listReport: IReportGen[], status: string) {
    const fileName = 'report_' + status + '.pdf';
    this.service.exportPdf(listReport).subscribe(resp => {
      this.managePdfFile(resp, fileName);

    })
  }

  managePdfFile(response: any, fileName: string): void {
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);
    const filePath = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
    const dowloadLink = document.createElement('a');
    dowloadLink.href = filePath;
    dowloadLink.setAttribute('download', fileName);
    document.body.appendChild(dowloadLink);
    dowloadLink.click();
  }
}
