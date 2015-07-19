SubMgr = (groupName = 'default') => {
    if(!SubMgr._SubGroups[groupName]) {
        SubMgr._SubGroups[groupName] = newSub();
    }
    return SubMgr._SubGroups[groupName];
};

SubMgr._SubGroups = {};

SubMgr.clearExcept = (groupName) => {
    _.each(SubMgr._SubGroups, (sub, g) => {
        if(g != groupName) {
            sub.clear();
        }
    });
    SubMgr._SubGroups = {
        [groupName]: SubMgr(groupName)
    };
};

function newSub() {
    var sub = new SubsManager();
    sub.scriptDep = new Deps.Dependency();
    sub.scriptReady = true;
    sub.scriptList = [];

    sub.scripts = (srcs) => {
        sub.scriptReady = false;
        var count = 0;

        function checkFinish() {
            count++;
            if (count == srcs.length) {
                sub.scriptReady = true;
                sub.scriptDep.changed();
            }
        }

        srcs.forEach((src) => {
            if(!_.contains(sub.scriptList, src)) {
                $.ajax({
                    url: src,
                    cache: true,
                    dataType: 'script'
                }).done(()=>{
                    sub.scriptList.push(src);
                    checkFinish();
                }).fail(()=> {
                    console.warn(`Script ${src} can not be loaded.`);
                    checkFinish();
                });
            } else {
                checkFinish();
            }
        });
    };

    sub.onReady = (cb) => {
        var template = Template.instance();
        var context = template || Meteor;
        context.autorun(() => {
            sub.dep.depend();
            sub.scriptDep.depend();
            if(sub.ready && sub.scriptReady) {
                cb();
            }
        });
    };

    return sub;
}

Template.registerHelper('subReady', () => {
    Sub.dep.depend();
    return Sub.ready;
});

Template.registerHelper('scriptReady', () => {
    Sub.scriptDep.depend();
    return Sub.scriptReady;
});

Template.registerHelper('ready', () => {
    Sub.dep.depend();
    Sub.scriptDep.depend();
    return Sub.ready && Sub.scriptReady;
});
