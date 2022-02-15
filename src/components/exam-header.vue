// 考试-头部组件
<template>
	<section class="exam-header-wrap">
		<a-button v-for="(item, i) in exam.questions" :key="item.id" @click="onClick(item, i)"
				:type="i==exam.current?'primary':'default'">{{i+1}}</a-button>
	</section>
</template>

<script setup lang="ts">
	import { Question } from '../types/models'
	import useExamStore from '../store/exam'

	const exam = useExamStore();

	const onClick = (item:Question, i:number)=>{
		exam.current = i;
	};
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
