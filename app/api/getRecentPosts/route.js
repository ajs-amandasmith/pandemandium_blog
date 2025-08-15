import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export async function GET() {
  try {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: { authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}` },
    });

    const query = gql`
      query GetRecentPosts {
        posts(orderBy: createdAt_ASC, last: 3) {
          title
          featuredImage { url }
          createdAt
          slug
        }
      }
    `;

    const result = await graphQLClient.request(query);
    return new Response(JSON.stringify(result.posts), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
