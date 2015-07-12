if (!Meteor.settings.qiniu) {
    console.warn('Cannot find Qiniu configurations.');
} else {
    var app = {
        bucket: Meteor.settings.qiniu.bucket || '',
        AK: Meteor.settings.qiniu.accessKey || '',
        SK: Meteor.settings.qiniu.secretKey || '',
        domain: Meteor.settings.qiniu.domain || ''
    };

    function generateUploadToken(app) {
        var putPolicy = {
            scope: app.bucket,
            deadline: Math.floor((new Date().getTime() / 1000)) + 7200,
            mimeLimit: 'image/*',
            saveKey: '$(etag).jpg'
        };
        var putPolicyString = JSON.stringify(putPolicy);
        var encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(putPolicyString));
        var hash = CryptoJS.HmacSHA1(encoded, app.SK);
        var encodedSigned = hash.toString(CryptoJS.enc.Base64);
        return `${app.AK}:${encodedSigned.replace(/\+/g, '-').replace(/\//g, '_')}:${encoded}`;
    }

    function autoUpdateConfig() {
        console.log('Updating Qiniu upload token.');
        var qiniu = QiniuConfig.findOne({name: 'qiniuConfig'}) || {name: 'qiniuConfig'};
        qiniu.token = generateUploadToken(app);
        qiniu.domain = app.domain;
        QiniuConfig.upsert({name: 'qiniuConfig'}, qiniu);

        Meteor.setTimeout(autoUpdateConfig, 3600 * 1000);
    }

    autoUpdateConfig();
}
