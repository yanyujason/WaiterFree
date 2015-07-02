function isNewDish(dishId) {
    return !dishId;
}

Template.dishForm.onRendered(function () {
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

Template.dishForm.helpers({
    errorClass(field) {
        return Errors.isFieldError(field) ? 'error' : '';
    },
    errorInfo(field) {
        return Errors.fieldErrorInfo(field);
    },
    title() {
        return isNewDish(this.dish.dishId) ? '添加菜品' : '修改菜品';
    },
    submit() {
        return isNewDish(this.dish.dishId) ? '添加' : '修改';
    },
    imgPath: Formatter.imgPath
});

Template.dishForm.events({
    'click .cancel': function (e) {
        e.preventDefault();
        Router.go('myShop', {shopId: this.shopId});
    },

    'submit .dish-form': function (e) {
        e.preventDefault();

        var shopId = this.shopId;
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

        var newOrUpdate = isNewDish(this.dish.dishId) ? 'newDish' : 'dishDetailsUpdate';
        if(newOrUpdate === 'dishDetailsUpdate') {
            dish.dishId = this.dish.dishId;
        }

        Meteor.call(newOrUpdate, shopId, dish, function(error, result) {
            if (error) return throwError(error);
            Router.go('myShop', {shopId: shopId});
        });
    }

});

