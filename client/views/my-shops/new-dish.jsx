Template.newDish.onRendered(function () {
    var qiniuConfig = QiniuConfig.findOne({name: 'qiniuConfig'});
    Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'imgUploader',
        uptoken: qiniuConfig.token,
        save_key: true,
        domain: `http://${qiniuConfig.domain}/`,
        container: 'uploaderContainer',
        max_file_size: '10mb',
        flash_swf_url: 'swf/Moxie.swf',
        max_retries: 3,
        dragdrop: true,
        drop_element: 'uploaderContainer',
        chunk_size: '4mb',
        auto_start: true,
        init: {
            'FilesAdded': function (up, files) {
            },
            'BeforeUpload': function (up, file) {
            },
            'UploadProgress': function (up, file) {
            },
            'FileUploaded': function (up, file, info) {
                info = JSON.parse(info);
                $('.dish-img').attr('src', Formatter.imgPath(info.key));
                $('[name=img]').val(info.key);
            },
            'Error': function (up, err, errTip) {
                console.log('error', err, errTip);
            },
            'UploadComplete': function () {
            }
        }
    });
});

Template.newDish.events({
    'click .cancel': function (e) {
        e.preventDefault();
        Router.go('myShop', {shopId: this._id});
    },

    'submit form': function (e) {
        e.preventDefault();

        var dish = {
            name: $(e.target).find("[name=name]").val(),
            img: $(e.target).find("[name=img]").val(),
            price: +$(e.target).find("[name=price]").val(),
            desc: $(e.target).find("[name=desc]").val(),
            tags: $(e.target).find('[name=tags]').val().split(/[,\s]/).map((t)=> {
                return t.trim();
            }).filter((t)=> {
                return t;
            })
        };
        Services.newDish(this._id, dish);
    }
});

Services.newDish = function (shopId, dish) {
    Meteor.call('newDish', shopId, dish, function (error, result) {
        if (error) return throwError(error);
        Router.go('myShop', {shopId: shopId});
    });
};
