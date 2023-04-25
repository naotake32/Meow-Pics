import { Inter } from 'next/font/google'
import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}



const inter = Inter({ subsets: ['latin'] })
const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  return result[0]
}


export default function Home({initialCatImageUrl}: IndexPageProps): JSX.Element {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  // const [isLoading, setIsLoading] = useState(false)
  const handleClick = async ()=> {
    // setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    // setIsLoading(false);
  }
  return (
    <div>
      <h1 className="text-3xl; text-sky-500">Cute Cats</h1>
      {/* {isLoading} */}
      <img src={catImageUrl} alt="" />
      <button className="text-sky-500"onClick={handleClick}>Meow🐱</button>
    </div>
  )
}
//SSR
export const getServerSideProps: GetServerSideProps<
  IndexPageProps
  > = async () => {
    const catImage = await fetchCatImage();
    return {
      props: {
        initialCatImageUrl: catImage.url,
      }
    }
  };
