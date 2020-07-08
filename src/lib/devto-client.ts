import fetch from 'node-fetch';

export class DevtoClient {
  private readonly baseUrl = 'https://dev.to/api';

  private readonly headers: { 'api-key': string };

  constructor(private readonly apiKey: string) {
    this.headers = { 'api-key': this.apiKey };
  }

  get(url: string) {
    return fetch(this.baseUrl + url, { headers: this.headers }).then((res) =>
      res.json()
    );
  }

  async getAccountArticles(): Promise<any[]> {
    const result = await this.get('/articles/me/all');

    if (!result) {
      throw new Error(`Error retrieving articles`);
    }
    return result;
  }
}
