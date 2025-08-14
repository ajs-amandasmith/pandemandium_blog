import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export async function POST(req) {
  try {
    const { name, email, comment, postId } = await req.json();

    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
      },
    });

    const query = gql`
      mutation CreateComment($name: String!, $email: String!, $comment: String!, $postId: ID!) {
        createComment(
          data: { name: $name, email: $email, comment: $comment, post: { connect: { id: $postId } } }
        ) {
          id
        }
      }
    `;

    const result = await graphQLClient.request(query, { name, email, comment, postId });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('Error submitting comment:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
