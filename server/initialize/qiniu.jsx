// qiniu test account
var app = {
    bucket: Meteor.settings.qiniu.bucket || '',
    AK: Meteor.settings.qiniu.accessKey || '',
    SK: Meteor.settings.qiniu.secretKey || ''
};

function generateUploadToken(app) {
    var putPolicy = {
        scope: app.bucket,
        deadline: (new Date().getTime() / 1000) + 7200,
        insertOnly: 1,
        mimeLimit: 'image/*',
        saveKey: '$(etag)',
        persistentOps: 'imageView2/1/w/660/h/440/format/jpg/interlace/1'
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

    Meteor.setTimeout(autoUpdateCollection, 3600 * 1000);
}

autoUpdateCollection();
