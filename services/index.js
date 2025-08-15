import { GraphQLClient, gql, request } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Create a reusable client (add headers if needed)
const graphQLClient = new GraphQLClient(graphqlAPI, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`, // optional if read needs auth
  },
});

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author { bio id name photo { url } }
            createdAt
            slug
            title
            excerpt
            category { slug name }
            featuredImage { url }
          }
        }
      }
    }
  `;
  const result = await graphQLClient.request(query);
  return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        id
        author { bio id name photo { url } }
        createdAt
        slug
        title
        excerpt
        category { slug name }
        featuredImage { url }
        content { raw }
      }
    }
  `;
  const result = await graphQLClient.request(query, { slug });
  return result.post;
};

// export const getRecentPosts = async () => {
//   const query = gql`
//     query GetPostDetails {
//       posts(orderBy: createdAt_ASC, last: 3) {
//         title
//         featuredImage { url }
//         createdAt
//         slug
//       }
//     }
//   `;
//   const result = await graphQLClient.request(query);
//   return result.posts;
// };

export const getSimilarPosts = async (categorySlug, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categorySlug: String!) {
      posts(where: { slug_not: $slug, category: { slug: $categorySlug }}, last: 3) {
        title
        featuredImage { url }
        createdAt
        slug
      }
    }
  `;
  const result = await graphQLClient.request(query, { categorySlug, slug });
  return result.posts;
};

// export const getCategories = async () => {
//   const query = gql`
//     query GetCategories {
//       categories {
//         name
//         slug
//       }
//     }
//   `;
//   const result = await graphQLClient.request(query);
//   return result.categories;
// };

// export const submitComment = async (obj) => {
//   const res = await fetch('/api/comments', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(obj),
//   });

//   if (!res.ok) {
//     throw new Error('Failed to submit comment');
//   }

//   return res.json();
// };

// export const getComments = async (slug) => {
//   const query = gql`
//     query GetComments($slug: String!) {
//         comments(where: { post: { slug: $slug }}) {
//         name
//         createdAt
//         comment
//       }
//     }
//   `;
//   const result = await graphQLClient.request(query, { slug });
//   return result.comments;
// };

// services/index.js
export const submitComment = async (obj) => {
  const res = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  if (!res.ok) throw new Error('Failed to submit comment');
  return res.json();
};

export const getComments = async (slug) => {
  const res = await fetch(`/api/getComments?slug=${slug}`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
};

// export const getCategories = async () => {
//   const res = await fetch(`/api/getCategories`);
//   if (!res.ok) throw new Error('Failed to fetch categories');
//   return res.json();
// };

export const getRecentPosts = async () => {
  const res = await fetch('/api/getRecentPosts');
  if (!res.ok) throw new Error('Failed to fetch recent posts');
  return res.json();
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      posts(where: { category_some: { slug: $slug } }) {
        title
        slug
        featuredImage {
          url
        }
        createdAt
        author {
          name
          photo {
          url
          }
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug });
    return result.posts || [];
  } catch (err) {
    console.error("Error in getCategoryPost:", err);
    return [];
  }
};

