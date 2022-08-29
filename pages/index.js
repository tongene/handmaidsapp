import Head from 'next/head'
import { gql, GraphQLClient } from 'graphql-request'
 import image003 from '../hhcjassets/IMG-20220825-WA0003.jpg'
 
  import image004 from '../hhcjassets/IMG-20220825-WA0004.jpg'
 import image005 from '../hhcjassets/IMG-20220825-WA0005.jpg'
 

import image006 from '../hhcjassets/IMG-20220825-WA0006.jpg'
import image007 from '../hhcjassets/IMG-20220825-WA0007.jpg'
import image008 from '../hhcjassets/IMG-20220825-WA0008.jpg'
import image009 from '../hhcjassets/IMG-20220825-WA0009.jpg'
import image010 from '../hhcjassets/IMG-20220825-WA0010.jpg'
import image011 from '../hhcjassets/IMG-20220825-WA0011.jpg'
import image012 from '../hhcjassets/IMG-20220825-WA0012.jpg'
import image013 from '../hhcjassets/IMG-20220825-WA0013.jpg'
import image014 from '../hhcjassets/IMG-20220825-WA0014.jpg'
import image015 from '../hhcjassets/IMG-20220825-WA0015.jpg'
import image016 from '../hhcjassets/IMG-20220825-WA0016.jpg'
import image017 from '../hhcjassets/IMG-20220825-WA0017.jpg'
import image018 from '../hhcjassets/IMG-20220825-WA0018.jpg'
import image019 from '../hhcjassets/IMG-20220825-WA0019.jpg'
import image020 from '../hhcjassets/IMG-20220825-WA0020.jpg'
import image021 from '../hhcjassets/IMG-20220825-WA0021.jpg'
import image022 from '../hhcjassets/IMG-20220825-WA0022.jpg'
import image023 from '../hhcjassets/IMG-20220825-WA0023.jpg'
import image024 from '../hhcjassets/IMG-20220825-WA0024.jpg'
import image025 from '../hhcjassets/IMG-20220825-WA0025.jpg'
import image026 from '../hhcjassets/IMG-20220825-WA0026.jpg'
import image027 from '../hhcjassets/IMG-20220825-WA0027.jpg'
import image028 from '../hhcjassets/IMG-20220825-WA0028.jpg'
import image029 from '../hhcjassets/IMG-20220825-WA0029.jpg'
import image030 from '../hhcjassets/IMG-20220825-WA0030.jpg'
import image031 from '../hhcjassets/IMG-20220825-WA0031.jpg'
import image033 from '../hhcjassets/IMG-20220825-WA0033.jpg'
import image034 from '../hhcjassets/IMG-20220825-WA0034.jpg'
import image035 from '../hhcjassets/IMG-20220825-WA0035.jpg'

import image036 from '../hhcjassets/IMG-20220825-WA0036.jpg'
import image037 from '../hhcjassets/IMG-20220825-WA0037.jpg'
import image038 from '../hhcjassets/IMG-20220825-WA0038.jpg'
import image039 from '../hhcjassets/IMG-20220825-WA0039.jpg'
import image040 from '../hhcjassets/IMG-20220825-WA0040.jpg'
import image041 from '../hhcjassets/IMG-20220825-WA0041.jpg'
import Image from 'next/image'
const SERVICE_URL = process.env.GRAPHCMS_ENDPOINT

const g_cms= new GraphQLClient( SERVICE_URL)
const queryAll = gql`
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
const queryLeaderBoard = gql`
query Board {
  leaderBoards {
    slug
    name
    featuredImage {
      id
      url
    }
    description
  }
}

