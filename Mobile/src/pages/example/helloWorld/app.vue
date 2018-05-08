<template>
    <div class="msg">
        {{msg}}
    </div>
</template>

<script>
export default {
    data () {
        return {
            msg: 'Hello World!'
        }
    }
}
</script>

<style>
.msg {
    text-align:center;
    font-size:20px;
}
</style>
