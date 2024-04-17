import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface RegisteredModals {
  name: string;
  isOpened: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private registeredModals: RegisteredModals[] = [];

  public modalStateChanged = new Subject<string>();

  openModal(modalName: string) {
    for (let modal of this.registeredModals) {
      if (modal.name === modalName) {
        this.changeModalState(true, modal);
      }
    }
  }

  closeModal(modalName: string) {
    for (let modal of this.registeredModals) {
      if (modal.name === modalName) {
        this.changeModalState(false, modal);
      }
    }
  }

  changeModalState(to: boolean, modal: RegisteredModals) {
    modal.isOpened = to;
    this.modalStateChanged.next(modal.name);
  }

  isModalOpened(modalName: string) {
    return this.registeredModals.find((modal) => modal.name === modalName)
      ?.isOpened;
  }

  //  register modal in onInit of central-modal or any modal-like component
  registerModal(modalName: string) {
    this.registeredModals.push({ name: modalName, isOpened: false });
  }
}
