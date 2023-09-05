const l = `
    .card * {
        margin: 0;
        padding: 0;
    }
    .card {
        line-height: 1.5;
        font-family: Arial;
        --primary-bg: #18191a;
        --secondary-bg: #303031;
        --primary-fg: #fff;
        --secondary-fg: rgb(189, 189, 189);
        --max-content-width: 48rem;
    }
    .card a {
        text-decoration: none;
    }
    .author-area {
        background: var(--secondary-bg);
        padding: 1rem;
    }
    .author-profile-and-text{
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        max-width: var(--max-content-width);
        margin: 0 auto;
    }
    .author-profile-photo{
        max-width: 92px;
        max-height: 92px;
        border-radius: 50%;
    }
    .author-details{
        padding-right: 1rem;
    }
    .author-name {
        font-weight: bold;
        font-size: 1.5rem;
        color: var(--primary-fg);
        margin-bottom: .5rem;
    }
    .author-tagline,
    .author-followers {
        color: var(--secondary-fg);
    }
    .author-followers {
        margin-top: .5rem;
    }
    .blogposts-area {
        background: var(--primary-bg);
        color: var(--primary-fg);
        padding: 1.5rem .5rem;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .blogposts-area > a {
        display: flex;
        color: var(--primary-fg);
    }
    .blogposts-area > a:hover .post-card {
        background: var(--secondary-bg);
        border-radius: 5px;
    }
    .post-card {
        width: 100%;
        padding: 1rem .5rem;
    }
    .post-title {
        font-size: 1.5rem;
        margin-bottom: .75rem;
    }
    .post-date-and-reactions{
        display: flex;
        margin-bottom: .75rem;
    }
    .post-date,
    .post-reactions {
        font-size: 0.875rem;
        color: var(--secondary-fg);
        display: flex;
        align-items: center;
        margin-right: 1rem;
    }
    .post-svg{
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
        fill: currentColor;
    }
    .post-brief {
        font-size: 1rem;
        margin-bottom: .75rem;
        color: var(--secondary-fg);
    }
    .post-cover-image{
        width: 100%;
        border-radius: 5px;
    }
    @media screen and (min-width: 768px){
        .blogposts-area > a {
            display: flex;
            max-width: var(--max-content-width);
            margin: 0 auto;
        }
        .post-card {
            display: flex;
            align-items: center;
        }
        .post-card-text {
            width: 50%;
            margin-right: 10%;
        }
        .post-cover-image{
            width: 40%;
            height: min-content;
        }
    }
`, i = document.createElement("template");
i.innerHTML = `
<style>
    ${l}
</style>
<div class="card">
    <div class="author-area"></div>
    <div class="blogposts-area"></div>
</div>
`;
class h extends HTMLElement {
  constructor() {
    super(), this._shadowRoot = this.attachShadow({ mode: "open" }), this._shadowRoot.appendChild(i.content.cloneNode(!0)), this._GET_USER_ARTICLES = `
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
    return ["data-width"];
  }
  attributeChangedCallback(a, t, e) {
    a == "data-width" && t != e && (this[a] = e);
  }
  connectedCallback() {
    this.render();
  }
  createCard(a, t, e, s) {
    const r = this._shadowRoot.querySelector(".author-area"), o = this._shadowRoot.querySelector(".blogposts-area");
    this.setHeight(), r.innerHTML = `
        <div class="author-profile-and-text">
          ${s ? `<a href="https://hashnode.com/@${this.dataset.username}">
                    <img class="author-profile-photo" src="${s}" alt="${a}"/>
                  </a>` : ""}
          <div class="author-details">
              <a href="https://hashnode.com/@${this.dataset.username}">
                <div class="author-name">
                    ${a}
                </div>
              </a>
              ${t ? `<p class="author-tagline">${t}</p>` : ""}
              ${e ? this.dataset.followers === "false" ? "" : `<p class="author-followers">${e} followers</p>` : ""}
          </div>
        </div>
    `, o.innerHTML = "";
  }
  async fetchPosts(a, t = {}) {
    return fetch("https://api.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: a,
        variables: t
      })
    }).then((e) => e.json()).then((e) => {
      if (e.data.user.name === null) {
        this.createCard(this.dataset.username + " doesn't exist");
        return;
      }
      const {
        name: s,
        tagline: r,
        numFollowers: o,
        photo: d,
        publication: { posts: n }
      } = e.data.user;
      this.name = s, this.tagline = r, this.numFollowers = o, this.photo = d, this.posts = n, this.createCard(this.name, this.tagline, this.numFollowers, this.photo), this.renderPosts(this.posts);
    });
  }
  renderPosts(a) {
    a.forEach((t) => {
      let e = /* @__PURE__ */ new Date(`${t.dateAdded}`);
      this._shadowRoot.querySelector(".blogposts-area").innerHTML += `
            <a class="post-link" 
               href="https://${this.dataset.username}.hashnode.dev/${t.slug}" 
               target="_blank" 
               rel="noopener noreferrer"
            >
                <div class="post-card">
                  <div class="post-card-text">
                    <div class="post-title">${t.title}</div>
                    <div class="post-date-and-reactions">
                      <div class="post-date">
                          <svg class="post-svg" viewBox="0 0 512 512">
                              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
                          </svg>
                          ${e.toDateString()}
                      </div>
                      <div class="post-reactions">
                          <svg class="post-svg" viewBox="0 0 512 512">
                              <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                          </svg>
                          ${t.totalReactions}
                      </div>
                    </div>
                    ${this.dataset.brief === "false" ? "" : `<p class="post-brief">${t.brief}</p>`}
                  </div>
                    ${this.dataset.coverImage === "false" ? "" : `<img 
                            class="post-cover-image" 
                            src="${t.coverImage}" 
                            alt="${t.title} cover" 
                           />`}
                </div>
            </a>
        `;
    });
  }
  setWidth() {
    this.dataset.width && (this.style.display = "inline-block", this.style.width = this.dataset.width);
  }
  setHeight() {
    this.dataset.height && (this._shadowRoot.querySelector(".blogposts-area").style.overflowY = "scroll", this._shadowRoot.querySelector(".blogposts-area").style.maxHeight = this.dataset.height);
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
    this.setWidth(), this.fetchPosts(this._GET_USER_ARTICLES, { page: 0 });
  }
}
customElements.define("hashnode-postcard", h);
export {
  h as HashnodePostcard
};
