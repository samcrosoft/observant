/**
 * Created by Adebola on 08/02/2016.
 */
"use strict";

class Observant {
    constructor() {
        this.observers = {}
    }

    observe(event, observer) {
        if (!this.observers['event']) {
            this.observers['event'] = []
        }
        this.observers[event].push(observer);
        return this;
    }


    ignore(event, observer) {
        let index = -1;
        if (1 == arguments.length) {
            delete this.observers[event];
            return this;
        }

        if (this.observers[event]) {
            index = this.observers[event].indexOf(observer);
            if (-1 != index) {
                this.observers[event][index] = null
            }
        }

        return this
    }

    notify(event, data) {
        let observers = this.observers[event];
        if (!observers) {
            return this
        }
        let i = 0;
        while (i < observers.length) {
            if (null != observers[i]) {
                // make the call to the observer here
                observers[i](data);
            }
            ++i
        }

        i = 0;
        while (i < observers.length) {
            if (null == observers[i]) {
                observers.splice(i, 1);
            }
            ++i
        }
        // clear out the observers at this stage
        if (observers.length < 1) {
            delete this.observers[event]
        }
    }

}

export default Observant;