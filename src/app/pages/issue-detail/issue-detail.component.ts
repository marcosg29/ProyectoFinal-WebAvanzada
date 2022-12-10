import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Issue from '../../shared/interfaces/issue';
import { ComicVineService } from '../../services/comic-vine.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss'],
})
export class IssueDetailComponent implements OnInit {
  constructor(
    private arouter: ActivatedRoute,
    protected cvService: ComicVineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.arouter.params.subscribe((params: any) => {
      this.cvService.getIssue(params.id.toString());
      // this.cvService.getIssueFromAPI(params.id.toString());
    });
  }

  goToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
