import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import PumpkinIcon from "../../utilities/icons/Pumpkin";
import { wizardImages } from "../../utilities";
import Faq from "../Faq";
import Profile from "../Profile";
import { faq, team } from "../../utilities";
import { countdown } from "../../utilities/functions";

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [image, setImage] = useState(wizardImages[counter]);
  const [countDownDate, setCountDownDate] = useState({});

  useEffect(() => {
    let t = setTimeout(() => {
      setCountDownDate(countdown("2022-09-10"));
    }, 1000);
    return () => clearTimeout(t);
  }, [countDownDate]);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (counter < wizardImages.length - 1) {
        setCounter(counter + 1);
        setImage(wizardImages[counter + 1]);
      } else {
        setCounter(0);
        setImage(wizardImages[0]);
      }
    }, 500);
    return () => clearInterval(timerId);
  }, [counter]);

  return (
    <Layout>
      <div className="bg-landingImage fadeIn flex flex-col justify-center items-center">
        <h2 className="uppercase text-white font-bold text-4xl lg:text-7xl lg:font-extrabold mb-10">
          The Soul Taker
        </h2>
        <button className="bg-black border-4 border-red-500 rounded-full p-6 mb-10 text-white uppercase">
          Mint Now
        </button>
        {countDownDate.days > 0 && (
          <div className="bg-black border-4 fadeIn flex flex-row border-red-500 rounded-full p-6 text-white uppercase">
            <>
              {" "}
              <div className="flex flex-col items-center mr-4 ml-4">
                <p>{countDownDate.days}</p>
                <p>DAYS</p>
              </div>
              <div className="flex flex-col items-center mr-4">
                <p>{countDownDate.hours}</p>
                <p>HOURS</p>
              </div>
              <div className="flex flex-col items-center mr-4">
                <p>{countDownDate.mins}</p>
                <p>MINS</p>
              </div>
              <div className="flex flex-col items-center mr-4">
                <p>{countDownDate.secs}</p>
                <p>SECS</p>
              </div>
            </>
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="bg-black mx-auto lg:px-10 text-center lg:w-1/2">
          <div className="flex justify-center pt-8 mb-4">
            <div className="my-auto">
              <PumpkinIcon />
            </div>

            <h2 className="font-dracula uppercase text-red-500 my-auto text-3xl ">
              About Soul Taker
            </h2>
            <div className="my-auto">
              <PumpkinIcon />
            </div>
          </div>

          <p className="text-white px-6 text-left pb-6">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit esse molestie consequat, vel illum dolore eu feugiat nulla
            facilisis at vero eros et accumsan et iusto odioDuis autem vel eum
            iriure dolor in hendrerit in vulputate velit esse molestie
            consequat, vel illum dolore eu feugiat nulla facilisis at vero eros
            et accumsan et iusto odioLorem ipsum dolor sit amet, consectetuer
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
            quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
            aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in
            hendrerit in vulputate velit esse molestie consequat, vel illum
            dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
            odioDuis autem vel eum iriure dolor in hendrerit in vulputate velit
            esse molestie consequat, vel illum dolore eu feugiat nulla facilisis
            at vero eros et accumsan et iusto odio
          </p>
        </div>
        <div className="bg-wizard-gradient py-8 px-9 flex justify-center items-center lg:w-1/2">
          <img src={image} alt="wizard" />
        </div>
      </div>

      <div className="bg-faq pt-8 px-9 pb-12">
        <div className="flex justify-center pt-6">
          <div className="my-auto">
            <PumpkinIcon />
          </div>
          <h2 className="font-dracula uppercase text-red-500 my-auto text-3xl ">
            FAQ
          </h2>
          <div className="my-auto">
            <PumpkinIcon />
          </div>
        </div>
        <div className="mt-1 md:w-1/2 md:mx-auto">
          {faq.map((f, idx) => (
            <div key={idx}>
              <Faq
                title={f.title}
                answer="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-black py-20 px-9 ">
        <div className="flex justify-center pt-6">
          <div className="my-auto">
            <PumpkinIcon />
          </div>
          <h2 className="font-dracula uppercase text-red-500 my-auto text-3xl ">
            MEET THE TEAM
          </h2>
          <div className="my-auto">
            <PumpkinIcon />
          </div>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-6 lg:grid-cols-3 md:w-1/2 md:mx-auto">
          {team.map((t, idx) => (
            <div key={idx}>
              {" "}
              <Profile img={t.img} name={t.name} role={t.role} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
