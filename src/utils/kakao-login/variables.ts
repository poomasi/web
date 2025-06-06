export const CLIENT_ID: string = process.env.NEXT_PUBLIC_REST_API_KEY!;
export const REDIRECT_URI: string = process.env.NEXT_PUBLIC_REDIRECT_URI!;
export const KAKAO_LOGIN_URL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const REST_API_KEY: string = process.env.NEXT_PUBLIC_REST_API_KEY!;
