import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Playlist } from '../model/playlist';
import { Video } from '../model/video';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  private _sampleSingleContent(): any {
    let idx = Math.round((Math.random() * 10) % 7) + 1;
    return {
      id: "X40Tr3Q-BvE",
      thumbnail: `assets/thumbnails/small-movie${idx}.jpg`,
      title: "La Casa de Papel",
      date: "28/8/20",
      category: "Entretenimiento",
      views: "7.893.163",
      description: "Una banda organizada de ladrones se propone cometer el atraco del siglo en la Fábrica Nacional de Moneda y Timbre. Cinco meses de preparación quedarán reducidos a once días para poder llevar a cabo con éxito el gran golpe."
    }
  }

  private _sampleArrayContent(): any[] {
    return Array.from({ length: 10 }, () => this._sampleSingleContent());
  }

  searchContent(query: string): Observable<any[]> {
    return of(this._sampleArrayContent());
  }

  relatedContent(to: string): Observable<any[]> {
    return of(this._sampleArrayContent());
  }

  findByID(id: string): Observable<any> {
    return of(this._sampleSingleContent());
  }

  findRelatedTo(id: string): Observable<any[]> {
    return of(this._sampleArrayContent())
  }

  getVideosForPlaylist(playlistID: string, maxResults: number): Observable<Video[]> {
    let url = "https://youtube.googleapis.com/youtube/v3/playlistItems"
    let params = new HttpParams()
      .set("key", "AIzaSyCHGA00PnSkBfyB60g2TS2U-ICPuJeHaHQ")
      .set("part", "snippet,contentDetails")
      .set("maxResults", maxResults)
      .set("playlistId", playlistID)
    return this.http.get(url, { params }).pipe(
      map((response: any) => response.items)
    )
  }

  getPlaylists(maxResults: number): Observable<Playlist[]> {
    let url = "https://youtube.googleapis.com/youtube/v3/playlists"
    let params = new HttpParams()
      .set("key", "AIzaSyCHGA00PnSkBfyB60g2TS2U-ICPuJeHaHQ")
      .set("part", "snippet,contentDetails")
      .set("channelId", "UCZZWwoQL1ZpRU-8hdsrUpew")
      .set("maxResults", maxResults)
    return this.http.get(url, { params }).pipe(
      map((response: any) => response.items as Playlist[])
    )
  }

  getLatestVideo(): Observable<Video> {
    let allVideosPlaylistID = "UUZZWwoQL1ZpRU-8hdsrUpew";
    return this.getVideosForPlaylist(allVideosPlaylistID, 1)
      .pipe(map(videos => videos[0]))
  }
}
