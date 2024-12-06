import type { PageServerLoad } from './$types';

interface Post {
    slug: string;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
}

export const load: PageServerLoad = async ({ fetch }) => {
    const wpApiUrl = 'https://yesweb.se/wp-json/wp/v2/posts';

    try {
        // Fetch posts from WordPress
        const response = await fetch(wpApiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch posts from WordPress');
        }

        // Parse the JSON response
        const posts: Post[] = await response.json();

        // Return post summaries with title, slug, and excerpt
        return {
            summaries: posts.map((post) => ({
                slug: post.slug,
                title: post.title.rendered,
                excerpt: post.excerpt.rendered,  // Include the excerpt here
            })),
        };
    } catch (error) {
        console.error(error);
        return {
            summaries: [],
            error: 'Failed to load posts from WordPress',
        };
    }
};
