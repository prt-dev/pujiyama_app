export default function AboutSection() {
  return (
    <section className="mx-auto flex max-w-[1000px] flex-col gap-8 px-8 py-16 md:flex-row md:items-center">
      <div className="flex-1">
        <h2 className="heading-font text-xl font-bold">
          About Us
        </h2>

        <p className="mt-6 leading-[1.4] text-base font-semibold">
          Spreading Divine Fragrance
          <br />
          and Spiritual Serenity to
          <br />
          <span className="text-[#de142a]">
            Devotees Worldwide.
          </span>
        </p>

        <p className="mt-5 leading-[1.4]">
          At <strong>Pujyaआमा (Pujyama)</strong>,
          <br />
          guided by <em>Bhakti • Prem • Parampara</em>,
          <br />
          we craft 100% charcoal-free,
          <br />
          natural base sacred dhoop sticks.
        </p>

        <p className="mt-5 leading-[1.4]">
          Every aroma that enters your home
          <br />
          is crafted to elicit deep
          <br />
          spiritual calm and divine transformation.
        </p>
      </div>

      <div className="flex flex-1 justify-center items-center">
        <img
          src="/assets/logo.png"
          alt="Pujyaआमा - Bhakti • Prem • Parampara"
          className="max-w-[280px] sm:max-w-[340px] w-full h-auto object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
        />
      </div>
    </section>
  );
}
