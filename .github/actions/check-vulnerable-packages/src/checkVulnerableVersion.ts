const trimLineFeedCodeFromVersion = (versionString: string): string =>
  versionString.replace('\n', '');

const trimMetaDataFromVersion = (versionString: string): string => {
  const tempRemoveBuildMetaData = versionString.split('+');
  const tempRemovePrereleaseVersion = tempRemoveBuildMetaData[0].split('-');
  return tempRemovePrereleaseVersion[0];
};

// cf.: https://semver.org/lang/ja/#spec-item-11
export const checkVulnerableVersion = (
  targetVersion: string,
  minVersion: string,
  maxVersion: string,
): boolean => {
  const pureVersion = trimLineFeedCodeFromVersion(targetVersion);
  if (minVersion === maxVersion) {
    if (pureVersion === minVersion) {
      return true;
    }
    return false;
  }

  const numericTargetVersion = trimMetaDataFromVersion(pureVersion);

  const compareResult = {
    VERSION_LARGE: 1,
    VERSION_SAME: 0,
    VERSION_SMALL: -1,
  } as const;

  // compare with minimum version
  const compareMinimumVersion = numericTargetVersion.localeCompare(minVersion);
  if (compareMinimumVersion === compareResult.VERSION_SMALL) {
    return false;
  }
  if (compareMinimumVersion === compareResult.VERSION_SAME) {
    return true;
  }

  // compare with maximum version
  const compareMaximumVersion = numericTargetVersion.localeCompare(maxVersion);
  if (compareMaximumVersion === compareResult.VERSION_LARGE) {
    return false;
  }
  return true;
};
