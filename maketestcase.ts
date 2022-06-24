const fs = require('fs');

interface pkg {name: string; test: string, min: string, max: string, info: string}
var pkgdt: pkg[] = [  
    // the case of 'OK'
    {name: "ok-01", test: "3.3.3", min: "1.2.0", max: "2.4.5", info: "メジャーバージョン：範囲より大<br>マイナーバージョン：範囲内<br>パッチバージョン：範囲内"}, // major ^, miner in, patch in 
    {name: "ok-02", test: "3.3.3", min: "1.0.0", max: "2.2.2", info: "メジャーバージョン：範囲より大<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より大"}, // major ^, miner ^, patch ^
    {name: "ok-03", test: "3.3.3", min: "1.0.2", max: "2.2.1", info: "メジャーバージョン：範囲より大<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より大,max値 < min値"}, // major ^, miner ^, patch ^ (2)
    {name: "ok-04", test: "3.3.3", min: "1.4.4", max: "2.5.5", info: "メジャーバージョン：範囲より大<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より小"}, // major ^, miner v, patch v 
    {name: "ok-05", test: "3.3.3", min: "1.4.5", max: "2.5.4", info: "メジャーバージョン：範囲より大<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より小,max値 < min値"}, // major ^, miner v, patch v (2)
    {name: "ok-06", test: "3.3.3", min: "3.0.0", max: "3.2.2", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より大"}, // major =, miner ^, patch ^
    {name: "ok-07", test: "3.3.3", min: "3.0.2", max: "3.2.1", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より大,max値 < min値"}, // major =, miner ^, patch ^ (2)
    {name: "ok-08", test: "3.3.3", min: "3.0.4", max: "3.2.4", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より小"}, // major =, miner ^, patch v
    {name: "ok-09", test: "3.3.3", min: "3.1.5", max: "3.2.2", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より小,max値 < min値"}, // major =, miner ^, patch v (2)
    {name: "ok-10", test: "3.3.3", min: "3.3.1", max: "3.3.2", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲より大"}, // major =, miner =, patch ^
    {name: "ok-11", test: "3.3.3", min: "3.3.4", max: "3.3.5", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲より小"}, // major =, miner =, patch v 
    {name: "ok-12", test: "3.3.3", min: "4.2.1", max: "5.4.5", info: "メジャーバージョン：範囲より小<br>マイナーバージョン：範囲内<br>パッチバージョン：範囲内"}, // major v, miner in, patch in
    {name: "ok-13", test: "3.3.3", min: "4.4.4", max: "5.5.5", info: "メジャーバージョン：範囲より小<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より小"}, // major v, miner v, patch v
    {name: "ok-14", test: "3.3.3", min: "4.4.6", max: "5.5.4", info: "メジャーバージョン：範囲より小<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より小,max値 < min値"}, // major v, miner v, patch v (2)
    {name: "ok-15", test: "3.3.3", min: "4.0.1", max: "4.1.2", info: "メジャーバージョン：範囲より小<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より大"}, // major v, miner ^, patch ^ 
    {name: "ok-16", test: "3.3.3", min: "5.1.2", max: "6.2.0", info: "メジャーバージョン：範囲より小<br>マイナーバージョン：範囲より大<br>パッチバージョン：範囲より大,max値 < min値"}, // major v, miner ^, patch ^ (2)
    {name: "ok-17", test: "13.3.3", min: "13.4.4", max: "13.5.5", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より小"}, // major =, miner v, patch v
    {name: "ok-18", test: "13.3.3", min: "13.4.5", max: "13.5.4", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より小,max値 < min値"}, // major =, miner v, patch v (2)
    {name: "ok-19", test: "13.3.3", min: "13.4.2", max: "13.5.1", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より大"}, // major =, miner v, patch ^
    {name: "ok-20", test: "13.3.3", min: "13.4.2", max: "13.2.0", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲より小<br>パッチバージョン：範囲より大,max値 < min値"}, // major =, miner v, patch ^ (2)
    {name: "ok-21", test: "3.3.3.3", min: "2.3.0", max: "2.3.4", info: "メジャーバージョン：範囲より大<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲内<br>その他バージョン付加"}, // longer version 
    {name: "ok-22", test: "3.3.3.3", min: "3.3.0", max: "3.3.3", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲maxと同じ<br>その他バージョン付加"}, // longer version (2)
    {name: "ok-23", test: "3.3.3-test", min: "2.3.0", max: "2.3.3", info: "メジャーバージョン：範囲より大<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲maxと同じ<br>プレリリースバージョン付加"}, // include prerelease version
    {name: "ok-24", test: "3.3.3-test-2", min: "3.3.0", max: "3.3.2", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲より大<br>プレリリースバージョン付加"}, // include prerelease version (2)
    {name: "ok-25", test: "3.3.0+2", min: "3.3.1", max: "3.3.2", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲より小<br>ビルドメタデータ付加"}, // include build meta data
    {name: "ok-26", test: "3.3.0-alpha.2", min: "3.3.0-alpha.3", max: "3.3.0-alpha.3", info: "完全一致比較：一致せず"}, // NOT match of all
    // the case of 'NG'
    {name: "ng-01", test: "3.3.3", min: "2.2.2", max: "4.4.4", info: "メジャーバージョン：範囲内<br>マイナーバージョン：範囲内<br>パッチバージョン：範囲内"}, // major in, miner in, patch in
    {name: "ng-02", test: "3.3.3", min: "3.2.2", max: "3.4.4", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲内<br>パッチバージョン：範囲内"}, // major =, miner in, patch in
    {name: "ng-03", test: "3.3.3", min: "3.3.2", max: "3.3.4", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲内"}, // major =, miner =, patch in
    {name: "ng-04", test: "3.3.3", min: "3.3.3", max: "3.3.4", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲minと同じ"}, // major =, miner =, patch=min
    {name: "ng-05", test: "3.3.3", min: "3.3.2", max: "3.3.3", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲maxと同じ"}, // major =, miner =, patch=max
    {name: "ng-06", test: "3.3.3-test", min: "3.3.2", max: "3.3.3", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲maxと同じ<br>プレリリースバージョン付加"}, // major =, miner =, patch=max include prerelease version
    {name: "ng-07", test: "3.3.3-test-2", min: "3.3.3", max: "3.3.5", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲minと同じ<br>プレリリースバージョン付加"}, // include prerelease version (2)
    {name: "ng-08", test: "3.3.1+20220511", min: "3.3.0", max: "3.3.2", info: "メジャーバージョン：範囲と同じ<br>マイナーバージョン：範囲と同じ<br>パッチバージョン：範囲内<br>ビルドメタデータ付加"}, // include build meta data
    {name: "ng-09", test: "3.3.0-alpha.3", min: "3.3.0-alpha.3", max: "3.3.0-alpha.3", info: "完全一致比較：一致"}, // match of all
 ]

// create test of vulnerablePackages.json
var data:string = "[\n"
for(var i = 0; i < pkgdt.length; i++) {
    data = data + "\t{ \"package-name\": \"" + pkgdt[i].name + "\", ";
    data = data + "\"package-version-min\": \"" + pkgdt[i].min + "\", ";
    data = data + "\"package-version-max\": \"" + pkgdt[i].max + "\" }";
    if(i < pkgdt.length-1) {
        data = data + ",";
    }
    data = data + "\n";
}  
data = data + "]"
fs.writeFile("vulnerablePackages.json", data, function(err){
    if(err){
        return console.log("error");
    }
})

// create test of package-lock.json
var txt:string = "{\n\t\"name\": \"test-package-lock\",\n\t\"version\": \"0.0.1\",\n\t\"lockfileVersion\": 2,\n\t\"requires\": true,\n\t\"packages\": {\n\t\t\"\": {\n\t\t\t\"devDependencies\": {\n";
for(var i = 0; i < pkgdt.length; i++) {
    txt = txt + "\t\t\t\t\"" + pkgdt[i].name + "\": \"^" + pkgdt[i].min + "\"";
    if(i < pkgdt.length-1) {
        txt = txt + ",";
    }
    txt = txt + "\n";    
}
txt = txt + "\t\t\t}\n\t\t},\n";
for(var i = 0; i < pkgdt.length; i++) {
    txt = txt + "\t\t\"node_modules/" + pkgdt[i].name + "\": {\n";
    txt = txt + "\t\t\t\"version\": \"" + pkgdt[i].test + "\",\n";
    txt = txt + "\t\t\t\"resolved\": \"https://hogehoge.org/" + pkgdt[i].name + "_" + pkgdt[i].test + ".tgz\",\n";
    txt = txt + "\t\t\t\"dev\": true\n\t\t}";
    if(i < pkgdt.length-1) {
        txt = txt + ",";
    }
    txt = txt + "\n";}
txt = txt + "\t},\n\t\"dependencies\": {\n";
for(var i = 0; i < pkgdt.length; i++) {
    txt = txt + "\t\t\"" + pkgdt[i].name + "\": {\n";
    txt = txt + "\t\t\t\"version\": \"" + pkgdt[i].test + "\",\n";
    txt = txt + "\t\t\t\"resolved\": \"https://hogehoge.org/" + pkgdt[i].name + "_" + pkgdt[i].test + ".tgz\",\n";
    txt = txt + "\t\t\t\"dev\": true\n\t\t}";
    if(i < pkgdt.length-1) {
        txt = txt + ",";
    }
    txt = txt + "\n";
}
txt = txt + "\t}\n}";
fs.writeFile("testpackage-lock.json", txt, function(err){
    if(err){
        return console.log("error");
    }
})

// create test case document
var td:string = "## バージョン範囲組み合わせテスト\n\n";
td = td + "下記表の\'手順\'記載の `package name` と `test version` を package-lock.json に記載し、<br>";
td = td + " `min of range` と `max of range` のバージョン範囲を本github action の設定用jsonに記載し、<br>";
td = td + "pull request を行い、本github action を動作させる。\n";
td = td + "| No | 手順 | 期待値 | 特記 |\n";
td = td + "|----|--------------------|--------------------|------|\n";
for(var i = 0; i < pkgdt.length; i++) {
    td = td + "| " + (i+1) + " | ";
    td = td + pkgdt[i].info + "<br>";
    td = td + "- package name: " + pkgdt[i].name + "<br>";
    td = td + "- test version: " + pkgdt[i].test + "<br>";
    td = td + "- min of range: " + pkgdt[i].min + "<br>";
    td = td + "- max of range: " + pkgdt[i].max + "<br>";
    if(pkgdt[i].name.indexOf('ok') === 0) {
        td = td + " | チェックがOKになること。 | |\n";
    }
    else if(pkgdt[i].name.indexOf('ng') === 0) {
        td = td + " | チェックがNGになること。<br>pull requestのコメントに<br>NGのパッケージ名とバージョンが<br>通知されること | |\n";
    }
    else {
        td = td + " | | |\n";
    }
}
fs.writeFile("vuln_version_testcase.md", td, function(err){
    if(err){
        return console.log("error");
    }
})


