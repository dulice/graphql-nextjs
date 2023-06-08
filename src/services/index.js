import { gql, request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_API;

export const getPosts = async () => {
  const query = gql`
    query Posts {
      posts {
        id
        title
        description
        slug
        createdAt
        image {
          url
        }
        author {
          id
          name
          email
          photo {
            url
          }
        }
        categories {
          id
          name
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getPost = async (slug) => {
  const query = gql`
    query getPost($slug: String) {
      post(where: { slug: $slug }) {
        id
        title
        description
        slug
        createdAt
        image {
          url
        }
        author {
          id
          name
          email
          photo {
            url
          }
        }
        categories {
          id
          name
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getCategories = async () => {
  const query = gql`
    query Categories {
      categories {
        slug
        id
        name
        posts {
          id
          slug
        }
      }
    }
  `;
  const response = await request(graphqlAPI, query);
  return response.categories;
};

export const categoryPosts = async (name, slug) => {
  const query = gql`
    query CategoryPosts($name: String!, $slug: String) {
      posts(where: {AND: {slug_not: $slug}, categories_some: {name: $name}}) {
        id
        title
        description
        slug
        createdAt
        image {
          url
        }
        categories {
          id
          name
        }
        author {
          id
          name
          email
          photo {
            url
          }
        }
      }
    }
  `;
  const response = await request(graphqlAPI, query, { name, slug });
  return response.posts
};

export const getComment = async (slug) => {
  const query = gql`
  query getComment($slug: String!) {
    post(where: {slug: $slug}) {
      comments {
        id
        text
        name
        email
      }
    }
  }
  `
  const response = await request(graphqlAPI, query, { slug });
  return response.post.comments
}