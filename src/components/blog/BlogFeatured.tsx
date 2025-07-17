import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { type BlogPost } from '@/hooks/useBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';
import BlogCard from './BlogCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BlogFeaturedProps {
  posts: BlogPost[];
  loading: boolean;
}

export const BlogFeatured: React.FC<BlogFeaturedProps> = ({ posts, loading }) => {
  if (loading) {
    return (
      <div className="w-full h-[400px] mb-12">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="rounded-xl overflow-hidden"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <BlogCard post={post} featured={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogFeatured;