import { Component } from '@angular/core';
import { HttpService } from './data/http.service';
import { LocalService } from './data/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService, LocalService]
})
export class AppComponent {

  showfavs = false;

  constructor() {}

}
