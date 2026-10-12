"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/app/components/web/PageHeader";
import BlogDetail from "@/app/components/web/BlogDetail";
import BlogSidebar from "@/app/components/web/BlogSidebar";
import RelatedBlogs from "@/app/components/web/RelatedBlogs";
import { BlogItem, getBlogBySlug, getBlogById, getBlogs } from "@/app/services/blogService";
import { ClientItem, getClientById } from "@/app/services/clientService";
import Loading from "@/app/components/common/Loading";

const sampleBlog: BlogItem = {
  id: 1,
  client_id: 1,
  title: "The Spiritual Benefits of Charcoal-Free Dhoop: Eliciting Calm & Transformation",
  slug: "spiritual-benefits-charcoal-free-dhoop",
  excerpt:
    "Discover why 100% charcoal-free, natural base dhoop sticks are essential for sacred temple rituals, meditation, and healthy respiratory wellness in your home.",
  content: `
    <p class="lead">
      In Sanatan tradition, offering <strong>Dhoop (Dhupam)</strong> is an integral step of the sacred Shodashopachara Puja. The sacred fragrant smoke carries our prayers to the divine realm, purifying negative energies and creating a celestial atmosphere of peace and abundance.
    </p>

    <h3 class="fw-bold mt-4 mb-3 text-dark">1. Why 100% Charcoal-Free Dhoop Sticks Matter</h3>
    <p>
      Conventional incense sticks made with coal dust or burning charcoal produce heavy, irritant carbon smoke that can cause throat dryness and indoor pollution. <strong>Pujyama (Pujyaआमा)</strong> dhoop sticks are 100% charcoal-free, crafted solely with dried botanical flower petals, natural plant resins, and pure essential oils for clean, soothing aromatic smoke.
    </p>

    <div class="my-4 p-4 rounded-2xl bg-[#fbf6ee] border border-[#eddcc6]">
      <h5 class="fw-bold text-[#de142a] mb-1">✨ Sacred Puja Tip</h5>
      <p class="mb-0 text-gray-800">
        Always place your dhoop stick on the complimentary ceramic stand included inside every Pujyama box. Light the tip, let it flame gently for 5 seconds, then blow out the flame to enjoy steady 45-minute continuous divine fragrance.
      </p>
    </div>

    <h3 class="fw-bold mt-4 mb-3 text-dark">2. The Healing Power of Gulab (Rose) &amp; Mix Floral Aromas</h3>
    <p>
      Rose fragrance (Gulab Dhoop) offers a sweet, refreshing aroma that naturally lowers stress levels, soothes anxiety, and deepens concentration during japa meditation and prayer. Our Mix Floral blend harmonizes sacred petals to elicit a profound feeling of spiritual calm and transformation.
    </p>

    <h3 class="fw-bold mt-4 mb-3 text-dark">3. Respecting Ancient Tradition: Bamboo-less Formulation</h3>
    <p>
      Ancient scriptures recommend avoiding burning bamboo during puja ceremonies. Pujyama dhoop sticks are completely bamboo-less and thick-bodied, guaranteeing pure herbal offering without sacred transgressions.
    </p>
  `,
  featured_image: "/assets/products/mix-floral-front.jpg",
  status: 1,
  published_at: new Date().toISOString(),
  meta_title: "Spiritual Benefits of Charcoal-Free Dhoop | Pujyama",
  meta_description: "Learn why natural charcoal-free dhoop sticks create spiritual calm and transformation.",
};

const sampleClient: ClientItem = {
  id: 1,
  name: "Pujyama Editorial",
  website_name: "Pujyama Devotional Stories",
  website_url: "https://pujyama.com",
  domain: "pujyama.com",
  logo: "/assets/logo.png",
  default_meta_title: "Pujyama Devotional Guides & Seva Vidhi",
  default_meta_description:
    "Inspiring stories and guides for Krishna devotees worldwide.",
  status: 1,
};

function BlogPreviewContent() {
  const searchParams = useSearchParams();
  const slugParam = searchParams.get("slug");
  const idParam = searchParams.get("id");

  const [blog, setBlog] = useState<BlogItem>(sampleBlog);
  const [client, setClient] = useState<ClientItem | null>(sampleClient);
  const [recentBlogs, setRecentBlogs] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(slugParam || idParam));

  useEffect(() => {
    const fetchLiveBlog = async () => {
      try {
        setIsLoading(true);
        let fetchedBlog: BlogItem | null = null;

        if (slugParam) {
          fetchedBlog = await getBlogBySlug(slugParam, "").catch(() => null);
        } else if (idParam) {
          fetchedBlog = await getBlogById(Number(idParam), "").catch(() => null);
        }

        if (fetchedBlog) {
          setBlog(fetchedBlog);
          if (fetchedBlog.client_id) {
            const clientData = await getClientById(fetchedBlog.client_id, "").catch(() => null);
            if (clientData) setClient(clientData);
          }
        }

        const allBlogs = await getBlogs({ limit: 4 }, "").catch(() => ({ blogs: [] }));
        if (allBlogs?.blogs && allBlogs.blogs.length > 0) {
          setRecentBlogs(allBlogs.blogs);
        }
      } catch (err) {
        console.error("Failed to load live preview blog:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveBlog();
  }, [slugParam, idParam]);

  return (
    <>
      <PageHeader
        title={blog.title || "Devotional Blogs"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blog-preview" },
          { label: "Article Preview" },
        ]}
      />

      <div className="mx-auto max-w-[1100px] px-5 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <BlogDetail blog={blog} client={client} />
          </div>
          <div className="lg:col-span-4">
            <BlogSidebar
              recentBlogs={recentBlogs.map((b) => ({
                title: b.title || "",
                date: b.created_at ? new Date(b.created_at).toLocaleDateString() : "Recent",
                slug: b.slug || String(b.id),
              }))}
            />
          </div>
        </div>

        <div className="mt-12">
          <RelatedBlogs blogs={recentBlogs} />
        </div>
      </div>
    </>
  );
}

export default function BlogPreviewClient() {
  return (
    <Suspense
      fallback={
        <Loading
          variant="container"
          size="md"
          message="Loading blog preview..."
        />
      }
    >
      <BlogPreviewContent />
    </Suspense>
  );
}
