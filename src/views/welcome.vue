<template>
	<section class="welcome-wrap">
		<a-button type="primary" @click="onClick">开始考试</a-button>
	</section>
</template>

<script setup lang="ts">
import { createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

import 'ant-design-vue/es/modal/style/css'

const router = useRouter();

const onClick = ()=>{
	Modal.confirm({
		title: '确认提示',
		icon: createVNode(ExclamationCircleOutlined),
		content: '考试开始后，不能切屏不能后台运行哦',
		onOk(){
			router.push({
				path: '/exam'
			});
		},
		onCancel(){
			console.log('Cancel');
		},
	});
};
</script>

<style lang="scss">
	.welcome-wrap{
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>