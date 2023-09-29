import { useEffect, useState } from 'react'
import { API_ENDPOINT } from './../libs/api'
import styles from '../styles/Home.module.scss'
import { ArtistType } from './../types/types'
import { getAllArtists } from './../models/Artist'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('../components/elements/Map').then(mod => mod.default) as any,
  { loading: () => <p>Loading...</p>, ssr: false }
);
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState<ArtistType[]>([]);
  useEffect(() => {
    const fetchArtistsData = async () => {
      try {
        let res = await getAllArtists(API_ENDPOINT);
        console.log("getAllArtists response:", res);
        if (res && res.results) {
          setArtists(res.results);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArtistsData();
  }, []);
  return (
    <div className={styles.container}>
      {loading ? (
        <h1>ロード中・・・</h1>
      ) :
        <>
          <main className={styles.main}>
            <h1>HipHopアーティスト図鑑</h1>
            {/* <ul className={styles.flex}>
              {artists && artists.map((artist, index) => (
                <li key={index}>
                  <h2>{artist.name}</h2>
                  <p className={styles.categories}>{artist.categories}</p>
                  <p className={styles.bio_yearsactivestart}>{artist.bio_yearsactivestart}</p>
                  {artist.bio_url ? (
                    <Link href={artist.bio_url} target="_blank" rel="noopener noreferrer" className={styles.bio_url}>
                      Wikipedia
                    </Link>
                  ) : (
                    <span>wiki情報なし</span>
                  )}
                </li>
              ))}
            </ul> */}
            <div>
              <Map />
            </div>
          </main>
        </>}
    </div>
  );
}
