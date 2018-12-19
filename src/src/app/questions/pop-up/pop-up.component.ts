import {Component, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {
  IModalDialog,
  IModalDialogButton,
  IModalDialogOptions,
  ModalDialogService,
  SimpleModalComponent
} from "ngx-modal-dialog";
import {CustomModalComponent} from "./custom-modal/custom-modal.component";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent
{
  constructor(private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef) {}



  openSimpleModalWithCallback() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Dialog with delayed closing',
      childComponent: SimpleModalComponent,
      data: {
        text: 'Some text content. It will close after 1 sec.'
      },
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      onClose: () => new Promise((resolve: any) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      })
    });
  }



  openCustomModal() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Custom child component',
      childComponent: CustomModalComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      data: 'Hey, we are data passed from the parent!'
    });
  }
}


