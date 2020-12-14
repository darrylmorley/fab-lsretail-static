import Layout from '../../components/Layout'
import Head from 'next/head'

const Blog = () => {
  return (
    <Layout>
      <Head>
        <title>Blog - FAB Defense (UK)</title>
        <meta name="description" content="Welcome to the FAB Defense (UK) blog. Check back for the latest news and updates for FAB Defense products." />
      </Head>
      <main className="flex justify-center items-center mt-12">
        No posts yet, check back later for the lastest updates.
      </main>
    </Layout>
  )
}

export default Blog