import { useParams, Navigate, Link } from "react-router-dom";
import { posts } from "../data/posts";
import { ArrowLeft } from "lucide-react";

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <img src={post.imageUrl} alt={post.title} className="w-full h-64 md:h-96 object-cover" referrerPolicy="no-referrer" />
      <div className="p-8 md:p-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <header className="mb-10">
          <p className="text-sm text-slate-500 font-medium mb-3">{post.date}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {post.excerpt}
          </p>
        </header>
        <div 
          className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
