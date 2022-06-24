export const addVulnerableMessage = (
  messageBuffer: string,
  packageName: string,
  packageVersionWithNewline: string,
  packageLockJsonfilePath: string,
): string => {
  const packageVersion = packageVersionWithNewline.replace('\n', '');
  return `${messageBuffer}[${packageName} ${packageVersion}] was found in '${packageLockJsonfilePath}'\n`;
};
