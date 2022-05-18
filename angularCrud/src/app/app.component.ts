import { Component, OnInit, ViewChild } from '@angular/core';

// Classes & Interfaces
import { Products } from './interfaces/products';
import { Pros } from './interfaces/pros';

import { ApiService } from './services/api.service';

// Dialog
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

// mat-table
import { MatTable, MatTableDataSource } from '@angular/material/table';

// pagination & sort 
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

// components 
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{  
  
  constructor( private dialog : MatDialog , private api : ApiService ){}

  productList : Pros [] = [] ;
  dataSource !: MatTableDataSource<any>;
  displayedColumns  : string [] = ['id','productName' , 'category' , 'date' , 'freshness' , 'price',  'image'  , 'actions' ];
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit() : void{
    this.displayAllProducts();
  }

  // Dialog of Adding New Products 
  openDialog() {
      this.dialog.open(DialogComponent, {
      position :{ top :'5%' , left : '40%'},
      width : '30%',
      autoFocus : 'true' ,
    }).afterClosed().subscribe( val => {
      if(val === 'save'){
        this.displayAllProducts();
      }
    })  
  }

  displayAllProducts(){
      this.api.getProduct()
      .subscribe(
        (res ) => {// source data of table is the response which come from the service.
          this.dataSource = new MatTableDataSource(res); 
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;                                                                      
        },
      (err)=> alert('Error While Fetching The Records From Json-Server ')
    );

  } 

  editProduct(row : any){
    this.dialog.open(DialogComponent ,{
      width : '30%',
      data : row ,
    }).afterClosed().subscribe( val => {
      if(val === 'update'){
        this.displayAllProducts();
      }
    })
  }
  
  deleteProduct(id : number){

    this.dialog.open(DeleteConfirmationComponent , {
      width : '30%',
      data : id ,
    }).afterClosed().subscribe( val => {
      if(val === 'yes'){
        this.displayAllProducts();
      }
    })
  
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

