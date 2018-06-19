import React, { Component } from "react";
import "./Carousel.css";

const padding = 10;
export default class Carousel extends Component {
  state = {
    height: null,
    width: null,
    parentWidth: null,
    position: 0,
    fullWidth: null,
    prev: false,
    next: false
  };
  constructor() {
    super();
    this.refDOM = React.createRef();
  }
  componentDidMount() {
    const element = this.refDOM.current;
    const dimensions = element.firstChild.getBoundingClientRect();
    const parentDimensions = element.parentElement.getBoundingClientRect();
    const count = React.Children.count(this.props.children);
    this.setState({
      height: dimensions.height,
      width: dimensions.width,
      parentWidth: parentDimensions.width,
      fullWidth: dimensions.width * count + padding * count * 2
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.height === nextState.height &&
      this.state.position === nextState.position
    ) {
      return false;
    }
    return true;
  }
  prev = () => {
    if (this.state.position !== 0) {
      console.log("Before prev - ", this.state.position);
      this.setState(
        {
          position: this.state.position - this.state.width - padding,
          prev: true,
          next: false
        },
        () => console.log("after prev - ", this.state.position)
      );
    }
  };
  next = () => {
    console.log("Before next - ", this.state.position);
    this.setState(
      {
        position: this.state.position + this.state.width + padding,
        prev: false,
        next: true
      },
      () => console.log("after next - ", this.state.position)
    );
  };
  render() {
    const { children } = this.props;
    const count = React.Children.count(children);
    if (!children || count < 0) {
      return <div>Gimme some children</div>;
    }
    if (!this.state.height) {
      const firstChild = React.Children.toArray(children)[0];
      return <div ref={this.refDOM}>{firstChild}</div>;
    }
    let translateValue = 0;
    if (this.state.next) {
      translateValue = -this.state.position;
    }
    if (this.state.prev) {
      translateValue = -this.state.position;
    }
    return (
      <div className="container" style={{ width: this.state.parentWidth }}>
        <div
          className="carousel"
          style={{
            height: this.state.height,
            width: this.state.fullWidth,
            transform: `translateX(${translateValue}px)`,
            transition: "1s"
          }}
        >
          {React.Children.map(children, child => (
            <div
              className="carousel-obj"
              style={{ height: this.state.height, width: this.state.width }}
            >
              {child}
            </div>
          ))}
        </div>
        <button disabled={this.state.position === 0} onClick={this.prev}>
          Prev
        </button>
        <button
          disabled={
            this.state.position > this.state.fullWidth - this.state.parentWidth
          }
          onClick={this.next}
        >
          Next
        </button>
      </div>
    );
  }
}
