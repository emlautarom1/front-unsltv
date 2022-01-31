import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, expand, filter, first, from, map, mergeMap, Observable, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FuzzySearchService } from './fuzzy-search.service';
import { VideoSearchControlsService } from './video-search-controls.service';
import { Playlist } from '../model/playlist';
import { Video } from '../model/video';
import { SearchParams } from '../model/search';
import { FilterDate } from '../model/video-search-controls';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private BASE_URL = environment.backend_url;
  private API_KEY = environment.youtube_api_key

  private ALL_VIDEOS_PLAYLIST_ID: string = "UUZZWwoQL1ZpRU-8hdsrUpew";
  private INSTITUTIONAL_PLAYLIST_ID: string = "PLPHjzCOfwhCU8wJYO-SazoXjbzYV780UE";
  // TODO: No hay playlist automatica de transmisiones en vivo?
  private LIVE_PLAYLIST_ID: string = "PLPHjzCOfwhCU8wJYO-SazoXjbzYV780UE";

  private MAX_RESULTS_LIMIT: number = 50;

  allPlaylists$: Observable<Playlist>;
  allVideos$: Observable<Video>;
  latestVideo$: Observable<Video>;

  constructor(
    private http: HttpClient,
    private search: FuzzySearchService,
    private controls: VideoSearchControlsService
  ) {
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

  searchFor(search: SearchParams, filterDate: FilterDate): Observable<Video> {
    const filterDatePredicate = this.controls.buildVideoFilterByDate(filterDate);

    let results: Observable<Video>;
    switch (search.playlist) {
      case 'institutional':
        results = this.getVideosForPlaylist(this.INSTITUTIONAL_PLAYLIST_ID);
        break;
      case 'live':
        results = this.getVideosForPlaylist(this.LIVE_PLAYLIST_ID);
        break;
      default:
        results = this.allVideos$.pipe(
          filter(v => this.search.matchesVideo(search.query ?? "", v))
        );
    }
    return results.pipe(
      filter(v => filterDatePredicate(v))
    );
  }

  findRelatedVideosTo(video: Video): Observable<Video> {
    let title = video.snippet.title;
    return this.allVideos$.pipe(
      filter(v => this.search.matchesVideo(title, v)),
      filter(v => v.contentDetails.videoId != video.id),
    );
  }

  private getAllPlaylists(): Observable<Playlist> {
    let url = this.BASE_URL + "/playlists"
    let params = new HttpParams()
      .set("key", this.API_KEY)
      .set("part", "snippet,contentDetails,status")
      .set("channelId", "UCZZWwoQL1ZpRU-8hdsrUpew")
      .set("maxResults", this.MAX_RESULTS_LIMIT)
    return this.depaginateGET<Playlist>(url, params).pipe(
      filter(playlist => !this.isSpecialPlaylist(playlist.id))
    );
  }

  private isSpecialPlaylist(playlistID: string): boolean {
    return playlistID === this.ALL_VIDEOS_PLAYLIST_ID
      || playlistID === this.INSTITUTIONAL_PLAYLIST_ID
      || playlistID === this.LIVE_PLAYLIST_ID;
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
