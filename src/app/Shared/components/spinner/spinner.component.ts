import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  loading: Subject<boolean> = this.sharedService.isLoading;


  constructor(private sharedService: SharedService) {
  }

}
