import domElements from "./domElements.js";
import { styles } from "./postcard.style.js";
import queries from "./queries.js";
import utils from "./utils.js";

//extending to HTMLElements help to create custom html elements
export class HashnodePostcard extends HTMLElement {
  constructor() {
    super();

    //attaches shadow root to 'this' with mode open making it accessible to outside world
    this._shadowRoot = this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = domElements.createTemplate({
      styles: styles(this.dataset.theme),
    });

    //appends a clone of template to shadow DOM
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.currentPage = 0;
    this.postsFetched = [];

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
        this.totalPosts = data.user.numPosts;

        this.renderUser(this.fetchedUser);
        this.fetchPosts(this._GET_USER_ARTICLES, { page: this.currentPage });
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
      this.postsFetched = [...this.postsFetched, ...posts];

      this.renderPosts(this.posts);
    });
  }

  renderPosts(posts) {
    const blogpostsWrapperElem =
      this._shadowRoot.querySelector(".blogposts-wrapper");
    const blogpostsArea = this._shadowRoot.querySelector(".blogposts-area");

    this.setHeight();

    if (this.currentPage === 0) {
      blogpostsArea.innerHTML = "";
    }

    if (!posts.length && this.currentPage === 0) {
      blogpostsArea.innerHTML = "no posts found.";
      return;
    }

    const observerElem = this._shadowRoot.querySelector(
      ".blogposts-area-observer"
    );
    // remove the observer if it exits in below condition
    if (this.currentPage === 0 && this.totalPosts <= 6) {
      if (observerElem) {
        observerElem.remove();
      }
    }

    posts.forEach((post) => {
      blogpostsArea.innerHTML += domElements.createBlogpostCard({
        username: this.dataset.username,
        ...post,
      });
    });

    if (this.totalPosts > this.postsFetched.length) {
      if (!observerElem) {
        const newObserverElem = document.createElement("div");
        newObserverElem.classList.add("blogposts-area-observer");
        blogpostsWrapperElem.appendChild(newObserverElem);

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              this.currentPage += 1;
              newObserverElem.innerHTML = "fetching more posts...";
              this.fetchPosts(this._GET_USER_ARTICLES, {
                page: this.currentPage,
              });
            }
          },
          {
            threshold: 1,
          }
        );
        observer.observe(newObserverElem);
      }
    } else {
      observerElem.remove();
    }
  }

  render() {
    this.setWidth();
    this.fetchUser(this._GET_USER);
  }

  connectedCallback() {
    this.render();
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

  static get observedAttributes() {
    return ["data-width"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr == "data-width" && oldVal != newVal) {
      this[attr] = newVal;
    }
  }
}

customElements.define("hashnode-postcard", HashnodePostcard);
