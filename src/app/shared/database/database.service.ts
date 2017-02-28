import { Injectable, NgZone } from '@angular/core';
import * as RxDB from 'rxdb';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { RxCollection, RxDocument } from 'rxdb/src';

@Injectable()
export class DatabaseService {

  private static database;
  private collections = {};

  constructor() {
  }

  static init(): Promise<void> {
    const adapters = {
      idb: require('pouchdb-adapter-idb')
    };

    RxDB.plugin(adapters.idb);

    return RxDB.create('exampleDB', 'idb', 'adminadmin', true)
               .then(db => this.database = db)
               .catch(err => console.log(err));
  }

  createCollection(collectionName: string, schema: any): Promise<void> {

    if (this.collections[collectionName]) {
      return Promise.resolve();
    } else {
      return DatabaseService.database
                            .collection(collectionName, schema)
                            .then(col => this.collections[col.name] = col);
    }
  }

  getCollection(collectionName: string): Observable<RxDocument[]> {
    const collection: RxCollection = this.collections[collectionName];

    if (collection) {
      return collection
          .find()
          .$
    }
  }

  findByField(collectionName: string, field: string, value: string): Observable<RxDocument[]> {
    const collection: RxCollection = this.collections[collectionName];

    if (collection) {
      return collection
          .find()
          .where(field).eq(value)
          .$
    }
  }


  insert(collectionName: string, data: any) {
    const collection: RxCollection = this.collections[collectionName];

    if (collection) {
      collection.insert(data)
          .then((doc: RxDocument) => console.log(doc));
    }
  }
}
