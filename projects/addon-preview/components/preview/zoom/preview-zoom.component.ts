import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    Output,
} from '@angular/core';
import {TUI_PREVIEW_ZOOM_TEXTS} from '@taiga-ui/addon-preview/tokens';
import {clamp, tuiDefaultProp} from '@taiga-ui/cdk';
import {LanguagePreview} from '@taiga-ui/i18n';
import {merge, Observable, of, timer} from 'rxjs';
import {mapTo, startWith, switchMap} from 'rxjs/operators';

const STEP = 0.5;
const SLIDER_SIZE = 104;
const GHOST_OFFSET_PX = 36;

@Component({
    selector: 'tui-preview-zoom',
    templateUrl: './preview-zoom.template.html',
    styleUrls: ['./preview-zoom.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiPreviewZoomComponent {
    @Input()
    @tuiDefaultProp()
    min = 0.5;

    @Input()
    @tuiDefaultProp()
    max = 2;

    @Input()
    @tuiDefaultProp()
    value = 1;

    @Output()
    readonly valueChange = new EventEmitter<number>();

    @Output()
    readonly reset = new EventEmitter<void>();

    readonly hintShow$ = this.valueChange.pipe(
        switchMap(() => merge(of(true), timer(1000).pipe(mapTo(false)))),
        startWith(false),
    );

    constructor(
        @Inject(TUI_PREVIEW_ZOOM_TEXTS)
        readonly zoomTexts$: Observable<LanguagePreview['zoomTexts']>,
    ) {}

    get ghostLeft(): number {
        const position = (this.value - this.min) * SLIDER_SIZE;
        const range = this.max - this.min;

        return GHOST_OFFSET_PX + Math.round(position / range);
    }

    get leftButtonDisabled(): boolean {
        return this.value === this.min;
    }

    get rightButtonDisabled(): boolean {
        return this.value === this.max;
    }

    get collapseVisible(): boolean {
        return this.value > this.min;
    }

    onModelChange(value: number) {
        const clamped = clamp(value, this.min, this.max);

        if (clamped === this.value) {
            return;
        }

        this.value = clamped;
        this.valueChange.emit(clamped);
    }

    onReset() {
        this.reset.emit();
    }

    onMinus() {
        this.onModelChange(this.value - STEP);
    }

    onPlus() {
        this.onModelChange(this.value < 1 ? 1 : this.value + STEP);
    }
}
