import Vue from 'vue'
import '../static/css/demo.css'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
        demos: [{
            name: '表单组件',
            dir: 'form',
            data: [
                { key: 'group', name: '表单分组' },
                { key: 'input', name: '单行文本框' },
                { key: 'textarea', name: '多行文本框' },
                { key: 'number', name: '数字输入框' },
                { key: 'numberrange', name: '数字范围输入框' },
                { key: 'button', name: '按钮' },
                { key: 'datetime', name: '日期选择框' },
                { key: 'inlinecalendar', name: '日历（内联）' },
                { key: 'calendar', name: '日历' },
                { key: 'checker', name: '复选按钮' },
                { key: 'checkerlist', name: '复选按钮列表' },
                { key: 'radio', name: '单选按钮(popup)' },
                { key: 'switch', name: '开关按钮' },
                { key: 'select', name: '选择框(dropdown)' },
                { key: 'picker', name: '选择器(picker)' },
                { key: 'pickerpopup', name: '选择器（popup picker）' },
                { key: 'colorpicker', name: '颜色选择' },
                { key: 'uploader', name: '上传框' },
                { key: 'address', name: '地址输入' },
                { key: 'rater', name: '评星' }
            ]
        }, {
            name: '布局组件',
            dir: 'layout',
            data: [
                { key: 'divider', name: '分隔线' },
                { key: 'grid', name: '网格' },
                { key: 'sticky', name: '粘滞' },
                { key: 'viewbox', name: '显示容器' },
                { key: 'header', name: '标题栏' },
                { key: 'tab', name: '选项卡' },
                { key: 'buttontab', name: '按钮选项卡' },
                { key: 'tabbar', name: '工具栏' },
                { key: 'tabbaricon', name: '工具栏（icon）' },
                { key: 'tabbarlink', name: '工具栏（link）' },
                { key: 'tabbarsimple', name: '工具栏（simple）' },
                { key: 'flexbox', name: '弹性布局' }
            ]
        }, {
            name: '数据组件',
            dir: 'data',
            data: [
                { key: 'cell', name: '列表视图' },
                { key: 'cellbox', name: '自定义列表视图' },
                { key: 'cellfrompreview', name: '内容列表' },
                { key: 'frompreview', name: '表单预览' },
                { key: 'table', name: '表格' },
                { key: 'badge', name: '微章/角标' },
                { key: 'card', name: '卡片' },
                { key: 'panel', name: '组合列表' },
                { key: 'search', name: '搜索框' },
                { key: 'preview', name: '图片查看/预览' },
                { key: 'img', name: '图片' },
                { key: 'icon', name: '图标/表情' },
                { key: 'msg', name: '消息提示页' },
                { key: 'flow', name: '流程图' },
                { key: 'step', name: '步骤图' },
                { key: 'timeline', name: '时间线' },
                { key: 'circle', name: '圆形进度' },
                { key: 'progress', name: '线形进度' },
                { key: 'clocker', name: '倒计时时钟' },
                { key: 'counttime', name: '计数/计时' },
                { key: 'marquee', name: '跑马灯' },
                { key: 'qrcode', name: '二维码' }
            ]
        }, {
            name: '交互组件',
            dir: 'interaction',
            data: [
                { key: 'actionsheet', name: '上拉菜单' },
                { key: 'alert', name: '提示框' },
                { key: 'toast', name: '自隐藏提示框' },
                { key: 'confirm', name: '确认框' },
                { key: 'dialog', name: '对话框' },
                { key: 'loading', name: '加载效果' },
                { key: 'spinner', name: '旋转图标' },
                { key: 'masker', name: '遮罩' },
                { key: 'popover', name: '单击提示' },
                { key: 'popup', name: '弹窗' },
                { key: 'drawer', name: '侧边抽屉' },
                { key: 'scroller', name: '滚屏效果' },
                { key: 'pullup', name: '上拉加载更多' },
                { key: 'pulldown', name: '下拉刷新' },
                { key: 'pulldownpullup', name: '下拉刷新和上拉加载更多组合' },
                { key: 'scrollerfull', name: '滚屏/滚动效果（Full）' },
                { key: 'scrollerheader', name: '滚屏/滚动效果（Header）' },
                { key: 'scrollerswiper', name: '滚屏/滚动效果（Swiper）' },
                { key: 'imgscroller', name: '图片滚动批量查看（scroller）' },
                { key: 'numberroller', name: '滚动数字' },
                { key: 'swiper', name: '轮播' },
                { key: 'swipeout', name: '滑指操作（左滑/右滑）' },
                { key: 'blur', name: '毛玻璃（高斯模糊）' }
            ]
        }, {
            name: '其他效果示例',
            dir: 'other',
            data: [
                { key: 'agree', name: '同意/不同意' },
                { key: 'tip', name: '静态提示文本' },
                { key: 'center', name: '居中效果（css实现）' },
                { key: 'close', name: '关闭图标（css实现）' },
                { key: 'reddot', name: '小红点（css实现）' },
                { key: 'iconloading', name: '加载图标（css实现）' },
                { key: 'device', name: '设备信息' },
                { key: 'timeformatter', name: '时间日期格式' },
                { key: 'querystring', name: 'url和查询字符串的常用处理' },
                { key: 'onepx', name: '1像素问题（手机看效果）' },
                { key: 'orientation', name: '手机旋转效果（手机看效果）' },
                { key: 'shake', name: '摇一摇效果（手机看效果）' },
                { key: 'thank', name: '字体图标效果' },
                { key: 'demo', name: '九宫格页面效果' },
                { key: 'comment', name: '回帖评论效果' }
            ]
        }],
        cssTitle: 'demo-title',
        cssContent: 'demo-content'
    }
})
