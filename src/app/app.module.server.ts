import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from '../../../../WebstormProjects/ClienteCDAAngular/src/app/app.module';
import { AppComponent } from '../../../../WebstormProjects/ClienteCDAAngular/src/app/app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
