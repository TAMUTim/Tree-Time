import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreetingComponent } from './greeting.component';
import { LobbyComponent } from './lobby/lobby.component';
const routes: Routes = [
{
  path: 'game/:room',
  component: LobbyComponent,
  runGuardsAndResolvers: 'paramsOrQueryParamsChange'
},
{
  path: '',
  component: GreetingComponent,
  runGuardsAndResolvers: 'paramsOrQueryParamsChange'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
