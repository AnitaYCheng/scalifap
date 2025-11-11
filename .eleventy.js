const htmlmin = require('html-minifier');
// const Image = require("@11ty/eleventy-img");
const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const externalLinks = require('eleventy-plugin-external-links')
const pluginTOC = require('eleventy-plugin-toc')

const isDev = process.env.ELEVENTY_ENV === 'development';
const isProd = process.env.ELEVENTY_ENV === 'production'

// Comment out if images and CSS are the same
// const manifestPath = path.resolve(
//   __dirname,
//   'public',
//   'assets',
//   'manifest.json'
// );

// const manifest = isDev
//   ? {
//       'main.js': '/assets/main.js',
//       'main.css': '/assets/main.css',
//     }
//   : JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf8' }));


module.exports = function (eleventyConfig) {
  // eleventyConfig.addShortcode('image', imageShortcode);
  eleventyConfig.addPlugin(pluginTOC, {
      tags: ['h2, h3']
    });
  eleventyConfig.addPlugin(externalLinks, {
    // Plugin defaults:
    name: 'external-links',         // Plugin name
    regex: /^(([a-z]+:)|(\/\/))/i,  // Regex that test if href is external
    target: "_self",                // 'target' attribute for external links
    rel: "noopener noreferrer",     // 'rel' attribute for external links
    extensions: [".html"],          // Extensions to apply transform to
    includeDoctype: true,           // Default to include '<!DOCTYPE html>' at the beginning of the file
})

  let markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  };
  let markdownItAnchorOptions = {
    level: 2 // minimum level header -- anchors will only be applied to h2 level headers and below but not h1
  }
  eleventyConfig.setLibrary("md", markdownIt(markdownItOptions).use(markdownItAnchor, markdownItAnchorOptions));


// eleventyConfig.setDataDeepMerge(true);
// eleventyConfig.addPassthroughCopy({ './src/images': 'images' });
// eleventyConfig.addPassthroughCopy("./src/css");
// eleventyConfig.addWatchTarget("./src/css/");
// eleventyConfig.addPassthroughCopy("./src/js");
// eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

// Set up "courses" collection
eleventyConfig.addCollection("courses", function (collection) {
  return collection.getAll().filter(function (item) {
    return item.data.content_type == "courses";
  })
    .sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath);
    });
});

// eleventyConfig.addFilter('head', (array, n) => {
//   if (n < 0) {
//     return array.slice(n);
//   }
//     return array.slice(0, n);
// });


// eleventyConfig.addFilter('pageTags', (tags) => {
//   const generalTags = ['all', 'nav', 'post', 'posts'];
//     return tags
//       .toString()
//       .split(',')
//       .filter((tag) => {
//         return !generalTags.includes(tag);
//       });
// });

eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
  if ( outputPath && outputPath.endsWith(".html") && isProd) {
    return htmlmin.minify(content, {
      removeComments: true,
      collapseWhitespace: true,
      useShortDoctype: true,
    });
  }
    return content;
});

return {
  dir: {
    input: 'src',
    output: 'docs',
    includes: 'includes',
    data: 'data',
    layouts: 'layouts'
  },
  // passthroughFileCopy: false,
  templateFormats: ['html', 'njk', 'md'],
  htmlTemplateEngine: 'njk',
  markdownTemplateEngine: 'njk',
  };
};
