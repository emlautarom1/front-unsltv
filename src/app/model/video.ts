export interface Video {
    etag: string,
    id: string,
    snippet: {
        publishedAt: string, // datetime
        channelId: string,
        title: string,
        description: string,
        thumbnails: {
            high: {
                url: string,
                width: number,
                height: number,
            }
        },
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
