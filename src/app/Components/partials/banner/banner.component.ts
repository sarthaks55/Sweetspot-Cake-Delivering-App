import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

interface BannerImage {
  imageUrl: string;
  altText: string;
}


@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',  
})
export class BannerComponent implements OnInit, OnDestroy {
  bannerImages: BannerImage[] = [
    { imageUrl: 'https://imgcdn.floweraura.com/birthday_homepage_fa_deskto.jpg', altText: 'Image 1 Description' },
    { imageUrl: 'https://imgcdn.floweraura.com/anniversary_cake_homepage_fa_desktop_2.jpg', altText: 'Image 2 Description' },
    { imageUrl: 'https://imgcdn.floweraura.com/mango_cake_landingpage_fa_desktop.jpg', altText: 'Image 2 Description' },
    // Add more banner images here
  ];
  currentImageIndex = 0; // Initialize with a number
  imageChangeInterval: Subscription | null = null; // Initialize as null

  ngOnInit() {
    this.imageChangeInterval = interval(5000) // Change image every 5 seconds
      .pipe(
        map(() => {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.bannerImages.length;
          return this.currentImageIndex;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.imageChangeInterval) {
      this.imageChangeInterval.unsubscribe();
    }
  }
}



// this.slides[0] = {
//   src: 'https://imgcdn.floweraura.com/birthday_homepage_fa_deskto.jpg'
// };
// this.slides[1] = {
//   src: 'https://imgcdn.floweraura.com/mango_cake_landingpage_fa_desktop.jpg'
// };
// this.slides[2] = {
//   src: 'https://imgcdn.floweraura.com/anniversary_cake_homepage_fa_desktop_2.jpg'
// };