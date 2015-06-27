// qiniu test account
var app = {
    bucket: "qtestbucket",
    AK: "iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV",
    SK: "6QTOr2Jg1gcZEWDQXKOGZh5PziC2MCV5KsntT70j"
};

function generateUploadToken(app) {
    var putPolicy = {
        scope: app.bucket,
        deadline: (new Date().getTime() / 1000) + 86400
    };
    var putPolicyString = JSON.stringify(putPolicy);
    var encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(putPolicyString));
    var hash = CryptoJS.HmacSHA1(encoded, app.SK);
    var encodedSigned = hash.toString(CryptoJS.enc.Base64);
    return `${app.AK}:${encodedSigned.replace(/\+/g, "-").replace(/\//g, "_")}:${encoded}`;
}

function autoUpdateCollection() {
    console.log('Updating Qiniu upload token.');
    var qiniu = Qiniu.findOne() || {name: 'uploadToken'};
    qiniu.value = generateUploadToken(app);
    Qiniu.upsert({name: 'uploadToken'}, qiniu);

    Meteor.setTimeout(autoUpdateCollection, 43200 * 1000);
}

autoUpdateCollection();
