import React, { useEffect } from "react";
import { VAD } from "web-vad";

import { Button } from "./components/ui/button";

type SplashProps = {
  handleReady: () => void;
};

export const Splash: React.FC<SplashProps> = ({ handleReady }) => {
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    const cacheVAD = async () => {
      await VAD.precacheModels("silero_vad.onnx");
      setIsReady(true);
    };
    cacheVAD();
  }, []);

  return (
    <main className="w-full h-full flex items-center justify-center bg-primary-200 p-4 bg-[length:auto_50%] lg:bg-auto bg-colorWash bg-no-repeat bg-right-top">
      <div className="flex flex-col gap-8 lg:gap-12 items-center max-w-full lg:max-w-3xl">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-balance text-left">
          Real-time voice-enabled chatbot
        </h1>
        <p> 
          We have created a real-time voice activity detection (VAD) model that can detect voice activity in real-time.
          This particular demo is running on a Silero VAD model that is pre-trained on the OpenSLR dataset.
          The server running this demo is not GPU-enabled, so expect the performance to be even better on a GPU-enabled server.
        </p>
        <Button onClick={handleReady} disabled={!isReady}>
          {isReady ? "Check it out!" : "Downloading assets..."}
        </Button>

        <div className="h-[1px] bg-primary-300 w-full" />

        <footer className="flex flex-col lg:gap-2">
          <p className="text-neutral-500">@2024, Neutral Base. All rights reserved</p>
        </footer>
      </div>
    </main>
  );
};

export default Splash;
