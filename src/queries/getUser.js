export default function getUserQuery({ username }) {
  return `
      query GetUser($pageSize: Int!, $page: Int!) {
        user(username: "${username}") {
          name
          tagline
          followersCount
          profilePicture
          posts(pageSize: $pageSize, page: $page) {
            totalDocuments
            edges {
                node {
                    id
                    url
                    title
                    brief
                    coverImage {
                        url
                    }
                    publishedAt
                    reactionCount
                }
            }
          }
        }
      }
    `;
}
