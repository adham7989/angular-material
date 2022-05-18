import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']

})
export class DeleteConfirmationComponent implements OnInit {

  constructor(private api : ApiService ,
    private ref : MatDialogRef<DeleteConfirmationComponent>,
    @Inject (MAT_DIALOG_DATA) public editData : any ) { }

  ngOnInit(): void {
  }



  deleteProduct(){
    this.api.deleteProduct(this.editData)
    .subscribe(
    (res : any)=>{ 
      alert('Product Deleted');
      this.ref.close('yes');

    },
    (err)=>console.log('error while deleting!!')
  );
  }
}
