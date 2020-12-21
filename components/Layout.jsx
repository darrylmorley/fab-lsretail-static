import Nav from './Nav'
import Footer from './Footer'
import Head from 'next/head'

const Layout = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <link rel="icon" href="/logos/FAB-logo.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{
          __html: `
          window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
          heap.load("2272009073");
   `}} />
      </Head>
      <Nav />
      <div className="flex-grow">
        {props.children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout