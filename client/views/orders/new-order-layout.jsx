Template.newOrderLayout.onCreated(function() {
    SubMgr.clearExcept('new-order');
    Sub = SubMgr('new-order');
});

Template.newOrderLayout.onRendered(function() {
    Sub.scripts(['/javascripts/fastclick.js']);

    this.autorun(() => {
        Sub.scriptDep.depend();
        if(Sub.scriptReady) {
            FastClick.attach(document.body);
        }
    });
});
