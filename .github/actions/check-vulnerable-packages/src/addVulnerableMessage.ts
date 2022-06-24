export const addVulnerableMessage = (
  messageBuffer: string,
  packageName: string,
  packageVersion: string,
  packageLockJsonfilePath: string,
): string => {
  const removedReturnCodeFromVersion = packageVersion.replace('\n', '');
  return `${messageBuffer}[${packageName} ${removedReturnCodeFromVersion}] was found in '${packageLockJsonfilePath}'\n`;
};
