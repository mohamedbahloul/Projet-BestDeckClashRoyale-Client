import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollBttn() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 500); // Adjust this threshold as needed
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`scroll_button_container ${isVisible ? "visible" : ""}`}>
      <button className="scrollButton" onClick={scrollToTop}>
        <span className="scroll_button_icon">
          <FaArrowUp />
        </span>
      </button>
    </div>
  );
}

export default ScrollBttn;
