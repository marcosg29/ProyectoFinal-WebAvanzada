import { Component, OnInit } from '@angular/core';
import Issue from 'src/app/shared/interfaces/issue';
import { ComicVineService } from '../../services/comic-vine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(protected cvService: ComicVineService, private router: Router) {}

  ngOnInit(): void {
    this.getIssues();
  }

  getIssues(): void {
    this.cvService.getLastestIssues();
  }

  goToIssueDetail(id: string): void {
    console.log('here', id);
    this.router.navigateByUrl(`issue/${id}`);
  }
}
