// 考试结果页
<template>
	<section class="result-wrap">
		<div class="result-header-box">
			<!-- 概要 -->
			<div class="sub-box">
				用时：{{userTime}}
				<br>
				交卷时间：{{finishTime}}
				<br>
				考试总分：{{testPaper.fullScore}}
				<br>
				通过分数：{{testPaper.passScore}}
				<br>
				考试说明：{{testPaper.description}}
			</div>

			<!-- 考试结果-通过|不通过 -->
			<div class="result-icon" :class="`exam-result-status-${exam.testPaper.result}`">
				<div class="inside-box"></div>
				{{exam.examResultName}}
			</div>
		</div>
		<!-- 总分数 -->
		<div class="total-score-box" :class="`exam-result-status-${exam.testPaper.result}`">{{exam.totalScore}}</div>

		<div class="result-table-box">
			<table class="table" border bordercolor="#eee">
				<thead>
					<tr>
						<td></td>
						<td>单选题</td>
						<td>多选题</td>
						<td>判断题</td>
						<td>填空题({{testPaper.questions.length}})</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>正确数</td>
						<td>--</td>
						<td>--</td>
						<td>--</td>
						<td>{{viewPassCount}}</td>
					</tr>
					<tr>
						<td>错误数</td>
						<td>--</td>
						<td>--</td>
						<td>--</td>
						<td>{{viewUnpassCount}}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<a-button type="primary" block @click="onViewAnswer">查看答卷</a-button>
	</section>
</template>

<script setup lang="ts">
	import { computed, onBeforeMount } from 'vue'
	import useExamStore from '@/store/exam'
	import dayjs from 'dayjs'
	import { message, Modal } from 'ant-design-vue';
	import { useRouter } from 'vue-router'

	import 'ant-design-vue/es/message/style/css'

	const exam = useExamStore();
	const router = useRouter();

	// 当前试卷对象引用
	const testPaper = computed(()=>{
		return exam.testPaper;
	});

	// 答题耗时
	const userTime = computed(()=>{
		const { finishTime, startTime } = testPaper.value;

		if(finishTime && startTime){
			const finishDayjs = dayjs(finishTime);
			const startDayjs = dayjs(startTime);

			const minute = finishDayjs.diff(startDayjs, 'minute');
			const second = finishDayjs.diff(startDayjs, 'second') % 60;

			if(minute){
				return `${minute}分${second}秒`;
			}else{
				return `${second}秒`;
			}
		}

		return '-';
	});
	// 完成时间
	const finishTime = computed(()=>{
		const { finishTime }  = testPaper.value

		return dayjs(finishTime).format('YYYY-MM-DD HH:mm:ss');
	});
	// 答对的题目数量
	const passCount = computed(():number=>{
		const result = exam.testPaper.questionApprovalResult;
		if(!result){
			return 0;
		}

		return result.reduce((count, ret)=>{
			const num = ret.every(val=>val.right) ? 1 : 0;
			return count + num;
		}, 0);
	});
	// 答错的题目数量
	const unpassCount = computed(()=>{
		return exam.testPaper.questions.length - passCount.value;
	});
	// 视图展示的答对题目数量
	const viewPassCount = computed(()=>{
		const count = passCount.value;
		return count == 0 ? '--' : count + '题';
	});
	// 视图展示的答错题目数量
	const viewUnpassCount = computed(()=>{
		const count = unpassCount.value;
		return count == 0 ? '--' : count + '题';
	});

	const onViewAnswer = ()=>{
		message.success('续费企业独享', 10);
	};

	onBeforeMount(()=>{
		const ret = exam.stopExam();

		// 异常处理
		if(!ret){
			Modal.warning({
				title: '系统故障',
				content: '判题失败，请重新考试！！！',
				okText: '重考',
				onOk(){
					router.push({
						path: '/welcome',
					});
				},
			});
		}
	});
</script>

<style lang="scss" scoped>
	$passColor: #15BC83;
	$unpassColor: #ff0000;
	$unstartColor: #ffa500;

	.result-wrap{
		padding: 20px 14px;

		.result-header-box{
			position: relative;
			border-bottom: 1px solid #eee;
			box-sizing: border-box;
			padding-bottom: 10px;

			.result-icon{
				width: 88px;
				height: 88px;
				position: absolute;
				bottom: -20%;
				right: 0;
				z-index: 1;
				border-radius: 50%;
				border: 2px solid $passColor;
				font-size: 20px;
				color: $passColor;
				transform: rotate(-20deg);
				display: flex;
				align-items: center;
				justify-content: center;

				.inside-box{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 95%;
					height: 95%;
					border: 2px solid $passColor;
					border-radius: 50%;
					opacity: 0.3;
				}

				// 未通过
				&.exam-result-status-1{
					border-color: $unpassColor;
					color: $unpassColor;

					.inside-box{
						border-color: $unpassColor;
					}
				}
				// 未开始
				&.exam-result-status-2{
					border-color: $unstartColor;
					color: $unstartColor;

					.inside-box{
						border-color: $unstartColor;
					}
				}
			}
		}

		.sub-box{
			color: #666;
		}

		.total-score-box{
			color: $passColor;
			font-size: 48px;
			text-align: center;

			// 未通过
			&.exam-result-status-1{
				color: $unpassColor;
			}
			// 未开始
			&.exam-result-status-2{
				color: $unstartColor;
			}
		}

		.result-table-box{
			padding: 20px 0;

			.table{
				width: 100%;

				td{
					padding: 6px;
					font-size: 12px;
				}
			}
		}
	}
</style>