import { GraphQLClient, gql } from "graphql-request";
import { NextResponse } from "next/server";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_API;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export async function POST(req) {
  const { name, slug } = await req.json();
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorizaton: `Bearer ${graphcmsToken}`,
    },
  });
  const query = gql`
    mutation AddCategory($name: String!, $slug: String!) {
      createCategory(data: { name: $name, slug: $slug }) {
        id
      }
    }
  `;
  const response = await graphQLClient.request(query, { name, slug});
  return response;
}

export async function DELETE(req) {
    //! json parse (undefined hearders) error
    try {
        const { slug } = await req.json();
        console.log(slug);
        const graphQLClient = new GraphQLClient(graphqlAPI, {
            headers: {
              authorizaton: `Bearer ${graphcmsToken}`,
            },
          });
        const query = gql`
          mutation DeleteCategory($slug: String!) {
            deleteCategory(where: { slug: $slug }) {
              id
            }
          }
        `;
        const response = await graphQLClient.request(query, {
          slug,
        });
        return NextResponse.json(response);
    } catch (error) {
        console.log(error)
    }
}

export async function PUT(req) {
    const { slug, name } = await req.json();
    const graphQLClient = new GraphQLClient(graphqlAPI, {
        headers: {
          authorizaton: `Bearer ${graphcmsToken}`,
        },
      });
    const query = gql`
    mutation UpdateCategory($name: String!, $slug: String!) {
        updateCategory(where: {slug: $slug}, data: {name: $name}) {
            id
            name
        }
      }
    `
    
    const response = await graphQLClient.request(query, { name, slug });
    return NextResponse.json(response);
}
