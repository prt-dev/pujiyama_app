"use client";

import React, { useState } from "react";
import { BlogItem } from "@/app/services/blogService";
import { ClientItem } from "@/app/services/clientService";

interface BlogDetailProps {
  blog: BlogItem;
  client?: ClientItem | null;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentsList, setCommentsList] = useState([
    {
      name: "Radhika Sharma",
      date: "August 18, 2026",
      text: "Such divine insights on Thakur Ji's poshak and pagdi seva. Hare Krishna!",
    },
    {
      name: "Aman Agarwal",
      date: "August 19, 2026",
      text: "Very helpful guide on selecting poshak sizes according to idol dimensions.",
    },
  ]);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    setCommentsList([
      ...commentsList,
      {
        name: commentName,
        date: "Just now",
        text: commentText,
      },
    ]);

    setCommentName("");
    setCommentText("");
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  return (
    <article className="rounded-2xl border border-[#eddcc6] bg-white p-6 sm:p-8 shadow-xs">
      {/* Title & Metadata */}
      <div className="mb-6 border-b border-[#eddcc6] pb-4">
        <h1 className="heading-font text-2xl sm:text-3xl font-bold text-[#de142a] mb-3">
          {blog.title || "The Sacred Art of Laddu Gopal Shringar: Daily Seva Vidhi"}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700">
          <span>
            <i className="fa fa-calendar-alt text-[#de142a] mr-1" />
            August 20, 2026
          </span>
          <span>
            <i className="fa fa-user text-[#de142a] mr-1" />
            Pujyama Devotees
          </span>
          <span>
            <i className="fa fa-comments text-[#de142a] mr-1" />
            {commentsList.length} Comments
          </span>
        </div>

        {blog.excerpt && (
          <p className="mt-4 rounded-xl bg-[#fbf6ee] p-3.5 text-sm font-medium text-gray-800 border-l-4 border-[#de142a]">
            {blog.excerpt}
          </p>
        )}
      </div>

      {/* Hero Image */}
      <div className="mb-6 overflow-hidden rounded-xl border border-[#eddcc6]">
        <img
          src="/assets/hero.png"
          alt={blog.title || "Laddu Gopal Shringar"}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Article Content */}
      <div
        className="prose max-w-none text-sm leading-[1.8] text-gray-800 space-y-4"
        dangerouslySetInnerHTML={{
          __html:
            blog.content ||
            "<p>In Sanatan tradition, serving Laddu Gopal Ji is an intimate expression of Vatsalya Bhava (devotion). Adorning Thakur Ji with beautiful poshaks brings peace and joy to your home.</p>",
        }}
      />

      {/* Comments Section */}
      <div className="mt-10 border-t border-zinc-200 pt-6">
        <h3 className="heading-font text-xl font-bold text-[#de142a] mb-4">
          Devotee Comments ({commentsList.length})
        </h3>

        <div className="space-y-3 mb-8">
          {commentsList.map((c, idx) => (
            <div key={idx} className="rounded-xl bg-[#fbf6ee] border border-[#eddcc6] p-4 text-gray-800">
              <div className="flex justify-between items-center mb-1">
                <span className="heading-font text-sm font-bold text-[#de142a]">{c.name}</span>
                <span className="text-[11px] text-gray-500">{c.date}</span>
              </div>
              <p className="text-xs text-gray-700 mb-0">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Leave Comment Form */}
        <div className="rounded-xl border border-[#eddcc6] bg-[#fbf6ee] p-5 shadow-2xs">
          <h4 className="heading-font text-base font-bold text-[#de142a] mb-3">
            Leave a Devotional Comment
          </h4>

          {submittedMessage && (
            <div className="mb-3 rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-xs font-semibold text-emerald-800">
              Hare Krishna! Your comment has been shared.
            </div>
          )}

          <form onSubmit={handleAddComment} className="space-y-3">
            <div>
              <input
                type="text"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Your Name"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-black focus:border-[#de142a] focus:outline-hidden"
                required
              />
            </div>

            <div>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Your Message or Seva Experience..."
                rows={3}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-black focus:border-[#de142a] focus:outline-hidden"
                required
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-[#de142a] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#b90f22] border-0 cursor-pointer shadow-sm"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
