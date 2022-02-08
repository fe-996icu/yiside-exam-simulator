// 考试-头部组件
<template>
	<section class="exam-header-wrap">
		<a-button type="primary" ghost>i</a-button>
		<a-button v-for="i of 20" :key="i">{{i}}</a-button>
	</section>
</template>

<script setup lang="ts">

	import { ref } from 'vue'

	defineProps<{ msg: string }>()

	const count = ref(0)
</script>

<style lang="scss" scoped>
	.exam-header-wrap{
		background-color: #72B4FE;
		overflow-x: auto;
		padding: 40px 14px 20px;
		display: flex;

		.ant-btn{
			margin-right: 10px;
			border-radius: 4px;

			&:last-child{
				margin-right: 0;
			}
		}
	}
</style>
