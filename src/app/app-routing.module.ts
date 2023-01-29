import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withInMemoryScrolling } from '@angular/router';
import { GreetingComponent } from './greeting.component';
import { LobbyComponent } from './lobby/lobby.component';
export const routes: Routes = [{
  path: 'game/:room',
  component: LobbyComponent,
  runGuardsAndResolvers: 'paramsOrQueryParamsChange'
},
{path: '',
component: GreetingComponent,
runGuardsAndResolvers: 'paramsOrQueryParamsChange'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

const options = provideRouter(routes, withInMemoryScrolling({
  scrollPositionRestoration: 'enabled',
}))

export default options