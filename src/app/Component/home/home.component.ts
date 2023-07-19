import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie';
import { MovieService } from 'src/app/Service/movie.service';
import { ToastService } from 'src/app/Service/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movieList: Movie[] = [];
  loading: boolean = true;

  constructor(private movieService: MovieService, private toast: ToastService) { }

  ngOnInit(): void {
    this.loadMovies()
  }

  loadMovies(): void {
    this.movieService.loadMovies().subscribe({
      next: (response: Movie[]) => {
        console.log(response)
        this.movieList = response;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
      }
    })
  }
}
