(function(c,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(c=typeof globalThis<"u"?globalThis:c||self,i(c["hashnode-postcard"]={}))})(this,function(c){"use strict";const i={default:{background:{primary:"#18191A",secondary:"#303031"},foreground:{primary:"#FFFFFF",secondary:"#BDBDBD"}},devto:{background:{primary:"#F5F5F5",secondary:"#FFFFFF"},foreground:{primary:"#090909",secondary:"#171717"}},"hashnode-light":{background:{primary:"#FFFFFF",secondary:"#F8FAFC"},foreground:{primary:"#334155",secondary:"#64748B"}},dracula:{background:{primary:"#282A36",secondary:"#383A59"},foreground:{primary:"#BD93F9",secondary:"#F8F8F2"}},"nord-light":{background:{primary:"#FFFFFF",secondary:"#F2F4F8"},foreground:{primary:"#5E81AC",secondary:"#4C566A"}},"nord-dark":{background:{primary:"#434C5E",secondary:"#2E3440"},foreground:{primary:"#ECEFF4",secondary:"#D8DEE9"}},"gruvbox-light":{background:{primary:"#FBF1C7",secondary:"#EBDBB2"},foreground:{primary:"#B57614",secondary:"#3C3836"}},"gruvbox-dark":{background:{primary:"#282828",secondary:"#3C3836"},foreground:{primary:"#FABD2F",secondary:"#EBDBB2"}},synthwave:{background:{primary:"#000000",secondary:"#2B2B2B"},foreground:{primary:"#FF6B00",secondary:"#00E7FF"}}},y=Object.keys(i)||[],v=e=>(e?y.includes(e)||(console.warn(`selectedTheme's value of "${e}" doesn't match to any of the existing themes, using default theme for now`),e="default"):(console.warn("selectedTheme is undefined, using default theme for now"),e="default"),`
    :host {
        --primary-bg: ${i[e].background.primary};
        --secondary-bg: ${i[e].background.secondary};
        --primary-fg: ${i[e].foreground.primary};
        --secondary-fg: ${i[e].foreground.secondary};
    }
    .flex {
        display: flex;
    }
    .justify-center {
        justify-content: center;
    }
    .items-center {
        align-items: center;
    }
    .w-100 {
        width: 100%;
    }
    .mt-4 {
        margin-top: 1rem !important;
    }
    .mb-4 {
        margin-bottom: 1rem !important;
    }
    .ml-2 {
        margin-left: 0.5rem !important;
    }
    .hidden {
        display: none !important;
    }
    .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--primary-bg);
    }
    .loader > svg {
        stroke: var(--secondary-fg);
    }
    .error-state {
        background: var(--primary-bg);
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
`);function b({username:e}){return`
      query GetUser($pageSize: Int!, $page: Int!) {
        user(username: "${e}") {
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
    `}async function w(e){return fetch("https://gql.hashnode.com/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(t=>t.json())}function F(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var h={exports:{}};function g(e,t,a){const s=a||".";let r;{let o;switch(typeof e){case"string":if(e.length<(e[0]==="-"?5:4))return e;r=e,o=Number(s!=="."?r.replace(s,"."):r);break;case"number":r=String(e),o=e,s!=="."&&!Number.isInteger(e)&&(r=r.replace(".",s));break;default:return e}if(-1e3<o&&o<1e3||isNaN(o)||!isFinite(o))return r}{const o=r.lastIndexOf(s);let n;o>-1&&(n=r.slice(o),r=r.slice(0,o));const d=x(r,t||",");return n&&d.push(n),d.join("")}}function x(e,t){let a=(e.length-1)%3+1;a===1&&e[0]==="-"&&(a=4);const s=[e.slice(0,a)];for(;a<e.length;a+=3)s.push(t,e.substr(a,3));return s}function k(e,t){return function(a){return g(a,e,t)}}h.exports=g,h.exports.bindWith=k;var $=h.exports;const m=F($),u=`
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
`,_=(e="fetching more posts...")=>`
<div class="flex justify-center items-center w-100 mt-4">
  ${u}
  <span class="ml-2">${e}</span>
</div>`,S=(e="Something went wrong!")=>`
<div class="error-state">
  <div>${e}</div>
</div>
`,E=e=>{const{styles:t}=e;return`
        <style>
            ${t}
        </style>
        <div class="loader">${u}</div>
        <div class="card">
            <div class="author-area"></div>
            <div class="blogposts-wrapper">
                <div class="blogposts-area"></div>
            </div>
        </div>
        `},C=e=>{const{dataAttributes:t,user:a}=e;if(!a)return`${r} doesn't exist`;const{showFollowers:s,username:r}=t,{name:o,tagline:n,followersCount:d,profilePicture:l}=a;return`
        <div class="author-profile-and-text">
          ${l?`<a class="flex" href="https://hashnode.com/@${r}">
                    <img class="author-profile-photo" src="${l}" alt="${o}"/>
                  </a>`:""}
          <div class="author-details">
              <a href="https://hashnode.com/@${r}">
                <div class="author-name">
                    ${o}
                </div>
              </a>
              ${n?`<p class="author-tagline">${n}</p>`:""}
              ${s==="false"?"":d?`<p class="author-followers">${m(d)} followers</p>`:""}
          </div>
        </div>
    `},B=e=>{const{node:t,dataAttributes:a}=e,{showCoverImage:s,showBrief:r}=a,{url:o,title:n,publishedAt:d,reactionCount:l,brief:P,coverImage:A}=t,T=new Date(d),L=A.url;return`
            <a class="post-link" 
               href="${o}" 
               target="_blank"
               rel="noopener noreferrer"
            >
                <div class="post-card">
                  <div class="post-card-text">
                    <div class="post-title">${n}</div>
                    <div class="post-date-and-reactions">
                      <div class="post-date">
                          <svg class="post-svg" viewBox="0 0 512 512">
                              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
                          </svg>
                          ${T.toDateString()}
                      </div>
                      <div class="post-reactions">
                          <svg class="post-svg" viewBox="0 0 512 512">
                              <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                          </svg>
                          ${m(l)}
                      </div>
                    </div>
                    ${r==="false"?"":`<p class="post-brief">${P}</p>`}
                  </div>
                    ${s==="false"?"":`<img 
                            class="post-cover-image" 
                            src="${L}" 
                            alt="${n} cover" 
                           />`}
                </div>
            </a>
        `},p=20;class f extends HTMLElement{constructor(){super(),this._shadowRoot=this.attachShadow({mode:"open"});const t=document.createElement("template");t.innerHTML=E({styles:v(this.dataset.theme)}),this._shadowRoot.appendChild(t.content.cloneNode(!0)),this.currentPage=1,this.fetchedPosts=[],this._GET_USER=b({username:this.dataset.username})}async fetchUser(t,a={}){return w({query:t,variables:a}).then(({data:s})=>{if(!(s!=null&&s.user)){this.renderUser({user:null});return}this.fetchedUser=s.user;const r=s.user.posts.edges??[];this.fetchedPosts=[...this.fetchedPosts,...r],this.totalPostsCount=s.user.posts.totalDocuments,this.renderUser({user:this.fetchedUser}),this.renderPosts(r)}).catch(s=>{console.error(s),this.hideLoader();const r=this._shadowRoot.querySelector(".card"),o=this._shadowRoot.querySelector(".author-area"),n=this._shadowRoot.querySelector(".blogposts-wrapper");o.remove(),n.remove(),r.innerHTML=S()})}hideLoader(){const t=this._shadowRoot.querySelector(".loader");t&&t.classList.add("hidden")}renderUser(t){this.hideLoader();const a=this._shadowRoot.querySelector(".author-area");a.innerHTML=C({dataAttributes:this.dataset,...t})}renderPosts(t){const a=this._shadowRoot.querySelector(".blogposts-wrapper"),s=this._shadowRoot.querySelector(".blogposts-area");if(this.setHeight(),this.currentPage===1&&(s.innerHTML=""),!t.length&&this.currentPage===1){s.innerHTML="no posts found.";return}const r=this._shadowRoot.querySelector(".blogposts-area-observer");if(this.currentPage===1&&this.totalPostsCount<=p&&r&&r.remove(),t.forEach(({node:o})=>{s.innerHTML+=B({dataAttributes:this.dataset,node:o})}),this.totalPostsCount>this.fetchedPosts.length){if(!r){const o=document.createElement("div");o.classList.add("blogposts-area-observer"),a.appendChild(o),new IntersectionObserver(d=>{d[0].isIntersecting&&(this.currentPage+=1,o.innerHTML=_(),this.fetchUser(this._GET_USER,{pageSize:p,page:this.currentPage}))},{threshold:1}).observe(o)}}else r&&r.remove()}render(){this.setWidth(),this.fetchUser(this._GET_USER,{pageSize:p,page:1})}connectedCallback(){this.render()}setWidth(){this.dataset.width&&(this.style.display="inline-block",this.style.width=this.dataset.width)}setHeight(){this.dataset.height&&(this._shadowRoot.querySelector(".blogposts-area").style.overflowY="scroll",this._shadowRoot.querySelector(".blogposts-area").style.maxHeight=this.dataset.height)}static get observedAttributes(){return["data-width"]}attributeChangedCallback(t,a,s){t=="data-width"&&a!=s&&(this[t]=s)}}customElements.define("hashnode-postcard",f),c.HashnodePostcard=f,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})});
