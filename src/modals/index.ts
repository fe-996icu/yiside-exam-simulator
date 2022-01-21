
/**问题列表 */
export enum QuestionType{
	text,
	radio,
	multiple,
	textarea,
}

/**问题 */
export type Question = {
	id: number,
	type: QuestionType,
	question: string,
	score: number,
	desc: string,
};
