import { Component } from '@angular/core';
import { ElementDTO } from '../../models/element.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import * as ElementsAction from '../../actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-element-list-nouser',
  templateUrl: './element-list-nouser.component.html',
  styleUrls: ['./element-list-nouser.component.scss']
})
export class ElementListNouserComponent {
  elements: ElementDTO[];
  userId: string;
  private collectionId: string | null;
  elementsIdArray: string[];

  displayedColumns: string[] = ['nombre', 'imagen', 'fecha_publicacion', 'adquirido'];

  constructor(private router: Router, private store: Store<AppState>, private activatedRoute: ActivatedRoute,) {
    this.userId = '';
    this.collectionId = this.activatedRoute.snapshot.paramMap.get('collectionId');
    this.elements = new Array<ElementDTO>();
    this.elementsIdArray = [];

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
          ElementsAction.getElementsNouserCollection({ collectionId: this.collectionId, userId: this.userId })
        );
      }
    }
  }

  backUserElements(): void {
    this.router.navigateByUrl('elements/collection/' + this.collectionId + '/' + this.userId);
  }

  onCategoriaPressed(element: string, checked: boolean) {
    if (checked) { //Si el elemento fue seleccionado
      //Agregamos la categoría seleccionada al arreglo de categorías seleccionadas
      this.elementsIdArray.push(element);
    } else { //Si el elemento fue deseleccionado
      //Removemos la categoría seleccionada del arreglo de categorías seleccionadas
      this.elementsIdArray.splice(this.elementsIdArray.indexOf(element), 1);
    }
  }

  editElementUser(): void {
    if (this.elementsIdArray) {

      this.store.dispatch(
        ElementsAction.addElementUser({
          elementsIdArray: this.elementsIdArray,
          userId: this.userId,
        })
      );
    }
  }
}
