export type Thumbnail = {
    url: string,
    width: number,
    height: number,
}
type Resolutions = "default" | "high" | "maxres" | "medium" | "standard"
export type Thumbnails = Partial<Record<Resolutions, Thumbnail>>