import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private fb : FormBuilder ,
      private api : ApiService  ,
       @Inject(MAT_DIALOG_DATA) public editData : any ,
       private dialogRef : MatDialogRef<DialogComponent>)  { }


  freshnessList  = ['Brand New' , "Second Hand" , "Refurbished"];
  productForm !: FormGroup ;
  actionBtn : string = 'Save';

  ngOnInit(): void {
    
    this.productForm = this.fb.group({
      productName : ['' , Validators.required],
       category : ['' , Validators.required],
       freshness : ['' ],
       price : ['' ] ,
       comment : [''],
       date : ['' ],
       imageURL : ['' , Validators.required],
  
    });

    if(this.editData){
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['imageURL'].setValue(this.editData.imageURL);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  };

  addProduct(){
  
    if(!this.editData){
      if(this.productForm.valid){
        this.api.addProduct(this.productForm.value)
        .subscribe({
          next :(res) => { 
            alert('product added successefully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error :()=>{
            alert('Error While Adding The Product')
          }
        })
        }
      }else
        {
          this.editProduct()
        }
    }
  
  editProduct(){
    this.api.updateProduct(this.productForm.value , this.editData.id)
    .subscribe({
      next :()=> {
        alert('Product Updated Successefully');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error : ()=> {
        alert('Error While Updating Product');
      }
    })
  }

}
