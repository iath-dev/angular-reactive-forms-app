import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from './shared/components/aside/aside.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsideComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
