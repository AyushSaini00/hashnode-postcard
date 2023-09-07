const queries = {
  getUser({ username }) {
    return `
      query GetUser {
        user(username: "${username}") {
          name
          tagline
          numFollowers
          photo
          numPosts
        }
      }
    `;
  },
  getUserArticles({ username }) {
    return `
        query GetUserArticles($page: Int!) {
            user(username: "${username}") {
                publication {
                    posts(page: $page) {
                        title,
                        brief,
                        totalReactions,
                        slug,
                        dateAdded,
                        coverImage
                    }
                }
            }
        }
    `;
  },
};

export default queries;
