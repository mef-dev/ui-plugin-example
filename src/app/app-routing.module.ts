import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';

// Routes are declared directly; the platform base path is provided through
// APP_BASE_HREF in app.module.ts (PlatformHelper.updatePluginsRoutes is deprecated
// since @natec/mef-dev-platform-connector ^16.4.8).
const routes: Routes = [
  {
    path:"",
    children:[
      {
        path:"",
        redirectTo:"test",
        pathMatch:  'full',
      },
      {
        path:"test",
        component:  TestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
