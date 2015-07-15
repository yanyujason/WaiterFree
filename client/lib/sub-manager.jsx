Sub = new SubsManager();

Sub.scriptDep = new Deps.Dependency();
Sub.scriptReady = true;

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
        $.getScript(src).done(()=>{
            checkFinish();
        }).fail(()=> {
            console.warn(`Script ${src} can not be loaded.`);
            checkFinish();
        });
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
