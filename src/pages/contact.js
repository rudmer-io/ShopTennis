import emailjs from "emailjs-com";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";

export default function ContactUs({ emailId, templateId, userId }) {
  const router = useRouter();

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm(emailId, templateId, e.target, userId).then(
      (result) => {
        toast.success(`Sent mail successfully`);
      },
      (error) => {
        toast.error(`Could not send the mail`);
      },

      router.push("/")
    );

    e.target.reset();
  }

  return (
    <>
      <Header />

      <div className="bg-[#10acd3] dark:bg-gray-800 justify-between flex flex-col min-h-screen md:flex-row pt-8">
        <Head>
          <title>Contact us</title>
          <link
            rel="icon"
            href="https://res.cloudinary.com/dssvrf9oz/image/upload/v1620273120/image-removebg-preview_6_obe3fv.png"
          />
        </Head>
        <div className="pl-20 w-[420px] pr-5">
          <h2 className="text-4xl font-bold text-[#023047] dark:text-gray-100">
            Help us improve
          </h2>
          <p className="text-[#023047] dark:text-gray-200 pt-5">
            Fill up the form and I will get back to you
          </p>
          <div className="hidden md:flex  hover:ring-2 rounded-lg cursor-pointer focus:outline-none p-3  transform-gpu pr-4 mt-20 ring-blue-900 dark:ring-blue-400">
            <img
              src="https://res.cloudinary.com/dssvrf9oz/image/upload/v1620314548/931-9311379_email-icons-white-color-white-email-icon-png-removebg-preview_vzxdln.png"
              alt="emailIcon"
              className="h-6 ml-2 mr-2"
            />
            <p className="text-[#023047] dark:text-gray-200">
              avneeshagarwal0612@gmail.com
            </p>
          </div>
          <div className="hidden md:flex ring-blue-900 dark:ring-blue-400 hover:ring-2 rounded-lg cursor-pointer focus:outline-none p-3  transform-gpu pr-4 mt-5">
            <img
              src="https://res.cloudinary.com/dssvrf9oz/image/upload/v1620391308/154-1541366_transparent-edit-icon-png-location-white-icon-png-removebg-preview_1_ewvzdm.png"
              alt="locationIcon"
              className="h-7 ml-2 mr-2"
            />
            <p className="text-[#023047] dark:text-gray-200">India</p>
          </div>
          <a href="https:instagram.com/avneesh__agarwal" target="_blank">
            <div className="hidden md:flex items-center ring-blue-900 dark:ring-blue-400 hover:ring-2 rounded-lg cursor-pointer focus:outline-none  transform-gpu pr-4 mt-5">
              <img
                src="https://res.cloudinary.com/dssvrf9oz/image/upload/v1620289544/md_5af2d4cabfdf2-removebg-preview_mwmvjh.png"
                alt="instagramIcon"
                className="h-14"
              />
              <p className="text-[#023047] dark:text-gray-200">
                avneesh__agarwal
              </p>
            </div>
          </a>
          <a href="https:instagram.com/avneesh__agarwal" target="_blank">
            <div className="hidden md:flex items-center ring-blue-900 dark:ring-blue-400 hover:ring-2 rounded-lg cursor-pointer focus:outline-none  transform-gpu pr-4 mt-5">
              <img
                className="h-14"
                src="https://res.cloudinary.com/dssvrf9oz/image/upload/v1620292929/1fdbd88fec469fc342cdff7ea25b8bd8-removebg-preview_vctiar.png"
                alt="LinkedInIcon"
              />
              <p className="text-[#023047] dark:text-gray-200">
                Avneesh Agarwal
              </p>
            </div>
          </a>
        </div>
        <form
          onSubmit={sendEmail}
          className="flex flex-col bg-white h-[620px] rounded-3xl ml-10 mr-8 md:w-2/5 md:mr-5 md:mb-0"
        >
          <div className="flex flex-col m-5">
            <h3 className="ml-2 text-blue-700 font-semibold text-md">
              Your Name
            </h3>
            <input
              type="text"
              className="ring-2 ring-gray-200 p-2 m-2 rounded-md focus:outline-none focus:ring-blue-500"
              name="name"
            />
            <h3 className="ml-2 text-blue-700 font-semibold text-md">
              Your Email
            </h3>

            <input
              type="email"
              className="ring-2 ring-gray-200 p-2 m-2 rounded-md focus:outline-none focus:ring-blue-500"
              name="email"
            />
            <h3 className="ml-2 text-blue-700 font-semibold text-md">
              Subject of your mail
            </h3>

            <input
              type="text"
              className="ring-2 ring-gray-200 p-2 m-2 rounded-md focus:outline-none focus:ring-blue-500"
              name="subject"
            />
            <h3 className="ml-2 text-blue-700 font-semibold text-md">
              Your message
            </h3>
            <textarea
              className="ring-2 ring-gray-200 p-2 m-2 rounded-md focus:outline-none focus:ring-blue-500 h-80 max-h-[240px] min-h-[240px]"
              cols="30"
              rows="8"
              name="message"
            ></textarea>
            <button
              type="submit"
              className="text-white bg-blue-500 m-2 w-60 h-12 rounded-lg mt-3 ml-auto"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const emailId = process.env.GMAIL_ID;
  const templateId = process.env.TEMPLATE_ID;
  const userId = process.env.USER_ID;

  return { props: { emailId, templateId, userId } };
}
