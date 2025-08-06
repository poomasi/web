# Tailwind CSS가 작동하지 않을 때: 설정 문제 해결 가이드

## 문제 상황

Next.js 프로젝트에서 Tailwind CSS 클래스들(`flex`, `gap-[46px]`, `rounded-full` 등)을 적용했는데 전혀 스타일이 적용되지 않는 문제가 발생했습니다.

```tsx
// 이런 코드가 전혀 스타일링되지 않음
<nav className="flex items-center gap-[46px] py-6 overflow-x-auto">
	{/* ... */}
</nav>
```

## 원인 분석

패키지 설치 상태를 확인해보니:

- ✅ `tailwindcss` 패키지는 설치되어 있음
- ✅ `postcss.config.js`에도 설정되어 있음
- ❌ 하지만 두 가지 핵심 설정이 누락되어 있었음

## 해결 방법

### 1. tailwind.config.js의 content 배열 설정

**문제**: `content` 배열이 비어있음

```js
// ❌ 잘못된 설정
module.exports = {
	content: [], // 비어있음!
	theme: {
		extend: {},
	},
	plugins: [],
};
```

**해결**: 프로젝트의 모든 컴포넌트 파일 경로 추가

```js
// ✅ 올바른 설정
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
```

### 2. globals.css에 Tailwind 지시문 추가

**문제**: CSS 파일에 Tailwind 지시문이 없음

```css
/* ❌ globals.css에 Tailwind 지시문 없음 */
/* CSS Reset 코드만 있음 */
html,
body,
div,
span {
	/* ... */
}
```

**해결**: 파일 맨 위에 필수 지시문들 추가

```css
/* ✅ 올바른 설정 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 기존 CSS Reset 코드 */
html,
body,
div,
span {
	/* ... */
}
```

## Tailwind 지시문의 역할

### `@tailwind base;`

- 브라우저 기본 스타일 정규화
- 모든 요소에 `margin: 0`, `padding: 0`, `box-sizing: border-box` 적용
- 크로스 브라우저 호환성 보장

### `@tailwind components;`

- 재사용 가능한 컴포넌트 스타일 레이어
- 버튼, 카드, 폼 등의 복합 스타일 패턴
- 사용자 정의 컴포넌트 스타일도 이 레이어에 추가 가능

### `@tailwind utilities;`

- 실제로 사용하는 모든 Tailwind 클래스들
- `flex`, `gap-4`, `text-center`, `bg-blue-500` 등
- 가장 높은 우선순위로 다른 스타일 덮어쓰기 가능

## 왜 이런 문제가 발생하나?

Tailwind CSS는 **CSS 프레임워크가 아니라 CSS 생성 도구**입니다:

1. **빌드 시점 CSS 생성**: 코드에서 사용된 클래스들만 골라서 실제 CSS로 변환
2. **PostCSS 플러그인**: `@tailwind` 지시문들을 실제 CSS 규칙으로 교체
3. **트리 셰이킹**: 사용하지 않는 스타일은 제거하여 번들 크기 최적화

### content 배열이 중요한 이유

```js
// Tailwind가 이 경로들을 스캔해서
content: ["./src/components/**/*.{js,ts,jsx,tsx}"];

// 실제 사용된 클래스들만 CSS로 생성
className = "flex gap-4 rounded-full"; // ✅ CSS 생성됨
className = "bg-purple-900"; // ❌ 사용 안 함, CSS 생성 안 됨
```

## 확인 방법

설정 후 개발 서버를 재시작하고 브라우저 개발자 도구에서:

```css
/* 이런 CSS들이 생성되어 있어야 함 */
.flex {
	display: flex;
}
.items-center {
	align-items: center;
}
.gap-\[46px\] {
	gap: 46px;
}
.rounded-full {
	border-radius: 9999px;
}
```

## 추가 팁

### 1. 임의 값(Arbitrary Values) 사용 시 주의

```tsx
// 이런 임의 값들도 content 스캔 대상에 포함되어야 함
className = "gap-[46px] w-[120px] text-[#ff0000]";
```

### 2. 동적 클래스명은 완전한 형태로 작성

```tsx
// ❌ 동적으로 조합하면 스캔되지 않을 수 있음
className={`text-${color}-500`}

// ✅ 완전한 클래스명으로 작성
className={color === 'blue' ? 'text-blue-500' : 'text-red-500'}
```

### 3. 프로덕션 빌드 시 확인

```bash
npm run build
# 빌드된 CSS 파일에서 필요한 스타일들이 포함되어 있는지 확인
```

## 결론

Tailwind CSS가 작동하지 않는다면:

1. `tailwind.config.js`의 `content` 배열 확인
2. CSS 파일에 `@tailwind` 지시문들 확인
3. 개발 서버 재시작

이 두 가지 설정만 제대로 되어 있으면 Tailwind CSS가 정상적으로 작동할 것입니다!
