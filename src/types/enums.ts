/**问题类型 */
export enum QuestionType{
	TEXT,
	RADIO,
	MULTIPLE,
	TEXTAREA,
}

// 问题模版字符串抽象出来的语法树类型
export enum QuestionAstNodeType {
	TEXT,
	INPUT,
	NEWLINE,
}

// 考试结果
export enum ExamResultStatus{
	PASS,
	UNPASS,
	UNSTART,
}