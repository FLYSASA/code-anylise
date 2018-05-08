<template>
	<custom-auto v-model="text" :placeholder="$t('employeeAuto.selectEmployee')" :has-add="hasAdd" :format="format" @confirm="confirm" :keys="keys" @select="handleEmployeeSelect" :params="params" url="/api/plat/employees/brief/"></custom-auto>
</template>

<script>
	import selectEmployeeAuto from "@/components/sapi-autocomplete.vue";
	import {employeeAuto} from "./locale-component.js";

	export default {
		data() {
			return {
				text: "",
				keys: {
					value: "EmployeeName",
					title: "title",
					content: "content"
				},
				params: {
					type: 1
				},
				format: {
					titleCallback(item) {
						return item.EmployeeName + "（" + item.EmployeeNo + "）";
					},
					contentCallback(item) {
						if(item.DefaultStationName) {
							return item.CorpName + "/" + item.DeptName + "/" + item.DefaultStationName;
						}

						return "";
					}
				}
			}
		},
		props: ["hasAdd", "value"],
		components: {
			"custom-auto": selectEmployeeAuto
		},
		methods: {
			handleEmployeeSelect(item) {
				this.$emit("select", item);
			},
			confirm() {
				this.$emit("confirm");
			}
		},
		created() {
			Vue.toLocale(employeeAuto);
		},
		watch: {
			text(val) {
				this.$emit("input", val);
			},
			value(val) {
				this.text = val;
			}
		}
	}
</script>
