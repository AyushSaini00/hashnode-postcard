export const styles = `
    .card * {
        margin: 0;
        padding: 0;
    }
    .card {
        line-height: 1.5;
        font-family: Arial;
    }
    .card a {
        text-decoration: none;
    }
    .author-area {
        background: #303031;
        padding: 1rem;
    }
    .author-profile-and-text{
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        max-width: 48rem;
        margin: 0 auto;
    }
    .author-profile-photo{
        width: 92px;
        height: 92px;
        border-radius: 50%;
    }
    .author-details{
        padding-right: 1rem;
    }
    .author-name {
        font-weight: bold;
        font-size: 1.5rem;
        color: #fff;
        margin-bottom: .5rem;
    }
    .author-tagline,
    .author-followers {
        color: rgb(189, 189, 189);
    }
    .author-followers {
        margin-top: .5rem;
    }
    .blogposts-area {
        background: #18191a;
        color: #fff;
        padding: .5rem;
    }
    .blogposts-area > a {
        color: #fff;
    }
    .blogposts-area > a:hover .post-card {
        background: #303031;
        border-radius: 5px;
    }
    .post-card {
        padding: .5rem;
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
        color: rgb(189, 189, 189);
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
        color: rgb(189, 189, 189);
    }
    .post-cover-image{
        width: 100%;
        border-radius: 5px;
    }
    @media screen and (min-width: 768px){
        .post-card {
            display: flex;
            align-items: center;
            max-width: 48rem;
            margin: 0 auto;
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
`;
