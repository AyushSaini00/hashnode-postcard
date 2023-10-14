(function(d,c){typeof exports=="object"&&typeof module<"u"?c(exports):typeof define=="function"&&define.amd?define(["exports"],c):(d=typeof globalThis<"u"?globalThis:d||self,c(d["hashnode-postcard"]={}))})(this,function(d){"use strict";function c(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var h={exports:{}};function u(e,r,o){const t=o||".";let s;{let a;switch(typeof e){case"string":if(e.length<(e[0]==="-"?5:4))return e;s=e,a=Number(t!=="."?s.replace(t,"."):s);break;case"number":s=String(e),a=e,t!=="."&&!Number.isInteger(e)&&(s=s.replace(".",t));break;default:return e}if(-1e3<a&&a<1e3||isNaN(a)||!isFinite(a))return s}{const a=s.lastIndexOf(t);let i;a>-1&&(i=s.slice(a),s=s.slice(0,a));const n=b(s,r||",");return i&&n.push(i),n.join("")}}function b(e,r){let o=(e.length-1)%3+1;o===1&&e[0]==="-"&&(o=4);const t=[e.slice(0,o)];for(;o<e.length;o+=3)t.push(r,e.substr(o,3));return t}function v(e,r){return function(o){return u(o,e,r)}}h.exports=u,h.exports.bindWith=v;var w=h.exports;const g=c(w),p={createTemplate(e){const{styles:r}=e;return`
        <style>
            ${r}
        </style>
        <div class="card">
            <div class="author-area"></div>
            <div class="blogposts-wrapper">
                <div class="blogposts-area">fetching blog posts...</div>
            </div>
        </div>
        `},createAuthorArea(e){const{username:r,photo:o,name:t,tagline:s,followers:a,numFollowers:i}=e;return`
        <div class="author-profile-and-text">
          ${o?`<a class="flex" href="https://hashnode.com/@${r}">
                    <img class="author-profile-photo" src="${o}" alt="${t}"/>
                  </a>`:""}
          <div class="author-details">
              <a href="https://hashnode.com/@${r}">
                <div class="author-name">
                    ${t}
                </div>
              </a>
              ${s?`<p class="author-tagline">${s}</p>`:""}
              ${i?a==="false"?"":`<p class="author-followers">${g(i)} followers</p>`:""}
          </div>
        </div>
    `},createBlogpostCard(e){const{username:r,slug:o,title:t,dateAdded:s,totalReactions:a,brief:i,coverImage:n}=e,E=new Date(s);return`
            <a class="post-link" 
               href="https://${r}.hashnode.dev/${o}" 
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
                          ${E.toDateString()}
                      </div>
                      <div class="post-reactions">
                          <svg class="post-svg" viewBox="0 0 512 512">
                              <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                          </svg>
                          ${g(a)}
                      </div>
                    </div>
                    ${i==="false"?"":`<p class="post-brief">${i}</p>`}
                  </div>
                    ${n==="false"?"":`<img 
                            class="post-cover-image" 
                            src="${n}" 
                            alt="${t} cover" 
                           />`}
                </div>
            </a>
        `}},l={default:{background:{primary:"#18191a",secondary:"#303031"},foreground:{primary:"#ffffff",secondary:"#bdbdbd"}},devto:{background:{primary:"#F5F5F5",secondary:"#FFFFFF"},foreground:{primary:"#090909",secondary:"#171717"}},"hashnode-light-mode":{background:{primary:"#FFFFFF",secondary:"#F8FAFC"},foreground:{primary:"#334155",secondary:"#64748B"}},dracula:{background:{primary:"#282A36",secondary:"#383A59"},foreground:{primary:"#BD93F9",secondary:"#F8F8F2"}},"nord-light":{background:{primary:"#FFFFFF",secondary:"#F2F4F8"},foreground:{primary:"#5E81AC",secondary:"#4C566A"}},"nord-dark":{background:{primary:"#434C5E",secondary:"#2E3440"},foreground:{primary:"#ECEFF4",secondary:"#D8DEE9"}}},x=Object.keys(l)||[],F=e=>(e?x.includes(e)||(console.warn(`selectedTheme's value of "${e}" doesn't match to any of the existing themes, using default theme for now`),e="default"):(console.warn("selectedTheme is undefined, using default theme for now"),e="default"),`
    :host {
        --primary-bg: ${l[e].background.primary};
        --secondary-bg: ${l[e].background.secondary};
        --primary-fg: ${l[e].foreground.primary};
        --secondary-fg: ${l[e].foreground.secondary};
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
`),m={getUser({username:e}){return`
      query GetUser {
        user(username: "${e}") {
          name
          tagline
          numFollowers
          photo
          numPosts
        }
      }
    `},getUserArticles({username:e}){return`
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
    `}},f={async fetcher(e){return fetch("https://api.hashnode.com/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(r=>r.json())}};class y extends HTMLElement{constructor(){super(),this._shadowRoot=this.attachShadow({mode:"open"});const r=document.createElement("template");r.innerHTML=p.createTemplate({styles:F(this.dataset.theme)}),this._shadowRoot.appendChild(r.content.cloneNode(!0)),this.currentPage=0,this.postsFetched=[],this._GET_USER=m.getUser({username:this.dataset.username.toLowerCase()}),this._GET_USER_ARTICLES=m.getUserArticles({username:this.dataset.username.toLowerCase()})}async fetchUser(r,o={}){return f.fetcher({query:r,variables:o}).then(({data:t})=>{var s;if(((s=t==null?void 0:t.user)==null?void 0:s.name)===null){this.renderUser(this.dataset.username+" doesn't exist");return}this.fetchedUser=t.user,this.totalPosts=t.user.numPosts,this.renderUser(this.fetchedUser),this.fetchPosts(this._GET_USER_ARTICLES,{page:this.currentPage})}).catch(t=>{console.log(t)})}renderUser(r){const o=this._shadowRoot.querySelector(".author-area");o.innerHTML=p.createAuthorArea({username:this.dataset.username,...r})}async fetchPosts(r,o={}){return f.fetcher({query:r,variables:o}).then(({data:t})=>{var a,i;const s=((i=(a=t==null?void 0:t.user)==null?void 0:a.publication)==null?void 0:i.posts)||[];this.posts=s,this.postsFetched=[...this.postsFetched,...s],this.renderPosts(this.posts)})}renderPosts(r){const o=this._shadowRoot.querySelector(".blogposts-wrapper"),t=this._shadowRoot.querySelector(".blogposts-area");if(this.setHeight(),this.currentPage===0&&(t.innerHTML=""),!r.length&&this.currentPage===0){t.innerHTML="no posts found.";return}const s=this._shadowRoot.querySelector(".blogposts-area-observer");if(this.currentPage===0&&this.totalPosts<=6&&s&&s.remove(),r.forEach(a=>{t.innerHTML+=p.createBlogpostCard({username:this.dataset.username,...a})}),this.totalPosts>this.postsFetched.length){if(!s){const a=document.createElement("div");a.classList.add("blogposts-area-observer"),o.appendChild(a),new IntersectionObserver(n=>{n[0].isIntersecting&&(this.currentPage+=1,a.innerHTML="fetching more posts...",this.fetchPosts(this._GET_USER_ARTICLES,{page:this.currentPage}))},{threshold:1}).observe(a)}}else s.remove()}render(){this.setWidth(),this.fetchUser(this._GET_USER)}connectedCallback(){this.render()}setWidth(){this.dataset.width&&(this.style.display="inline-block",this.style.width=this.dataset.width)}setHeight(){this.dataset.height&&(this._shadowRoot.querySelector(".blogposts-area").style.overflowY="scroll",this._shadowRoot.querySelector(".blogposts-area").style.maxHeight=this.dataset.height)}static get observedAttributes(){return["data-width"]}attributeChangedCallback(r,o,t){r=="data-width"&&o!=t&&(this[r]=t)}}customElements.define("hashnode-postcard",y),d.HashnodePostcard=y,Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});
