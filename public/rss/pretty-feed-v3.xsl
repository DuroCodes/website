<?xml version="1.0" encoding="utf-8"?>
<!--

# Pretty Feed

Styles an RSS/Atom feed for human viewers; includes a link to aboutfeeds.com.
See: https://interconnected.org/home/feed

## Usage

1. Host this file on your domain (required for XSL in browsers).
2. At the top of the feed:
   <?xml-stylesheet href="/rss/pretty-feed-v3.xsl" type="text/xsl"?>
3. Serve with Content-Type: application/xml; charset=utf-8

Credits: https://github.com/genmon/aboutfeeds — styled to match duro’s site.

-->
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> — Web Feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="color-scheme" content="dark"/>
        <style type="text/css"><![CDATA[
@font-face {
  font-family: "Satoshi-Variable";
  src: url("/fonts/Satoshi-Variable.woff2") format("woff2");
  font-weight: 300 900;
  font-display: swap;
  font-style: normal;
}
*, *::before, *::after { box-sizing: border-box; }
html { color-scheme: dark; }
body {
  margin: 0;
  padding: 2rem 1.25rem 3rem;
  max-width: 65ch;
  margin-left: auto;
  margin-right: auto;
  font-family: "Satoshi-Variable", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 1.0625rem;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: #d4d4d4;
  background: #171717;
}
a {
  color: #8666cc;
  text-decoration: underline;
  text-underline-offset: 2px;
}
a:hover { color: #a78bda; }
h1 {
  margin: 0 0 0.35em;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #f5f5f5;
  line-height: 1.2;
}
h2 {
  margin: 2rem 0 0.75rem;
  font-size: 1.35rem;
  font-weight: 800;
  color: #f5f5f5;
}
h2:first-of-type { margin-top: 0; }
h3 {
  margin: 0 0 0.35rem;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.35;
}
h3 a { color: #f5f5f5; text-decoration: none; }
h3 a:hover { color: #8666cc; }
p { margin: 0 0 1rem; overflow-wrap: break-word; text-wrap: pretty; }
small {
  display: block;
  font-size: 0.8125rem;
  color: #a3a3a3;
  margin-bottom: 0.5rem;
}
.feed-nav {
  background: #121212;
  border: 1px solid #404040;
  border-radius: 0.75rem;
  padding: 1rem 1.15rem;
  margin-bottom: 2rem;
}
.feed-nav p { margin-bottom: 0.65rem; }
.feed-nav p:last-child { margin-bottom: 0; }
.feed-nav strong { color: #f5f5f5; font-weight: 600; }
.feed-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #404040;
}
.feed-header .lede { color: #d4d4d4; font-size: 1.05rem; }
.site-link {
  display: inline-block;
  margin-top: 0.5rem;
  font-weight: 600;
  color: #8666cc;
}
.site-link:hover { color: #a78bda; }
.rss-icon {
  vertical-align: -0.15em;
  width: 1.15em;
  height: 1.15em;
  margin-right: 0.35rem;
}
.item {
  padding: 1.15rem 0;
  border-bottom: 1px solid #262626;
}
.item:last-child { border-bottom: none; padding-bottom: 0; }
.item-desc {
  margin: 0.6rem 0 0;
  font-size: 0.95rem;
  color: #a3a3a3;
  line-height: 1.55;
}
.item-desc:empty { display: none; }
]]></style>
      </head>
      <body>
        <nav class="feed-nav">
          <p>
            <strong>This is a web feed</strong> (RSS). <strong>Subscribe</strong> by copying this page’s URL into your newsreader.
          </p>
          <p>
            New to feeds? See <a href="https://aboutfeeds.com">About Feeds</a> — it’s free.
          </p>
        </nav>

        <header class="feed-header">
          <h1>
            <svg xmlns="http://www.w3.org/2000/svg" class="rss-icon" viewBox="0 0 256 256" aria-hidden="true">
              <defs>
                <linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
                  <stop offset="0" stop-color="#E3702D"/><stop offset="0.1071" stop-color="#EA7D31"/>
                  <stop offset="0.3503" stop-color="#F69537"/><stop offset="0.5" stop-color="#FB9E3A"/>
                  <stop offset="0.7016" stop-color="#EA7C31"/><stop offset="0.8866" stop-color="#DE642B"/>
                  <stop offset="1" stop-color="#D95B29"/>
                </linearGradient>
              </defs>
              <rect width="256" height="256" rx="55" ry="55" fill="#CC5D15"/>
              <rect width="246" height="246" rx="50" ry="50" x="5" y="5" fill="#F49C52"/>
              <rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)"/>
              <circle cx="68" cy="189" r="24" fill="#FFF"/>
              <path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF"/>
              <path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF"/>
            </svg>
            <xsl:value-of select="/rss/channel/title"/>
          </h1>
          <p class="lede"><xsl:value-of select="/rss/channel/description"/></p>
          <a class="site-link" target="_blank" rel="noopener noreferrer">
            <xsl:attribute name="href">
              <xsl:value-of select="/rss/channel/link"/>
            </xsl:attribute>
            Visit site →
          </a>
        </header>

        <h2>Recent posts</h2>
        <xsl:for-each select="/rss/channel/item">
          <article class="item">
            <h3>
              <a target="_blank" rel="noopener noreferrer">
                <xsl:attribute name="href">
                  <xsl:value-of select="link"/>
                </xsl:attribute>
                <xsl:value-of select="title"/>
              </a>
            </h3>
            <small>Published <xsl:value-of select="pubDate"/></small>
            <p class="item-desc"><xsl:value-of select="description"/></p>
          </article>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
