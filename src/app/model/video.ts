import { Thumbnails } from "./thumbnail";

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
        categoryId?: string,
        liveBroadcastContent?: string
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
    },
    statistics?: {
        viewCount: number,
        likeCount: number,
        dislikeCount: number,
        favoriteCount: number,
        commentCount: number
    }
}
