'use client'
import React, { useState, useEffect, useMemo } from 'react'
import moment from 'moment'
import Link from 'next/link'

import { getRecentPosts, getSimilarPosts } from '../../services'

function PostWidget({ categories = [], slug }) {
  const [relatedPosts, setRelatedPosts] = useState([])

  // Memoize categories to prevent creating a new array every render
  const categorySlugs = useMemo(() => categories.filter(Boolean), [categories])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let result = []

        if (slug && categorySlugs.length) {
          result = await getSimilarPosts(categorySlugs, slug)
        } else {
          result = await getRecentPosts()
        }

        setRelatedPosts(result)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [slug, categorySlugs.join()]) // join array for stable dependency

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.slug} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              alt={post.title}
              height={60}
              width={60}
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 text-xs">
              {moment(post.createdAt).format('MM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} className="text-md">
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
