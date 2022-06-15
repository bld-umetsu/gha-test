import * as core from '@actions/core';
import { checkVulnerableVersion } from './checkVulnerableVersion';
import { executeCommand } from './executeCommand';
import { addVulnerableMessage } from './addVulnerableMessage';
import { fileURLToPath } from 'url';

const main = async () => {
  try {
    const packageName = core.getInput('package-name');
    const packageVersionMin = core.getInput('package-version-min');
    const packageVersionMax = core.getInput('package-version-max');

    // const packageName = "ng-01";
    // const packageVersionMin = "2.2.2";
    // const packageVersionMax = "4.4.4";

    const listFoundPackageLockJson = await executeCommand(
      `/bin/bash -c "find ./ -mindepth 1 -name "package-lock.json""`,
    );
    const arrayPackageLockJson = listFoundPackageLockJson.split('\n');
    // const listFoundPackageLockJson = await executeCommand(
    //   `/bin/bash -c "find ./ -mindepth 1 -name "package-lock.json" | jq -R -s -c 'split(\\"\n\\")[:-1]'"`,
    // );
    // const arrayPackageLockJson = listFoundPackageLockJson.split(',');
    let vulnerableMessage = '';
    for (let filePath of arrayPackageLockJson) {
      if (filePath == "") continue;
      const fitVersionFromPackagesSection = await executeCommand(
        `/bin/bash -c "cat ${filePath} | jq -r '.packages.\\"node_modules/${packageName}\\".version'"`,
      );
      const isVulnerableVersion = checkVulnerableVersion(
        fitVersionFromPackagesSection,
        packageVersionMin,
        packageVersionMax,
      );
      if (isVulnerableVersion) {
        vulnerableMessage = addVulnerableMessage(
          vulnerableMessage,
          packageName,
          fitVersionFromPackagesSection,
          filePath,
        );
      } else {
        const fitVersionFromDependenciesSection = await executeCommand(
          `/bin/bash -c "cat ${filePath} | jq -r '.dependencies.\\"${packageName}\\".version'"`,
        );
        const isVulnerableVersion = checkVulnerableVersion(
          fitVersionFromDependenciesSection,
          packageVersionMin,
          packageVersionMax,
        );
        if (isVulnerableVersion) {
          vulnerableMessage = addVulnerableMessage(
            vulnerableMessage,
            packageName,
            fitVersionFromDependenciesSection,
            filePath,
          );
        }
      }
    };
    if (vulnerableMessage != '') {
      vulnerableMessage =
        'vulnerable package has included in your repository.%0A' +
        vulnerableMessage;
      process.exitCode = 1;
    }
    core.setOutput('check-result', vulnerableMessage);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
};
main();
