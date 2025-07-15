// RICE DEALERSHIP HOMEPAGE
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-green-900 font-sans flex flex-col items-center justify-between p-0">
      {/* Hero Section */}
      <section className="w-full bg-green-100 py-12 px-4 flex flex-col items-center text-center">
        {/* Replace logo.png with your rice shop logo in /public */}
        <Image src="/logo.png" alt="Rice Shop Logo" width={100} height={100} className="mb-4 rounded-full border-4 border-green-300" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">Welcome to <span className="text-green-700">[Your Rice Dealership]</span></h1>
        <p className="text-lg sm:text-xl text-green-800 mb-6 max-w-2xl">Premium rice varieties, trusted by families and businesses for over <span className="font-semibold">[X years]</span>. Quality, purity, and service you can count on.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products"><Button>View Products</Button></Link>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full max-w-4xl py-12 px-4 flex flex-col items-center text-center">
        <SectionTitle>About Our Business</SectionTitle>
        <p className="text-green-700 mb-4">[Your Rice Dealership] is a family-owned business dedicated to providing the finest rice varieties at competitive prices. We serve retailers, wholesalers, and bulk buyers across the region. Our commitment to quality and customer satisfaction sets us apart.</p>
        <div className="flex flex-wrap justify-center gap-8 mt-6">
          <StatCard value="10+" label="Years of Service" />
          <StatCard value="500+" label="Happy Clients" />
          <StatCard value="20+" label="Rice Varieties" />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full bg-green-50 py-8 px-4 flex flex-col items-center text-center">
        <SectionTitle>Ready to order in bulk?</SectionTitle>
        <p className="mb-4 text-green-700">Request a bulk order quote today!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/enquiry"><Button variant="secondary">Order Enquiry</Button></Link>
        </div>
      </section>
    </div>
  );
}
// Customization: Replace [Your Rice Dealership], stats, and logo.png with your business details.
