import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const token = process.env.GRAPHCMS_TOKEN;

export async function GET() {
  try {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const query = gql`
      query GetPosts {
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
    return new Response(JSON.stringify(result.postsConnection.edges), { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
