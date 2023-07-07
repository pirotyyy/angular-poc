import { Component } from '@angular/core';
import { WindowApiConst } from 'shared-lib';
import { ElectronIpcService } from 'src/app/services/electron-ipc.service';

@Component({
  selector: 'app-ffmpeg',
  templateUrl: './ffmpeg.component.html',
  styleUrls: ['./ffmpeg.component.scss']
})
export class FfmpegComponent {
    helpText: string[] = []

    constructor(
        private electronIpc: ElectronIpcService,
    ) {}

    ngOnInit(): void {
        this.electronIpc.receive<string[]>(
            WindowApiConst.FFMPEG_OUTPUT,
            (output: string[]) => {
                this.helpText = output;
            }
        )
    }

    onClick(): void {
        this.electronIpc.send(WindowApiConst.FFMPEG_INPUT, '')
    }
}
