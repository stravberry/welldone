import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  slug: string;
  status: string;
  published_at: string | null;
  author_id: string | null;
  category_id: string | null;
  is_featured: boolean;
  views_count: number;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
    slug: string;
    color: string;
  };
  tags?: {
    id: string;
    name: string;
    slug: string;
  }[];
};

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type BlogTag = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export const useBlogPosts = (categorySlug?: string) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(name, slug, color)
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (categorySlug) {
          query = query.eq('blog_categories.slug', categorySlug);
        }

        const { data, error } = await query;

        if (error) throw error;

        setPosts(data as BlogPost[]);

        // Fetch featured posts separately
        const { data: featuredData, error: featuredError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(name, slug, color)
          `)
          .eq('status', 'published')
          .eq('is_featured', true)
          .order('published_at', { ascending: false })
          .limit(3);

        if (featuredError) throw featuredError;

        setFeaturedPosts(featuredData as BlogPost[]);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categorySlug]);

  return { posts, featuredPosts, loading, error };
};

export const useBlogPostBySlug = (slug: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(name, slug, color)
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) throw error;

        // Increment view count
        await supabase
          .from('blog_posts')
          .update({ views_count: (data.views_count || 0) + 1 })
          .eq('id', data.id);

        // Fetch tags for this post
        const { data: tagData, error: tagError } = await supabase
          .from('blog_post_tags')
          .select(`
            tag:blog_tags(id, name, slug)
          `)
          .eq('post_id', data.id);

        if (tagError) throw tagError;

        const tags = tagData.map((item: any) => item.tag);
        
        setPost({ ...data, tags } as BlogPost);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};

export const useBlogCategories = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('blog_categories')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (error) throw error;

        setCategories(data as BlogCategory[]);
      } catch (err) {
        console.error('Error fetching blog categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useRecentPosts = (limit = 5) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(name, slug, color)
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(limit);

        if (error) throw error;

        setPosts(data as BlogPost[]);
      } catch (err) {
        console.error('Error fetching recent posts:', err);
        setError('Failed to load recent posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, [limit]);

  return { posts, loading, error };
};

export const usePopularTags = (limit = 10) => {
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularTags = async () => {
      setLoading(true);
      setError(null);

      try {
        // This is a simplified query, ideally we would count posts per tag and order by that
        const { data, error } = await supabase
          .from('blog_tags')
          .select('*')
          .limit(limit);

        if (error) throw error;

        setTags(data as BlogTag[]);
      } catch (err) {
        console.error('Error fetching popular tags:', err);
        setError('Failed to load tags. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTags();
  }, [limit]);

  return { tags, loading, error };
};