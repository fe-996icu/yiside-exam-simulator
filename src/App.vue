<template>
	<!-- 国际化 -->
	<a-config-provider :locale="locale">
		<router-view></router-view>
	</a-config-provider>
</template>

<script lang="ts" setup>
	// 汉化，ant-design-vue 目前的默认文案是英文，如果需要使用其他语言，可以参考下面的方案。
	import zhCN from 'ant-design-vue/es/locale/zh_CN'

	const locale = zhCN;
</script>