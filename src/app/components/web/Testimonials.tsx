const testimonials = [
  {
    text: "The Mix Floral and Gulab Dhoop sticks from Pujyama are truly divine! The aroma is so gentle, calming, and pure. 100% charcoal-free with zero harsh smoke, and our home temple feels like Vrindavan.",
    name: "Radhika Sharma",
    location: "Noida / Delhi NCR",
    stars: 5,
  },
  {
    text: "We ordered the Zed Black Parfum Dhoop and Mix Floral. The ceramic stand is so convenient and the fragrance stays for hours after morning aarti without any throat irritation.",
    name: "Aman Agarwal",
    location: "Kolkata, WB",
    stars: 5,
  },
  {
    text: "Finding genuine charcoal-free, eco-friendly dhoop with authentic rose and sandalwood extracts was a blessing. The aroma brings instant calm and meditative focus.",
    name: "Pooja Patel",
    location: "Bengaluru, Karnataka",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1100px] px-5 py-12">
      <div className="text-center mb-8">
        <span className="heading-font text-xs font-bold text-[#de142a] bg-[#fbf6ee] border border-[#eddcc6] px-3.5 py-1 rounded-full uppercase tracking-wider">
          🕉️ Devotee Reviews
        </span>
        <h2 className="heading-font text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
          Devotee Blessings &amp; Experiences
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-1">
          Hear what devotees across India share about their daily puja and spiritual calming experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-2xl border border-[#eddcc6] bg-[#fbf6ee]/40 p-6 shadow-xs transition hover:shadow-md hover:border-[#de142a]/30"
          >
            <div>
              <div className="flex gap-1 text-[#de142a] mb-3">
                {Array.from({ length: t.stars }, (_, j) => (
                  <i key={j} className="fas fa-star text-xs"></i>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-[#de142a]/10">
              <h4 className="heading-font text-sm font-bold text-gray-900 mb-0">
                {t.name}
              </h4>
              <p className="text-[11px] text-gray-500 mb-0">
                {t.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
