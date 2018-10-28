import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  constructor(private dialogRef: MatDialogRef<AlertComponent>,) {}


  close() {
    this.dialogRef.close();
  }

  public confirmMessage:string;

}
