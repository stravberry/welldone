import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { type BlogPost } from '@/hooks/useBlogPosts';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const publishDate = post.published_at 
    ? formatDistanceToNow(new Date(post.published_at), { addSuffix: true, locale: pl })
    : '';

  return (
    <article 
      className={`relative flex flex-col h-full rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg border border-border bg-card ${
        featured ? 'md:flex-row' : ''
      }`}
    >
      {post.is_featured && !featured && (
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-primary text-primary-foreground">Wyróżniony</Badge>
        </div>
      )}
      
      <div className={`${featured ? 'md:w-1/2' : ''}`}>
        <Link to={`/strefa-wiedzy/${post.slug}`} className="block relative aspect-video overflow-hidden">
          <img 
            src={post.featured_image || '/placeholder.svg'} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {post.category && (
            <div 
              className="absolute bottom-0 left-0 px-3 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.name}
            </div>
          )}
        </Link>
      </div>
      
      <div className={`flex flex-col p-5 flex-grow ${featured ? 'md:w-1/2' : ''}`}>
        <div className="mb-2 text-sm text-muted-foreground">
          {publishDate}
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2">
          <Link to={`/strefa-wiedzy/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        
        {post.excerpt && (
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        
        <div className="mt-auto">
          <Link 
            to={`/strefa-wiedzy/${post.slug}`}
            className="text-primary font-medium hover:underline"
          >
            Czytaj więcej
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;