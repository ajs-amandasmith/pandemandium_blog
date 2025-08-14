import React from 'react'

import { notFound } from 'next/navigation'
import { getPostDetails } from '../../../services';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm } from '../../components'


export default async function PostPage({ params }) {
  const post = await getPostDetails(params.slug)

  if (!post) {
    notFound()
  }

  console.log(post)
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm postId={post.id} slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={post.slug} categories={post.category ? [post.category.slug] : []} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

