import { Injectable } from '@angular/core';
import { DatabaseService } from '../shared/database/database.service';
import { Observable } from 'rxjs';
import { RxDocument } from 'rxdb/src';

@Injectable()
export class HeroService {

  private rxHeroes;

  private collection = {
    name: 'hero',
    schema: require('./schemas/hero.schema.json')
  };

  constructor(private databaseService: DatabaseService) {
  }

  init(): Promise<void> {
    return this.databaseService.createCollection(this.collection.name, this.collection.schema);
  }

  getAllHeroes(): Observable<RxDocument[]> {
    return this.databaseService.getCollection('hero');
  }

  addHero(hero: {name; color}) {
    this.databaseService.insert('hero', hero);
  }

  findByColor(filter: string): Observable<RxDocument[]> {
    return this.databaseService.findByField('hero', 'color', filter);
  }
}
