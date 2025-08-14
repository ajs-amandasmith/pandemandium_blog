import { GraphQLClient, gql } from 'graphql-request';

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

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage { url }
        createdAt
        slug
      }
    }
  `;
  const result = await graphQLClient.request(query);
  return result.posts;
};

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

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      category {
        name
        slug
      }
    }
  `;
  const result = await graphQLClient.request(query);
  return result.category;
};

export const submitComment = async (obj) => {
  const res = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  if (!res.ok) {
    throw new Error('Failed to submit comment');
  }

  return res.json();
};
