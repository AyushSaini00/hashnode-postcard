import commaNumber from "comma-number";

export const LoadingSpinner = `
<svg 
  width="24" 
  height="24" 
  stroke="#000" 
  viewBox="0 0 24 24" 
  xmlns="http://www.w3.org/2000/svg"
>
  <style>.spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}.spinner_V8m1 circle{stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite}@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}}</style>
  <g class="spinner_V8m1">
    <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle>
  </g>
</svg>
`;

export const LoadingMoreItems = (loadMoreText = "fetching more posts...") => `
<div class="flex justify-center items-center w-100 mt-4">
  ${LoadingSpinner}
  <span class="ml-2">${loadMoreText}</span>
</div>`;

export const ErrorState = (errMessage = "Something went wrong!") => `
<div class="error-state">
  <div>${errMessage}</div>
</div>
`;

export const createTemplate = (props) => {
  const { styles } = props;
  return `
        <style>
            ${styles}
        </style>
        <div class="loader">${LoadingSpinner}</div>
        <div class="card">
            <div class="author-area"></div>
            <div class="blogposts-wrapper">
                <div class="blogposts-area"></div>
            </div>
        </div>
        `;
};

export const createAuthorArea = (props) => {
  const { dataAttributes, user } = props;
  if (!user) return `${username} doesn't exist`;

  const { showFollowers, username } = dataAttributes;
  const { name, tagline, followersCount, profilePicture } = user;

  return `
        <div class="author-profile-and-text">
          ${
            profilePicture
              ? `<a class="flex" href="https://hashnode.com/@${username}">
                    <img class="author-profile-photo" src="${profilePicture}" alt="${name}"/>
                  </a>`
              : ""
          }
          <div class="author-details">
              <a href="https://hashnode.com/@${username}">
                <div class="author-name">
                    ${name}
                </div>
              </a>
              ${tagline ? `<p class="author-tagline">${tagline}</p>` : ""}
              ${
                showFollowers === "false"
                  ? ""
                  : followersCount
                  ? `<p class="author-followers">${commaNumber(
                      followersCount,
                    )} followers</p>`
                  : ""
              }
          </div>
        </div>
    `;
};

export const createBlogpostCard = (props) => {
  const { node, dataAttributes } = props;

  const { showCoverImage, showBrief } = dataAttributes;
  const { url, title, publishedAt, reactionCount, brief, coverImage } = node;

  const date = new Date(publishedAt);
  const coverImageUrl = coverImage.url;

  return `
            <a class="post-link" 
               href="${url}" 
               target="_blank"
               rel="noopener noreferrer"
            >
                <div class="post-card">
                  <div class="post-card-text">
                    <div class="post-title">${title}</div>
                    <div class="post-date-and-reactions">
                      <div class="post-date">
                          <svg class="post-svg" viewBox="0 0 512 512">
                              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
                          </svg>
                          ${date.toDateString()}
                      </div>
                      <div class="post-reactions">
                          <svg class="post-svg" viewBox="0 0 512 512">
                              <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                          </svg>
                          ${commaNumber(reactionCount)}
                      </div>
                    </div>
                    ${showBrief === "false" ? "" : `<p class="post-brief">${brief}</p>`}
                  </div>
                    ${
                      showCoverImage === "false"
                        ? ""
                        : `<img 
                            class="post-cover-image" 
                            src="${coverImageUrl}" 
                            alt="${title} cover" 
                           />`
                    }
                </div>
            </a>
        `;
};
