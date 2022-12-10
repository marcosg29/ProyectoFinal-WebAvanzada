export default interface Issue {
  id: string;
  name: string;
  description: string;
  cover_date: Date;
  deck: string;
  images: { thumbnail: string; original: string };
  issue_number: string;
  site_detail_url: string;
  character_credits: string[];
  person_credits: string[];
}
