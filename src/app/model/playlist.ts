export interface Playlist {
    etag: string,
    id: string,
    snippet: {
        publishedAt: string, // datetime,
        channelId: string,
        title: string,
        description: string,
        channelTitle: string,
        defaultLanguage?: string,
        localized?: {
            title: string,
            description: string
        }
    },
    status: {
        privacyStatus: string
    },
    contentDetails: {
        itemCount: number
    }
}