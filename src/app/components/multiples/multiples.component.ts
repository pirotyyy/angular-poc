import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { Observable, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ElectronIpcService } from '../../services/electron-ipc.service';
import { TranslateService } from '@ngx-translate/core';
import { WindowApiConst } from 'shared-lib';

@Component({
	selector: 'app-multiples',
	templateUrl: './multiples.component.html',
	styleUrls: ['./multiples.component.scss'],
})
export class MultiplesComponent implements OnInit {
	timesTableForm = new UntypedFormGroup({
		input: new FormControl<number>(Math.round(Math.random() * 100) % 10, {
			nonNullable: true,
		}),
	});

	// multiples: number[] = [];
	multiples$: Observable<number[]>;

	constructor(
		private electronIpc: ElectronIpcService,
		private translate: TranslateService,
		private cd: ChangeDetectorRef
	) {
		this.multiples$ = merge(
			// Specifying what to do with received data from main process
			this.electronIpc.receive$<number[]>(WindowApiConst.MULTIPLES_OUTPUT),
			// Reset multiples on form changes
			this.timesTableForm.valueChanges.pipe(
				map(_ => [])
			)
		);
	}

	ngOnInit(): void {
		// Specifying what to do with received data from main process
		// this.electronIpc.receive<number[]>(
		// 	WindowApiConst.MULTIPLES_OUTPUT,
		// 	(output: number[]) => {
		// 		// Update current data
		// 		this.multiples = output;
		// 	}
		// );

		// Reset multiples on form changes
		// this.timesTableForm.valueChanges.subscribe(() => {
		// 	this.multiples = [];
		// });

		// Init time tables with given random value
		this.onSubmit();
	}

	translateIn(lang: string): void {
		this.translate.use(lang);
	}

	onSubmit(): void {
		const input = this.timesTableForm.value.input;
		this.electronIpc.send(WindowApiConst.MULTIPLES_INPUT, input);
	}
}
