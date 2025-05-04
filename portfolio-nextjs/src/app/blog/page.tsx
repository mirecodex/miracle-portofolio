import React from 'react';
import { useEffect, useState } from 'react';
import { fetchBlogPosts } from '@/lib/utils';
import Card from '@/components/ui/Card';

const BlogPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const data = await fetchBlogPosts();
            setPosts(data);
        };
        getPosts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-orange-600 mb-6">Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Card key={post.slug} title={post.title} excerpt={post.excerpt} slug={post.slug} />
                ))}
            </div>
        </div>
    );
};

export default BlogPage;