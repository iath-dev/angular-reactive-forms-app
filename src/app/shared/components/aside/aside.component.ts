import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  path: string;
}

@Component({
  selector: 'app-aside',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside.component.html',
})
export class AsideComponent {
  reactiveRoutes: MenuItem[] = reactiveRoutes[0]
    .children!.filter(({ title }) => title)
    .map(({ path, title }) => ({
      path: `/reactive/${path}`,
      title: `${title}`,
    }));

  authRoutes: MenuItem[] = [
    {
      title: 'Registro',
      path: '/auth/register',
    },
  ];

  countryRoutes: MenuItem[] = [
    {
      title: 'Country',
      path: '/country',
    },
  ];
}
