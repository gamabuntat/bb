import Head from 'next/head';

import Header from 'src/components/Header/Header';

const Layout = ({
    children,
    title = 'breaking bad',
}: React.PropsWithChildren<{ title?: string }>): JSX.Element => (
    <>
        <Head>
            <title>{title}</title>
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/favicons/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicons/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicons/favicon-16x16.png"
            />
            <link rel="manifest" href="/favicons/site.webmanifest" />
            <link
                rel="mask-icon"
                href="/favicons/safari-pinned-tab.svg"
                color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#110e0d" />
            <meta name="theme-color" content="#030202" />
            <meta name="description" content="breaking bad episode info" />
            <meta name="keywords" content="breaking bad" />
        </Head>
        <Header />
        {children}
    </>
);

export default Layout;
