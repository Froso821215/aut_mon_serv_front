import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent {
  constructor(private router:Router){}

  checkInstancias(){
    this.router.navigate(['/check_inst'])
  }

}
