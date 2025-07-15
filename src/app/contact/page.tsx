import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-green-900 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Contact Us</h1>
      <div className="bg-green-50 rounded-lg shadow p-6 w-full max-w-xl flex flex-col gap-6">
        {/* Shop Address */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Shop Address</h2>
          <p>[Your Rice Dealership],<br />123 Main Road,<br />City, State, PINCODE</p>
        </div>
        {/* Map Embed (Google Maps iframe) */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Find Us on Map</h2>
          <div className="rounded overflow-hidden border border-green-200">
            {/* Replace src with your shop's Google Maps embed link */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019123456789!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDMuNSJF!5e0!3m2!1sen!2sin!4v1234567890" 
              width="100%"
              height="200"
              style={{ border: 0 } as React.CSSProperties}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {/* WhatsApp and Email */}
        <div className="flex flex-col gap-2">
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-700 hover:underline"
          >
            <svg width="24" height="24" fill="currentColor" className="inline"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.85.504 3.58 1.38 5.08L2 22l5.09-1.36A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 0 1-4.09-1.13l-.29-.17-3.02.8.81-2.95-.19-.3A7.96 7.96 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.29-6.62c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.13-.68-.6-1.14-1.34-1.28-1.57-.13-.23-.01-.35.1-.47.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.28-.02-.39-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13-.01-.28-.01-.43-.01-.15 0-.39.06-.6.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2.93 2.35.12.15 1.62 2.47 3.93 3.37.55.19.98.3 1.31.38.55.14 1.05.12 1.44.07.44-.07 1.36-.56 1.55-1.1.19-.54.19-1 .13-1.1-.06-.09-.21-.15-.44-.27z"/></svg>
            WhatsApp: +91 99999 99999
          </a>
          <a href="mailto:info@ricedealership.com" className="text-green-700 hover:underline">info@ricedealership.com</a>
        </div>
      </div>
    </div>
  );
}
// Customization: Replace address, WhatsApp number, and map embed link with your real business details. 