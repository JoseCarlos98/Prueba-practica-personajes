import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersRoutingModule } from './characters-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CharactersComponent } from './characters.component';
import { CharactersListComponent } from './characters-list/characters-list.component';



@NgModule({
  declarations: [
    CharactersComponent,
    CharactersListComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CharactersModule { }
