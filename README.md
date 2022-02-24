# sveltekit-pluggable-static-adapter-sitemap-plugin
Plugin for creating sitemap.xml after Sveltekit build. To be used with [@ivorgri/sveltekit-pluggable-static-adapter](https://www.npmjs.com/package/@ivorgri/sveltekit-pluggable-static-adapter). You need to provide the base of your website, followed with the builder and pages attributes received from the callback hook. The sitemap will be added to the resulting build directory. 

```js
// svelte.config.js

// ...

import generateSitemap from '@ivorgri/sveltekit-pluggable-static-adapter-sitemap-plugin';

//...

export default {
	kit: {
		adapter: adapter({
            // ...
            afterPrerenderCallback: async (builder, pages, assets) => {
				await generateSitemap("your.site.domain.com",builder,pages)
			},
		})
	}
};
```
