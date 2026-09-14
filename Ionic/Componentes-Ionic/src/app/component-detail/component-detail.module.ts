import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';
import { ComponentDetailPageRoutingModule } from './component-detail-routing.module';
import { ComponentDetailPage } from './component-detail.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentDetailPageRoutingModule],
  declarations: [ComponentDetailPage]
})
export class ComponentDetailPageModule {}
