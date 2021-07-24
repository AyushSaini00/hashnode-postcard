import { styles } from './postcard.style.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
    ${styles}
</style>
<div class="card">
    <div class="author-area"></div>
    <div class="blogposts-area"></div>
</div>
`;

//extending to HTMLElements help to create custom html elements
export class Postcard extends HTMLElement {
  constructor() {
    super();

    //attaches shadow root to 'this' with mode open making it accessible to outside world
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    //appends a clone of template to shadow DOM
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this._GET_USER_ARTICLES = `
        query GetUserArticles($page: Int!) {
            user(username: "${this.dataset.username.toLowerCase()}") {
                name,
                tagline,
                numFollowers,
                photo,
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
  }

  static get observedAttributes() {
    return ['data-width'];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr == 'data-width' && oldVal != newVal) {
      this[attr] = newVal;
    }
  }

  connectedCallback() {
    this.render();
  }

  createCard(name, tagline, numFollowers, photo) {
    const authorArea = this._shadowRoot.querySelector('.author-area');
    const blogpostsArea = this._shadowRoot.querySelector('.blogposts-area');
    this.setHeight();

    authorArea.innerHTML = `
        <div class="author-profile-and-text">
          ${
            photo
              ? `<a href="https://hashnode.com/@${this.dataset.username}">
                    <img class="author-profile-photo" src="${photo}"/>
                  </a>`
              : ''
          }
          <div class="author-details">
              <a href="https://hashnode.com/@${this.dataset.username}">
                <div class="author-name">
                    ${name}
                </div>
              </a>
              ${tagline ? `<p class="author-tagline">${tagline}</p>` : ''}
              ${
                numFollowers
                  ? this.dataset.followers === 'true'
                    ? `<p class="author-followers">${numFollowers} followers</p>`
                    : ''
                  : ''
              }
          </div>
        </div>
    `;
    blogpostsArea.innerHTML = '';
  }

  fetchPosts(query, variables = {}) {
    return fetch('https://api.hashnode.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
      .then((res) => res.json())
      .then((data) => {
        //if user doesn't exists
        if (data.data.user.name === null) {
          this.createCard(this.dataset.username + " doesn't exist");
          return;
        }

        const {
          name,
          tagline,
          numFollowers,
          photo,
          publication: { posts }
        } = data.data.user;

        this.name = name;
        this.tagline = tagline;
        this.numFollowers = numFollowers;
        this.photo = photo;
        this.posts = posts;

        this.createCard(this.name, this.tagline, this.numFollowers, this.photo);
        this.renderPosts(this.posts);
      });
  }

  renderPosts(posts) {
    posts.forEach((post) => {
      let date = new Date(`${post.dateAdded}`);

      this._shadowRoot.querySelector('.blogposts-area').innerHTML += `
            <a class="post-link" 
               href="https://${this.dataset.username}.hashnode.dev/${
        post.slug
      }" 
               target="_blank" 
               rel="noopener noreferrer"
            >
                <div class="post-card">
                  <div class="post-card-text">
                    <div class="post-title">${post.title}</div>
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
                          ${post.totalReactions}
                      </div>
                    </div>
                    ${
                      this.dataset.brief === 'true'
                        ? `<p class="post-brief">${post.brief}</p>`
                        : ''
                    }
                  </div>
                    ${
                      this.dataset.coverImage === 'true'
                        ? `<img 
                            class="post-cover-image" 
                            src="${post.coverImage}" 
                            alt="${post.title} cover" 
                           />`
                        : ''
                    }
                </div>
            </a>
        `;
    });
  }

  setWidth() {
    if (this.dataset.width) {
      this.style.display = 'inline-block';
      this.style.width = this.dataset.width;
    }
  }

  setHeight() {
    if (this.dataset.height) {
      this._shadowRoot.querySelector('.blogposts-area').style.overflowY =
        'scroll';
      this._shadowRoot.querySelector('.blogposts-area').style.maxHeight =
        this.dataset.height;
    }
  }

  // fixPostLayout() {
  //   if (this.dataset.width) {
  //     let nodeElements = this.shadowRoot.childNodes[3].childNodes[3].childNodes;
  //     console.log(nodeElements);
  //     nodeElements.forEach((elem) => {
  //       console.log(elem);
  //       if (elem.nodeName == 'A') {
  //         console.log(elem.childNodes);
  //       }
  //     });
  //   }
  // }

  render() {
    this.setWidth();
    // this.fixPostLayout();
    this.fetchPosts(this._GET_USER_ARTICLES, { page: 0 });
  }
}

customElements.define('hashnode-postcard', Postcard);
