'use strict';

var instances = [];
var defaults = {
    minWidth: 768
};
var StormEqualHeight = {
    init: function init() {
        window.setTimeout(this.equalise.bind(this), 0);
        window.addEventListener('resize', this.equalise.bind(this));
    },
    equalise: function equalise() {
        var max = 0;
        this.DOMElements.forEach(function (el) {
            el.style.height = 'auto';
            if (el.offsetHeight > max) {
                max = el.offsetHeight;
            }
        });

        if (window.innerWidth < this.settings.minWidth) {
            return;
        }

        this.DOMElements.forEach(function (el) {
            el.style.height = max + 'px';
        });
    }
};
var create = function create(el, i, opts) {
    instances[i] = Object.assign(Object.create(StormEqualHeight), {
        DOMElements: [].slice.call(el.children),
        settings: Object.assign({}, defaults, opts)
    });
    instances[i].init();
};

var init = function init(sel, opts) {
    var els = [].slice.call(document.querySelectorAll(sel));

    if (els.length === 0) {
        throw new Error('Tabs cannot be initialised, no augmentable elements found');
    }

    els.forEach(function (el, i) {
        create(el, i, opts);
    });
    return instances;
};

var reload = function reload(sel, opts) {
    [].slice.call(document.querySelectorAll(sel)).forEach(function (el, i) {
        if (!instances.filter(function (instance) {
            return instance.btn === el;
        }).length) {
            create(el, instances.length, opts);
        }
    });
};

var destroy = function destroy() {
    instances = [];
};

var EqualHeight = { init: init, reload: reload, destroy: destroy };

EqualHeight.init('.js-equal');
//# sourceMappingURL=app.js.map
