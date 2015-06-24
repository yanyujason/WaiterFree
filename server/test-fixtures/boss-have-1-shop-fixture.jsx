if (process.env.IS_MIRROR) {
    Meteor.methods({
        createBossHas1Shop() {
            var poorManId = Accounts.createUser({
                username: 'POOR_MAN_UUID',
                email: 'bossHas1Shop@waiterfree.com',
                password: 'password',
                profile: {
                    name: 'PoorMan',
                    type: 'boss',
                    shops: []
                }
            });

            var eightLiVillageShopId = Shops.insert({
                name: 'Food Park',
                address: '115# Eight Li Village',
                desc: 'Cheep Cheep Cheep',
                tags: ['Chinese', 'Chuan'],
                tel: '029-44444444',
                status: 'open',
                tables: [1, 2],
                menu: {
                    dishes: [{
                        name: 'Rich',
                        img: '',
                        desc: 'HP+1',
                        price: 0.5,
                        tags: ['Chinese', 'Food'],
                        options: []
                    }, {
                        name: 'Veg',
                        img: '',
                        desc: 'MP+1',
                        price: 3,
                        tags: ['Chinese', 'Dish'],
                        options: []
                    }, {
                        name: 'Meet',
                        img: '',
                        desc: 'HP+5',
                        price: 10,
                        tags: ['Chinese', 'Dish'],
                        options: []
                    }],
                    tagPriority: ['Chinese', 'Dish', 'Food']
                },
                boss: poorManId,
                clerks: []
            });

            Meteor.users.update(poorManId, {
                $push: {'profile.shops': eightLiVillageShopId}
            });
        }
    });
}
