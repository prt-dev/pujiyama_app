import Link from "next/link";
import { siteConfig } from "../../config/site";
import { RESOURCE_LINKS, POLICY_LINKS } from "../../config/links";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-12 bg-[#0a0a0a] text-gray-300 px-6 py-12 border-t border-[#de142a]/30">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Contact Details */}
        <div>
          <h2 className="heading-font text-lg text-white font-bold tracking-wide border-b border-[#de142a]/40 pb-1.5 w-fit mb-4">
            Contact Details
          </h2>

          <p className="text-sm leading-[1.8] text-gray-300">
            <strong className="text-white">Phone:</strong> {siteConfig.contact.phone1}
            <br />
            <strong className="text-white">WhatsApp:</strong> {siteConfig.contact.whatsapp || siteConfig.contact.phone1}
            <br />
            <strong className="text-white">Email:</strong> {siteConfig.contact.email}
          </p>
        </div>

        {/* Resources */}
        <div id="blogs">
          <h2 className="heading-font text-lg text-white font-bold tracking-wide border-b border-[#de142a]/40 pb-1.5 w-fit mb-4">
            Resources
          </h2>

          <div className="space-y-2 text-sm leading-[1.8]">
            {RESOURCE_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="block text-gray-300 hover:text-[#de142a] transition no-underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Customer Care & Policies */}
        <div>
          <h2 className="heading-font text-lg text-white font-bold tracking-wide border-b border-[#de142a]/40 pb-1.5 w-fit mb-4">
            Customer Care
          </h2>

          <div className="space-y-2 text-sm leading-[1.8]">
            {POLICY_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="block text-gray-300 hover:text-[#de142a] transition no-underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Location Details */}
        <div>
          <h2 className="heading-font text-lg text-white font-bold tracking-wide border-b border-[#de142a]/40 pb-1.5 w-fit mb-4">
            Location Details
          </h2>

          <p className="text-sm leading-[1.8] text-gray-300">
            College More, Kanchrapara,
            <br />
            Kolkata, West Bengal
            <br />
            Pin: 743145, India
          </p>
        </div>
      </div>

      {/* Bottom Legal Copyright Bar */}
      <div className="mx-auto mt-10 max-w-[1100px] border-t border-zinc-800 pt-6 text-center text-xs text-gray-400">
        <p>
          &copy; {currentYear} <strong className="text-white">{siteConfig.name}</strong>. All rights reserved. Handcrafted with devotion for Krishna Bhakts.
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs font-medium">
          {POLICY_LINKS.map((link, idx) => (
            <span key={link.id} className="flex items-center gap-3">
              <Link href={link.href} className="text-gray-400 hover:text-[#de142a] transition no-underline">
                {link.name}
              </Link>
              {idx < POLICY_LINKS.length - 1 && <span className="text-zinc-700">•</span>}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
