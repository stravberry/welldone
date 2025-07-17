import React from 'react';
import { type BlogPost } from '@/hooks/useBlogPosts';
import BlogCard from './BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface BlogListProps {
  posts: BlogPost[];
  loading: boolean;
}

export const BlogList: React.FC<BlogListProps> = ({ posts, loading }) => {
  const [visiblePosts, setVisiblePosts] = React.useState<number>(6);
  
  const loadMore = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="w-full h-48 rounded-t-lg" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold mb-4">Brak artykułów</h3>
        <p className="text-muted-foreground">
          Nie znaleziono artykułów spełniających kryteria wyszukiwania.
        </p>
      </div>
    );
  }

  const displayedPosts = posts.slice(0, visiblePosts);
  const hasMore = visiblePosts < posts.length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={loadMore}
            variant="outline"
            size="lg"
            className="font-medium"
          >
            Załaduj więcej
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogList;