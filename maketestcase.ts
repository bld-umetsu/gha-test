const fs = require('fs');

interface pkg {name: string; test: string, min: string, max: string}
var pkgdt: pkg[] = [  
    // the case of 'OK'
    {name: "ok-01", test: "3.3.3", min: "1.0.0", max: "2.2.2"}, // major ^, miner ^, patch ^
    {name: "ok-02", test: "3.3.3", min: "1.4.4", max: "2.5.5"}, // major ^, miner v, patch v 
    {name: "ok-03", test: "3.3.3", min: "1.4.5", max: "2.5.4"}, // major ^, miner v, patch v (2)
    {name: "ok-04", test: "3.3.3", min: "3.0.0", max: "3.2.2"}, // major =, miner ^, patch ^
    {name: "ok-05", test: "3.3.3", min: "3.0.4", max: "3.2.4"}, // major =, miner ^, patch v
    {name: "ok-06", test: "3.3.3", min: "3.1.5", max: "3.2.2"}, // major =, miner ^, patch v (2)
    {name: "ok-07", test: "3.3.3", min: "3.3.1", max: "3.3.2"}, // major =, miner =, patch ^
    {name: "ok-08", test: "3.3.3", min: "3.3.4", max: "3.3.5"}, // major =, miner =, patch v 
    {name: "ok-09", test: "3.3.3", min: "1.0.0", max: "3.2.2"}, // major v, miner v, patch v
    {name: "ok-10", test: "3.3.3", min: "4.0.1", max: "4.1.2"}, // major v, miner ^, patch ^ 
    {name: "ok-11", test: "3.3.3", min: "5.1.4", max: "6.2.0"}, // major v, miner ^, patch ^ (2)
    {name: "ok-12", test: "13.3.3", min: "13.4.4", max: "13.5.5"}, // major =, miner v, patch v
    {name: "ok-13", test: "13.3.3", min: "13.4.2", max: "13.5.1"}, // major =, miner v, patch ^
    {name: "ok-14", test: "13.3.3", min: "13.4.2", max: "13.2.0"}, // major =, miner v, patch ^ (2)
    {name: "ok-15", test: "13.23.3", min: "13.23.4", max: "13.23.5"}, // major =, miner =, patch v same as 'ok-08'
    {name: "ok-16", test: "13.23.3", min: "13.23.0", max: "13.23.2"}, // major =, miner =, patch ^ same as 'ok-07' 
    {name: "ok-17", test: "3.3.3.3", min: "2.3.0", max: "2.3.4"}, // longer version 
    {name: "ok-18", test: "3.3.3.3", min: "3.3.0", max: "3.3.3"}, // longer version (2)
    {name: "ok-19", test: "3.3.3-test", min: "2.3.0", max: "2.3.3"}, // include string
    {name: "ok-20", test: "3.3.3-test", min: "3.3.0", max: "3.3.2"}, // include string (2)
    // the case of 'NG'
    {name: "ng-01", test: "3.3.3", min: "2.2.2", max: "4.4.4"}, // major in, miner in, patch in
    {name: "ng-02", test: "3.3.3", min: "3.2.2", max: "3.4.4"}, // major =, miner in, patch in
    {name: "ng-03", test: "3.3.3", min: "3.3.2", max: "3.3.4"}, // major =, miner =, patch in
    {name: "ng-04", test: "3.3.3", min: "3.3.3", max: "3.3.4"}, // major =, miner =, patch=min
    {name: "ng-05", test: "3.3.3", min: "3.3.2", max: "3.3.3"}, // major =, miner =, patch=max
    {name: "ng-06", test: "3.3.3-test", min: "3.3.2", max: "3.3.3"} // major =, miner =, patch=max include string
]

var data:string = "[\n"
for(var i = 0; i < pkgdt.length; i++) {
    data = data + "\t{ \"pkgnm\": \"" + pkgdt[i].name + "\", ";
    data = data + "\"pkgvermin\": \"" + pkgdt[i].min + "\", ";
    data = data + "\"pkgvermax\": \"" + pkgdt[i].max + "\" }";
    if(i < pkgdt.length-1) {
        data = data + ",";
    }
    data = data + "\n";
}  
data = data + "]"
fs.writeFile("vulnerabilityPackage.json", data, function(err){
    if(err){
        return console.log("error");
    }
})

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
    txt = txt + "\t\t\t\"resolved\": \"https://hogehoge.org/" + pkgdt[i].name + pkgdt[i].test + ".tgz\",\n";
    txt = txt + "\t\t\t\"dev\": true\n\t\t}";
    if(i < pkgdt.length-1) {
        txt = txt + ",";
    }
    txt = txt + "\n";}
txt = txt + "\t},\n\t\"dependencies\": {\n";
for(var i = 0; i < pkgdt.length; i++) {
    txt = txt + "\t\t\"" + pkgdt[i].name + "\": {\n";
    txt = txt + "\t\t\t\"version\": \"" + pkgdt[i].test + "\",\n";
    txt = txt + "\t\t\t\"resolved\": \"https://hogehoge.org/" + pkgdt[i].name + pkgdt[i].test + ".tgz\",\n";
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

