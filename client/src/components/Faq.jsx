import React, { useState, useRef, useEffect } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";

const Faq = ({ title, answer }) => {
  const [active, setActive] = useState(false);

  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleAccordion = () => {
    setActive(!active);
  };
  return (
    <>
      <div className="mt-6">
        <div>
          <button
            className={`bg-gray rounded-2xl cursor-pointer w-full ${active}`}
            onClick={toggleAccordion}
          >
            <div className="text-white">
              <div className="flex text-left items-center justify-between py-8 px-6">
                <h4 className="ml-2 mr-6 text-md font-bold">{title}</h4>
                <div className="p-1 border-2 border-red-500">
                  {!active ? (
                    <PlusIcon className={`h-5 w-5 transition-all duration-200 ${!active ? "opacity-100" : "opacity-0"}`} />
                  ) : (
                    <MinusIcon className={`h-5 w-5 transition-all duration-200 ${active ? "opacity-100" : "opacity-0"}`} />
                  )}
                </div>
              </div>
              <div
                ref={contentRef}
                className={`${
                  active && `ml-6 mr-16 mb-8`
                }  overflow-hidden text-left `}
              >
                <p>{answer}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Faq;
