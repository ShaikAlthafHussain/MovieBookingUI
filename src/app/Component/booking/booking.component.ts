import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiResponse } from 'src/app/Models/api-response';
import { Movie } from 'src/app/Models/movie';
import { Theatre } from 'src/app/Models/theatre';
import { BookingService } from 'src/app/Service/booking.service';
import { MovieService } from 'src/app/Service/movie.service';
import { TheatreService } from 'src/app/Service/theatre.service';
import { ToastService } from 'src/app/Service/toast.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  id!: string;
  loading: boolean = true;
  movie!: Movie;
  theatreList!: Theatre[];
  selectedTheatre: string = "Select Theatre";
  currentTheatre!: Theatre
  noOfTickets: number = 0
  booking = this.fb.group({
    ticketsCount: [0, [Validators.required]],
  })

  /**
   * 
   * @param service 
   * @param theatre 
   * @param bookingService 
   * @param toast 
   * @param route 
   * @param fb 
   */
  constructor(private service: MovieService, public theatre: TheatreService, private bookingService: BookingService, private toast: ToastService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get("id") || '';
    })
    this.getMovie(this.id)
    this.getTheatre()
  }

  /**
   * 
   * @param _id 
   */
  getMovie(_id: string): void {
    this.service.getMovie(_id).subscribe({
      next: (res: Movie) => {
        console.log(res);
        this.movie = res
        this.loading = false
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  getTheatre(): void {
    this.theatre.getTheatre().subscribe({
      next: (res: Theatre[]) => {
        console.log(res)
        this.theatreList = res;
      }
    })
  }

  updateSelectedTheatre(_id: string, value: string): void {
    this.selectedTheatre = value;

    this.theatre.getTheatreById(_id).subscribe({
      next: (res: Theatre) => {
        console.log(res);
        this.currentTheatre = res;
        console.log(this.currentTheatre);

      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  bookTicket(): void {
    if (this.booking.valid) {
      let data = {
        ticketsCount: Number(this.booking.get("ticketsCount")?.value),
        movieId: this.id,
        theatreId: this.currentTheatre.id
      };
      this.bookingService.bookTicket(data).subscribe({
        next: (res: ApiResponse) => {
          console.log(res);

          this.toast.show(res.message, { classname: 'bg-success text-light', delay: 5000 })

         /* setTimeout(() => {
            location.reload();
          }, 2000)*/
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.toast.show(err.error.message, { classname: 'bg-warning text-light', delay: 5000 })
        }
      })
    }
    else {
      console.log(this.booking.errors)
    }
  }

  seatMaxValidation(e: Event) {
    console.log(e)

    let input = e.target as HTMLInputElement;
    let value = Number(input.value);

    if (value > this.currentTheatre.availableSeat) {
      this.booking.setErrors({ maxError: true });
      console.log(this.booking.errors)
    }
  }
}