`
 
export const getStaticProps= async({params })=>{ 
const {pamphletsConnection} =await g_cms.request(queryAll) 
const { leaderBoards} = await g_cms.request(queryLeaderBoard)
 
 
return{ 
  props:{
    pamphletsConnection,
    leaderBoards,

  },
  revalidate:40
}
  }

  export default function Home({pamphletsConnection, leaderBoards }) {
 const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    switch (type) {      
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }}  
  return (
<div className='container'> 

<Head>
<title>Handmaids App</title>
<meta name="description" content="" />
</Head> 

<div className='haffHeader'>
<h1 > Handmaids</h1>
<div className='underHeader'></div>

</div>  

<div className='firstSec'> 
<div> 
{pamphletsConnection.edges.map((one, index)=>( 
<div className='coverDiv'key={one.id}>
<h2 className='haffTitle'>{one.node.title}</h2>

<img
className='display'
src={one.node.featuredImage.url}/> 
<div dangerouslySetInnerHTML={{__html:one.node.note.html}} className='mainContent'>
  
</div>  
 
<div className='author'> 
 {/* <img
   src={one.node.creator.photo.url}
/> */} 
{/*  
<p>{one.node.creator.name}</p>  */}
</div>

</div>
)  
)} 

 </div>

<div className='boardSec'> 

  {leaderBoards.map((one)=>( 
     <div key={one.id}className='leaderSec'>
<img 
src={one.featuredImage.url}
alt={one.name}
/>
<div className='boardLine'></div>
<p>{one.description}</p>  
<div className='boardLine2'></div>
</div>
    ) 
    )}  
    {/* {pamphletsConnection.edges.map((one)=>( 
     <div key={one.id}>
  <div dangerouslySetInnerHTML={{__html: "<image src='https://media.graphassets.com/he710aTWRqOo6YRGnGCC' alt='IMG-20220825-WA0005.jpg' title='IMG-20220825-WA0005.jpg' width='576' height='764' />"
}} className='mainContent'>
</div>

</div>
    ) 
    )} */}
<h2 className='galleryImage'>Old Girl's Gallery</h2>
<div className='imgSec'>
   <Image src={image004} height={200} width={200}  alt='oldGirls photos'/>
  <Image src={image005} height={200} width={200} alt='oldGirls photos'/>
  <Image src={image006} height={200} width={200} alt='oldGirls photos'/>
  <Image src={image007} height={200} width={200} alt='oldGirls photos'/>
  <Image src={image008} height={200} width={200} alt='oldGirls photos'/>
  <Image src={image009} height={200} width={200} alt='oldGirls photos'/>
    <Image src={image003} height={200} width={200} alt='oldGirls photos'/> 
     <Image src={image010} height={200} width={200} alt='oldGirls photos'/>
    <Image src={image011} height={200} width={200} alt='oldGirls photos'/>
    <Image src={image012} height={200} width={200} alt='oldGirls photos'/>
    <Image src={image013} height={200} width={200} alt='oldGirls photos'/>
    <Image src={image014} height={200} width={200} alt='oldGirls photos'/>
      <Image src={image015} height={200} width={200} alt='oldGirls photos'/>
      <Image src={image016} height={200} width={200} alt='oldGirls photos'/>
        <Image src={image017} height={200} width={200}alt='oldGirls photos'/>
        <Image src={image018} height={200} width={200}alt='oldGirls photos'/>
        <Image src={image019} height={100} width={200}alt='oldGirls photos'/>
        <Image src={image020} height={200} width={200}alt='oldGirls photos'/>
        <Image src={image021} height={200} width={200}alt='oldGirls photos'/>
        <Image src={image022} height={200} width={200}alt='oldGirls photos'/>  
        <Image src={image023} height={200} width={200}alt='oldGirls photos'/>
        <Image src={image024} height={200} width={200}alt='oldGirls photos'/>
        <Image src={image025} height={200} width={200}alt='oldGirls photos'/>
        <Image src={image026} height={200} width={200}alt='oldGirls photos'/>
        <Image src={image027} height={200} width={200}alt='oldGirls photos'/>
        <Image src={image028} height={200} width={200}alt='oldGirls photos'/>
          <Image src={image029} height={200} width={200}alt='oldGirls photos'/>
            <Image src={image030} height={200} width={200}alt='oldGirls photos'/>
            <Image src={image031} height={200} width={200}alt='oldGirls photos'/>

  <Image src={image033} height={200} width={200} alt='oldGirls photos'/>

    <Image src={image034} height={200} width={200}alt='oldGirls photos'/> 
      <Image src={image035} height={200} width={200}alt='oldGirls photos'/>
    <Image src={image036} height={200} width={200}alt='oldGirls photos'/>
    <Image src={image037} height={200} width={200}alt='oldGirls photos'/>
    <Image src={image038} height={200} width={200}alt='oldGirls photos'/>
    <Image src={image039} height={200} width={200}alt='oldGirls photos'/>
    <Image src={image040} height={200} width={200}alt='oldGirls photos'/>
    <Image src={image041} height={200} width={200}alt='oldGirls photos'/>
 
</div>

</div>

</div>
  <div className='sideCollections'>
 {pamphletsConnection.edges.map((one)=>( 
     <div key={one.id}>
<p>{one.node.manuals.name}</p> 
</div>
    ) 
    )}  
 
</div>

<footer>
<div className='footerDiv' > 
    Copyright &copy; {new Date().getFullYear()} Ngenet Studio   
  
</div>
</footer>

    </div>
  )
}
