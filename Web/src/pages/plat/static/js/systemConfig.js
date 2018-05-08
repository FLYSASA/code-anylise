import importLocale from "@/static/js/importLocale.js";
import {platStatic} from "./locale-static.js";
!Vue.toLocale&&Vue.use(importLocale);
Vue.toLocale(platStatic);

export default {
		data() {
			return {
				languages: [{
					label: Vue.__t('language.simple'),
					value: "zh-cn"
				},{
					label: Vue.__t('language.traditional'),
					value: "zh-tw"
				}, {
					label: Vue.__t('language.english'),
					value: "en"
				}],
				themes: [{
					label: Vue.__t('theme.default'),
					value: "default",
					color: '#666666'
				}, {
					label: Vue.__t('theme.blue'),
					value: "blue",
					color: '#019ff9'
				}, {
					label: Vue.__t('theme.green'),
					value: "green",
					color: '#6fc080'
				}, {
					label: Vue.__t('theme.orange'),
					value: "orange",
					color: '#ff9140'
				}, {
					label: Vue.__t('theme.purple'),
					value: "purple",
					color: '#6164c1'
				}],
				fontSizes: [{
						label: Vue.__t('fontSize.small'),
						value: "default"
					},
					{
						label: Vue.__t('fontSize.medium'),
						value: "medium"
					},
					{
						label: Vue.__t('fontSize.large'),
						value: "large"
					}
				]
			}
		}
	

}