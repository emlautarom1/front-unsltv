import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuzzySearchService } from './fuzzy-search.service';
import { EMPTY, expand, filter, first, from, map, mergeMap, Observable, shareReplay, tap } from 'rxjs';
import { Playlist } from '../model/playlist';
import { Video } from '../model/video';
import { SearchParams } from '../model/search';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  // TODO: Cargar desde ENV
  private BASE_URL = "http://localhost:3000";
  private API_KEY = "AIzaSyCHGA00PnSkBfyB60g2TS2U-ICPuJeHaHQ";

  private ALL_VIDEOS_PLAYLIST_ID: string = "UUZZWwoQL1ZpRU-8hdsrUpew";
  private INSTITUTIONAL_PLAYLIST_ID: string = "PLPHjzCOfwhCU8wJYO-SazoXjbzYV780UE";
  // TODO: No hay playlist automatica de transmisiones en vivo?
  private LIVE_PLAYLIST_ID: string = "PLPHjzCOfwhCU8wJYO-SazoXjbzYV780UE";

  private MAX_RESULTS_LIMIT: number = 50;

  allPlaylists$: Observable<Playlist>;
  allVideos$: Observable<Video>;
  latestVideo$: Observable<Video>;

  constructor(private http: HttpClient, private search: FuzzySearchService) {
    this.allPlaylists$ = this.getAllPlaylists().pipe(shareReplay());
    this.allVideos$ = this.getVideosForPlaylist(this.ALL_VIDEOS_PLAYLIST_ID).pipe(shareReplay());
    this.latestVideo$ = this.allVideos$.pipe(first());
  }

  getVideosForPlaylist(playlistID: string): Observable<Video> {
    let url = this.BASE_URL + "/playlistItems"
    let params = new HttpParams()
      .set("key", this.API_KEY)
      .set("part", "snippet,contentDetails")
      .set("maxResults", this.MAX_RESULTS_LIMIT)
      .set("playlistId", playlistID)
    return this.depaginateGET<Video>(url, params);
  }

  getVideoByID(id: string): Observable<Video> {
    let url = this.BASE_URL + "/videos";
    let params = new HttpParams()
      .set("key", this.API_KEY)
      .set("part", "snippet,contentDetails,statistics")
      .set("id", id);
    return this.http.get(url, { params }).pipe(
      map((response: any) => response.items[0] ?? undefined)
    )
  }

  searchFor(search: SearchParams): Observable<Video> {
    switch (search.playlist) {
      case 'institutional':
        return this.getVideosForPlaylist(this.INSTITUTIONAL_PLAYLIST_ID);
      case 'live':
        return this.getVideosForPlaylist(this.LIVE_PLAYLIST_ID);
      default:
        return this.allVideos$.pipe(
          filter(v => this.search.matchesVideo(search.query ?? "", v))
        );
    }
  }

  findRelatedVideosTo(id: string): Observable<Video> {
    // TODO: Usar implementacion real
    return this.allVideos$;
  }

  private getAllPlaylists(): Observable<Playlist> {
    let url = this.BASE_URL + "/playlists"
    let params = new HttpParams()
      .set("key", this.API_KEY)
      .set("part", "snippet,contentDetails,status")
      .set("channelId", "UCZZWwoQL1ZpRU-8hdsrUpew")
      .set("maxResults", this.MAX_RESULTS_LIMIT)
    return this.depaginateGET<Playlist>(url, params);
  }

  private depaginateGET<T>(url: string, params: HttpParams, itemsProp: string = "items"): Observable<T> {
    const fetchSinglePage = (pageToken?: string) => {
      return this.http.get(url, { params: pageToken ? params.set("pageToken", pageToken) : params }).pipe(
        tap(() => console.log("HTTP request:", { url, params, pageToken }))
      )
    }

    return fetchSinglePage().pipe(
      expand((response: any) => response["nextPageToken"] ? fetchSinglePage(response["nextPageToken"]) : EMPTY),
      mergeMap((response: any) => from(response[itemsProp]) as Observable<T>)
    )
  }
}
