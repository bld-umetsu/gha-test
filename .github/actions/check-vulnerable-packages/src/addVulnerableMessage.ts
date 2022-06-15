export const addVulnerableMessage = (
  messageBuffer: string,
  packageName: string,
  packageVersion: string,
  packageLockJsonfilePath: string,
): string => {
  messageBuffer +=
    '[' +
    packageName +
    ' ' +
    packageVersion.replace("\n", "") +
    "] was found in '" +
    packageLockJsonfilePath +
    "'\n";
  return messageBuffer;
};
