// src/app/page.tsx
import LandingPageClient from "@components/landingPage/LandingPageClient";
import ClientLayout from "./ClientLayout";
import { RequestApi } from "api/request-api.ts";
import customAxios from "api/customAxios.ts";

export default async function LandingPage() {
	const accountList = await RequestApi.accounts.getAccountList();
	const poomCountRes = await customAxios.get(
		"https://api.poomasi.kr/api/v1/posts/qna/status"
	);
	const poomCount = poomCountRes.data;

	return (
		<ClientLayout>
			<LandingPageClient
				accountList={accountList}
				poomCount={poomCount}
			/>
		</ClientLayout>
	);
}
