'use strict';

import attributelist from './attributelist'

let instances = [],
    defaults = {
        minWidth: 768 
    },
    StormEqualHeight = {
        init() {
            window.setTimeout(this.equalise.bind(this), 0);
            window.addEventListener('resize', this.equalise.bind(this));
        },
        equalise() {
            var max = 0;
            this.DOMElements.forEach(el => {
                el.style.height = 'auto';
                if(el.offsetHeight > max) {
                    max = el.offsetHeight;
                }
            });

            if(window.innerWidth < this.settings.minWidth) { return; }

            this.DOMElements.forEach(el => {
                el.style.height = max + 'px';
            });
        }
    };

	
let create = (el, i, opts) => {
    instances[i] = Object.assign(Object.create(StormEqualHeight), {
        DOMElements: [].slice.call(el.children),
        settings: Object.assign({}, defaults, opts)
    });
    instances[i].init();
}

let init = (sel, opts) => {
    var els = [].slice.call(document.querySelectorAll(sel));
    
    if(els.length === 0) {
        throw new Error('Tabs cannot be initialised, no augmentable elements found');
    }
    
    els.forEach((el, i) => {
        create(el, i, opts);
    });
    return instances;
    
}

let reload = (sel, opts) => {
    [].slice.call(document.querySelectorAll(sel)).forEach((el, i) => {
        if(!instances.filter(instance => { return (instance.btn === el); }).length) {
            create(el, instances.length, opts);
        }
    });
}

let destroy = () => {
    instances = [];  
}

let EqualHeight = { init, reload, destroy }

export { EqualHeight };