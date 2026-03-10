import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Blog() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-indigo-50 to-slate-50 rounded-3xl px-4 border border-slate-100">
        <BookOpen className="w-14 h-14 text-indigo-600 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Blog – Build WordPress Websites with Elementor
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          In-depth guides on designing WordPress websites with Elementor and related tools. From basics to advanced.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">All Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:border-indigo-100 transition-all duration-300 flex flex-col group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-indigo-600 font-medium mb-2">{post.date}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                  <Link to={`/post/${post.id}`} className="hover:text-indigo-600 transition-colors line-clamp-2">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-slate-600 mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                <Link
                  to={`/post/${post.id}`}
                  className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 hover:gap-3 transition-all"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
