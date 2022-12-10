import { Injectable } from '@angular/core';
import Issue from '../shared/interfaces/issue';

const cv_apiKey = 'e327b810e4168eae0b450534a9d9ed72463303c1';
const cv_apiUrl = 'http://comicvine.gamespot.com/api';

@Injectable({
  providedIn: 'root',
})
export class ComicVineService {
  public issuesList: Issue[] = [];
  public selectedIssue: Issue | undefined = undefined;

  constructor() {}

  getIssues(): void {
    const url = `${cv_apiUrl}/issues/?api_key=${cv_apiKey}&format=json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((doc: any) => {
          this.issuesList.push({
            id: doc.id,
            name: doc.name,
            description: doc.description,
            cover_date: new Date(doc.cover_date),
            deck: doc.deck,
            images: {
              thumbnail: doc.image.thumb_url,
              original: doc.image.original_url,
            },
            issue_number: doc.issue_number,
            site_detail_url: doc.site_detail_url,
          } as Issue);
        });
      });
  }

  getLastestIssues(): void {
    const url = `${cv_apiUrl}/issues/?api_key=${cv_apiKey}&sort=cover_date:desc&format=json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((doc: any) => {
          console.log(doc);
          if (doc.name && doc.description) {
            this.issuesList.push({
              id: doc.id,
              name: doc.name,
              description: doc.description
                ? doc.description.replace(/(<([^>]+)>)/gi, '')
                : '',
              cover_date: new Date(doc.cover_date),
              deck: doc.deck,
              images: {
                thumbnail: doc.image.thumb_url,
                original: doc.image.original_url,
              },
              issue_number: doc.issue_number,
              site_detail_url: doc.site_detail_url,
              character_credits: doc.character_credits,
              person_credits: doc.person_credits,
            } as Issue);
          }
        });
      });
  }

  getIssue(id: string): Issue | undefined {
    return this.issuesList.find((issue) => issue.id == id);
  }

  getIssueFromAPI(id: string) {
    const url = `${cv_apiUrl}/issue/?api_key=${cv_apiKey}&field_list=id:${id}&format=json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const doc = data.results;
        if (doc.name && doc.description) {
          this.selectedIssue = {
            id: doc.id,
            name: doc.name,
            description: doc.description
              ? doc.description.replace(/(<([^>]+)>)/gi, '')
              : '',
            cover_date: new Date(doc.cover_date),
            deck: doc.deck,
            images: {
              thumbnail: doc.image.thumb_url,
              original: doc.image.original_url,
            },
            issue_number: doc.issue_number,
            site_detail_url: doc.site_detail_url,
            character_credits: doc.character_credits,
            person_credits: doc.person_credits,
          } as Issue;
        }
      });
  }
}
