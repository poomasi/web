// 📄 src/hooks/useIsAnswerBlurred.ts
import { useCallback } from "react";
import { useAccountStore } from "@store/account";
import { useDetailPageContext } from "@hooks/qnaPage/provider/DetailPageProvider.tsx";

import { GetQnaListResponse } from "api/types/qna.type";
import { AccountType } from "@types";

export function useIsAnswerBlurred() {
	const { accountType, publicId } = useAccountStore();
	const { teacherAccount } = useDetailPageContext();

	return useCallback(
		(question: GetQnaListResponse) => {
			if (question.is_secret === 0) return false;

			const isMentor = accountType === AccountType.MENTOR;
			const isOwner = question.questioner_public_id === publicId;
			const isMatchingTeacher = teacherAccount?.public_id === publicId;

			if (isMentor && isMatchingTeacher) return false;
			if (isOwner) return false;

			return true;
		},
		[accountType, publicId, teacherAccount?.public_id]
	);
}
