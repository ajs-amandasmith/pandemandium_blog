import { PostCard, Categories, PostWidget } from './components';
import { getPosts } from '../services';

// const posts = [
//   { title: 'React Testing', excerpt: 'Learn React Testing' },
//   { title: 'React with Tailwind', excerpt: 'Learn React with Tailwind' }
// ]

export default async function Home() {
  const posts = (await getPosts()) || []
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className='col-span-1 lg:col-span-8'>
            {posts.map((post) => <PostCard post={post.node} key={post.node.slug} />)} 
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative top-8 lg:sticky'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
     
    </div>
  );
}

// export async function getStaticProps() {
//   const posts = (await getPosts()) || [];

//   return {
//     props: { posts }
//   }
// }
