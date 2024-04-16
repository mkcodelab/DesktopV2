import { Injectable } from '@angular/core';

interface RegisteredModals {
  name: string;
  isOpened: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private registeredModals: RegisteredModals[] = [];

  openCentralModal(modalName: string) {
    for (let modal of this.registeredModals) {
      if (modal.name === modalName) {
        modal.isOpened = true;
      }
    }
  }

  closeCentralModal(modalName: string) {
    for (let modal of this.registeredModals) {
      if (modal.name === modalName) {
        modal.isOpened = false;
      }
    }
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
