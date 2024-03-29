import * as exec from '@actions/exec';
import { ExecOptions } from '@actions/exec';

export const executeCommand = async (command: string): Promise<string> => {
  let output = '';
  const options: ExecOptions = {};
  options.listeners = {
    stdout: (data: Buffer) => {
      output += data.toString();
    },
    stderr: (data: Buffer) => {
      console.error(data);
    },
  };
  await exec.exec(command, [''], options);
  return output;
};
