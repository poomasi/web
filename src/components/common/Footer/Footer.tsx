"use client";

import { useAccountStore, useAccountStoreData } from "@store/account";
import { requestForToken } from "@utils/fcm/firebase.ts";
import customAxios from "@api/customAxios.ts";

export function Footer() {
  const { setFcmToken } = useAccountStore();
  const { getAccountToken } = useAccountStoreData();

  const requestPermission = async () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // FCM 토큰 요청
          requestForToken().then((token) => {
            if (token) {
              setFcmToken(token); // FCM 토큰 저장

              // 로그인 된 경우에만 서버에 토큰 전송
              if (getAccountToken()) {
                customAxios.patch("/accounts/device-token", {
                  device_token: token,
                });
              }
            }
          });
        }
      });
    } else {
      console.log("알림이 되지 않아요!");
    }
  };

  return (
    <div className="w-full h-[481px] overflow-hidden flex flex-col justify-center items-start gap-[80px] bg-black pl-[70px]">
      <p className="text-[68px] font-bold text-left text-white">
        <span className="font-bold text-left text-white">
          We would love
          <br />
          to hear from you
        </span>
      </p>
      <div className="flex flex-col justify-start items-start w-[322px] gap-4">
        <div className="flex justify-start items-center h-[25px] gap-2 text-[#d9d9d9] text-lg">
          <p className="font-medium border-r-[1px] border-[#8C8C8C] pr-[10px] hover:underline">
            서비스 이용약관
          </p>
          <p className="font-medium hover:underline">개인정보처리방침</p>
        </div>
        <p className="self-stretch flex-grow-0 flex-shrink-0 text-lg text-left text-[#999] whitespace-nowrap hover:underline">
          poomasiofficial@gmail.com
          <br />
          Copyright ⓒ Poomasi. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
