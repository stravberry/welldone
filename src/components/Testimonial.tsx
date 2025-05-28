
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group cursor-pointer hover:bg-gradient-to-br hover:from-white hover:to-orange-50 border border-transparent hover:border-orange-200">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className="text-amber-500 fill-amber-500 transition-all duration-300 group-hover:scale-110 group-hover:animate-star-fill" 
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic transition-colors duration-300 group-hover:text-gray-800">"{quote}"</p>
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold transition-all duration-300 group-hover:bg-orange-100 group-hover:text-orange-600 group-hover:scale-110 group-hover:shadow-lg">
          {author.charAt(0)}
        </div>
        <div className="ml-4">
          <p className="font-semibold transition-colors duration-300 group-hover:text-orange-600">{author}</p>
          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
