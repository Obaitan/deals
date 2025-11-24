import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg text-gray-600">
            <p className="lead text-xl text-gray-800 mb-8">
              Your privacy is important to us. It is Afonja Deals' policy to respect your privacy regarding any information we may collect from you across our website.
            </p>

            <h3 className="text-gray-900 font-bold mt-8 mb-4">1. Information We Collect</h3>
            <p>
              We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.
            </p>

            <h3 className="text-gray-900 font-bold mt-8 mb-4">2. How We Use Information</h3>
            <p>
              We use the information we collect to operate and maintain our website, send you newsletters (if you subscribe), and improve your user experience.
            </p>

            <h3 className="text-gray-900 font-bold mt-8 mb-4">3. Cookies</h3>
            <p>
              We use cookies to help us identify and track visitors, their usage of our website, and their website access preferences.
            </p>

            <h3 className="text-gray-900 font-bold mt-8 mb-4">4. Third-Party Links</h3>
            <p>
              Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
            </p>

            <h3 className="text-gray-900 font-bold mt-8 mb-4">5. Contact Us</h3>
            <p>
              If you have any questions about our privacy policy or how we handle user data, please contact us at hello@afonjadeals.com.
            </p>

            <p className="mt-12 text-sm text-gray-500">
              Last updated: November 24, 2025
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
