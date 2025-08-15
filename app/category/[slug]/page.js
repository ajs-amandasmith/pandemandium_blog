// app/category/[slug]/page.js
import React from 'react';
import { getCategoryPost } from '../../../services';
import CategoryPost from './CategoryPost';

export default async function CategoryPage({ params }) {
  const { slug } = params;

  let posts = [];
  let isLoading = false;

  try {
    posts = await getCategoryPost(slug);
  } catch (error) {
    console.error('Error fetching category posts:', error);
  }

  console.log("Params from Next.js:", params);
console.log("Slug being sent to getCategoryPost:", slug);


  return (
    <CategoryPost posts={posts} isLoading={isLoading} />
  );
}
