import React, { Component } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: this.props.speed,
      slidesToShow: this.props.slidesToShow,
      slidesToScroll: 1,
      autoplay:true
    };
    return (
      <div style={{margin : '2% 10%'}}>
        <Slider {...settings} >
          {this.props.items()}
        </Slider>
      </div>
    )
  }
}
