import { Component, OnInit } from '@angular/core';
import { CollectionDTO } from '../../models/collection.dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import * as CollectionsAction from '../../actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.scss']
})
export class CollectionFormComponent implements OnInit {
  collection: CollectionDTO;
  nombre_coleccion: FormControl;
  tipo_coleccion: FormControl;
  imagen_coleccion: FormControl;

  collectionForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private collectionId: string | null;

  private userId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.userId = '';

    this.isValidForm = null;
    this.collectionId = this.activatedRoute.snapshot.paramMap.get('id');
    this.collection = new CollectionDTO('', '', '');
    this.isUpdateMode = false;

    this.nombre_coleccion = new FormControl(this.collection.nombre_coleccion, [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.tipo_coleccion = new FormControl(this.collection.tipo_coleccion, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.imagen_coleccion = new FormControl(this.collection.imagen_coleccion, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.collectionForm = this.formBuilder.group({
      nombre_coleccion: this.nombre_coleccion,
      tipo_coleccion: this.tipo_coleccion,
      imagen_coleccion: this.imagen_coleccion,
    });

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.id) {
        this.userId = auth.credentials.id;
      }
    });

    this.store.select('collections').subscribe((collections) => {
      this.collection = collections.collection;

      this.nombre_coleccion.setValue(this.collection.nombre_coleccion);

      this.tipo_coleccion.setValue(this.collection.tipo_coleccion);

      this.imagen_coleccion.setValue(this.collection.imagen_coleccion);

      this.collectionForm = this.formBuilder.group({
        nombre_coleccion: this.nombre_coleccion,
        tipo_coleccion: this.tipo_coleccion,
        imagen_coleccion: this.imagen_coleccion,
      });
    });
  }

  ngOnInit(): void {
    // update
    if (this.collectionId) {
      this.isUpdateMode = true;
      this.store.dispatch(
        CollectionsAction.getCollectionById({ collectionId: this.collectionId })
      );
    } else {
      this.collectionForm.reset();
    }
  }

  private editCollection(): void {
    if (this.collectionId) {


      this.store.dispatch(
        CollectionsAction.updateCollection({
          collectionId: this.collectionId,
          collection: this.collection,
        })
      );

    }
  }

  private createCollection(): void {


    this.store.dispatch(
      CollectionsAction.createCollection({ collection: this.collection })
    );

  }

  saveCollection(): void {
    this.isValidForm = false;

    if (this.collectionForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.collection = this.collectionForm.value;



    if (this.isUpdateMode) {
      this.editCollection();
    } else {
      this.createCollection();
    }


  }
}
