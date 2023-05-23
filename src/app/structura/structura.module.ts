import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StructuraRoutingModule } from './structura-routing.module';
import { StructuraComponent } from './structura.component';


@NgModule({
  declarations: [
    StructuraComponent,
    SidebarComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    StructuraRoutingModule
  ],
  exports : [
    NavbarComponent
  ]
})
export class StructuraModule { }
