# For github action test

## Update history

- 2022/5/6: Add function of checking package version in range.

## test

1. vulnerabilityPackage.jsonはOKになるようなバージョン構成にしておく。
2. README.md を変更してpush, pull request を実施 --> github actionが動作しないこと：OK
3. ./package-lock.jsonを一部変更してpush (pull requestはマージしないまま) --> github actionが動作し、OKになること：OK
4. マージ後vulnerabilityPackage.jsonをエラーが出るように変更して、push, pull request を実施 --> github actionが動作NGになること：OK
5. github actionがOKになるvulnerabilityPackage.jsonでpull requestした後、vulnerabilityPackage.jsonをエラーがでるように編集してコミットする --> github actionが動作ＮＧになること：OK

| No | Test名 | 条件 | 操作 | 確認内容 | 判定 |
|----|--------|------|--------|-----------|-------|
| 1 | vulnerabilityPackage.json,<br>package-lock.json変更で<br>のみgithub action動作 |  vulnerabilityPackage.jsonは<br>OKになるようなバージョン構成<br>にしておく。| README.md を変更してpush, pull request を実施 | github actionが<br>動作しないこと | :white_check_mark: |
| 2 | 〃 | 1のpull requestはマージしない<br>まま。| ./package-lock.jsonを<br>一部変更してpush を実施。 | github actionが<br>動作し、OKになること | :white_check_mark: |
| 3 | 〃 | 2のpull requestをマージする。| vulnerabilityPackage.jsonを<br>エラーが出るように変更して、push, pull request を実施 | github actionが<br>動作し、NGになること | :white_check_mark: |
| 4 | 〃 | | vulnerabilityPackage.jsonを<br>OKになるように変更して、push, pull request を実施 | github actionが<br>動作し、OKになること | :white_check_mark: |
| 5 | ルート以外のpackage-lock.json変更でもgithub action動作 | | ./test/package-lock.jsonを変更して、push, pull requestを実施。| github actionが<br>動作し、OKになること | :white_check_mark: |
| 6 | バージョン範囲チェック<br>- メジャー：大<br>- マイナー：大<br>- パッチ：大<br>- その他：なし | package-lock.jsonのバージョン:<br>1.4.0<br>バージョン範囲:<br> 1.3.1 ~ 1.4.4 | vulnerabilityPackage.jsonを<br>左記のように変更しpush, <br>pull requestを実施 | github actionが<br>OKになること | |
| 7 | バージョン範囲チェック<br>- メジャー：大<br>- マイナー：小<br>- パッチ：小<br>- その他：なし  | package-lock.jsonのバージョン:<br>1.4.0<br>バージョン範囲:<br> 1.3.1 ~ 1.4.4 | vulnerabilityPackage.jsonを<br>左記のように変更しpush, <br>pull requestを実施 | github actionが<br>OKになること | |
| 8 | バージョン範囲チェック<br>- メジャー：小<br>- マイナー：小<br>- パッチ：小<br>- その他：なし  | package-lock.jsonのバージョン:<br>1.4.0<br>バージョン範囲:<br> 1.3.1 ~ 1.4.4 | vulnerabilityPackage.jsonを<br>左記のように変更しpush, <br>pull requestを実施 | github actionが<br>OKになること | |
| 9 | バージョン範囲チェック<br>- メジャー：小<br>- マイナー：大<br>- パッチ：大<br>- その他：なし  | package-lock.jsonのバージョン:<br>1.4.0<br>バージョン範囲:<br> 1.3.1 ~ 1.4.4 | vulnerabilityPackage.jsonを<br>左記のように変更しpush, <br>pull requestを実施 | github actionが<br>OKになること | |
| 10 | バージョン範囲チェック<br>- メジャー：大<br>- マイナー：小<br>- パッチ：小<br>- その他：なし  | package-lock.jsonのバージョン:<br>1.4.0<br>バージョン範囲:<br> 1.3.1 ~ 1.4.4 | vulnerabilityPackage.jsonを<br>左記のように変更しpush, <br>pull requestを実施 | github actionが<br>OKになること | |
| 11 | バージョン範囲チェック<br>- メジャー：大<br>- マイナー：小<br>- パッチ：小<br>- その他：なし  | package-lock.jsonのバージョン:<br>1.4.0<br>バージョン範囲:<br> 1.3.1 ~ 1.4.4 | vulnerabilityPackage.jsonを<br>左記のように変更しpush, <br>pull requestを実施 | github actionが<br>OKになること | |