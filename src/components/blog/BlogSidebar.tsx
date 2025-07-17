import React from 'react';
import { Link } from 'react-router-dom';
import { useRecentPosts, usePopularTags, type BlogPost, type BlogTag } from '@/hooks/useBlogPosts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';

export const BlogSidebar: React.FC = () => {
  const { posts: recentPosts, loading: recentLoading } = useRecentPosts(5);
  const { tags, loading: tagsLoading } = usePopularTags(10);

  return (
    <div className="space-y-8">
      {/* Recent Posts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Ostatnie artykuły</CardTitle>
        </CardHeader>
        <CardContent>
          {recentLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))
          ) : (
            <ul className="space-y-4">
              {recentPosts.map((post: BlogPost) => (
                <li key={post.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <Link to={`/strefa-wiedzy/${post.slug}`} className="hover:text-primary">
                    <h4 className="font-medium mb-1 line-clamp-2">{post.title}</h4>
                    <div className="text-xs text-muted-foreground">
                      {post.published_at ? (
                        formatDistanceToNow(new Date(post.published_at), {
                          addSuffix: true,
                          locale: pl,
                        })
                      ) : (
                        'Nieopublikowany'
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Popularne tagi</CardTitle>
        </CardHeader>
        <CardContent>
          {tagsLoading ? (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-16" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: BlogTag) => (
                <Link key={tag.id} to={`/strefa-wiedzy/tag/${tag.slug}`}>
                  <Badge variant="secondary" className="hover:bg-secondary/80">
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card className="bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle>Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Zapisz się, aby otrzymywać najnowsze artykuły i porady związane z uprawnieniami UDT i SEP.
          </p>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="Twój adres email"
              className="w-full px-3 py-2 rounded-md border border-border text-sm"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90"
            >
              Zapisz się
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;