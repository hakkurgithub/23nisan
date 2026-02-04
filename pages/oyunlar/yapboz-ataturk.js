import Head from 'next/head'
import Link from 'next/link'

export default function Puzzle() {
  return (
    <div>
      <Head>
        <title>Puzzle</title>
      </Head>
      <header style={{background:'black',color:'white',padding:20}}>
        <Link href="/">Back</Link>
        <h1>Ataturk Puzzle</h1>
      </header>
      <main style={{padding:40,textAlign:'center'}}>
        <p>Game loading...</p>
      </main>
    </div>
  )
}
