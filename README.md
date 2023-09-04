# Hashnode Postcard

[Hashnode](https://hashnode.com/) blogpost cards for your website using a single HTML element.

![hashnode-postcard demo](https://ik.imagekit.io/ayu/hashnode-postcard-demo_wRLT1g_-o.png?updatedAt=1626945637219)

## install

```bash
npm i hashnode-postcard
```
or

```bash
yarn add hashnode-postcard
```

## usage

- using import statement:
```html
<hashnode-postcard data-username="ayushcodes"></hashnode-postcard>

<script type="module">
  import "hashnode-postcard";
</script>
```

- using script tag:
```html
<hashnode-postcard data-username="ayushcodes"></hashnode-postcard>

<script
  src="https://unpkg.com/hashnode-postcard@0.1.0/src/postcard.mjs"
  type="module"
></script>
```

## demo
- [import demo]()
- [unpkg demo]()

## api
- `<hashnode-postcard data-username="YOUR_HASHNODE_USERNAME"></hashnode-postcard>`

### customize

Following data attributes are available to customize the postcard.

| data attribute   	| description                                	| examples   	| type     	|
|------------------	|--------------------------------------------	|------------	|----------	|
| data-username    	| your hashnode username                     	| ayushcodes 	| required 	|
| data-width       	| width of the postcard                      	| 600px      	| optional 	|
| data-height      	| height of the blogposts wrapper            	| 500px      	| optional 	|
| data-cover-image 	| to show the post cover images              	| true       	| optional 	|
| data-followers   	| to show the number of followers            	| false      	| optional 	|
| data-brief       	| to show the brief description of blogposts 	| true       	| optional 	|
