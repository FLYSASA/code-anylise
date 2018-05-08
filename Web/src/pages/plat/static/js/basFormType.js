import importLocale from "@/static/js/importLocale.js";
import {platStatic} from "./locale-static.js";
!Vue.toLocale&&Vue.use(importLocale);
Vue.toLocale(platStatic);

export default {
    //下拉列表使用
    baseFormTypes: [
        { BaseFormTypeId: 1, BaseFormTypeName: Vue.__t('baseFormType.aboveground') },
        { BaseFormTypeId: 2, BaseFormTypeName: Vue.__t('baseFormType.underground') },
        { BaseFormTypeId: 3, BaseFormTypeName: Vue.__t('baseFormType.publicArea') }
    ],
    //用于查看，可以直接通过baseFormTypeValue[baseType]; 获取到名称
    baseFormTypeValue: {
        1: Vue.__t('baseFormType.aboveground'),
        2: Vue.__t('baseFormType.underground'),
        3: Vue.__t('baseFormType.publicArea')
    }
}