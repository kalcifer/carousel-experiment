import React, { Component } from "react";
import "./Carousel.css";

const childHoverVals = {
  transform: "scale(1.2)"
};

let childBeforeHoverVals = {
  transform: "translateX(-10px)"
};
let childAfterHoverVals = {
  transform: "translateX(10px)"
};

const padding = 10;
export default class Carousel extends Component {
  state = {
    height: null,
    width: null,
    parentWidth: null,
    position: 0,
    fullWidth: null,
    prev: false,
    next: false,
    hoverTransitionKey: null
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
      this.state.position === nextState.position &&
      this.state.hoverTransitionKey === nextState.hoverTransitionKey
    ) {
      return false;
    }
    return true;
  }
  prev = () => {
    if (this.state.position !== 0) {
      this.setState({
        position: this.state.position - this.state.width - padding,
        prev: true,
        next: false
      });
    }
  };
  next = () => {
    this.setState({
      position: this.state.position + this.state.width + padding,
      prev: false,
      next: true
    });
  };
  onMouseEnter = key => {
    this.setState({
      hoverTransitionKey: key
    });
  };
  onMouseLeave = key => {
    this.setState({
      hoverTransitionKey: null
    });
  };
  render() {
    const { children } = this.props;
    const {
      hoverTransitionKey,
      height,
      position,
      parentWidth,
      fullWidth,
      width
    } = this.state;

    let prevKey;
    let nextKey;
    const count = React.Children.count(children);
    if (!children || count < 0) {
      return <div>Gimme some children</div>;
    }
    if (!height) {
      const firstChild = React.Children.toArray(children)[0];
      return <div ref={this.refDOM}>{firstChild}</div>;
    }

    const translateValue = -position;
    if (hoverTransitionKey) {
      let prevObj;
      let currentObj;
      React.Children.forEach(children, child => {
        if (currentObj && !nextKey) {
          nextKey = child.key;
        }
        if (child.key === hoverTransitionKey) {
          if (prevObj) {
            prevKey = prevObj.key;
          }
          currentObj = child;
        }
        prevObj = child;
      });
    }
    const prevButtonDisabled =
      this.state.position === 0 || this.state.hoverTransitionKey;
    const nextButtonDisabled =
      this.state.position > this.state.fullWidth - this.state.parentWidth ||
      this.state.hoverTransitionKey;
    return (
      <div className="container" style={{ width: parentWidth }}>
        <div
          className="carousel"
          style={{
            height,
            width: fullWidth,
            transform: `translateX(${translateValue}px)`,
            transition: "1s"
          }}
        >
          {React.Children.map(children, child => {
            let childStyles = {};
            const { key } = child;
            if (key === hoverTransitionKey) {
              childStyles = childHoverVals;
            }
            if (key === prevKey) {
              childStyles = childBeforeHoverVals;
            }
            if (key === nextKey) {
              childStyles = childAfterHoverVals;
            }
            childStyles = {
              ...childStyles,
              transition: "0.5s",
              cursor: "pointer"
            };
            return (
              <div
                className="carousel-obj"
                style={{ height, width, ...childStyles }}
                onMouseEnter={() => this.onMouseEnter(key)}
                onMouseLeave={() => this.onMouseLeave(key)}
              >
                {child}
              </div>
            );
          })}
        </div>
        <button
          disabled={prevButtonDisabled}
          onClick={this.prev}
          className={`prev ${prevButtonDisabled ? "noHover" : ""} `}
          style={{ height }}
        />
        <button
          disabled={nextButtonDisabled}
          onClick={this.next}
          style={{ height, right: 0 }}
          className={`next ${nextButtonDisabled ? "noHover" : ""}`}
        />
      </div>
    );
  }
}
