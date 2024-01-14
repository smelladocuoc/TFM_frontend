import { Component } from '@angular/core';
import { ElementDTO } from '../../models/element.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import * as ElementsAction from '../../actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-element-list-user',
  templateUrl: './element-list-user.component.html',
  styleUrls: ['./element-list-user.component.scss']
})
export class ElementListUserComponent {
  elements: ElementDTO[];
  userId: string;
  private collectionId: string | null;

  displayedColumns: string[] = ['nombre', 'imagen', 'fecha_publicacion', 'actions'];

  constructor(private router: Router, private store: Store<AppState>, private activatedRoute: ActivatedRoute,) {
    this.userId = '';
    this.collectionId = this.activatedRoute.snapshot.paramMap.get('collectionId');
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
      if (this.collectionId) {
        this.store.dispatch(
          ElementsAction.getElementsCollection({ collectionId: this.collectionId, userId: this.userId })
        );
      }
    }
  }

  loadNouserElements(): void {
    this.router.navigateByUrl('elements/nouser/collection/' + this.collectionId);
  }

  loadUserElements(elementId: string): void {
    this.router.navigateByUrl('element/user/' + elementId);
  }

  backUserElements(): void {
    this.router.navigateByUrl('usercollections');
  }

  deleteElementUser(elementId: string): void {
    // show confirmation popup
    let result = confirm('Confirm delete element with id: ' + elementId + ' .');
    if (result) {
      this.store.dispatch(ElementsAction.deleteElementUser({ elementId: elementId, userId: this.userId }));
    }
    this.loadElements();
  }
}
