// 取消switch组件title含html时，width为5em的限制
export default {
    inserted: function (el) {
        let lable = el.querySelector('.weui-label')
        if (lable) {
            lable.style.width = 'auto'
        }
    }
}
