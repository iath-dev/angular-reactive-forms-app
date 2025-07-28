import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {}
