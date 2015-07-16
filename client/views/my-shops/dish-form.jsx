function isNewDish(dishId) {
    return !dishId;
}

function initQiniuUploader(qiniuConfig) {
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
            FilesAdded: function (up, files) {
            },
            BeforeUpload: function (up, file) {
            },
            UploadProgress: function (up, file) {
            },
            FileUploaded: function (up, file, info) {
                info = JSON.parse(info);
                $('.dish-img').attr('src', Formatter.imgPath(info.key));
                $('[name=img]').val(info.key);
            },
            Error: function (up, err, errTip) {
                console.log('error', err, errTip);
            },
            UploadComplete: function () {
            }
        }
    });
}

Template.dishForm.onCreated(function() {
    Sub.subscribe('myShop', this.data.shopId);
    Sub.subscribe('qiniuConfig');
});

Template.dishForm.onRendered(function() {
    Sub.scripts(['/javascripts/plupload.full.min.js', '/javascripts/qiniu-sdk.js']);

    this.autorun(() => {
        Sub.dep.depend();
        Sub.scriptDep.depend();
        if(Sub.ready && Sub.scriptReady) {
            var qiniuConfig = QiniuConfig.findOne({name: 'qiniuConfig'});
            initQiniuUploader(qiniuConfig);
        }
    });
});

Template.dishForm.helpers({
    dish() {
        var shop = Shops.findOne(this.shopId);
        if(shop) {
            return _.find(shop.menu.dishes, (d) => {return d.dishId == this.dishId;});
        }
    }
});

Template.dishForm.helpers({
    title() {
        return isNewDish(this.dishId) ? '添加菜品' : '修改菜品';
    },
    submit() {
        return isNewDish(this.dishId) ? '添加' : '修改';
    },
    imgPath: Formatter.imgPath
});

Template.dishForm.events({
    'click .btn-cancel': function (e) {
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

        var newDish = isNewDish(this.dishId);
        var newOrUpdate = newDish ? 'newDish' : 'dishDetailsUpdate';
        if (!newDish) {
            dish.dishId = this.dishId;
        }

        Meteor.call(newOrUpdate, shopId, dish, function(error, result) {
            if (error) return throwError(error);
            Router.go('myShop', {shopId: shopId});
        });
    }
});

