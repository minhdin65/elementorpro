import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-20 bg-indigo-50 rounded-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Master Elementor Like a Pro
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          Discover in-depth tutorials, expert reviews, and the best add-ons to elevate your WordPress web design skills.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            View Products <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            View All Posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Latest Articles</h2>
          <Link to="/blog" className="text-indigo-600 font-medium hover:text-indigo-700">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-indigo-600 font-medium mb-2">{post.date}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                  <Link to={`/post/${post.id}`} className="hover:text-indigo-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-slate-600 mb-6 flex-grow">{post.excerpt}</p>
                <Link to={`/post/${post.id}`} className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors mt-auto">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
