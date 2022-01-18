import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
    TuiActiveZoneModule,
    TuiFocusableModule,
    TuiFocusVisibleModule,
    TuiRepeatTimesModule,
} from '@taiga-ui/cdk';
import {TuiFormatNumberPipeModule} from '@taiga-ui/core';
import {TuiSliderComponent} from '@taiga-ui/kit/components';

import {TuiSliderOldComponent} from './slider-old.component';

@NgModule({
    imports: [
        CommonModule,
        TuiRepeatTimesModule,
        TuiFocusableModule,
        TuiFocusVisibleModule,
        TuiActiveZoneModule,
        TuiFormatNumberPipeModule,
    ],
    declarations: [TuiSliderComponent, TuiSliderOldComponent],
    exports: [TuiSliderComponent, TuiSliderOldComponent],
})
export class TuiSliderModule {}
