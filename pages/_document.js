import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' />

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
          <link href="/css/bootstrap.css" rel="stylesheet" type="text/css"/>
          <link href="/css/ion.rangeSlider.min.css" rel="stylesheet" type="text/css" />
          <link href="/css/owl.carousel.min.css" rel="stylesheet" type="text/css" />
          <link href="/css/owl.theme.default.min.css" rel="stylesheet" type="text/css" />
          <link href="/css/aos.css" rel="stylesheet" type="text/css" />
          <link href="/css/style.css" rel="stylesheet" type="text/css" />
          <link href="/css/responsive.css" rel="stylesheet" type="text/css" />

        </Head>

        <body>
          <Main />
          <NextScript />
            <script type="text/javascript" src="/js/jquery-3.6.0.min.js"></script>
            <script type="text/javascript" src="/js/popper.min.js"></script>
            <script type="text/javascript" src="/js/bootstrap.min.js"></script>
            <script type="text/javascript" src="/js/ion.rangeSlider.min.js"></script>
            <script type="text/javascript" src="/js/owl.carousel.min.js"></script>
            <script type="text/javascript" src="/js/tooltipster.js"></script>
            <script type="text/javascript" src="/js/jquery.validate.min.js"></script>
            <script type="text/javascript" src="/js/custom.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument