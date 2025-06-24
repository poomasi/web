// .eslintrc.js
module.exports = {
	parser: "@typescript-eslint/parser", // TypeScript 문법 해석
	plugins: ["@typescript-eslint"],
	extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"], // TS 권장 규칙들,
	rules: {
		"no-console": "off", // 콘솔 허용
		"react-hooks/exhaustive-deps": "off", // 의존성 배열 검사 생략
		"@typescript-eslint/no-unused-vars": "warn", // 미사용 변수 무시
		"@typescript-eslint/no-explicit-any": "off",
	},
};
