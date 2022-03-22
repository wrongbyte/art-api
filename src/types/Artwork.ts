export interface Artwork {
    artist: string;
    year: string;
    title: string;
};

export function isArtwork(body: any): body is Artwork {
    return (body as Artwork).artist !== undefined &&
    (body as Artwork).year !== undefined &&
    (body as Artwork).title !== undefined;
}
