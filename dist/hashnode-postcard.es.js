function f(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var l = { exports: {} };
function m(e, s, o) {
  const t = o || ".";
  let r;
  {
    let a;
    switch (typeof e) {
      case "string":
        if (e.length < (e[0] === "-" ? 5 : 4))
          return e;
        r = e, a = Number(
          t !== "." ? r.replace(t, ".") : r
        );
        break;
      case "number":
        r = String(e), a = e, t !== "." && !Number.isInteger(e) && (r = r.replace(".", t));
        break;
      default:
        return e;
    }
    if (-1e3 < a && a < 1e3 || isNaN(a) || !isFinite(a))
      return r;
  }
  {
    const a = r.lastIndexOf(t);
    let i;
    a > -1 && (i = r.slice(a), r = r.slice(0, a));
    const n = v(r, s || ",");
    return i && n.push(i), n.join("");
  }
}
function v(e, s) {
  let o = (e.length - 1) % 3 + 1;
  o === 1 && e[0] === "-" && (o = 4);
  const t = [
    // holds the string parts
    e.slice(0, o)
    // grab part before the first separator
  ];
  for (; o < e.length; o += 3)
    t.push(s, e.substr(o, 3));
  return t;
}
function b(e, s) {
  return function(o) {
    return m(o, e, s);
  };
}
l.exports = m;
l.exports.bindWith = b;
var y = l.exports;
const h = /* @__PURE__ */ f(y), d = {
  createTemplate(e) {
    const { styles: s } = e;
    return `
        <style>
            ${s}
        </style>
        <div class="card">
            <div class="author-area"></div>
            <div class="blogposts-wrapper">
                <div class="blogposts-area">fetching blog posts...</div>
            </div>
        </div>
        `;
  },
  createAuthorArea(e) {
    const { username: s, photo: o, name: t, tagline: r, followers: a, numFollowers: i } = e;
    return `
        <div class="author-profile-and-text">
          ${o ? `<a class="flex" href="https://hashnode.com/@${s}">
                    <img class="author-profile-photo" src="${o}" alt="${t}"/>
                  </a>` : ""}
          <div class="author-details">
              <a href="https://hashnode.com/@${s}">
                <div class="author-name">
                    ${t}
                </div>
              </a>
              ${r ? `<p class="author-tagline">${r}</p>` : ""}
              ${i ? a === "false" ? "" : `<p class="author-followers">${h(
      i
    )} followers</p>` : ""}
          </div>
        </div>
    `;
  },
  createBlogpostCard(e) {
    const {
      username: s,
      slug: o,
      title: t,
      dateAdded: r,
      totalReactions: a,
      brief: i,
      coverImage: n
    } = e, u = new Date(r);
    return `
            <a class="post-link" 
               href="https://${s}.hashnode.dev/${o}" 
               target="_blank"
               rel="noopener noreferrer"
            >
                <div class="post-card">
                  <div class="post-card-text">
                    <div class="post-title">${t}</div>
                    <div class="post-date-and-reactions">
                      <div class="post-date">
                          <svg class="post-svg" viewBox="0 0 512 512">
                              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
                          </svg>
                          ${u.toDateString()}
                      </div>
                      <div class="post-reactions">
                          <svg class="post-svg" viewBox="0 0 512 512">
                              <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                          </svg>
                          ${h(a)}
                      </div>
                    </div>
                    ${i === "false" ? "" : `<p class="post-brief">${i}</p>`}
                  </div>
                    ${n === "false" ? "" : `<img 
                            class="post-cover-image" 
                            src="${n}" 
                            alt="${t} cover" 
                           />`}
                </div>
            </a>
        `;
  }
}, c = {
  default: {
    background: {
      primary: "#18191a",
      secondary: "#303031"
    },
    foreground: {
      primary: "#ffffff",
      secondary: "#bdbdbd"
    }
  },
  devto: {
    background: {
      primary: "#F5F5F5",
      secondary: "#FFFFFF"
    },
    foreground: {
      primary: "#090909",
      secondary: "#171717"
    }
  },
  "hashnode-light-mode": {
    background: {
      primary: "#FFFFFF",
      secondary: "#F8FAFC"
    },
    foreground: {
      primary: "#334155",
      secondary: "#64748B"
    }
  }
}, w = Object.keys(c) || [], x = (e) => (e ? w.includes(e) || (console.warn(
  `selectedTheme's value of "${e}" doesn't match to any of the existing themes, using default theme for now`
), e = "default") : (console.warn("selectedTheme is undefined, using default theme for now"), e = "default"), `
    :host {
        --primary-bg: ${c[e].background.primary};
        --secondary-bg: ${c[e].background.secondary};
        --primary-fg: ${c[e].foreground.primary};
        --secondary-fg: ${c[e].foreground.secondary};
    }
    .flex {
        display: flex;
    }
    .card * {
        margin: 0;
        padding: 0;
    }
    .card {
        line-height: 1.5;
        font-family: Arial;
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
    .blogposts-wrapper {
        background: var(--primary-bg);
        color: var(--primary-fg);
        padding: 1.5rem .5rem;
    }
    .blogposts-area {
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
`), p = {
  getUser({ username: e }) {
    return `
      query GetUser {
        user(username: "${e}") {
          name
          tagline
          numFollowers
          photo
          numPosts
        }
      }
    `;
  },
  getUserArticles({ username: e }) {
    return `
        query GetUserArticles($page: Int!) {
            user(username: "${e}") {
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
}, g = {
  async fetcher(e) {
    return fetch("https://api.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    }).then((s) => s.json());
  }
};
class $ extends HTMLElement {
  constructor() {
    super(), this._shadowRoot = this.attachShadow({ mode: "open" });
    const s = document.createElement("template");
    s.innerHTML = d.createTemplate({
      styles: x(this.dataset.theme)
    }), this._shadowRoot.appendChild(s.content.cloneNode(!0)), this.currentPage = 0, this.postsFetched = [], this._GET_USER = p.getUser({
      username: this.dataset.username.toLowerCase()
    }), this._GET_USER_ARTICLES = p.getUserArticles({
      username: this.dataset.username.toLowerCase()
    });
  }
  async fetchUser(s, o = {}) {
    return g.fetcher({
      query: s,
      variables: o
    }).then(({ data: t }) => {
      var r;
      if (((r = t == null ? void 0 : t.user) == null ? void 0 : r.name) === null) {
        this.renderUser(this.dataset.username + " doesn't exist");
        return;
      }
      this.fetchedUser = t.user, this.totalPosts = t.user.numPosts, this.renderUser(this.fetchedUser), this.fetchPosts(this._GET_USER_ARTICLES, { page: this.currentPage });
    }).catch((t) => {
      console.log(t);
    });
  }
  renderUser(s) {
    const o = this._shadowRoot.querySelector(".author-area");
    o.innerHTML = d.createAuthorArea({
      username: this.dataset.username,
      ...s
    });
  }
  async fetchPosts(s, o = {}) {
    return g.fetcher({ query: s, variables: o }).then(({ data: t }) => {
      var a, i;
      const r = ((i = (a = t == null ? void 0 : t.user) == null ? void 0 : a.publication) == null ? void 0 : i.posts) || [];
      this.posts = r, this.postsFetched = [...this.postsFetched, ...r], this.renderPosts(this.posts);
    });
  }
  renderPosts(s) {
    const o = this._shadowRoot.querySelector(".blogposts-wrapper"), t = this._shadowRoot.querySelector(".blogposts-area");
    if (this.setHeight(), this.currentPage === 0 && (t.innerHTML = ""), !s.length && this.currentPage === 0) {
      t.innerHTML = "no posts found.";
      return;
    }
    const r = this._shadowRoot.querySelector(
      ".blogposts-area-observer"
    );
    if (this.currentPage === 0 && this.totalPosts <= 6 && r && r.remove(), s.forEach((a) => {
      t.innerHTML += d.createBlogpostCard({
        username: this.dataset.username,
        ...a
      });
    }), this.totalPosts > this.postsFetched.length) {
      if (!r) {
        const a = document.createElement("div");
        a.classList.add("blogposts-area-observer"), o.appendChild(a), new IntersectionObserver(
          (n) => {
            n[0].isIntersecting && (this.currentPage += 1, a.innerHTML = "fetching more posts...", this.fetchPosts(this._GET_USER_ARTICLES, {
              page: this.currentPage
            }));
          },
          {
            threshold: 1
          }
        ).observe(a);
      }
    } else
      r.remove();
  }
  render() {
    this.setWidth(), this.fetchUser(this._GET_USER);
  }
  connectedCallback() {
    this.render();
  }
  setWidth() {
    this.dataset.width && (this.style.display = "inline-block", this.style.width = this.dataset.width);
  }
  setHeight() {
    this.dataset.height && (this._shadowRoot.querySelector(".blogposts-area").style.overflowY = "scroll", this._shadowRoot.querySelector(".blogposts-area").style.maxHeight = this.dataset.height);
  }
  static get observedAttributes() {
    return ["data-width"];
  }
  attributeChangedCallback(s, o, t) {
    s == "data-width" && o != t && (this[s] = t);
  }
}
customElements.define("hashnode-postcard", $);
export {
  $ as HashnodePostcard
};
