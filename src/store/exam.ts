import { defineStore } from 'pinia'
import { QuestionAst, TestPaper, } from '../types/models'
import testPaper from '../config/question-libs'
import { ESC_CODE } from '../config/global-constants'
import { submitTestPaper, approvalTestPaper, } from '@/utils/index'
import { ExamResultStatus, QuestionAstNodeType } from '@/types/enums'

interface State {
	testPaper: TestPaper,
	current: number,
	answerSheet: Array<string>[],
}

const store = defineStore({
	id: 'exam',
	state: ():State=>{
		return {
			testPaper,
			current: 0,
			answerSheet: [],
		};
	},
	getters: {
		questions(state){
			return state.testPaper.questions;
		},
		// 问题列表-抽象语法树
		astQuestions(state):QuestionAst[]{
			return state.testPaper.questions.map(v=>{
				const lines = v.question.split(ESC_CODE.BR);

				const ast:QuestionAst = [];
				let answerIndex:number = 0;

				// 按行拆分
				for(let i = 0; i < lines.length; i++){
					const line = lines[i];

					const fragments = line.split(ESC_CODE.INPUT);

					// 分割输入框占位符
					for(let j = 0; j < fragments.length; j++){
						const fragment = fragments[j];

						// 记录文本类型节点
						ast.push({
							type: QuestionAstNodeType.TEXT,
							text: fragment,
						});

						// 不是最后一个元素，就记录一个输入框
						if(j != fragments.length - 1){
							ast.push({
								type: QuestionAstNodeType.INPUT,
								forAnswerIndex: answerIndex++,
							});
						}
					}

					// 不是最后一个元素，就插入一个新行
					if(i != lines.length - 1){
						console.log('new line');

						ast.push({
							type: QuestionAstNodeType.NEWLINE,
						});
					}
				}

				return ast;
			})
		},
		/**考试结果总分数 */
		totalScore(state){
			return state.testPaper.approvalQuestionsScores?.reduce((total, score)=>total+score, 0);
		},
		// 考试结果状态中文名
		examResultName(state){
			const examResultStatus = state.testPaper.result;

			return {
				[ExamResultStatus.PASS]: '通过',
				[ExamResultStatus.UNPASS]: '未通过',
				[ExamResultStatus.UNSTART]: '未开始',
			}[examResultStatus];
		},
	},
	actions: {
		initQuestions(){
			this.testPaper = { ...testPaper };

			// 初始化答题卡数据
			this.answerSheet = testPaper.questions.map(v=>[]);
		},
		startExam(){
			this.initQuestions();
			// 记录开始考试时间
			this.testPaper.startTime = Date.now();
			// 重置到第一题
			this.current = 0;
		},
		stopExam(){
			// 答题卡为空，异常
			if(this.answerSheet.length == 0){
				return false;
			}

			// 完成时间已经存在，说明是提前交卷或强制交卷，不在更关心完成时间字段
			if(!this.testPaper.finishTime){
				this.testPaper.finishTime = Date.now();
			}

			// 阅卷后的各题目审批结果
			const approvalResult = approvalTestPaper(this.answerSheet, this.testPaper.questions.map(v=>v.answer));
			// 各题目得分数
			const scores = submitTestPaper(approvalResult, this.testPaper.questions);

			this.testPaper.questionApprovalResult = approvalResult;
			this.testPaper.approvalQuestionsScores = scores;
			if((this.totalScore as number) >= this.testPaper.passScore){
				this.testPaper.result = ExamResultStatus.PASS;
			}else{
				this.testPaper.result = ExamResultStatus.UNPASS;
			}

			return true;
		},
	},
});

export default store;
