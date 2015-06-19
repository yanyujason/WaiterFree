if (Meteor.users.find().count() == 0) {
    console.log('Creating fixture...');
    var bossId = Accounts.createUser({
        username: 'USER_UUID',
        email: 'sxj@waiterfree.com',
        password: 'DEFAULT',
        profile: {
            name: '司女神',
            type: 'boss',
            shops: []
        }

    });
    var shopId = Shops.insert({
        name: '美食天下',
        address: '锦业一路软件园H座16层',
        desc: '集天下美食',
        tags: ['中餐', '印度菜', '西餐', '土耳其菜'],
        tel: '029-88886686',
        status: 'open',
        tables: [],
        menu: {
            dishes: []
        },
        boss: bossId,
        clerks: []
    });

    Meteor.users.update(bossId, {
        $push: {
            'profile.shops': shopId
        }
    });
}
