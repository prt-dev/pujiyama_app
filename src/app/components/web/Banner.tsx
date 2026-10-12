export default function Banner() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 my-8">
      <div className="rounded-2xl border border-[#eddcc6] bg-gradient-to-r from-[#fbf6ee] via-white to-[#f8f0e3] p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="heading-font text-2xl sm:text-3xl font-bold text-[#de142a] mb-3">
              Elicit Spiritual Calm &amp; Transformation
            </h2>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              Experience the divine essence of Bhakti • Prem • Parampara with Pujya Aama 100% Charcoal-Free, Natural Base Dhoop Sticks. Infused with pure floral and botanical extracts for daily puja and meditation.
            </p>
            <a
              href="/shop"
              className="rounded-lg bg-[#de142a] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b90f22] no-underline inline-block shadow-sm"
            >
              Explore Divine Fragrances
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/products/mix-floral-front.jpg"
              alt="Pujyama Mix Floral Dhoop"
              className="rounded-xl max-h-72 w-auto object-contain shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
