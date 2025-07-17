import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBlogCategories, type BlogCategory } from '@/hooks/useBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';

export const BlogCategoryFilter: React.FC = () => {
  const { categories, loading } = useBlogCategories();
  const location = useLocation();
  const currentPath = location.pathname;
  const isAllActive = currentPath === '/strefa-wiedzy' || !currentPath.includes('/kategoria/');

  if (loading) {
    return (
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link 
        to="/strefa-wiedzy"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          isAllActive 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        Wszystkie
      </Link>
      
      {categories.map((category: BlogCategory) => (
        <Link 
          key={category.id}
          to={`/strefa-wiedzy/kategoria/${category.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentPath.includes(`/kategoria/${category.slug}`) 
              ? 'text-white' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
          style={currentPath.includes(`/kategoria/${category.slug}`) ? { backgroundColor: category.color } : {}}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default BlogCategoryFilter;