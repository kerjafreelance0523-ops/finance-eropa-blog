import rss from './rss.mjs'
import generateSitemap from './generate-sitemap.mjs'

async function postbuild() {
  await rss()
  await generateSitemap()
}

postbuild()
