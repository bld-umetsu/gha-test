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
    packageVersion +
    "] was found in '" +
    packageLockJsonfilePath +
    "'.%0A";
  return messageBuffer;
};
