import { useEffect, useRef, useState } from "react";
import { PoseLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

export default function WorkoutTracking({ onResults }) {

  const [webCamRunning, setWebCamRunning] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const poseLandmarker = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasCtx = useRef(null);
  const streamRef = useRef(null);
  const lastVideoTime = useRef(-1);
  
  useEffect(() => {
  const createPoseLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    poseLandmarker.current = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
        delegate: "CPU"
      },
      runningMode: "VIDEO",
      numPoses: 2
    });
    enableCamera();
  };

  createPoseLandmarker();
  }, []);

  const rest = (ms) => new Promise((r) => setTimeout(r, ms));

  //Star tacountdown before starting with 3 seconds
  const startCountdown = async (seconds = 3) => {
    for (let i = seconds; i > 0; i--) {
      setCountdown(i);
      await rest(1000);
    }
    setCountdown(null);
  }

  //Check webcam acxcess is supported
  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

  //Enable webcaam and detection 
  const enableCamera = async () => {
        if (!poseLandmarker.current) {
          console.log("PoseLandmarker not loaded yet.");
          return;
        }

      await startCountdown(3);

      const constraints = {video: true};

      //Activate webcam stream
      const video = videoRef.current
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        streamRef.current = stream;
        video.srcObject = stream;

        video.onloadeddata = () => {
          setWebCamRunning(true);
          predictWebcam();
        }
}

//Turns off camera when leaving workout tracking page
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  }, [])

useEffect(() => {
    if (canvasRef.current) {
      canvasCtx.current = canvasRef.current.getContext("2d");
    }
  }, []); 

  //Pose estimation through webcam
  const predictWebcam = () => {
  const video = videoRef.current
  const canvas = canvasRef.current
  const ctx = canvasCtx.current
  const drawingUtils = new DrawingUtils(ctx)
  ctx.imageSmoothingEnabled = true;

  if (!video.videoWidth || !video.videoHeight) {
    requestAnimationFrame(predictWebcam);
    return;
  }

  //Match canvaas overlay with video
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  //Get current timestamp on frame
  const startTimeMs = performance.now();

  //Run pose detection on current video frame
    poseLandmarker.current.detectForVideo(video, startTimeMs, (result) => {
      //Pass the full body lanmarks to onResults
      onResults?.(result.landmarks[0]);
      //Saves frames drawing state
      ctx.save();
      //Clears canvas on last frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //Draws frame onto the canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      //Draws landmark spots and lines betweeen them
      for (const landmark of result.landmarks) {
        drawingUtils.drawLandmarks(landmark)
        
        drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
      }
      ctx.restore();
    });
    requestAnimationFrame(predictWebcam)
}

return (
    <div className="font-inter text-gray-300">
      {countdown !== null && (
        <div className="lg:text-5xl font-semibold text-center">{countdown}</div>
      )}
      <div className="relative w-full max-w-5xl aspect-video mx-auto">
      <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover"/>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10"/>
      </div>
    </div>
  );
}