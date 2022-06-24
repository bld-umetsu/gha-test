import * as core from '@actions/core';
import { checkVulnerableVersion } from './checkVulnerableVersion';
import { executeCommand } from './executeCommand';
import { addVulnerableMessage } from './addVulnerableMessage';
import { makeMessageOfDetectedVulnerablePackages } from './detectVulnerablePackages';

const getArrayFoundPackageLockJson = async (): Promise<string[]> => {
  const listFoundPackageLockJson = await executeCommand(
    `/bin/bash -c "find ./ -mindepth 1 -name "package-lock.json""`,
  );
  const arrayPackageLockJson = listFoundPackageLockJson
    .split('\n')
    .filter(Boolean);
  return arrayPackageLockJson;
};

const main = async () => {
  try {
    const packageName = core.getInput('package-name');
    const packageVersionMin = core.getInput('package-version-min');
    const packageVersionMax = core.getInput('package-version-max');

    // const listFoundPackageLockJson = await executeCommand(
    //   `/bin/bash -c "find ./ -mindepth 1 -name "package-lock.json""`,
    // );
    // const arrayPackageLockJson = listFoundPackageLockJson
    //   .split('\n')
    //   .filter(Boolean);

    const arrayPackageLockJson = await getArrayFoundPackageLockJson();

    let vulnerableMessage = await makeMessageOfDetectedVulnerablePackages(
      arrayPackageLockJson,
      packageName,
      packageVersionMin,
      packageVersionMax,
    );

    // let vulnerableMessage = '';
    // await Promise.all(
    //   arrayPackageLockJson.map(async (filePath) => {
    //     const fitVersionFromPackagesSection = await executeCommand(
    //       `/bin/bash -c "cat ${filePath} | jq -r '.packages.\\"node_modules/${packageName}\\".version'"`,
    //     );
    //     let isVulnerableVersion = checkVulnerableVersion(
    //       fitVersionFromPackagesSection,
    //       packageVersionMin,
    //       packageVersionMax,
    //     );
    //     if (isVulnerableVersion) {
    //       vulnerableMessage = addVulnerableMessage(
    //         vulnerableMessage,
    //         packageName,
    //         fitVersionFromPackagesSection,
    //         filePath,
    //       );
    //     } else {
    //       const fitVersionFromDependenciesSection = await executeCommand(
    //         `/bin/bash -c "cat ${filePath} | jq -r '.dependencies.\\"${packageName}\\".version'"`,
    //       );
    //       isVulnerableVersion = checkVulnerableVersion(
    //         fitVersionFromDependenciesSection,
    //         packageVersionMin,
    //         packageVersionMax,
    //       );
    //       if (isVulnerableVersion) {
    //         vulnerableMessage = addVulnerableMessage(
    //           vulnerableMessage,
    //           packageName,
    //           fitVersionFromDependenciesSection,
    //           filePath,
    //         );
    //       }
    //     }
    //   }),
    // );
    if (vulnerableMessage !== '') {
      vulnerableMessage = `Detect vulnerable packages in your repository!\n${vulnerableMessage}`;
      process.exitCode = 1;
    }
    core.setOutput('check-result', vulnerableMessage);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
};

main().catch((error) => {
  if (error instanceof Error) {
    core.setFailed(error.message);
  }
});
