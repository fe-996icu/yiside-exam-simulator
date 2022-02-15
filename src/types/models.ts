import { ExamResultStatus, QuestionAstNodeType, QuestionType } from "./enums"

/**问题实体 */
export type Question = {
	id: number,
	type: QuestionType,
	question: string,
	score: number,
	desc?: string|null,
	answer: Array<string>,
};

// 试卷实体
export type TestPaper = {
	/**试卷满分 */
	fullScore: number,
	/**及格分*/
	passScore: number,
	/**试卷描述 */
	description: string,
	/**考试时长，毫秒数 */
	duration: number,
	/**题目列表 */
	questions: Array<Question>,

	/**开始考试时间 */
	startTime?: number,
	/**完成时间 */
	finishTime?: number,
	/**考试结果 */
	result: ExamResultStatus,
	/**正确题目数量 */
	// passNum: number,
	/**错误题目数量 */
	// unpassNum: number,

	/**审批后的题目结果状态-数组 */
	questionApprovalResult?: TestPaperQuestionApprovalResult,
	/**审批后的题目分数-数组 */
	approvalQuestionsScores?: Array<number>
};

/**试卷题目审批状态-二维数组，元素为各题目的答案数组，内层数组元素为各题目的每个填空的判定结果 */
export type TestPaperQuestionApprovalResult = Array<{
	// 提交的答案内容
	text: string,
	// 判定结果是否正确
	right: boolean,
}>[];


// 问题模版字符串抽象出来的语法树对象
export type QuestionAstNode = {
	type: QuestionAstNodeType,
	text?: string,
	forAnswerIndex?: number,
}

// 抽象语法树-节点数组
export type QuestionAst = QuestionAstNode[];
