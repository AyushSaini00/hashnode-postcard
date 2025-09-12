(function(l,c){typeof exports=="object"&&typeof module<"u"?c(exports):typeof define=="function"&&define.amd?define(["exports"],c):(l=typeof globalThis<"u"?globalThis:l||self,c(l["hashnode-postcard"]={}))})(this,(function(l){"use strict";const c={default:{background:{primary:"#18191A",secondary:"#303031"},foreground:{primary:"#FFFFFF",secondary:"#BDBDBD"}},devto:{background:{primary:"#F5F5F5",secondary:"#FFFFFF"},foreground:{primary:"#090909",secondary:"#171717"}},"hashnode-light":{background:{primary:"#FFFFFF",secondary:"#F8FAFC"},foreground:{primary:"#334155",secondary:"#64748B"}},dracula:{background:{primary:"#282A36",secondary:"#383A59"},foreground:{primary:"#BD93F9",secondary:"#F8F8F2"}},"nord-light":{background:{primary:"#FFFFFF",secondary:"#F2F4F8"},foreground:{primary:"#5E81AC",secondary:"#4C566A"}},"nord-dark":{background:{primary:"#434C5E",secondary:"#2E3440"},foreground:{primary:"#ECEFF4",secondary:"#D8DEE9"}},"gruvbox-light":{background:{primary:"#FBF1C7",secondary:"#EBDBB2"},foreground:{primary:"#B57614",secondary:"#3C3836"}},"gruvbox-dark":{background:{primary:"#282828",secondary:"#3C3836"},foreground:{primary:"#FABD2F",secondary:"#EBDBB2"}},synthwave:{background:{primary:"#000000",secondary:"#2B2B2B"},foreground:{primary:"#FF6B00",secondary:"#00E7FF"}}},b=Object.keys(c)||[],w=t=>(t?b.includes(t)||(console.warn(`selectedTheme's value of "${t}" doesn't match to any of the existing themes, using default theme for now`),t="default"):(console.warn("selectedTheme is undefined, using default theme for now"),t="default"),`
    :host {
        --primary-bg: ${c[t].background.primary};
        --secondary-bg: ${c[t].background.secondary};
        --primary-fg: ${c[t].foreground.primary};
        --secondary-fg: ${c[t].foreground.secondary};
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
`);function F({username:t}){return`
      query GetUser($pageSize: Int!, $page: Int!) {
        user(username: "${t}") {
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
    `}async function x(t){return fetch("https://gql.hashnode.com/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(r=>r.json())}function k(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var p={exports:{}},u;function $(){if(u)return p.exports;u=1;function t(e,o,s){const n=s||".";let a;{let i;switch(typeof e){case"string":if(e.length<(e[0]==="-"?5:4))return e;a=e,i=Number(n!=="."?a.replace(n,"."):a);break;case"number":a=String(e),i=e,n!=="."&&!Number.isInteger(e)&&(a=a.replace(".",n));break;default:return e}if(-1e3<i&&i<1e3||isNaN(i)||!isFinite(i))return a}{const i=a.lastIndexOf(n);let h;i>-1&&(h=a.slice(i),a=a.slice(0,i));const g=r(a,o||",");return h&&g.push(h),g.join("")}}function r(e,o){let s=(e.length-1)%3+1;s===1&&e[0]==="-"&&(s=4);const n=[e.slice(0,s)];for(;s<e.length;s+=3)n.push(o,e.substr(s,3));return n}function d(e,o){return function(s){return t(s,e,o)}}return p.exports=t,p.exports.bindWith=d,p.exports}var _=$();const f=k(_),y=`
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
`,S=(t="fetching more posts...")=>`
<div class="flex justify-center items-center w-100 mt-4">
  ${y}
  <span class="ml-2">${t}</span>
</div>`,C=(t="Something went wrong!")=>`
<div class="error-state">
  <div>${t}</div>
</div>
`,E=t=>{const{styles:r}=t;return`
        <style>
            ${r}
        </style>
        <div class="loader">${y}</div>
        <div class="card">
            <div class="author-area"></div>
            <div class="blogposts-wrapper">
                <div class="blogposts-area"></div>
            </div>
        </div>
        `},B=t=>{const{dataAttributes:r,user:d}=t;if(!d)return`${o} doesn't exist`;const{showFollowers:e,username:o}=r,{name:s,tagline:n,followersCount:a,profilePicture:i}=d;return`
        <div class="author-profile-and-text">
          ${i?`<a class="flex" href="https://hashnode.com/@${o}">
                    <img class="author-profile-photo" src="${i}" alt="${s}"/>
                  </a>`:""}
          <div class="author-details">
              <a href="https://hashnode.com/@${o}">
                <div class="author-name">
                    ${s}
                </div>
              </a>
              ${n?`<p class="author-tagline">${n}</p>`:""}
              ${e==="false"?"":a?`<p class="author-followers">${f(a)} followers</p>`:""}
          </div>
        </div>
    `},P=t=>{const{node:r,dataAttributes:d}=t,{showCoverImage:e,showBrief:o}=d,{url:s,title:n,publishedAt:a,reactionCount:i,brief:h,coverImage:g}=r,A=new Date(a),T=g.url;return`
            <a class="post-link" 
               href="${s}" 
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
                          ${A.toDateString()}
                      </div>
                      <div class="post-reactions">
                          <svg class="post-svg" viewBox="0 0 512 512">
                              <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                          </svg>
                          ${f(i)}
                      </div>
                    </div>
                    ${o==="false"?"":`<p class="post-brief">${h}</p>`}
                  </div>
                    ${e==="false"?"":`<img 
                            class="post-cover-image" 
                            src="${T}" 
                            alt="${n} cover" 
                           />`}
                </div>
            </a>
        `},m=20;class v extends HTMLElement{constructor(){super(),this._shadowRoot=this.attachShadow({mode:"open"});const r=document.createElement("template");r.innerHTML=E({styles:w(this.dataset.theme)}),this._shadowRoot.appendChild(r.content.cloneNode(!0)),this.currentPage=1,this.fetchedPosts=[],this._GET_USER=F({username:this.dataset.username})}async fetchUser(r,d={}){return x({query:r,variables:d}).then(({data:e})=>{if(!e?.user){this.renderUser({user:null});return}this.fetchedUser=e.user;const o=e.user.posts.edges??[];this.fetchedPosts=[...this.fetchedPosts,...o],this.totalPostsCount=e.user.posts.totalDocuments,this.renderUser({user:this.fetchedUser}),this.renderPosts(o)}).catch(e=>{console.error(e),this.hideLoader();const o=this._shadowRoot.querySelector(".card"),s=this._shadowRoot.querySelector(".author-area"),n=this._shadowRoot.querySelector(".blogposts-wrapper");s.remove(),n.remove(),o.innerHTML=C()})}hideLoader(){const r=this._shadowRoot.querySelector(".loader");r&&r.classList.add("hidden")}renderUser(r){this.hideLoader();const d=this._shadowRoot.querySelector(".author-area");d.innerHTML=B({dataAttributes:this.dataset,...r})}renderPosts(r){const d=this._shadowRoot.querySelector(".blogposts-wrapper"),e=this._shadowRoot.querySelector(".blogposts-area");if(this.setHeight(),this.currentPage===1&&(e.innerHTML=""),!r.length&&this.currentPage===1){e.innerHTML="no posts found.";return}const o=this._shadowRoot.querySelector(".blogposts-area-observer");if(this.currentPage===1&&this.totalPostsCount<=m&&o&&o.remove(),r.forEach(({node:s})=>{e.innerHTML+=P({dataAttributes:this.dataset,node:s})}),this.totalPostsCount>this.fetchedPosts.length){if(!o){const s=document.createElement("div");s.classList.add("blogposts-area-observer"),d.appendChild(s),new IntersectionObserver(a=>{a[0].isIntersecting&&(this.currentPage+=1,s.innerHTML=S(),this.fetchUser(this._GET_USER,{pageSize:m,page:this.currentPage}))},{threshold:1}).observe(s)}}else o&&o.remove()}render(){this.setWidth(),this.fetchUser(this._GET_USER,{pageSize:m,page:1})}connectedCallback(){this.render()}setWidth(){this.dataset.width&&(this.style.display="inline-block",this.style.width=this.dataset.width)}setHeight(){this.dataset.height&&(this._shadowRoot.querySelector(".blogposts-area").style.overflowY="scroll",this._shadowRoot.querySelector(".blogposts-area").style.maxHeight=this.dataset.height)}static get observedAttributes(){return["data-width"]}attributeChangedCallback(r,d,e){r=="data-width"&&d!=e&&(this[r]=e)}}customElements.define("hashnode-postcard",v),l.HashnodePostcard=v,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})}));
