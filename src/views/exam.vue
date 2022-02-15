<template>
	<!-- 头部 -->
	<exam-header />

	<!-- 考题内容 -->
	<section class="exam-paper-box">
		<!-- 遍历问题语法书结构数组 -->
		<template v-for="(item, i) of currentAstQuestion" :key="i">
			<!-- 文本节点 -->
			<span v-if="item.type==astNodeType.TEXT">{{item.text}}</span>
			<!-- 换行节点 -->
			<br v-else-if="item.type==astNodeType.NEWLINE" />
			<!-- 输入框节点 -->
			<a-input v-else-if="item.type==astNodeType.INPUT" class="txt-input"
					@change="onInput($event, item.forAnswerIndex)"
					:value="currentAnswer[item.forAnswerIndex||0]" />
		</template>
	</section>

	<!-- 底部操作按钮区域 -->
	<section class="bottom-operate-box has-safe-area">
		<!-- 下一题、交卷，按钮 -->
		<a-button type="primary" block @click="onClickButton">{{btnLabel}}</a-button>
	</section>
</template>

<script setup lang="ts">
	import { computed, onBeforeMount, onBeforeUnmount, reactive, ref } from 'vue'
	import { QuestionAstNodeType } from '@/types/enums'
	import useExamStore from '../store/exam'
	import { useRouter } from 'vue-router'
	import { Modal } from 'ant-design-vue'

	// 弹窗实例引用-判断单例
	let _modalInstance:any = null;
	// 倒计时-计时器
	let _timer:number|undefined;

	const exam = useExamStore();
	const router = useRouter();

	// 当前问题对应的答案记录
	const currentAnswer = computed(()=>exam.answerSheet[exam.current]);
	// 当前问题的抽象语法树对象
	const currentAstQuestion = computed(()=>exam.astQuestions[exam.current]);
	// 抽象语法树节点类型枚举
	const astNodeType  = computed(()=>QuestionAstNodeType);
	// 是否为最后一个问题
	const isFinally = computed(()=>exam.current==exam.questions.length-1);
	// 按钮标签文案
	const btnLabel = computed(()=>{
		return isFinally.value ? '交卷' : '下一题';
	});

	onBeforeMount(()=>{
		exam.startExam();
	});

	const onInput = (ev:any, idx:number=0)=>{
		// 更新答题卡数据
		exam.answerSheet[exam.current][idx] = ev.target.value;
	};
	const onClickButton = ()=>{
		if(isFinally.value){
			// 交卷
			router.replace({
				path: '/result',
			});
		}else{
			// 下一题
			exam.current++;
		}
	};

	// 强制交卷
	const forceStopExam = (isTimeEnd=false)=>{
		if(_modalInstance){
			return;
		}

		exam.stopExam();

		let title;

		if(isTimeEnd){
			title = '时间到';
		}else{
			title = '作弊';
		}

		_modalInstance = Modal.warning({
			title,
			content: '终止考试，强制交卷！！！',
			okText: '好吧o(╥﹏╥)o',
			onOk(){
				router.replace({
					path: '/result',
				});
			},
		});
	};

	const bindEvent = ()=>{
		// 监听是否切屏
		document.onvisibilitychange = ()=>{
			const state = document.visibilityState;
			console.log('visibilityState:', state);

			if(state == 'hidden'){
				forceStopExam();
			}
		};
		window.onblur = ()=>{
			forceStopExam();
		};

		// 倒计时
		_timer = setInterval(()=>{
			forceStopExam(true);
		}, exam.testPaper.duration);
	};
	const unbindEvent = ()=>{
		// 清除状态
		document.onvisibilitychange = null;
		window.onblur = null;
		clearInterval(_timer);
		_timer = undefined;
		_modalInstance = null;
	};

	onBeforeMount(bindEvent);
	onBeforeUnmount(unbindEvent);
</script>

<style lang="scss" scoped>
	.exam-paper-box{
		padding: 20px 14px;
		line-height: 24px;

		.txt-input{
			width: 4em;
			border-top: none;
			border-left: none;
			border-right: none;
			border-radius: 0;
			// border-bottom-color: #000;
			padding: 0;

			&:focus{
				box-shadow: none;
			}
		}
	}

	.bottom-operate-box{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;

		&.has-safe-area{
			padding-bottom: 20px;
		}
	}
</style>