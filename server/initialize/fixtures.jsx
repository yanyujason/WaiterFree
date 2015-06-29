if (Meteor.users.find().count() == 0) {
    console.log('Creating fixture...');
    var bossId = Accounts.createUser({
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
        tables: ['故宫', '泰姬陵', '大本钟', '托普卡普'],
        menu: {
            dishes: [{
                name: '鱼香肉丝',
                img: '0ba5a8b9288344d4865255e367b7586c.jpg',
                desc: '来自神圣天朝的5A级川菜大厨精心烹饪，食用后恢复体力200点。',
                price: 38,
                tags: ['中餐', '热菜'],
                options: []
            }, {
                name: '秘法牛排',
                img: '4f25031139cb4aff905087eb462f7f08.jpg',
                desc: '使用古老而神秘的西方魔法烹制而成，食用后可恢复法力150点。',
                price: 68,
                tags: ['西餐', '热菜'],
                options: [{
                    name: '几分熟',
                    values: [{name: '三分', price: 0}, {name: '五分', price: 0}, {name: '七分', price: 0}, {name: '全熟', price: 0}]
                }]
            }],
            tagPriority: ['中餐', '西餐', '热菜']
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
