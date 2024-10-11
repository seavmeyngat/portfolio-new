import React, { useEffect, useState } from 'react';
import image from '../images/Untitled.jpeg'; // Fallback image
import image1 from '../images/projects.jpeg'
import image2 from '../images/project.png'
import image3 from '../images/faritel.png'
import image4 from '../images/brife2.png'
import image5 from '../images/rabbit.jpeg'
import image6 from '../images/weather.jpeg'

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState({}); // Initialize with an empty object

  const apiUrl = 'http://localhost:1337/api/images?populate=*';
  const contactUrl = 'http://localhost:1337/api/contacts'; // URL for contact info
  const token = "f04ba127d8782d95c7f1914494416bc192383ab1c1b17c9add013ca228a793a42fb1f46e301cc477643185cdf930192895994c44c4674930f8f793ec2c0613f1f5b90005c97ac86834f1228bf1ba71b14840e12913a11f9b7ac7377c5f580e607d3ba38997c69ad1d6d3e0f223efd32a03d68ef9ad60c7194f72b0764199c045";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImages(data.data); // Set the images data from the API
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    const fetchContact = async () => {
      try {
        const response = await fetch(contactUrl, {
          headers: {
            'Authorization': `Bearer ${token}`, // Add token to Authorization header
            'Content-Type': 'application/json' // Ensure content type is JSON
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Contact Data:', data);

        if (data && data.data && data.data.length > 0) {
          const contactInfo = data.data[0]; // Get the first contact info object
          setContact(contactInfo); // Set contact info in state
        } else {
          console.log('No contact data found');
        }
      } catch (error) {
        console.error('Error fetching contact information:', error);
      }
    };

    fetchContact();
    fetchImages(); // Fetch images
  }, [apiUrl, contactUrl]);

  return (
    <section className='w-full h-auto bg-gray-200 font-medium'>
      <div className="container w-full md:w-[60%] mx-auto p-6 ">
        {/* Navigation */}
        <div className="menu-bar flex justify-between items-center w-full">
          <h2 className="font-knewave text-4xl md:text-6xl">
            NGAT <br /> SEAVMEY
          </h2>

          {/* Hamburger Icon */}
          <button
            className="block md:hidden text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            &#9776; {/* Hamburger icon */}
          </button>

          {/* Menu */}
          <div className={`menu ${isOpen ? 'block' : 'hidden'} md:block mt-6 md:mt-0`}>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 items-center">
              <li>
                <a href="#home" className="text-black text-lg md:text-xl font-bold hover:bg-gray-200 px-6 py-1">HOME</a>
              </li>
              <li>
                <a href="#about" className="text-black text-lg md:text-xl font-bold hover:bg-gray-200 px-6 py-1">ABOUT</a>
              </li>
              <li>
                <a href="#project" className="text-black text-lg md:text-xl font-bold hover:bg-gray-200 px-6 py-1">PROJECT</a>
              </li>
              <li>
                <a href="#contact" className="text-black text-lg md:text-xl font-bold hover:bg-gray-200 px-6 py-1">CONTACT</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <section id="home">
          <div className="myself flex flex-col lg:flex-row lg:items-start mt-10 lg:justify-center lg:space-x-12">
            <div className="img flex justify-center lg:justify-start">
              {/* Display loading spinner or fallback image */}
              {loading ? (
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"></div>
              ) : images.length > 0 ? (
                images.map((imageObj) => {
                  const imgUrl = imageObj.image[0]?.url; // Access the URL correctly
                  return imgUrl ? (
                    <img
                      key={imageObj.id} // Ensure each image has a unique key
                      src={`http://localhost:1337${imgUrl}`} // Use full URL
                      alt="Ngat Seavmey"
                      className="w-72 h-72 lg:w-96 lg:h-96 object-cover rounded-full" // Added rounded-full class
                    />
                  ) : null; // Handle case where imgUrl is undefined
                })
              ) : (
                <img
                  src={image}
                  alt="Ngat Seavmey"
                  className="w-72 h-72 lg:w-96 lg:h-96 object-cover rounded-full" // Added rounded-full class
                />
              )}
            </div>
            <div className="about lg:text-left lg:ml-12 mt-6 lg:mt-0">
              <h1 className="font-fredoka text-3xl lg:text-5xl">
                I'm <br /> NGAT SEAVMEY
              </h1>
              <h1 className="font-fredoka text-3xl lg:text-5xl">
                Full-Stack Developer
              </h1>
              <p className="font-fredoka text-xl lg:text-2xl mt-4">
                My name is Ngat Seavmey. <br />
                I’m 17 years old. I’m a <br />
                student in PSE. I’m from <br />
                Banteay Meanchey province. <br />
                And in the future, I want to <br />
                be a Full Stack Developer.
              </p>
            </div>
          </div>
        </section>



        <section id='about'>
          <div className="flex flex-col lg:flex-row mt-8">
            <div className="box-1 w-full lg:w-2/3 space-y-6">
              <div className="passions">
                <h1 className="text-2xl font-bold">My Passions</h1>
                <p className="text-lg">
                  I believe technology is so good for a lot of people because right now a lot of people use phones.
                  I will try to create solutions for all people that are easy to use.
                </p>
              </div>

              <div className="quote">
                <h1 className="text-2xl font-bold">Quote That I Like</h1>
                <p className="text-lg">Everything has beauty, but not everyone sees it.</p>
              </div>

              <div className="educations">
                <h1 className="text-2xl font-bold">List of My Educations</h1>
                <p className="text-lg">English<br />Khmer<br />Computer<br />Math<br />Soft Skills</p>
              </div>

              <div className="technologies">
                <h1 className="text-2xl font-bold">Highlight the Technologies</h1>
                <p className="text-lg">
                  1. Install and configure the work environment
                </p>
                <p className="text-lg">
                  2. Create user interface mockups
                </p>
                <p className="text-lg">
                  3. Develop static user interfaces
                </p>
                <p className="text-lg">
                  4. Develop dynamic components of user interfaces
                </p>
                <p className="text-lg">
                  5. Set up a relational database
                </p>
                <p className="text-lg">
                  6. Develop SQL and NoSQL data access components
                </p>
                <p className="text-lg">
                  7. Develop server-side business components
                </p>
                <p className="text-lg">
                  8. Document the deployment of a dynamic web
                </p>
              </div>


            </div>
            <div className="box-2 w-full lg:w-1/3 flex flex-col items-center mt-[50PX] lg:mt-0">
              <img src={image} alt="Study" className="rounded-full shadow-lg w-full h-72 object-cover" />
              <div className="myself mt-4">
                <h1 className="text-2xl font-bold text-center">Introduce Myself</h1>
                <p className="text-lg">
                  My name is Ngat Seavmey. I’m 17 years old. I’m a student in PSE.
                  I’m from Banteay Meanchey province but now I stay in PSE. In my free time,
                  I like reading books, playing basketball, and researching code.
                  In the future, I want to be a Full Stack Developer. I believe technology
                  is so good for a lot of people because right now many people use phones.
                  I will try to create solutions that are easy for everyone to use.
                </p>
              </div>
            </div>
          </div>
        </section>


        <section id='project' className="container mx-auto ">
          {/* Section Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            My Project
          </h1>

          {/* First Project */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-1xl md:text-3xl font-bold mb-3 md:mb-4">
              My project name is Rabbit School
            </h2>
            <p className="text-base md:text-xl leading-relaxed mb-6 md:mb-8">
              In this project have 4 member . I do the project for rabbit to easy to use and easy to know . I did it 5week .
            </p>
            <img
              src={image5}
              alt="Tour and Travel Agency"
              className="w-full  md:h-[300px] h-[200px]"
            />
          </div>

          <div className="mb-10 md:mb-16">
            <h2 className="text-1xl md:text-3xl font-bold mb-3 md:mb-4">
              My porject name is Phnom Penh Weather Website
            </h2>
            <p className="text-base md:text-xl leading-relaxed mb-6 md:mb-8">
              In this project have 4 member . I do the project for user easy to find the weather and can see weather tomorrow .
            </p>
            <img
              src={image6}
              alt="Tour and Travel Agency"
              className="w-full  md:h-[300px] h-[200px]"
            />
          </div>
          <div className="mb-10 md:mb-16">
            <h2 className="text-1xl md:text-3xl font-bold mb-3 md:mb-4">
              My project name is Tour and Travel Agency
            </h2>
            <p className="text-base md:text-xl leading-relaxed mb-6 md:mb-8">
              My project has 4 members. This website allows you to know the places to visit in Cambodia, providing location
              information that helps people find their destination.
            </p>
            <img
              src={image1}
              alt="Tour and Travel Agency"
              className="w-full  md:h-[300px] h-[200px]"
            />
          </div>

          {/* Second Project */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-1xl md:text-3xl font-bold mt-3 md:mt-4">
              My project name is Khmer Shop Online
            </h2>
            <p className="text-base md:text-xl leading-relaxed mt-3 md:mt-4">
              My project has 5 members, and my team designed it using Figma.
            </p>
            <img
              src={image2}
              alt="Khmer Shop Online"
              className="w-full md:h-[300px] h-[200px] mb-6 md:mb-8 mt-5"
            />
          </div>

          {/* Third Project */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-1xl md:text-3xl font-bold mb-3 md:mb-4">
              This project is named PMKH
            </h2>
            <p className="text-base md:text-xl leading-relaxed mb-6 md:mb-8">
              This project is about selling bikes, and we have 4 members.
            </p>
            <img
              src={image3}
              alt="PMKH"
              className="w-full  md:h-[300px] h-[200px]"
            />
          </div>

          {/* Fourth Project */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-1xl md:text-3xl font-bold mt-3 md:mt-4">
              My project name is Fairy-Tale
            </h2>
            <p className="text-base md:text-xl leading-relaxed mt-3 md:mt-4">
              My project has 5 members. This project is for children to watch videos and read on the website. My team also
              designed it using Figma.
            </p>
            <img
              src={image4}
              alt="Fairy Tale"
              className="w-full md:h-[300px] h-[200px] mb-6 md:mb-8 mt-5"
            />
          </div>
        </section>



        <section id='contact' className="w-full max-w-screen-lg m-auto">
          <div className="md:space-x-6 flex m-auto md:flex-row flex-col-reverse gap-5">
            {/* Form Section */}
            <div className="max-w-md w-full mb-6 md:mb-0 p-6 bg-gray-100 rounded-lg shadow-md flex flex-col justify-between mt-auto">
              <h1 className="text-2xl font-bold mb-4">Contact Information</h1>
              <form id="contact" action="" method="post" className="flex flex-col flex-grow">
                <fieldset className="mb-4">
                  <input
                    placeholder="Your name"
                    type="text"
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-400 transition duration-200"
                  />
                </fieldset>
                <fieldset className="mb-4">
                  <input
                    placeholder="Your Email Address"
                    type="email"
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-400 transition duration-200"
                  />
                </fieldset>
                <fieldset className="mb-4">
                  <input
                    placeholder="Your Phone Number"
                    type="tel"
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-400 transition duration-200"
                  />
                </fieldset>
                <fieldset className="mb-4">
                  <textarea
                    placeholder="Type your Message Here...."
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-400 transition duration-200 h-24 resize-none"
                  ></textarea>
                </fieldset>
                <fieldset>
                  <button
                    name="submit"
                    type="submit"
                    id="contact-submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Submit
                  </button>
                </fieldset>
              </form>
            </div>

            {/* Contact Details Section */}
            <div className="max-w-md w-full flex-grow p-6 bg-gray-100 rounded-lg shadow-md flex flex-col gap-4 ">
              <h2 className="text-2xl font-bold mb-4 flex ">Contact Details</h2>
              <p className="text-[20px] max-sm:text-[14px] mb-4">
                Email:
                <a href={`mailto:${contact.email || 'seavmey.ngat@institute.pse.ngo'}`} className="text-blue-500 underline">
                  {contact.email || 'seavmey.ngat@institute.pse.ngo'}
                </a>
                <br /><br />
                Phone Number:
                <a href={`tel:${contact.phone_number || '0978432206'}`} className="text-blue-500 underline">
                  {contact.phone_number || '0978432206'}
                </a>
                <br /><br />
                Telegram:
                <a href={`https://t.me/${contact.telegram || '086294250'}`} className="text-blue-500 underline">
                  {contact.telegram || '086294250'}
                </a>
              </p>

            </div>
          </div>
        </section>





      </div>
    </section>

  );
};

export default HomePage;
