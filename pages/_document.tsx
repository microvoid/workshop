import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

export default function _Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

_Document.getInitialProps = async function getInitialProps(ctx: DocumentContext) {
  const initialProps = await Document.getInitialProps(ctx)
  return {
    ...initialProps,
    styles: React.Children.toArray([initialProps.styles]),
  }
}
