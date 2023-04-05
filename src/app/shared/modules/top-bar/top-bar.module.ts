import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
    declarations: [
      TopBarComponent
    ],
    exports: [
      TopBarComponent
    ],
    imports: [
        CommonModule,
        MenubarModule
    ]
})
export class TopBarModule { }
