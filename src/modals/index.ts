
/**问题类型 */
export enum QuestionType{
	TEXT,
	RADIO,
	MULTIPLE,
	TEXTAREA,
}

/**问题实体 */
export type Question = {
	id: number,
	type: QuestionType,
	question: string,
	score: number,
	desc: string,
};
