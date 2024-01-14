import { Component, OnInit } from '@angular/core';
import { ElementDTO } from '../../models/element.dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import * as CollectionsAction from '../../../Collections/actions';
import * as ElementsAction from '../../actions';
import { formatDate } from '@angular/common';
import { CollectionDTO } from 'src/app/Collections/models/collection.dto';

@Component({
  selector: 'app-element-form',
  templateUrl: './element-form.component.html',
  styleUrls: ['./element-form.component.scss']
})
export class ElementFormComponent implements OnInit {
  element: ElementDTO;
  nombre: FormControl;
  imagen: FormControl;
  fecha_publicacion!: FormControl;
  comentario!: FormControl;
  collections!: FormControl;

  elementForm: FormGroup;
  isValidForm: boolean | null;
  selectedValue: string;

  private isUpdateMode: boolean;
  private elementId: string | null;

  collectionsList!: CollectionDTO[];

  private userId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.userId = '';
    this.selectedValue = '';

    this.isValidForm = null;
    this.elementId = this.activatedRoute.snapshot.paramMap.get('id');
    this.element = new ElementDTO('', '', new Date(), '');
    this.isUpdateMode = false;

    this.nombre = new FormControl(this.element.nombre, [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.imagen = new FormControl(this.element.imagen, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.fecha_publicacion = new FormControl(
      formatDate(this.element.fecha_publicacion, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.comentario = new FormControl(this.element.comentario, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.collections = new FormControl([]);

    this.elementForm = this.formBuilder.group({
      nombre: this.nombre,
      imagen: this.imagen,
      fecha_publicacion: this.fecha_publicacion,
      collections: this.collections,
      comentario: this.comentario,
    });

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.id) {
        this.userId = auth.credentials.id;
      }
    });

    this.store.select('collections').subscribe((collections) => {
      this.collectionsList = collections.collections;
    });

    this.store.select('elements').subscribe((elements) => {
      this.element = elements.element;

      this.nombre.setValue(this.element.nombre);

      this.imagen.setValue(this.element.imagen);

      this.fecha_publicacion.setValue(
        formatDate(this.element.fecha_publicacion, 'yyyy-MM-dd', 'en')
      );

      this.comentario.setValue(this.element.comentario);

      if (this.collectionsList) {
        let collectionsIds: string[] = [];
        for (let i = 0; i < this.collectionsList.length; i++) {
          collectionsIds.push(this.collectionsList[i].id);

        }

        this.collections.setValue(collectionsIds);
      }

      this.elementForm = this.formBuilder.group({
        nombre: this.nombre,
        imagen: this.imagen,
        fecha_publicacion: this.fecha_publicacion,
        collections: this.collections,
        comentario: this.comentario,
      });
    });

    this.loadCollections();
  }

  private loadCollections(): void {
    //if (this.userId) {
    this.store.dispatch(
      CollectionsAction.getCollectionsByUserId({ userId: this.userId })
    );
    //}
  }

  ngOnInit(): void {
    if (this.elementId) {
      this.isUpdateMode = true;
      this.store.dispatch(ElementsAction.getElementById({ elementId: this.elementId }));
    } else {
      this.elementForm.reset();
      this.fecha_publicacion.setValue(
        formatDate(this.element.fecha_publicacion, 'yyyy-MM-dd', 'en')
      );
      this.element.fecha_publicacion = this.fecha_publicacion.getRawValue();
    }
  }

  private editElement(): void {
    if (this.elementId) {

      this.store.dispatch(
        ElementsAction.updateElement({
          elementId: this.elementId,
          element: this.element,
          selectedValue: this.selectedValue
        })
      );
    }
  }

  private createElement(): void {
    this.fecha_publicacion.setValue(
      formatDate(this.element.fecha_publicacion, 'yyyy-MM-dd', 'en')
    );
    this.element.fecha_publicacion = this.fecha_publicacion.getRawValue();



    this.store.dispatch(ElementsAction.createElement({ element: this.element, selectedValue: this.selectedValue }));
  }

  saveElement(): void {
    this.isValidForm = false;

    if (this.elementForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.element = this.elementForm.value;

    if (this.isUpdateMode) {
      this.editElement();
    } else {
      this.createElement();
    }
  }
}
