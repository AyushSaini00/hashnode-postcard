import { styles } from "./postcard.style.js";
import { createAuthorArea, createBlogpostCard, createTemplate } from "./domElements.js";
import getUserQuery from "./queries/getUser.js";
import fetcher from "./utils/fetcher.js";

const MAX_POSTS_COUNT_TO_FETCH_IN_ONE_GO = 20; // max count allowed by hashnode API

//extending to HTMLElements help to create custom html elements
export class HashnodePostcard extends HTMLElement {
  constructor() {
    super();

    //attaches shadow root to 'this' with mode open making it accessible to outside world
    this._shadowRoot = this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = createTemplate({
      styles: styles(this.dataset.theme),
    });

    //appends a clone of template to shadow DOM
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.currentPage = 1;
    this.fetchedPosts = [];

    this._GET_USER = getUserQuery({
      username: this.dataset.username,
    });
  }

  async fetchUser(query, variables = {}) {
    return fetcher({
      query,
      variables,
    })
      .then(({ data }) => {
        if (!data?.user) {
          this.renderUser({ user: null });
          return;
        }

        this.fetchedUser = data.user;
        const posts = data.user.posts.edges ?? [];

        this.fetchedPosts = [...this.fetchedPosts, ...posts];
        this.totalPostsCount = data.user.posts.totalDocuments;

        this.renderUser({ user: this.fetchedUser });
        this.renderPosts(posts);
        // this.fetchPosts(this._GET_USER_ARTICLES, { page: this.currentPage });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderUser(fetchedUser) {
    const loader = this._shadowRoot.querySelector(".loader");
    if (loader) loader.classList.add("hidden");

    const authorArea = this._shadowRoot.querySelector(".author-area");
    authorArea.innerHTML = createAuthorArea({
      dataAttributes: this.dataset,
      ...fetchedUser,
    });
  }

  renderPosts(posts) {
    const blogpostsWrapperElem = this._shadowRoot.querySelector(".blogposts-wrapper");
    const blogpostsArea = this._shadowRoot.querySelector(".blogposts-area");

    this.setHeight();

    if (this.currentPage === 1) {
      blogpostsArea.innerHTML = "";
    }

    if (!posts.length && this.currentPage === 1) {
      blogpostsArea.innerHTML = "no posts found.";
      return;
    }

    const observerElem = this._shadowRoot.querySelector(".blogposts-area-observer");
    // remove the observer if it exits in below condition
    if (
      this.currentPage === 1 &&
      this.totalPostsCount <= MAX_POSTS_COUNT_TO_FETCH_IN_ONE_GO
    ) {
      if (observerElem) {
        observerElem.remove();
      }
    }

    posts.forEach(({ node }) => {
      blogpostsArea.innerHTML += createBlogpostCard({
        dataAttributes: this.dataset,
        node,
      });
    });

    if (this.totalPostsCount > this.fetchedPosts.length) {
      if (!observerElem) {
        const newObserverElem = document.createElement("div");
        newObserverElem.classList.add("blogposts-area-observer");
        blogpostsWrapperElem.appendChild(newObserverElem);

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              this.currentPage += 1;
              newObserverElem.innerHTML = "fetching more posts...";
              this.fetchUser(this._GET_USER, {
                pageSize: MAX_POSTS_COUNT_TO_FETCH_IN_ONE_GO,
                page: this.currentPage,
              });
            }
          },
          {
            threshold: 1,
          },
        );
        observer.observe(newObserverElem);
      }
    } else {
      observerElem.remove();
    }
  }

  render() {
    this.setWidth();
    this.fetchUser(this._GET_USER, {
      pageSize: MAX_POSTS_COUNT_TO_FETCH_IN_ONE_GO,
      page: 1,
    });
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
      this._shadowRoot.querySelector(".blogposts-area").style.overflowY = "scroll";
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
