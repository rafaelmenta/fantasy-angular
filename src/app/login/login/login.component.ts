import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User, UserService } from '../../services/user.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  previousUrl: string;

  constructor(private route: ActivatedRoute, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Superliga - Login');
    this.previousUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
}
