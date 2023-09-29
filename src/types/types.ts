export type LocationCoordinates = {
    lon: number;
    lat: number;
};
export type ArtistType = {
    name: string;
    bio_url: string;
    categories:string;
    bio_yearsactivestart:string;
    location_coordinates: LocationCoordinates;
    youtube_clipexampleurl:string;
    location_city:string;
    bio_summary:string;
};
export type ArtistTypeResponse = {
    results: ArtistType[];
};