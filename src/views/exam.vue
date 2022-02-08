<template>
	<!-- 头部 -->
	<exam-header />


</template>

<script setup lang="ts">
	import ExamHeader from '../components/exam-header.vue'
	import questions from '../config/question-libs'

	console.log('xxx', questions);

	import { ref } from 'vue'

	defineProps<{ msg: string }>()

	const count = ref(0)
</script>