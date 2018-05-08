<template>
    <layout :title="title" :show-more="false">
        <section>
            <figure>
                <chart :style="{width:screenWidth + 'px'}"
                :options="pie"
                :init-options="initOptions"
                ref="pie"
                auto-resize
                />
            </figure>
        </section>
    </layout>
</template>

<script>
import layout from '@/components/master/layout.vue'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import pie from './pie.js'

export default {
    components: {
        layout,
        chart: ECharts
    },

    data () {
        return {
            title: '饼状图',
            pie: pie,
            screenWidth: document.documentElement.clientWidth
        }
    }
}
</script>

