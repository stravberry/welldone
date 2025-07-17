import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import BlogFeatured from '@/components/blog/BlogFeatured';
import BlogCategoryFilter from '@/components/blog/BlogCategoryFilter';
import BlogList from '@/components/blog/BlogList';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { Helmet } from 'react-helmet-async';

const BlogPage: React.FC = () => {
  const { posts, featuredPosts, loading } = useBlogPosts();

  return (
    <>
      <Helmet>
        <title>Strefa Wiedzy | Well Done</title>
        <meta 
          name="description" 
          content="Czytaj artykuły, poradniki i aktualności dotyczące szkoleń i uprawnień UDT oraz SEP. Zdobądź praktyczną wiedzę."
        />
      </Helmet>

      <Navbar />
      
      <main>
        {/* Hero section */}
        <section className="bg-gradient-to-b from-background/50 to-background pt-20 pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Strefa Wiedzy</h1>
              <p className="text-xl text-muted-foreground">
                Zdobądź praktyczną wiedzę, poznaj najnowsze trendy i rozwiązania w dziedzinie szkoleń i uprawnień UDT oraz SEP.
              </p>
            </div>
          </div>
        </section>
        
        {/* Main content */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            {/* Featured posts carousel */}
            <BlogFeatured posts={featuredPosts} loading={loading} />
            
            {/* Category filter */}
            <BlogCategoryFilter />
            
            {/* Blog content with sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <BlogList posts={posts} loading={loading} />
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

export default BlogPage;