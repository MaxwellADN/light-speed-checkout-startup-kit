import { Injectable } from '@angular/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  /**
   * The constructor function is a special function that is called when a new instance of the class is
   * created
   * @param {NbToastrService} toastrService - This is the service that we will use to display the
   * toastr.
   */
  constructor(private toastrService: NbToastrService) { }

  /**
   * This function takes in a toastrService, a status, and a message, and then shows a toastr with
   * the given status and message.
   * @param {NbComponentStatus} status - NbComponentStatus - This is the status of the toast. It can
   * be success, info, warning, danger.
   * @param {string} message - The message you want to display
   */
  public showToast(status: NbComponentStatus, message: string): void {
    this.toastrService.show(status, message, { status, duration: 7000 })
  }
}
