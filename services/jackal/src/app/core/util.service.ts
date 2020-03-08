import { OnInit, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

export async function timeout(time: number = 10000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

@Injectable({
  providedIn: 'root'
})
export class UtilService implements OnInit {

  isGlobalLoading: boolean = false;

  constructor(
    private toast: ToastrService,
  ) {}
  
  ngOnInit() {

  }

  async loadingTimeout(timeMillis: number = 10000) {
    this.isGlobalLoading = true;
    await timeout(timeMillis);
    this.isGlobalLoading = false;
  }
}
