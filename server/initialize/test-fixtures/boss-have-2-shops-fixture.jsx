if (process.env.IS_MIRROR) {
    Meteor.methods({
        createBossHas2Shops() {
            var richManId = Accounts.createUser({
                username: 'RICH_MAN_UUID',
                email: 'bossHas2Shops@waiterfree.com',
                password: 'password',
                profile: {
                    name: 'RichMan',
                    type: 'boss',
                    shops: []
                }
            });

            var dubaiTowerShopId = Shops.insert({
                name: 'Dubai Asia',
                address: '101F The Dubai Tower',
                desc: 'Fantastic food with awesome view.',
                tags: ['Chinese', 'Japanese'],
                tel: '888-88888888',
                status: 'open',
                tables: [
                    {tableId: '1', name: '1'}, {tableId: '2', name: '2'},{tableId: '3', name: '6'},
                    {tableId: '4', name: '4'},{tableId: '5', name: '5'}, {tableId: '6', name: '6'}
                ],
                menu: {
                    dishes: [{
                        name: 'Dragon heart',
                        img: '',
                        desc: 'HP+100',
                        price: 888,
                        tags: ['Chinese', 'Hot'],
                        options: []
                    }, {
                        name: 'Phoenix tail',
                        img: '',
                        desc: 'MP+100',
                        price: 666,
                        tags: ['Japanese', 'Cold'],
                        options: []
                    }],
                    tagPriority: ['Chinese', 'Japanese', 'Hot', 'Cold']
                },
                boss: richManId,
                clerks: []
            });

            var softwareParkShopId = Shops.insert({
                name: 'Software Park Star',
                address: '15F H-Bld, Software park',
                desc: 'Good but Cheap, also Learn',
                tags: ['Chinese'],
                tel: '209-88888888',
                status: 'open',
                tables: [{tableId: 'T', name: 'T'}, {tableId: 'W', name: 'W'}],
                menu: {
                    dishes: [{
                        name: 'Pairing Program',
                        img: '',
                        desc: 'DEV+100',
                        price: 8,
                        tags: ['Software', 'Agile'],
                        options: []
                    }, {
                        name: 'Docker Camp',
                        img: '',
                        desc: 'DevOps+100',
                        price: 6,
                        tags: ['Software', 'Ops'],
                        options: []
                    }, {
                        name: '360 Degree Feedback',
                        img: '',
                        desc: 'Communication+100',
                        price: 4,
                        tags: ['SoftSkill', 'Agile'],
                        options: []
                    }],
                    tagPriority: ['Software', 'SoftSkill', 'Agile', 'Ops']
                },
                boss: richManId,
                clerks: []
            });

            Meteor.users.update(richManId, {
                $push: {'profile.shops': {$each: [dubaiTowerShopId, softwareParkShopId]}}
            });
        }
    });
}
