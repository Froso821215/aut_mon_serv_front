import { Injectable } from '@angular/core';
import { enviroment_serv_back_local } from 'src/app/enviroments/enviroments.dev';
import {HttpClient, HttpHeaders,HttpErrorResponse}from'@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, throwError,catchError} from 'rxjs';
import { IInstance, IReportGen } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class CheckInstanciaService {
  protected urlBase=enviroment_serv_back_local.api;
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' })

  constructor(private http:HttpClient,private router:Router) { }
 

  handleError(err: HttpErrorResponse): Observable<never> {
  Swal.fire({
      icon: 'error',
      title: 'Error Fallo Conexión',
      text: err.status.toString()
      
    })
    sessionStorage.clear()
    this.router.navigate(['init']);
    return throwError(() => err);
  }

  getInstances(): Observable<IInstance[]> {
    return this.http.get<IInstance[]>(this.urlBase+"aut/instanc",{headers:this.httpHeaders})
    .pipe(catchError((error) => {
      this.handleError(error)
      return throwError(() => error);
    }))
  }

  getReportGen(instance:IInstance): Observable<IReportGen[]> {
    return this.http.post<IReportGen[]>(this.urlBase+"aut",instance,{headers:this.httpHeaders})
    .pipe(catchError((error) => {
      this.handleError(error)
      return throwError(() => error);
    }))
  }

  exportPdf(listReport:IReportGen[]): Observable<any> {
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.urlBase+"aut/ex_pdf",listReport,{headers:this.httpHeaders,responseType:'blob' as 'json'})
  }
 

}
