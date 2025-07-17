import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBlogPostBySlug, useRecentPosts } from '@/hooks/useBlogPosts';
import BlogPostDetail from '@/components/blog/BlogPostDetail';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading } = useBlogPostBySlug(slug || '');

  return (
    <>
      <Helmet>
        <title>{post ? `${post.title} | Strefa Wiedzy` : 'Strefa Wiedzy'} | Well Done</title>
        <meta 
          name="description" 
          content={post?.meta_description || post?.excerpt || 'Czytaj artykuły, poradniki i aktualności dotyczące szkoleń i uprawnień UDT oraz SEP.'}
        />
        {post?.meta_title && <meta property="og:title" content={post.meta_title} />}
        {post?.meta_description && <meta property="og:description" content={post.meta_description} />}
        {post?.featured_image && <meta property="og:image" content={post.featured_image} />}
      </Helmet>

      <Navbar />
      
      <main>
        {/* Breadcrumb */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center text-sm">
              <Link to="/strefa-wiedzy" className="text-muted-foreground hover:text-foreground">
                Strefa Wiedzy
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              {post?.category && (
                <>
                  <Link 
                    to={`/strefa-wiedzy/kategoria/${post.category.slug}`} 
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {post.category.name}
                  </Link>
                  <span className="mx-2 text-muted-foreground">/</span>
                </>
              )}
              <span className="line-clamp-1">{post?.title || 'Artykuł'}</span>
            </div>
          </div>
        </div>
        
        {/* Back button */}
        <div className="container mx-auto px-4 pt-6">
          <Link 
            to="/strefa-wiedzy" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Powrót do artykułów
          </Link>
        </div>
        
        {/* Main content */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
              <div className="lg:col-span-2">
                <BlogPostDetail post={post} loading={loading} />
              </div>
              
              <div className="lg:col-span-1">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPostPage;