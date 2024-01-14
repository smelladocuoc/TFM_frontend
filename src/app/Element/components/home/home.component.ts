import { Component } from '@angular/core';
import { ElementDTO } from '../../models/element.dto';
import { ElementService } from '../../services/element.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import * as ElementsAction from '../../actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  elements: ElementDTO[];
  showButtons: boolean;
  showAdminSection: boolean;

  private userId: string;

  constructor(
    private elementService: ElementService,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.userId = '';
    this.elements = new Array<ElementDTO>();
    this.showButtons = false;
    this.showAdminSection = false;

    this.store.select('auth').subscribe((auth) => {
      this.showButtons = false;
      if (auth.credentials.id) {
        this.userId = auth.credentials.id;
      }
      if (auth.credentials.access_token) {
        this.showButtons = true;
      }
    });

    this.store.select('elements').subscribe((elements) => {
      this.elements = elements.elements;
    });
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.correo == 'admin@gmail.com') {
        this.showAdminSection = true;
      }
    });

    this.loadElements();
  }

  private loadElements(): void {

    this.store.dispatch(ElementsAction.getElementsByUserId({ userId: this.userId }));
  }
}
