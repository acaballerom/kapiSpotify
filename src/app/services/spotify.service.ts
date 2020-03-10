import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify service Listo');
  }

  // Funcion para traer solo el query(la parte diferente) de la busqueda

  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer BQCXqWn0gfVy-Z70rqPg_4pFQXYDnxxz1H9xdwkuk1EnQXeMX6qhORIbBens9y6aeYn6p3C3noD6otl7hqk'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {

     // const headers = new HttpHeaders({
     // Authorization: 'BQDV4_MhHfk452YCSAwbcMcO4_HBiFoph0kq4_dTByD8x40QHQd8DPu-bFlrEN-maoCe-MjvzFOriAEAcnM'
     // });

    return this.getQuery('browse/new-releases?limit=20')
            .pipe( map( data => data['albums'].items ));

  }

  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)

            .pipe( map( data => {
              return data['artists'].items;
            }));
  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);

            // .pipe( map( data => {
              // return data['artists'].items;
           // }));
  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)

            .pipe( map( data => data['tracks']));
  }

}
