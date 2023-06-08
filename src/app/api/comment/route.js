import { GraphQLClient, gql } from "graphql-request";
import { NextResponse } from "next/server";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_API;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export async function POST(req) {
  const { name, email, text, slug } = await req.json();
  const graphqlClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`
    }
  });
  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $text: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, text: $text, post: {connect: {slug: $slug}}}) { id, text }
    }
  `;

  const response = await graphqlClient.request(query, {
    name, email, text, slug
  });
    return NextResponse.json(response);
}
