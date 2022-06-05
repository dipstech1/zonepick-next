import Document, {Html, Head, Main, NextScript} from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link href='https://fonts.googleapis.com/css?family=Raleway&display=optional' rel='stylesheet'/>
                    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css"/>                    
                </Head>
                <body>
                <Main/>
                <NextScript/>
                

                </body>
            </Html>
        )
    }
}

export default MyDocument