import { Component, OnInit, Input } from '@angular/core';
import { StarService } from 'src/app/shared/services/star.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss']
})
export class StarReviewComponent implements OnInit {

  @Input() productId;
  
  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(private starService: StarService) { }

  ngOnInit() {
    this.stars = this.starService.getProductStars(this.productId);

    this.avgRating = this.stars.pipe(map(arr  => {
      const ratings = arr.map(v => v.value);
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed';
    }));
  }

  starHandler(value) {
    this.starService.setStar(this.productId, value);
  }

}
