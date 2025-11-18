## How to run this site in Eleventy
To serve pages in Eleventy in the Terminal and populate the pages in the /docs folder: `npm start`

When getting a "ReadableStream is not defined" error when trying to serve pages, upgrade node with `nvm install node`

Note: Passthrough-related code is commented out in `.eleventy.js` since all the images, CSS, and JS will be the same for the foreseeable future. I might as well just make the changes in the `/docs` folder itself...

## Why Eleventy
My personal site is already in Eleventy so I figured why not! I am also using a ton of variables in `site.json`, for my own convenience in updating info across a bunch of pages at once.
