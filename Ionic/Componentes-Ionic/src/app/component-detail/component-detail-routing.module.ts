import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentDetailPage } from './component-detail.page';

const routes: Routes = [{ path: '', component: ComponentDetailPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentDetailPageRoutingModule {}
