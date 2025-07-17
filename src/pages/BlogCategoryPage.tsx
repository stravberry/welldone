import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBlogPosts, useBlogCategories, type BlogCategory } from '@/hooks/useBlogPosts';
import BlogCategoryFilter from '@/components/blog/BlogCategoryFilter';
import BlogList from '@/components/blog/BlogList';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { Helmet } from 'react-helmet-async';

const BlogCategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, loading } = useBlogPosts(slug);
  const { categories } = useBlogCategories();
  const [currentCategory, setCurrentCategory] = useState<BlogCategory | null>(null);

  useEffect(() => {
    if (categories.length > 0 && slug) {
      const category = categories.find(cat => cat.slug === slug);
      if (category) {
        setCurrentCategory(category);
      }
    }
  }, [categories, slug]);

  return (
    <>
      <Helmet>
        <title>{currentCategory ? `${currentCategory.name} | Strefa Wiedzy` : 'Strefa Wiedzy'} | Well Done</title>
        <meta 
          name="description" 
          content={currentCategory?.description || 'Czytaj artykuły, poradniki i aktualności dotyczące szkoleń i uprawnień UDT oraz SEP. Zdobądź praktyczną wiedzę.'}
        />
      </Helmet>

      <Navbar />
      
      <main>
        {/* Hero section */}
        <section className="bg-gradient-to-b from-background/50 to-background pt-20 pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {currentCategory ? currentCategory.name : 'Kategoria'}
              </h1>
              <p className="text-xl text-muted-foreground">
                {currentCategory?.description || 'Artykuły w wybranej kategorii'}
              </p>
            </div>
          </div>
        </section>
        
        {/* Main content */}
        <section className="py-10">
          <div className="container mx-auto px-4">
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

export default BlogCategoryPage;