import { siteConfig } from "../../config/site";

export default function ContactSection() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 py-8">
      <div className="rounded-2xl border border-[#eddcc6] bg-white p-6 sm:p-8 shadow-xs">
        <h2 className="heading-font text-2xl font-bold text-[#de142a] text-center mb-2">
          Get in Touch with {siteConfig.name}
        </h2>
        <p className="text-sm text-gray-700 text-center max-w-xl mx-auto mb-8">
          Have questions about customized Laddu Gopal poshak sizes, bulk orders, or dispatching worldwide? Reach out to us anytime!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#fbf6ee] p-6 rounded-xl border border-[#eddcc6]">
            <h3 className="heading-font text-lg font-bold text-[#de142a] mb-4">
              Send a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">Your Full Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-[#de142a] focus:outline-hidden"
                  placeholder="e.g. Radhika Sharma"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-[#de142a] focus:outline-hidden"
                    placeholder="8013395004"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">Email Address</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-[#de142a] focus:outline-hidden"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">Your Message</label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-[#de142a] focus:outline-hidden"
                  rows={4}
                  placeholder="Please describe your requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#de142a] py-2.5 text-sm font-semibold text-white transition hover:bg-[#b90f22] border-0 cursor-pointer shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-[#eddcc6] bg-[#fbf6ee] p-5 shadow-2xs">
              <h4 className="heading-font text-base font-bold text-[#de142a] mb-2">
                Contact Details :
              </h4>
              <p className="text-sm leading-[1.8] text-gray-800 mb-0">
                <strong>Phone Number -</strong> {siteConfig.contact.phone1}
                <br />
                <strong>Whatsapp -</strong> {siteConfig.contact.whatsapp || siteConfig.contact.phone1}
                <br />
                <strong>Email -</strong> {siteConfig.contact.email}
              </p>
            </div>

            <div className="rounded-xl border border-[#eddcc6] bg-[#fbf6ee] p-5 shadow-2xs">
              <h4 className="heading-font text-base font-bold text-[#de142a] mb-2">
                Location Details :
              </h4>
              <p className="text-sm leading-[1.8] text-gray-800 mb-0">
                College More, Kanchrapara,
                <br />
                Kolkata, West Bengal
                <br />
                743145, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
