import { Component, OnInit } from '@angular/core';
import { CheckInstanciaService } from './check-instancia.service';
import { IInstance, IReportGen } from '../models/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-check-instancia',
  templateUrl: './check-instancia.component.html',
  styleUrls: ['./check-instancia.component.css']
})
export class CheckInstanciaComponent implements OnInit {
  instances: IInstance[] = [];
  resportGen: IReportGen[] = [];
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

  openModalProgress(instance: IInstance, modal: any) {
    this.modal.open(modal, { backdrop: 'static', keyboard: false })
    this.service.getReportGen(instance).subscribe(resp => {
      if (resp) {
        this.resportGen = resp;
        this.closeModal();
        console.log(this.resportGen)
      }
    })
  }

  closeModal() {
    this.modal.dismissAll();
  }

}
