import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BannerCarousel() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <Slider {...settings}>
        <div>
          <div
            style={{
              width: "100%",
              height: 280,
              background:
                "linear-gradient(135deg, rgba(25,30,37,0.10), rgba(100,154,139,0.22))",
              borderRadius: 14,
              border: "1px solid var(--border-1)",
            }}
          />
        </div>
      </Slider>
    </div>
  );
}
