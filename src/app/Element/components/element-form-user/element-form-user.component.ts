import { Component } from '@angular/core';
import { ElementDTO } from '../../models/element.dto';
import { ElementService } from '../../services/element.service';
import { SharedService } from 'src/app/Shared/services/shared.service';
import * as ElementsAction from '../../actions';
import * as CollectionsAction from '../../../Collections/actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CollectionDTO } from 'src/app/Collections/models/collection.dto';

@Component({
  selector: 'app-element-form-user',
  templateUrl: './element-form-user.component.html',
  styleUrls: ['./element-form-user.component.scss']
})
export class ElementFormUserComponent {
  element: ElementDTO;
  elements: ElementDTO[];
  collections: CollectionDTO[];
  private elementId: string | null;
  showButtons: boolean;
  comentario!: FormControl;

  private userId: string;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userId = '';
    this.elementId = this.activatedRoute.snapshot.paramMap.get('id');
    this.elements = new Array<ElementDTO>();
    this.collections = new Array<CollectionDTO>();
    this.element = new ElementDTO('', '', new Date(), '');
    this.showButtons = false;

    this.comentario = new FormControl(this.element.comentario, [
      Validators.required,
      Validators.maxLength(255),
    ]);

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
      this.elements = [];
      this.elements.push(elements.element);
    });

    this.store.select('collections').subscribe((collections) => {
      this.collections = [];
      this.collections.push(collections.collections[0]);
    });


  }

  ngOnInit(): void {
    if (this.elementId) {
      this.store.dispatch(ElementsAction.getElementById({ elementId: this.elementId }));
      this.loadCollectionElement();
    }
  }

  loadCollectionElement(): void {
    if (this.elementId) {
      this.store.dispatch(CollectionsAction.getCollectionElement({ elementId: this.elementId }));
    }
  }

  editCommentElement(): void {
    if (this.elementId) {
      let comentario_format = "{\"comentario\":\"" + this.comentario.value + " / " + this.elements[0].comentario + "\"}";
      this.store.dispatch(ElementsAction.updateCommentElement({ elementId: this.elementId, comment: comentario_format }));
    }
  }
}

