class MixinLocal {
    constructor() {
        this.onCreatedFns = [];
        this.onRenderedFns = [];
        this.onDestroyedFns = [];
        this.helperObj = {};
        this.eventObj = {};
    }

    onCreated(fn) {
        this.onCreatedFns.push(fn);
    }

    onRendered(fn) {
        this.onRenderedFns.push(fn);
    }

    onDestroyed(fn) {
        this.onDestroyedFns.push(fn);
    }

    helpers(helpers) {
        _.extend(this.helperObj, helpers);
    }

    /**
     * Don't use this events mixin, how to test it has not be established
     * @param events
     */
    events(events) {
        _.extend(this.eventObj, events);
    }

    mixTo(template) {
        this.onCreatedFns.forEach((fn) => {
            template.onCreated(fn);
        });
        this.onRenderedFns.forEach((fn) => {
            template.onRendered(fn);
        });
        this.onDestroyedFns.forEach((fn) => {
            template.onDestroyed(fn);
        });
        template.helpers(this.helperObj);
        template.events(this.eventObj);
    }
}

Mixin = MixinLocal;
