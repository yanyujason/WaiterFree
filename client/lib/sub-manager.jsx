Sub = new SubsManager();

Sub.scriptDep = new Deps.Dependency();
Sub.scriptReady = true;
Sub.scriptList = [];

Sub.scripts = (srcs) => {
    Sub.scriptReady = false;
    var count = 0;

    function checkFinish() {
        count++;
        if (count == srcs.length) {
            Sub.scriptReady = true;
            Sub.scriptDep.changed();
        }
    }

    srcs.forEach((src) => {
        if(!_.contains(Sub.scriptList, src)) {
            $.ajax({
                url: src,
                cache: true,
                dataType: 'script'
            }).done(()=>{
                Sub.scriptList.push(src);
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
