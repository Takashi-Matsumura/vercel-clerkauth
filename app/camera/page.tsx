"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import ClientSideClock from "../components/ClientSideClock";
import jsQR from "jsqr";

import {
  getDocs,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

type QrCodeText = {
  name: string;
};

export default function DashboardPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrCodeText, setQrCodeText] = useState<QrCodeText>({ name: "" });
  const [facingMode, setFacingMode] = useState("environment"); // 'user' or 'environment'

  useEffect(() => {
    // カメラへのアクセス
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.muted = true; // ビデオをミュートに設定
            videoRef.current.play();
          }
        })
        .catch((error) => {
          console.error("Error accessing the camera: ", error);
        });
    } else {
      console.error("getUserMedia not supported");
    }
  }, [facingMode]);

  const scanQRCode = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) {
      console.error("canvas or video is null");
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      console.error("2D context is null");
      return;
    }

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          const decoder = new TextDecoder("utf-8");
          const decodedData = decoder.decode(new Uint8Array(code.binaryData));
          const jsonData = JSON.parse(decodedData);
          console.log(jsonData);
          setQrCodeText(jsonData);
        } else {
          requestAnimationFrame(scan);
        }
      } else {
        requestAnimationFrame(scan);
      }
    };
    scan();
  };

  const isAndroid = () => {
    return /Android/i.test(navigator.userAgent);
  };

  const isIOS = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const [deviceId, setDeviceId] = useState<string | null>(null);
  // カメラ切り替え関数
  const switchCameraFunction = async () => {
    if (isAndroid()) {
      const nextDeviceId = await switchCamera(deviceId);
      setDeviceId(nextDeviceId);
    } else if (isIOS()) {
      setFacingMode((prevFacingMode) =>
        prevFacingMode === "user" ? "environment" : "user"
      );
    }
  };

  const switchCamera = async (deviceId: string | null) => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );

    // If deviceId is null or not found in the list of video devices, use the first video device
    let currentDeviceIndex = videoDevices.findIndex(
      (device) => device.deviceId === deviceId
    );
    if (currentDeviceIndex === -1) {
      currentDeviceIndex = 0;
    }

    const nextDeviceIndex = (currentDeviceIndex + 1) % videoDevices.length;
    const nextDeviceId = videoDevices[nextDeviceIndex].deviceId;

    return nextDeviceId;
  };

  const clearQrCodeText = () => {
    setQrCodeText({ name: "" });
  };

  const recordToFirestore = async () => {
    if (!qrCodeText.name) {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "clients"), {
        name: qrCodeText.name,
        time: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      alert("サーバに登録しました");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <div className="flex">
        <Link href="/dashboard">
          <button className="bg-black text-white rounded-full hover:bg-gray-500 w-10 h-10">
            戻る
          </button>
        </Link>

        <video ref={videoRef} style={{ display: "none" }} />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div>
          <video
            className="p-10"
            ref={videoRef}
            width="240"
            height="240"
            autoPlay
            playsInline
            muted
          />
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={switchCameraFunction}
            >
              カメラ切替
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={scanQRCode}
              onDoubleClick={clearQrCodeText}
            >
              QRコード
            </button>
          </div>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex flex-col w-full">
        <p className="pb-2 pt-10">利用者名:</p>
        <p className="flex text-3xl justify-center font-bold border py-5 w-full">
          {qrCodeText.name}
        </p>
      </div>

      <ClientSideClock />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={recordToFirestore}
      >
        登録
      </button>
    </div>
  );
}
