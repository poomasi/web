import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import checker from 'vite-plugin-checker'

//vite-plugin-pwa는 설정한 manifest을 기반으로 브라우저가 인식할 수 있게 해준다.
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    // host: '0.0.0.0',
    port: 3000,
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react', //emotion을 사용하기 위해서 추가한 설정
    }),
    // type 체크를 위한 vite-plugin-checker
    checker({
      typescript: {
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
        buildMode: true,
      },
    }),
    /*
    VitePWA({
      /!*
			서비스워커란?
			앱이 꺼져 있어도 푸시 알림이 오거나, 오프라인에서 작동되는 것처럼 웹에서도 그런 기능을 수행해줌
			즉, 브라우저가 백그라운드에서 실행하는 자바스크립트 파일로 사용자가 페이지를 보고 있지 않아도 동작할 수 있음
			*!/
      registerType: 'prompt', //수동으로 설치 안내를 띄우는 설정
      injectRegister: 'auto', //서비스워커() 자동으로 등록

      includeAssets: ['favicon.svg', 'pwa-192x192.png', 'pwa-256x256.png', 'pwa-512x512.png'], //서비스워커에 포함할 자산들

      //pwaAssets: vite-plugin-pwa의 추가적인 기능
      pwaAssets: {
        disabled: false,
        config: true, //pwa-assets.config.ts 같은 파일을 참고해서 아이콘 같은 PWA 에셋을 자동으로 생성해줄 수 있음 → 이 설정이 있다면, pwa-assets.config.ts가 실제로 쓰이고 있다는 뜻!
      },

      //manifest: 웹 앱을 "앱처럼 보이게" 만들기 위한 설정 파일
      manifest: {
        name: 'poomasi',
        short_name: 'poomasi', //홈 화면에 보이는 앱 이름
        description: 'poomasi',
        start_url: '/',
        // 설치된 앱이 홈 화면에서 시작되도록 확실하게 지정
        display: 'standalone', //주소창 없이 앱처럼 보이게 하는 설정
        theme_color: '#ffffff',

        icons: [
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },

      //workbox: 캐시를 어떻게 관리할지, 오프라인 동작을 어떻게 할지를 정하는 영역이야. PWA의 오프라인 기능, 빠른 로딩 등을 담당하는 중요한 부분!!
      workbox: {
        globPatterns: ['**!/!*.{js,css,html,svg,png,ico}'], //캐시할 파일의 종류/형식
        cleanupOutdatedCaches: true, //이전 버전의 캐시를 자동으로 삭제
        clientsClaim: true, //서비스워커가 설치되자마자 모든 탭(클라이언트)을 즉시 제어
        /!*
						서비스 워커 기본동작:
					1. 설치됨 (install)
					2. 대기 상태 (waiting)
					3. 이전 서비스워커가 없어지고 나면 활성화됨 (activate): 즉, 기존 서비스워커가 있는 한, 새 서비스워커는 바로 적용되지 않음.

					문제상황: 앱을 개선해서 새로운 서비스워커를 만들었는데 사용자가 이미 앱을 켜놓고 있는 상태라면? 그 탭은 옛날 서비스워커를 계속 쓰고 있음

					해결: clientsClaim: true 설정하면, 새 서비스워커가 활성화되는 순간 열려 있는 모든 탭(클라이언트)을 즉시 takeover해서 새 서비스워커가 컨트롤함.

					효과: 버그/캐시 문제 최소화 -> 예전 워커가 계속 캐시해서 생기는 문제 방지
				*!/
      },

      devOptions: {
        enabled: false, //개발 환경에서는 서비스워커 비활성화 -> 캐시 때문에 수정한 게 반영 안 되는 문제가 생기기 쉬워서!
        navigateFallback: 'index.html', //404에러나면 항상 index.html로 fallback
        suppressWarnings: true, //콘솔 경고를 안 보이게 함 -> 개발 중 경고 너무 많으면 불편해서
        type: 'module', //최신 모듈 시스템 쓰고 싶을 때 설정
      },
    }),
    */
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
})
