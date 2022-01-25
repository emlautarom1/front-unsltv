import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, expand, first, from, map, mergeMap, Observable, share, take, tap } from 'rxjs';
import { Playlist } from '../model/playlist';
import { Video } from '../model/video';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private allVideosPlaylistID: string = "UUZZWwoQL1ZpRU-8hdsrUpew";
  private maxResultsLimit: number = 50;

  allPlaylists$: Observable<Playlist>;
  allVideos$: Observable<Video>;
  latestVideo$: Observable<Video>;

  constructor(private http: HttpClient) {
    this.allPlaylists$ = this.getAllPlaylists();
    this.allVideos$ = this.getVideosForPlaylist(this.allVideosPlaylistID).pipe(share());
    this.latestVideo$ = this.allVideos$.pipe(first(), share());
  }

  getVideosForPlaylist(playlistID: string): Observable<Video> {
    let url = "https://youtube.googleapis.com/youtube/v3/playlistItems"
    let params = new HttpParams()
      .set("key", "AIzaSyCHGA00PnSkBfyB60g2TS2U-ICPuJeHaHQ")
      .set("part", "snippet,contentDetails")
      .set("maxResults", this.maxResultsLimit)
      .set("playlistId", playlistID)
    return this.depaginateGET<Video>(url, params);
  }

  getVideoByID(id: string): Observable<Video> {
    let url = "https://youtube.googleapis.com/youtube/v3/videos";
    let params = new HttpParams()
      .set("key", "AIzaSyCHGA00PnSkBfyB60g2TS2U-ICPuJeHaHQ")
      .set("part", "snippet,contentDetails,statistics")
      .set("id", id);
    return this.http.get(url, { params }).pipe(
      map((response: any) => response.items[0] ?? undefined)
    )
  }

  searchFor(query: string): Observable<Video> {
    // TODO: Usar implementacion real
    return this.allVideos$.pipe(take(10));
  }

  findRelatedVideosTo(id: string): Observable<Video> {
    // TODO: Usar implementacion real
    return this.allVideos$.pipe();
  }

  private getAllPlaylists(): Observable<Playlist> {
    let url = "https://youtube.googleapis.com/youtube/v3/playlists"
    let params = new HttpParams()
      .set("key", "AIzaSyCHGA00PnSkBfyB60g2TS2U-ICPuJeHaHQ")
      .set("part", "snippet,contentDetails,status")
      .set("channelId", "UCZZWwoQL1ZpRU-8hdsrUpew")
      .set("maxResults", this.maxResultsLimit)
    return this.depaginateGET<Playlist>(url, params);
  }

  private depaginateGET<T>(url: string, params: HttpParams, itemsProp: string = "items"): Observable<T> {
    const fetchSinglePage = (pageToken?: string): Observable<T> => {
      return this.http.get(url, { params: pageToken ? params.set("pageToken", pageToken) : params }).pipe(
        expand((response: any) => response["nextPageToken"] ? fetchSinglePage(response["nextPageToken"]) : EMPTY),
        tap(() => console.log(`HTTP request: url = ${url}, pageToken = ${pageToken}`)),
        mergeMap((response: any) => from(response[itemsProp]) as Observable<T>)
      )
    }
    return fetchSinglePage()
  }
}
