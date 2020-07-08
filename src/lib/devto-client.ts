import fetch from 'node-fetch';

export class DevtoClient {
  private readonly baseUrl = 'https://dev.to/api';

  private readonly headers: { 'api-key': string; 'content-type': string };

  constructor(private readonly apiKey: string) {
    this.headers = {
      'api-key': this.apiKey,
      'content-type': 'application/json',
    };
  }

  get(url: string) {
    return fetch(this.baseUrl + url, { headers: this.headers }).then((res) =>
      res.json()
    );
  }

  put(url: string, body: Record<string, string>) {
    return fetch(this.baseUrl + url, {
      body: JSON.stringify(body),
      headers: this.headers,
      method: 'PUT',
    }).then((res) => res.json());
  }

  async getAccountArticles(): Promise<any[]> {
    const result = await this.get('/articles/me/all');

    if (!result) {
      throw new Error('Error retrieving articles');
    }
    return result;
  }

  async updateAccountArticle(id: number, content: string): Promise<any> {
    const result = await this.put(`/articles/${id}`, {
      body_markdown: content,
    });

    if (!result) {
      throw new Error('Error updating article');
    }
    return result;
  }
}
