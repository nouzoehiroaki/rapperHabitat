export type ArtistType = {
    name: string;
    bio_url: string;
    categories:string;
    bio_yearsactivestart:string;
};
export type ArtistTypeResponse = {
    results: ArtistType[];
};