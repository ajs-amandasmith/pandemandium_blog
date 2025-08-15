'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

import { PostCard, Categories, Loader } from '../../components';

const CategoryPost = ({ posts, isLoading }) => {
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-10 mb-8">
        <p>No posts found in this category.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Home
        </button>
      </div>
    )
  }

  
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPost;