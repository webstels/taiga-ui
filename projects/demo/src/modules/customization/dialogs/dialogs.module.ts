import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiButtonModule} from '@taiga-ui/core';
import {TuiAvatarModule} from '@taiga-ui/kit';

import {DialogsComponent} from './dialogs.component';
import {TuiDialogsExample1} from './examples/1';
import {PromptModule} from './examples/1/prompt/prompt.module';

@NgModule({
    imports: [
        CommonModule,
        PromptModule,
        TuiButtonModule,
        TuiAvatarModule,
        TuiAddonDocModule,
        RouterModule.forChild(generateRoutes(DialogsComponent)),
    ],
    declarations: [DialogsComponent, TuiDialogsExample1],
    exports: [DialogsComponent],
})
export class DialogsModule {}
