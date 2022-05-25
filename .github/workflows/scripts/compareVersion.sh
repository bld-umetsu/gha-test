function checkversion() {
  # refer: https://semver.org/lang/ja/#spec-item-11
  if [ "$2" == "$3" ]; then    # when min version = max version, compare by string. for checking special version expression.
    if [ "$1" == "$2" ]; then
      echo 1      # same version
      return 0
    else
      echo 0
      return 0
    fi
  fi
  # change version string to array. separator is [.].
  tvt=(${1//+/ })    # remove build meta data. (after '+')
  tvt=(${tvt[0]//-/ })    # remove prerelease version. (after '-')
  vt=(${tvt[0]//./ })
  # vt=(${1//./ })
  pvmin=(${2//./ })
  pvmax=(${3//./ })
  cnt=0

  # compare with minimum version
  if (( ${#vt[@]} < ${#pvmin[@]} )); then
    len=${#vt[@]}
  else
    len=${#pvmin[@]}
  fi
  for (( i = 0; i < len; i++ )); do # loop with smaller array length
    if (( ${vt[$i]} > ${pvmin[$i]} )); then
      let cnt++   # bigger than minimum version
      break
    fi
    if (( ${vt[$i]} < ${pvmin[$i]} )); then
      echo 0      # smaller than minimum version
      return 0
    fi
  done
  if (( $cnt == 0 )); then
    if (( ${#vt[@]} == ${#pvmin[@]} )); then   # longer array length is bigger
      echo 1      # same as minimum version
      return 0
    elif (( ${#vt[@]} < ${#pvmin[@]} )); then
      echo 0      # smaller than minimum version
      return 0
    else
      let cnt++   # bigger than minimum version
    fi
  fi

  # compare with maximum version
  if (( ${#vt[@]} < ${#pvmax[@]} )); then
    len=${#vt[@]}
  else
    len=${#pvmax[@]}
  fi
  for (( i = 0; i < len; i++ )); do
    if (( ${vt[$i]} < ${pvmax[$i]} )); then
      echo 1      # smaller than maximum version
      return 0
    fi
    if (( ${vt[$i]} > ${pvmax[$i]} )); then
      echo 0      # bigger than maximum version
      return 0
    fi
  done
  if (( ${#vt[@]} <= ${#pvmax[@]} )); then
    echo 1      # same version or smaller than maximum version
    return 0
  else
    echo 0      # bigger than maximum version
    return 0
  fi
}
