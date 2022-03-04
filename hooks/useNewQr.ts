import { SignedPayload } from "@thirdweb-dev/sdk";
import { useCallback, useEffect, useState } from "react";
import useRefreshInterval from "./useRefreshInterval";

export default function useNewQr() {
  const [output, setOutput] = useState<SignedPayload>();
  const [failing, setFailing] = useState(false);

  const [nextRefreshTime, setNextRefreshTime] = useState(0);

  const refreshRateInMs = useRefreshInterval();

  const fetchQr = useCallback(async () => {
    const response = await fetch("/api/qr", {});

    if (!response.ok) {
      const text = await response.text();
      console.error("Failed to fetch QR code:", text);
      setFailing(true);
      throw new Error(`Failed to fetch QR code: ${text} - ${response.status}`);
    }

    const json = await response.json();
    setFailing(false);
    setOutput(json);
  }, []);

  useEffect(() => {
    fetchQr();
    setNextRefreshTime(Math.floor(Date.now() + refreshRateInMs));

    const id = setInterval(async () => {
      await fetchQr();

      setNextRefreshTime(Math.floor(Date.now() + refreshRateInMs));
    }, refreshRateInMs);

    return () => {
      clearInterval(id);
    };
  }, [fetchQr]);

  return {
    signedPayload: output,
    failing,
    nextRefreshTime,
  };
}
