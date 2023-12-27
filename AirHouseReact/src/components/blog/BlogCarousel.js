import React, { useState, useRef, Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Blogdetail from "./Blogdetail";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { blogDetailArr } from "../../data/data";

export default class CenterMode extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
    };
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Center Mode</h2>
        <Slider {...settings}>
          <div>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              temporibus magnam in harum accusantium numquam vel, dolorem
              perspiciatis accusamus molestiae autem veniam magni repudiandae
              nostrum praesentium optio laudantium ipsa. Illum!
            </h3>
          </div>
          <div>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              temporibus magnam in harum accusantium numquam vel, dolorem
              perspiciatis accusamus molestiae autem veniam magni repudiandae
              nostrum praesentium optio laudantium ipsa. Illum!
            </h3>
          </div>
          <div>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              temporibus magnam in harum accusantium numquam vel, dolorem
              perspiciatis accusamus molestiae autem veniam magni repudiandae
              nostrum praesentium optio laudantium ipsa. Illum!
            </h3>
          </div>
          <div>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              temporibus magnam in harum accusantium numquam vel, dolorem
              perspiciatis accusamus molestiae autem veniam magni repudiandae
              nostrum praesentium optio laudantium ipsa. Illum!
            </h3>
          </div>
          <div>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              temporibus magnam in harum accusantium numquam vel, dolorem
              perspiciatis accusamus molestiae autem veniam magni repudiandae
              nostrum praesentium optio laudantium ipsa. Illum!
            </h3>
          </div>
          <div>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              temporibus magnam in harum accusantium numquam vel, dolorem
              perspiciatis accusamus molestiae autem veniam magni repudiandae
              nostrum praesentium optio laudantium ipsa. Illum!
            </h3>
          </div>
        </Slider>
      </div>
    );
  }
}
