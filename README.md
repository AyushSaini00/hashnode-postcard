# Hashnode Postcard

[Hashnode](https://hashnode.com/) blogpost cards for your website using a single HTML element.

## Usage

```html
<hashnode-postcard data-username="ayushcodes"></hashnode-postcard>

<script
  src="https://unpkg.com/hashnode-postcard@0.1.0/src/postcard.mjs"
  type="module"
></script>
```

Currently for some reason the `npm i hashnode-postcard` isn't working.

## Customize

Following data attributes are available to customize the postcard.

- `data-username` - your hashnode username (REQUIRED)
- `data-width` - width of the postcard (Optional)
- `data-height` - height of the blogposts wrapper (Optional)
- `data-cover-image` - true will show the post cover images (Optional)
- `data-followers` - true will show the number of followers (Optional)
- `data-brief` - true will show the brief description of blogposts (Optional)
