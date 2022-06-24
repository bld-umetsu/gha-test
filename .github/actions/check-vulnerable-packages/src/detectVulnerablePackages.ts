import { checkVulnerableVersion } from './checkVulnerableVersion';
import { executeCommand } from './executeCommand';
import { addVulnerableMessage } from './addVulnerableMessage';

const checkVersionFromPackagesSection = async (
  packageLockJsonPath: string,
  packageName: string,
  packageVersionMin: string,
  packageVersionMax: string,
): Promise<[boolean, string]> => {
  const fitVersionFromPackagesSection = await executeCommand(
    `/bin/bash -c "cat ${packageLockJsonPath} | jq -r '.packages.\\"node_modules/${packageName}\\".version'"`,
  );
  const isVulnerableVersion = checkVulnerableVersion(
    fitVersionFromPackagesSection,
    packageVersionMin,
    packageVersionMax,
  );
  return [isVulnerableVersion, fitVersionFromPackagesSection];
};

const checkVersionFromDependenciesSection = async (
  packageLockJsonPath: string,
  packageName: string,
  packageVersionMin: string,
  packageVersionMax: string,
): Promise<[boolean, string]> => {
  const fitVersionFromDependenciesSection = await executeCommand(
    `/bin/bash -c "cat ${packageLockJsonPath} | jq -r '.dependencies.\\"${packageName}\\".version'"`,
  );
  const isVulnerableVersion = checkVulnerableVersion(
    fitVersionFromDependenciesSection,
    packageVersionMin,
    packageVersionMax,
  );
  return [isVulnerableVersion, fitVersionFromDependenciesSection];
};

export const makeMessageOfDetectedVulnerablePackages = async (
  arrayPackageLockJson: string[],
  packageName: string,
  packageVersionMin: string,
  packageVersionMax: string,
): Promise<string> => {
  let vulnerableMessage = '';
  await Promise.all(
    arrayPackageLockJson.map(async (filePath) => {
      // const fitVersionFromPackagesSection = await executeCommand(
      //   `/bin/bash -c "cat ${filePath} | jq -r '.packages.\\"node_modules/${packageName}\\".version'"`,
      // );
      // let isVulnerableVersion = checkVulnerableVersion(
      //   fitVersionFromPackagesSection,
      //   packageVersionMin,
      //   packageVersionMax,
      // );
      let [isVulnerableVersion, fitVersion] =
        await checkVersionFromPackagesSection(
          filePath,
          packageName,
          packageVersionMin,
          packageVersionMax,
        );
      if (isVulnerableVersion) {
        vulnerableMessage = addVulnerableMessage(
          vulnerableMessage,
          packageName,
          fitVersion,
          filePath,
        );
      } else {
        // const fitVersionFromDependenciesSection = await executeCommand(
        //   `/bin/bash -c "cat ${filePath} | jq -r '.dependencies.\\"${packageName}\\".version'"`,
        // );
        // isVulnerableVersion = checkVulnerableVersion(
        //   fitVersionFromDependenciesSection,
        //   packageVersionMin,
        //   packageVersionMax,
        // );
        [isVulnerableVersion, fitVersion] =
          await checkVersionFromDependenciesSection(
            filePath,
            packageName,
            packageVersionMin,
            packageVersionMax,
          );
        if (isVulnerableVersion) {
          vulnerableMessage = addVulnerableMessage(
            vulnerableMessage,
            packageName,
            fitVersion,
            filePath,
          );
        }
      }
    }),
  );
  return vulnerableMessage;
};
