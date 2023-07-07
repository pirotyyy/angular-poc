import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WindowApiConst } from 'shared-lib';
import { ElectronIpcService } from 'src/app/services/electron-ipc.service';

@Component({
  selector: 'app-fs',
  templateUrl: './fs.component.html',
  styleUrls: ['./fs.component.scss']
})
export class FsComponent {
  dirs: string[] = [];

  constructor(
    private electronIpc: ElectronIpcService
  ) {}

  ngOnInit(): void {
    this.electronIpc.receive<string[]>(
        WindowApiConst.FS_OUTPUT,
        (output: string[]) => {
            this.dirs = output;
        }
    )
  }

  form = new FormGroup({
      path: new FormControl('', [])
  })

  onSubmit(): void {
      const input = this.form.value.path
      this.electronIpc.send(WindowApiConst.FS_INPUT, input)
  }
}
