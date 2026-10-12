import Link from "next/link";

interface PageHeaderProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] via-[#111114] to-[#0a0a0a] py-9 px-5 border-b border-[#de142a]/25 text-white">
      <div className="mx-auto max-w-[1100px] text-center">
        <h1 className="heading-font text-2xl sm:text-3xl font-bold text-white mb-2.5 tracking-wide">
          {title}
        </h1>
        <nav className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-gray-400">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={i} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-[#de142a] font-semibold">{crumb.label}</span>
                ) : (
                  <>
                    <Link
                      href={crumb.href ?? "/"}
                      className="text-gray-400 hover:text-white transition no-underline"
                    >
                      {crumb.label}
                    </Link>
                    <span className="text-zinc-600">/</span>
                  </>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
