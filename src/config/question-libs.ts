/*题库
 * @Author: zhangjianzhong
 * @Date: 2022-02-07 18:25:55
 * @Last Modified by: zhangjianzhong
 * @Last Modified time: 2022-02-07 18:37:38
 */

import { Question, QuestionType } from "../modals";
import { ESC_PLACEHOLDER } from "./global-constants";

const questions:Question[] = [
,,,,,,,,,,,,,,,,
].fill({
	id: 1,
	type: QuestionType.TEXT,
	question: `请默写第一条核心价值观及三个阐释词（${ESC_PLACEHOLDER}） ${ESC_PLACEHOLDER} ${ESC_PLACEHOLDER} ${ESC_PLACEHOLDER}`,
	score: 12,
	desc: '按空得分',
});

export default questions;