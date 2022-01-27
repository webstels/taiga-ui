import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TUI_IS_CYPRESS, TuiDestroyService} from '@taiga-ui/cdk';
import {interval, Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'tui-input-inline-example-3',
    templateUrl: './template.html',
    styleUrls: ['./style.less'],
    providers: [TuiDestroyService],
    changeDetection,
    encapsulation,
})
export class TuiInputInlineExample3 implements OnInit {
    count = 0;

    constructor(
        @Inject(ChangeDetectorRef) private readonly cd: ChangeDetectorRef,
        @Inject(TuiDestroyService) private readonly destroy$: Observable<unknown>,
        @Inject(TUI_IS_CYPRESS) readonly isCypress: boolean,
    ) {}

    ngOnInit() {
        if (this.isCypress) {
            return;
        }

        interval(3000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.increment());
    }

    private increment() {
        const prev: number = parseFloat(String(this.count)) || 0;

        this.count = prev + 1;
        this.cd.detectChanges();
    }
}
