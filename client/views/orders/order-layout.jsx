Template.orderLayout.onRendered(function() {
    Sub.scripts(['/javascripts/fastclick.js']);

    this.autorun(() => {
        Sub.scriptDep.depend();
        if(Sub.scriptReady) {
            FastClick.attach(document.body);
        }
    });
});
