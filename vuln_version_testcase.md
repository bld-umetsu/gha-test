## バージョン範囲を組み合わせテスト

下記表の'手順'記載の `package name` と `test version` を package-lock.json に記載し、<br> `min of range` と `max of range` のバージョン範囲を本github action の設定用jsonに記載し、<br>pull request を行い、本github action を動作させる。
| No | 手順 | 期待値 | 特記 |
|----|--------------------|--------------------|------|
| 1 | メジャーバージョン：範囲より大<br>マイナーバージョン：範囲内<br>パッチバージョン：範囲内<br>- package name: ok-01<br>- test version: 3.3.3<br>- min of range: 1.2.0<br>- max of range: 2.4.5<br> | チェックがOKになること。 | |
| 2 | メジャーバージョン：範囲より大<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より大<br>- package name: ok-02<br>- test version: 3.3.3<br>- min of range: 1.0.0<br>- max of range: 2.2.2<br> | チェックがOKになること。 | |
| 3 | メジャーバージョン：範囲より大<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より大,範囲maxとmin逆転<br>- package name: ok-03<br>- test version: 3.3.3<br>- min of range: 1.0.2<br>- max of range: 2.2.1<br> | チェックがOKになること。 | |
| 4 | メジャーバージョン：範囲より大<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より小<br>- package name: ok-04<br>- test version: 3.3.3<br>- min of range: 1.4.4<br>- max of range: 2.5.5<br> | チェックがOKになること。 | |
| 5 | メジャーバージョン：範囲より大<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より小,範囲maxとmin逆転<br>- package name: ok-05<br>- test version: 3.3.3<br>- min of range: 1.4.5<br>- max of range: 2.5.4<br> | チェックがOKになること。 | |
| 6 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より大<br>- package name: ok-06<br>- test version: 3.3.3<br>- min of range: 3.0.0<br>- max of range: 3.2.2<br> | チェックがOKになること。 | |
| 7 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より大,範囲maxとmin逆転<br>- package name: ok-07<br>- test version: 3.3.3<br>- min of range: 3.0.2<br>- max of range: 3.2.1<br> | チェックがOKになること。 | |
| 8 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より小<br>- package name: ok-08<br>- test version: 3.3.3<br>- min of range: 3.0.4<br>- max of range: 3.2.4<br> | チェックがOKになること。 | |
| 9 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より小,範囲maxとmin逆転<br>- package name: ok-09<br>- test version: 3.3.3<br>- min of range: 3.1.5<br>- max of range: 3.2.2<br> | チェックがOKになること。 | |
| 10 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲より大<br>- package name: ok-10<br>- test version: 3.3.3<br>- min of range: 3.3.1<br>- max of range: 3.3.2<br> | チェックがOKになること。 | |
| 11 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲より小<br>- package name: ok-11<br>- test version: 3.3.3<br>- min of range: 3.3.4<br>- max of range: 3.3.5<br> | チェックがOKになること。 | |
| 12 | メジャーバージョン：範囲より小<br>マイナーバージョン：範囲内<br>パッチバージョン：範囲内<br>- package name: ok-12<br>- test version: 3.3.3<br>- min of range: 4.2.1<br>- max of range: 5.4.5<br> | チェックがOKになること。 | |
| 13 | メジャーバージョン：範囲より小<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より小<br>- package name: ok-13<br>- test version: 3.3.3<br>- min of range: 4.4.4<br>- max of range: 5.5.5<br> | チェックがOKになること。 | |
| 14 | メジャーバージョン：範囲より小<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より小,範囲maxとmin逆転<br>- package name: ok-14<br>- test version: 3.3.3<br>- min of range: 4.4.6<br>- max of range: 5.5.4<br> | チェックがOKになること。 | |
| 15 | メジャーバージョン：範囲より小<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より大<br>- package name: ok-15<br>- test version: 3.3.3<br>- min of range: 4.0.1<br>- max of range: 4.1.2<br> | チェックがOKになること。 | |
| 16 | メジャーバージョン：範囲より小<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より大,範囲maxとmin逆転<br>- package name: ok-16<br>- test version: 3.3.3<br>- min of range: 5.1.2<br>- max of range: 6.2.0<br> | チェックがOKになること。 | |
| 17 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より小<br>- package name: ok-17<br>- test version: 13.3.3<br>- min of range: 13.4.4<br>- max of range: 13.5.5<br> | チェックがOKになること。 | |
| 18 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より小,範囲maxとmin逆転<br>- package name: ok-18<br>- test version: 13.3.3<br>- min of range: 13.4.5<br>- max of range: 13.5.4<br> | チェックがOKになること。 | |
| 19 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より大<br>- package name: ok-19<br>- test version: 13.3.3<br>- min of range: 13.4.2<br>- max of range: 13.5.1<br> | チェックがOKになること。 | |
| 20 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より大,範囲maxとmin逆転<br>- package name: ok-20<br>- test version: 13.3.3<br>- min of range: 13.4.2<br>- max of range: 13.2.0<br> | チェックがOKになること。 | |
| 21 | メジャーバージョン：範囲より大<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲内<br>その他バージョン付加<br>- package name: ok-21<br>- test version: 3.3.3.3<br>- min of range: 2.3.0<br>- max of range: 2.3.4<br> | チェックがOKになること。 | |
| 22 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲maxと同じ<br>その他バージョン付加<br>- package name: ok-22<br>- test version: 3.3.3.3<br>- min of range: 3.3.0<br>- max of range: 3.3.3<br> | チェックがOKになること。 | |
| 23 | メジャーバージョン：範囲より大<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲maxと同じ+文字列付加<br>- package name: ok-23<br>- test version: 3.3.3-test<br>- min of range: 2.3.0<br>- max of range: 2.3.3<br> | チェックがOKになること。 | |
| 24 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲より大+文字列付加<br>- package name: ok-24<br>- test version: 3.3.3-test<br>- min of range: 3.3.0<br>- max of range: 3.3.2<br> | チェックがOKになること。 | |
| 25 | メジャーバージョン：範囲内<br>マイナーバージョン：範囲内<br>パッチバージョン：範囲内<br>- package name: ng-01<br>- test version: 3.3.3<br>- min of range: 2.2.2<br>- max of range: 4.4.4<br> | チェックがNGになること。 | |
| 26 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲内<br>パッチバージョン：範囲内<br>- package name: ng-02<br>- test version: 3.3.3<br>- min of range: 3.2.2<br>- max of range: 3.4.4<br> | チェックがNGになること。 | |
| 27 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲内<br>- package name: ng-03<br>- test version: 3.3.3<br>- min of range: 3.3.2<br>- max of range: 3.3.4<br> | チェックがNGになること。 | |
| 28 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲minと同じ<br>- package name: ng-04<br>- test version: 3.3.3<br>- min of range: 3.3.3<br>- max of range: 3.3.4<br> | チェックがNGになること。 | |
| 29 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲maxと同じ<br>- package name: ng-05<br>- test version: 3.3.3<br>- min of range: 3.3.2<br>- max of range: 3.3.3<br> | チェックがNGになること。 | |
| 30 | メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲maxと同じ+文字列付加<br>- package name: ng-06<br>- test version: 3.3.3-test<br>- min of range: 3.3.2<br>- max of range: 3.3.3<br> | チェックがNGになること。 | |
