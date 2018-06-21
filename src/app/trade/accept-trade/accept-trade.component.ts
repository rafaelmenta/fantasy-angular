import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-accept-trade',
  templateUrl: './accept-trade.component.html',
  styleUrls: ['./accept-trade.component.css']
})
export class AcceptTradeComponent {

  constructor(
    public dialogRef: MatDialogRef<AcceptTradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick() {
    this.dialogRef.close();
  }

}
