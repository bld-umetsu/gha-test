# For github action test

## Update history

- 2022/5/6: Add function of checking package version in range.

## test

1. README.md を変更してpush, pull request を実施 --> github actionが動作しないことを確認：OK
2. ./package-lock.jsonを一部変更してpush (pull requestはマージしないまま) --> github actionが動作OKになること：OK
3. Margeする。./.github/workflows/vulnerabilityPackage.jsonをエラーが出るように変更して、push, pull request を実施 --> github actionが動作NGになること：OK
   