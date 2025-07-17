import React from "react";
import QRCode from "react-qr-code";

interface QRCodeDealerProps {
  value: string; // The URL or text to encode
  size?: number;
}

export default function QRCodeDealer({ value, size = 128 }: QRCodeDealerProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ background: '#fff', padding: 8, borderRadius: 8 }}>
        <QRCode value={value} size={size} fgColor="#166534" bgColor="#fff" />
      </div>
      <span className="text-xs text-green-700 mt-1">Scan for dealership reference</span>
    </div>
  );
}
// Usage: <QRCodeDealer value="https://yourdomain.com/dealer?ref=123" /> 