"use client";
import { useState, Suspense } from "react";
import { useAuth } from "../AuthProvider";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { db } from "@/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
// import ReCAPTCHA from "react-google-recaptcha"; // Deactivated for now

const initialState = {
  name: "",
  contact: "",
  riceType: "",
  quantity: "",
  location: "",
};

type EnquiryForm = typeof initialState;

function EnquiryFormComponent() {
  const searchParams = useSearchParams();
  const riceTypeFromQuery = searchParams.get("riceType") || "";
  const [form, setForm] = useState<EnquiryForm>({ ...initialState, riceType: riceTypeFromQuery });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [recaptcha, setRecaptcha] = useState<string | null>(null); // Deactivated

  // TODO: Replace with real rice types or fetch from backend
  const riceTypes = ["Basmati", "Sona Masoori", "Parboiled", "Brown"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "orderEnquiries"), {
        ...form,
        submittedAt: Timestamp.now(),
        // recaptcha, // Deactivated
      });
      setSuccess(true);
      setForm(initialState);
      toast.success("Order enquiry submitted successfully!");
      // setRecaptcha(null); // Deactivated
    } catch (err: unknown) {
      let message = "Submission failed. Please try again or contact us.";
      if (err instanceof Error) message = err.message;
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-green-900 flex flex-col items-center py-10 px-4">
      <SectionTitle subtitle="Get a quote for your bulk order">Order Enquiry</SectionTitle>
      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded shadow mb-6">Thank you for your enquiry! We will contact you soon with a quote.</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-green-50 rounded-lg shadow p-6 w-full max-w-lg flex flex-col gap-4">
          <InputField label="Name" required name="name" value={form.name} onChange={handleChange} />
          <InputField label="Contact (Phone/Email)" required name="contact" value={form.contact} onChange={handleChange} />
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Rice Type</label>
            <select required name="riceType" value={form.riceType} onChange={handleChange} className="border border-green-300 rounded px-3 py-2">
              <option value="">Select Rice Type</option>
              {riceTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <InputField label="Quantity (kg)" required name="quantity" value={form.quantity} onChange={handleChange} type="number" min={1} />
          <InputField label="Delivery Location" required name="location" value={form.location} onChange={handleChange} />
          {/* <div className="flex justify-center my-2">
            <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" onChange={setRecaptcha} />
          </div> */}
          {error && <div className="text-red-600">{error}</div>}
          <Button type="submit" loading={loading} fullWidth>Request Quote</Button>
        </form>
      )}
    </div>
  );
}

function ProtectedEnquiryForm() {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/login";
    return <div className="flex justify-center items-center min-h-screen">Redirecting to login...</div>;
  }
  return <EnquiryFormComponent />;
}

export default function EnquiryPage() {
  return (
    <Suspense>
      <ProtectedEnquiryForm />
    </Suspense>
  );
}
// reCAPTCHA is deactivated for now. Uncomment to re-enable. 