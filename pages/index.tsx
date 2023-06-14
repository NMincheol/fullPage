import React, { WheelEventHandler, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash";

const Home = () => {
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);

  const [scrollIndex, setScrollIndex] = useState<number>(1);
  const [direction, setDirection] = useState<"up" | "down" | "stop">("stop");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const directionHandler = useCallback(
    (newDirection: "up" | "down" | "stop") => {
      if (newDirection === "up") {
        if (scrollIndex !== 1) setScrollIndex((prev) => prev - 1);
      }
      if (newDirection === "down") {
        if (scrollIndex !== 3) setScrollIndex((prev) => prev + 1);
      }
      switchIndex();
    },
    [scrollIndex]
  );

  const debounceWheelHandler: WheelEventHandler<HTMLDivElement> = useCallback(
    debounce((e) => {
      if (direction !== "stop" || isLoading) return;
      setIsLoading(true);
      if (e.deltaY < 0) {
        directionHandler("up");
      }
      if (e.deltaY > 0) {
        directionHandler("down");
      }
    }, 30),
    [directionHandler, direction, isLoading]
  );

  const switchIndex = useCallback(() => {
    if (scrollIndex === 1) {
      firstSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (scrollIndex === 2) {
      secondSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (scrollIndex === 3) {
      thirdSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  }, [scrollIndex]);

  useEffect(() => {
    directionHandler(direction);
  }, [directionHandler, direction]);

  return (
    <div onWheel={debounceWheelHandler}>
      <Section1 ref={firstSectionRef}>Hello</Section1>
      <Section2 ref={secondSectionRef}>this page is</Section2>
      <Section3 ref={thirdSectionRef}>for test</Section3>
    </div>
  );
};

const Section1 = styled.div`
  height: 100vh;
  background-color: green;
`;
const Section2 = styled.div`
  height: 100vh;
  background-color: blue;
`;
const Section3 = styled.div`
  height: 100vh;
  background-color: yellow;
`;

export default Home;
