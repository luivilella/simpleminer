import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IMiner, IFilter, IColumnConf, IField } from './interfaces';

@Injectable()
export class MinerService {

    private baseUrl: string = app.apiURL;

    constructor(private _http: Http) { }


    getURL(url, search=null){
        let searchParams: URLSearchParams = new URLSearchParams();
        if (!app.mockAPI){
            searchParams.setAll(search || {});
        }

        return this.baseUrl + url;
    }

    getMiner(miner: string): Observable<IMiner> {
        let url = this.getURL('miner.json');

        return this._http.get(url)
          .map((response: Response) => <IMiner> response.json())
          .catch(this.handleError);
    }


    filterMiner(params: IFilter): Observable<any[]> {
        let url = this.getURL('miner-rows.json');
        return this._http.get(url)
          .map((response: Response) => <IMiner> response.json())
          .catch(this.handleError);
    }


    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    getColumnConf(fieldId: string, miner: IMiner): IColumnConf{
        if (!miner){
            return null;
        }

        return miner.minerColumns.columnsConf[fieldId];
    }

    getFieldById(fieldId: string, miner: IMiner): IField{
        if (!miner){
            return null;
        }

        let conf = this.getColumnConf(fieldId, miner);
        if (!conf){
            return null;
        }

        return <IField> conf;
    }

}