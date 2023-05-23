import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StructuraComponent } from './structura.component';
import { CharactersComponent } from '../characters/characters.component';

export const routes: Routes = [
    {
        path: '', 
        component: StructuraComponent,
        children:[
            { path:'', redirectTo:'personajes', pathMatch:'full' },
            { path: 'personajes', loadChildren: () => import('../characters/characters.module').then(m => m.CharactersModule)  },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StructuraRoutingModule { }