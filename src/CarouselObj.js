import React from "react";
import Img from "./assets/4.jpg";
import Img2 from "./assets/5.jpg";
import Img3 from "./assets/6.jpg";
import "./App.css";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default props => {
  const imgs = [Img, Img2, Img3];
  const rand = getRandomInt(2);
  return <img src={imgs[rand]} alt="sample-img" className="img-obj" />;
};
