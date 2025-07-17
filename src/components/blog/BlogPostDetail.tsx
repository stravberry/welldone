import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { type BlogPost } from '@/hooks/useBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ClockIcon, EyeIcon } from 'lucide-react';

interface BlogPostDetailProps {
  post: BlogPost | null;
  loading: boolean;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, loading }) => {
  // Calculate reading time (rough estimate: 200 words per minute)
  const calculateReadingTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    return readingTime;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <div className="flex space-x-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-80 w-full" />
        <div className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Artykuł nie został znaleziony</h2>
        <p className="text-muted-foreground">
          Przepraszamy, ale nie mogliśmy znaleźć żądanego artykułu.
        </p>
      </div>
    );
  }

  const readingTime = post.content ? calculateReadingTime(post.content) : 0;
  const publishDate = post.published_at 
    ? format(new Date(post.published_at), 'd MMMM yyyy', { locale: pl })
    : '';

  return (
    <article className="max-w-3xl mx-auto">
      {/* Category */}
      {post.category && (
        <div className="mb-4">
          <Badge 
            className="text-white font-medium px-3 py-1"
            style={{ backgroundColor: post.category.color }}
          >
            {post.category.name}
          </Badge>
        </div>
      )}
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
      
      {/* Meta information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
        <div className="flex items-center">
          <CalendarIcon className="w-4 h-4 mr-1" />
          <span>{publishDate}</span>
        </div>
        
        <div className="flex items-center">
          <ClockIcon className="w-4 h-4 mr-1" />
          <span>{readingTime} min czytania</span>
        </div>
        
        <div className="flex items-center">
          <EyeIcon className="w-4 h-4 mr-1" />
          <span>{post.views_count} wyświetleń</span>
        </div>
      </div>
      
      {/* Featured Image */}
      {post.featured_image && (
        <div className="mb-8">
          <img 
            src={post.featured_image} 
            alt={post.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      )}
      
      {/* Content */}
      <div 
        className="prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
      />
      
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-lg font-medium mb-3">Tagi:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogPostDetail;