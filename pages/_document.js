import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="GPT-33 Rocks" key="title"/>
        <meta property="og:description" content="build with love" key="description"/>
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/1061319282690105517/1061331089110601908/LiveTheLifeTV_I__I_beautiful_humanoide_robot_photographer_theme_3291ac15-f4b2-479d-bb1f-45f4b5d3c118.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
