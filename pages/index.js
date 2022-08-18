import Head from 'next/head'
import { gql, GraphQLClient } from 'graphql-request'
 
const SERVICE_URL = process.env.GRAPHCMS_ENDPOINT

const g_cms= new GraphQLClient( SERVICE_URL)
const query = gql`
query MyQuery {
  pamphletsConnection {
    edges {
      node {
        creator {
          about
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        manuals {
          name
          slug
        }
        note {
          html
        }
      }
    }
  }
}
  `  

export const getStaticProps= async()=>{ 
const {pamphletsConnection} =await g_cms.request(query)

return{ 
  props:{
    pamphletsConnection
  },
  revalidate:40
}
  }
  export default function Home({pamphletsConnection}) {
 
  return (
<div className='container'> 
<div>
<Head>
<title>Handmaids App</title>
<meta name="description" content="" />
</Head> 

</div> 
<h1 className='haffHeader'> Handmaids</h1>
<div className='underHeader'></div>
<div className='coverDiv'>  
{pamphletsConnection.edges.map((one, index)=>( 
<div className='midDiv'key={one.id}>
<h2 className='haffTitle'>{one.node.title}</h2>

<img 
className='display'
src={one.node.featuredImage.url}/> 

<div dangerouslySetInnerHTML={{__html:one.node.note.html}} className='mainContent'>
  
</div>  

<div className='author'> 
 <img
   src={one.node.creator.photo.url}
/>
<p>{one.node.creator.name}</p>
</div>

</div>
)  
)}   
 
  <div className='sideCollections'>
 {pamphletsConnection.edges.map((one)=>( 
     <div key={one.id}>
<p>{one.node.manuals.name}</p> 
</div>
    ) 
    )}  
 
</div>

  </div>
<footer>
<div className='footerDiv' > 
    Copyright &copy; {new Date().getFullYear()} Ngenet Studio   
  
</div>
</footer>

    </div>
  )
}
