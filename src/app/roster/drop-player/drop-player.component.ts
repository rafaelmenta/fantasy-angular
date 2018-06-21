import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-drop-player',
  templateUrl: './drop-player.component.html',
  styleUrls: ['./drop-player.component.css']
})
export class DropPlayerComponent {

  constructor(
    public dialogRef: MatDialogRef<DropPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick() {
    this.dialogRef.close();
  }

}
