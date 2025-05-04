import { useRouter } from 'next/router';

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Fetch the blog post data based on the slug
  // This is a placeholder for fetching logic
  const post = {
    title: 'Sample Blog Post',
    content: 'This is a sample blog post content for the slug: ' + slug,
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose prose-invert">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;