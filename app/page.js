import { PostCard, Categories, PostWidget } from './components';
import { getPosts } from '../services';

export default async function Home() {
  const posts = (await getPosts()) || [];
  console.log('Posts fetched for home page:', posts);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Feed */}
        <div className="col-span-1 lg:col-span-8">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard post={post} key={post.slug} />)
          ) : (
            <p>No posts found.</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
