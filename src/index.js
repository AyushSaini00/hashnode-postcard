import domElements from "./domElements.js";
import { styles } from "./postcard.style.js";
import queries from "./queries.js";
import utils from "./utils.js";

const template = document.createElement("template");
template.innerHTML = domElements.createTemplate({ styles });

//extending to HTMLElements help to create custom html elements
export class HashnodePostcard extends HTMLElement {
  constructor() {
    super();

    //attaches shadow root to 'this' with mode open making it accessible to outside world
    this._shadowRoot = this.attachShadow({ mode: "open" });
    //appends a clone of template to shadow DOM
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.currentPage = 0;

    this._GET_USER = queries.getUser({
      username: this.dataset.username.toLowerCase(),
    });

    this._GET_USER_ARTICLES = queries.getUserArticles({
      username: this.dataset.username.toLowerCase(),
    });
  }

  async fetchUser(query, variables = {}) {
    return utils
      .fetcher({
        query,
        variables,
      })
      .then(({ data }) => {
        //if user doesn't exists
        if (data?.user?.name === null) {
          this.renderUser(this.dataset.username + " doesn't exist");
          return;
        }
        this.fetchedUser = data.user;
        this.renderUser(this.fetchedUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderUser(fetchedUser) {
    const authorArea = this._shadowRoot.querySelector(".author-area");

    authorArea.innerHTML = domElements.createAuthorArea({
      username: this.dataset.username,
      ...fetchedUser,
    });
  }

  async fetchPosts(query, variables = {}) {
    return utils.fetcher({ query, variables }).then(({ data }) => {
      const posts = data?.user?.publication?.posts || [];

      this.posts = posts;
      this.renderPosts(this.posts);
    });
  }

  renderPosts(posts) {
    const blogpostsArea = this._shadowRoot.querySelector(".blogposts-area");
    this.setHeight();

    blogpostsArea.innerHTML = "";

    posts.forEach((post) => {
      this._shadowRoot.querySelector(".blogposts-area").innerHTML +=
        domElements.createBlogpostCard({
          ...post,
        });
    });
  }

  setWidth() {
    if (this.dataset.width) {
      this.style.display = "inline-block";
      this.style.width = this.dataset.width;
    }
  }

  setHeight() {
    if (this.dataset.height) {
      this._shadowRoot.querySelector(".blogposts-area").style.overflowY =
        "scroll";
      this._shadowRoot.querySelector(".blogposts-area").style.maxHeight =
        this.dataset.height;
    }
  }

  render() {
    this.setWidth();
    // this.fixPostLayout();
    this.fetchUser(this._GET_USER);
    this.fetchPosts(this._GET_USER_ARTICLES, { page: this.currentPage });
  }

  static get observedAttributes() {
    return ["data-width"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr == "data-width" && oldVal != newVal) {
      this[attr] = newVal;
    }
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("hashnode-postcard", HashnodePostcard);

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
