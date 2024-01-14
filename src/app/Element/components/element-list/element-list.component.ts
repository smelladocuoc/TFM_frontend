import { Component } from '@angular/core';
import { ElementDTO } from '../../models/element.dto';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import * as ElementsAction from '../../actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.scss']
})
export class ElementListComponent {
  elements: ElementDTO[];
  userId: string;

  displayedColumns: string[] = ['nombre', 'imagen', 'fecha_publicacion', 'actions'];

  constructor(private router: Router, private store: Store<AppState>) {
    this.userId = '';
    this.elements = new Array<ElementDTO>();

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.id) {
        this.userId = auth.credentials.id;
      }
    });

    this.store.select('elements').subscribe((elements) => {
      this.elements = elements.elements;
    });

    this.loadElements();
  }

  private loadElements(): void {
    if (this.userId) {
      this.store.dispatch(
        ElementsAction.getElements()
      );
    }
  }

  createElement(): void {
    this.router.navigateByUrl('/user/element/');
  }

  updateElement(elementId: string): void {
    this.router.navigateByUrl('/user/element/' + elementId);
  }

  deleteElement(elementId: string): void {
    // show confirmation popup
    let result = confirm('Confirm delete element with id: ' + elementId + ' .');
    if (result) {
      this.store.dispatch(ElementsAction.deleteElement({ elementId: elementId }));
    }
    this.loadElements();
  }
}
