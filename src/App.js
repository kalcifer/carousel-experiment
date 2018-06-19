import React, { Component } from "react";
import "./App.css";
import Carousel from "./Carousel";
import CarouselObj from "./CarouselObj";

const arr = new Array(10).fill(1);

class App extends Component {
  render() {
    return (
      <div>
        <div>This page can have content and a carousel</div>

        <Carousel>{arr.map((val, i) => <CarouselObj key={i} />)}</Carousel>
      </div>
    );
  }
}

export default App;
