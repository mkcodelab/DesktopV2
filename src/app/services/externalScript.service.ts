import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExternalScriptService {
  injectScript(src: string) {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
  }
}
