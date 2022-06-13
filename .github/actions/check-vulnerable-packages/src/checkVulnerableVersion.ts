// cf.: https://semver.org/lang/ja/#spec-item-11
export const checkVulnerableVersion = (
  targetVersion: string,
  minVersion: string,
  maxVersion: string,
): boolean => {
  if (minVersion === maxVersion) {
    if (targetVersion === minVersion) {
      return true;
    } else {
      return false;
    }
  }

  // separate each version string to Major, Miner and Patch.
  const tempRemoveBuildMetaData = targetVersion.split('+');
  const tempRemovePrereleaseVersion = tempRemoveBuildMetaData[0].split('-');
  const arrayTargetVersion = tempRemovePrereleaseVersion[0].split('.');
  const arrayMinVersion = minVersion.split('.');
  const arrayMaxVersion = maxVersion.split('.');

  // compare with minimum version
  let largerCount = 0;
  arrayTargetVersion.forEach((eachVersion, index) => {
    if (index < arrayMinVersion.length) {
      if (eachVersion > arrayMinVersion[index]) {
        largerCount += 1;
      }
      if (eachVersion < arrayMinVersion[index]) {
        return false;
      }
    }
  });
  if (largerCount == 0) {
    if (arrayTargetVersion.length == arrayMinVersion.length) {
      return true;
    } else if (arrayTargetVersion.length < arrayMinVersion.length) {
      return false;
    }
  }

  // compare with maximum version
  arrayTargetVersion.forEach((eachVersion, index) => {
    if (index < arrayMaxVersion.length) {
      if (eachVersion < arrayMaxVersion[index]) {
        return true;
      }
      if (eachVersion > arrayMaxVersion[index]) {
        return false;
      }
    }
  });
  if (arrayTargetVersion.length <= arrayMaxVersion.length) {
    return true;
  } else {
    return false;
  }
};
