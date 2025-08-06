import { PostCard, Categories, PostWidget } from './components';

const posts = [
  { title: 'React Testing', excerpt: 'Learn React Testing' },
  { title: 'React with Tailwind', excerpt: 'Learn React with Tailwind' }
]

export default function Home() {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div>
          <div className='col-span-1 lg:col-span-8'>
            {posts.map((post, index) => <PostCard post={post} key={post.title} />)} 
          </div>
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
