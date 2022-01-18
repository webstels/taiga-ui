import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiSliderModule} from '@taiga-ui/kit';

import {TuiSliderExample1} from './examples/1';
import {TuiSliderExample2} from './examples/2';
import {TuiSliderExample3} from './examples/3';
import {ExampleTuiSliderComponent} from './slider.component';

@NgModule({
    imports: [
        CommonModule,
        TuiAddonDocModule,
        TuiSliderModule,
        ReactiveFormsModule,
        RouterModule.forChild(generateRoutes(ExampleTuiSliderComponent)),
    ],
    declarations: [
        ExampleTuiSliderComponent,
        TuiSliderExample1,
        TuiSliderExample2,
        TuiSliderExample3,
    ],
})
export class ExampleTuiSliderModule {}
