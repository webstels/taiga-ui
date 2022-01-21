import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    Optional,
    Self,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {USER_AGENT} from '@ng-web-apis/common';
import {
    CHROMIUM_EDGE_START_VERSION,
    isEdgeOlderThan,
    tuiDefaultProp,
} from '@taiga-ui/cdk';
import {TuiSizeS} from '@taiga-ui/core';

@Component({
    selector: 'input[tuiSlider]',
    template: ``,
    styleUrls: ['./slider.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiSliderComponent {
    @Input()
    @HostBinding('attr.data-size')
    @tuiDefaultProp()
    size: TuiSizeS = 'm';

    @Input()
    @tuiDefaultProp()
    @HostBinding('class._ticks')
    showTicks = false;

    @HostBinding('attr.type')
    readonly type = 'range';

    get min(): number {
        return +this.elementRef.nativeElement.min;
    }

    get max(): number {
        return +this.elementRef.nativeElement.max || 100;
    }

    get step(): number {
        return +this.elementRef.nativeElement.step || 1;
    }

    @HostBinding('style.--tui-slider-fill-percentage')
    get fillPercentage(): string {
        const percentage = Math.floor((100 * this.value) / (this.max - this.min));

        return `${percentage}%`;
    }

    @HostBinding('style.--tui-slider-step-percentage')
    get stepPercentage(): string {
        const percentage = 100 / ((this.max - this.min) / this.step) - 0.1;

        return `${percentage}%`;
    }

    @HostBinding('class._old-edge')
    get isOldEdge(): boolean {
        return isEdgeOlderThan(CHROMIUM_EDGE_START_VERSION, this.userAgent);
    }

    get value(): number {
        return +this.control?.value || +this.elementRef.nativeElement.value || 0;
    }

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        private readonly control: NgControl | null,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLInputElement>,
        @Inject(USER_AGENT) private readonly userAgent: string,
    ) {}

    /**
     * For change detection.
     * Webkit does not have built-in method for customization of filling progress (as Firefox).
     * We draw filling of progress by `background: linear-gradient(...)` of the track.
     * This function triggers change detection (for `fillPercentage` function) when we drag thumb of the input.
     */
    @HostListener('input')
    onInput() {}
}
