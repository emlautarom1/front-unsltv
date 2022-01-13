type Resolutions = "default" | "high" | "maxres" | "medium" | "standard"
type Thumbnail = {
    url: string,
    width: number,
    height: number,
}
type Thumbnails = Partial<Record<Resolutions, Thumbnail>>

export interface Video {
    etag: string,
    id: string,
    snippet: {
        publishedAt: string, // datetime
        channelId: string,
        title: string,
        description: string,
        thumbnails: Thumbnails,
        channelTitle: string,
        videoOwnerChannelTitle: string,
        videoOwnerChannelId: string,
        playlistId: string,
        position: number,
        resourceId: {
            kind: string,
            videoId: string,
        }
    },
    contentDetails: {
        videoId: string,
        startAt: string,
        endAt: string,
        note: string,
        videoPublishedAt: string // datetime
    },
    status: {
        privacyStatus: string
    }
}
