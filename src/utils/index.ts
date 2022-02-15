// 工具类
import { Question, TestPaperQuestionApprovalResult } from "@/types/models"

// 阅卷
export function approvalTestPaper(answerSheet:Array<string[]>, readyAnswerSheet:Array<string[]>):TestPaperQuestionApprovalResult{
	let result = readyAnswerSheet.reduce((ret, answerRow, i)=>{
		const submitAnswerRow = answerSheet[i];

		const rowResult = answerRow.map((answerCol, j)=>{
			return {
				text: answerCol,
				right: answerCol === submitAnswerRow[j]
			};
		});

		ret.push(rowResult);

		return ret;
	}, [] as TestPaperQuestionApprovalResult);

	return result;
}

// 交卷
export function submitTestPaper(approvalAnswerCard:TestPaperQuestionApprovalResult, questions:Question[]):number[]{
	/*
	// 开始考试时间
	startTime?: number,
	// 完成时间
	finishTime?: number,
	// 考试结果
	result: ExamResultStatus,
	// 正确题目数量
	passNum: number,
	// 错误题目数量
	unpassNum: number,
	 */

	const scores:number[] = [];

	questions.forEach((q, i)=>{
		const passRate = approvalAnswerCard[i].filter(v=>v.right).length / approvalAnswerCard[i].length;
		const score = q.score * passRate;

		scores.push(score);
	});

	return scores;
}