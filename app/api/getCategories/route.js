// import { GraphQLClient, gql } from 'graphql-request';

// const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// export async function GET() {
//   try {
//     const graphQLClient = new GraphQLClient(graphqlAPI, {
//       headers: {
//         authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
//       },
//     });

//     const query = gql`
//       query GetCategories {
//         categories {
//           name
//           slug
//         }
//       }
//     `;

//     const result = await graphQLClient.request(query);
//     return new Response(JSON.stringify(result.categories), { status: 200 });
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }
