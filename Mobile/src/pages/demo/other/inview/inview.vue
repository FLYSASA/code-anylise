<template>
    <div>
        <div v-inview="{id:'box1'}">box1</div>
        <p v-for="i in 80" :key="i">placeholder</p>
        <div v-inview="{id:'box2'}">box2</div>
    </div>
</template>

<script>
import Inview from './inview/index'

export default {
    directives: {
        Inview
    },
    data () {
        return {
            div2: 'not inview'
        }
    },
    events: {
        'on-view-enter' (id) {
            console.log(id, 'in view')
        },
        'on-view-leave' (id) {
            console.log(id, 'not in view')
        }
    }
}
</script>
