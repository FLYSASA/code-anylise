function broadcast (eventName) {
    var args = arguments
    this.$children.forEach(child => {
        if (child.$listeners && child.$listeners.hasOwnProperty(eventName)) {
            child.$emit.apply(child, args)
        } else {
            broadcast.apply(child, args)
        }
    })
}

export default {
    methods: {
        /**
         * 向外触发事件（类似冒泡），触发父级定义事件
         * @param eventName {string} 事件名称
         */
        dispatch (eventName) {
            var parent = this.$parent || this.$root
            var listeners = parent.$listeners

            while (parent && (!listeners || !listeners.hasOwnProperty(eventName))) {
                parent = parent.$parent

                if (parent) {
                    listeners = parent.$listeners
                }
            }

            if (parent) {
                parent.$emit.apply(parent, arguments)
            }
        },
        /**
         * 向内部触发事件（类似捕获），触发子集定义事件
         * @param eventName {string} 事件名称
         */
        broadcast (eventName) {
            broadcast.apply(this, arguments)
        }
    }
}
