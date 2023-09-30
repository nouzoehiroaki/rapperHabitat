import { useEffect, useState } from 'react'
import { API_ENDPOINT } from '@/libs/api'
import { getAllArtists } from '@/models/Artist'
import { ArtistType } from '@/types/types'
import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '@/styles/Home.module.scss'
import Link from 'next/link'
export const Map: React.FC = () => {
    const [artists, setArtists] = useState<ArtistType[]>([]);
    useEffect(() => {
        const fetchArtistsData = async () => {
            try {
                let res = await getAllArtists(API_ENDPOINT);
                if (res && res.results) {
                    setArtists(res.results);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchArtistsData();
    }, []);
    const position: [number, number] = [40.688889, -73.944444];
    return (
        <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    artists.map((artist, index) => {
                        const artistPosition: [number, number] = [artist.location_coordinates.lat, artist.location_coordinates.lon];
                        return (
                            <Marker key={index} position={artistPosition}>
                                <Popup>
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
                                    {artist.youtube_clipexampleurl ? (
                                        <>
                                            <div className={styles.iframeWrapper}>
                                                <iframe width="560" height="315" src={artist.youtube_clipexampleurl} title="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                                            </div>
                                        </>
                                    ) : (
                                        <span>動画情報なし</span>
                                    )}
                                    <p className={styles.location_city}>{artist.location_city}</p>
                                    <p className={styles.bio_summary}>{artist.bio_summary}</p>
                                </Popup>
                            </Marker>
                        );
                    })
                }
            </MapContainer>
        </div>
    )
}
export default Map;