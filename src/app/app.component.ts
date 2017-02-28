import { Component, OnInit, NgZone } from '@angular/core';
import { HeroService } from './hero/hero.service';
import { RxDocument } from 'rxdb/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  heroes = [];
  heroName: string;
  color: string;
  filter: string;

  constructor(private heroService: HeroService, private zone: NgZone) {

  }

  ngOnInit(): void {
    this.heroService.init()
        .then(() => {
          this.heroService.getAllHeroes()
              .subscribe(heroes => {
                this.zone.run(() => this.heroes = heroes);
              });
        });
  }

  addHero() {
    this.heroService.addHero({ name: this.heroName, color: this.color });
    this.heroName = '';
    this.color = '';
  }

  removeHero(hero: RxDocument) {
    hero.remove();
  }

  filterByColor() {
    this.heroService
        .findByColor(this.filter)
        .subscribe(heroes => {
          this.zone.run(() => this.heroes = heroes);
        });
  }
}
