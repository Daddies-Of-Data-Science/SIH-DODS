import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="relative bg-blue-500 text-white h-screen flex items-center justify-center">
        <img
          src="https://plus.unsplash.com/premium_vector-1682298545718-d32ae0b5a44a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Innovation Central"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold mb-4"
          >
            Welcome to Innovation Central
          </motion.h1>
          <p className="text-xl mb-6">
            A unified platform for research, innovation, IPR management, and
            start-up activities.
          </p>
          <motion.div whileHover={{ scale: 1.1 }} className="inline-block">
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Explore Now
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold text-center mb-12"
          >
            What We Offer
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-6 rounded-lg shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3RhcnR1cHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Startups"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Startups</h3>
              <p className="text-gray-600 mb-4">
                Track your KPIs, investments, and progress with personalized
                dashboards and notifications.
              </p>
              <Link to="/startup" className="text-blue-600 hover:underline">
                Learn More
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-6 rounded-lg shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJlc2VhcmNoZXJzfGVufDB8fDB8fHww"
                alt="Researchers"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Researchers</h3>
              <p className="text-gray-600 mb-4">
                Manage your publications, grants, and collaborations with
                tailored insights and tools.
              </p>
              <Link to="/research" className="text-blue-600 hover:underline">
                Learn More
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-6 rounded-lg shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1630673265211-8f8aca42fd5e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fEludmVzdG9yc3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Investors"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Investors</h3>
              <p className="text-gray-600 mb-4">
                Access portfolio management, investment insights, and market
                trends to make informed decisions.
              </p>
              <Link to="/investor" className="text-blue-600 hover:underline">
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Enhanced Collaboration
          </motion.h2>
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-12">
            <img
              src="https://plus.unsplash.com/premium_vector-1725434523116-02d87f9779e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbGxhYm9yYXRpb258ZW58MHx8MHx8fDA%3D"
              alt="Collaboration"
              className="rounded-lg shadow-lg w-full lg:w-1/2 md:h-[60vh]"
            />
            <div className="lg:w-1/2">
              <p className="text-lg text-gray-700 mb-4">
                Connect with mentors, collaborate on real-time projects, and
                access resources to support your growth.
              </p>

              <p className="hidden lg:block text-gray-700 mb-8 text-lg">
                With Innovation Central, you’ll have access to cutting-edge
                tools and features designed to help you succeed. Whether you are
                working on a startup, publishing your latest research, or making
                strategic investments, our platform is tailored to your needs.
                Engage in real-time collaboration with like-minded innovators,
                receive valuable mentorship, and accelerate your journey from
                idea to implementation. Our comprehensive resources and
                personalized dashboards ensure that you stay on top of your
                progress, with all your data in one place.
              </p>

              <Link
                to="/collaboration"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold text-center mb-12"
          >
            What Our Users Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg shadow-lg bg-gray-100"
            >
              <p className="text-gray-700 mb-4">
                "Innovation Central has streamlined our entire research process.
                The collaboration tools are a game-changer!"
              </p>
              <p className="font-bold text-blue-600">- Dr. Aaditya Malani</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg shadow-lg bg-gray-100"
            >
              <p className="text-gray-700 mb-4">
                "As a startup founder, having all our KPIs and investor
                communications in one place has been a lifesaver."
              </p>
              <p className="font-bold text-blue-600">-Saankh</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg shadow-lg bg-gray-100"
            >
              <p className="text-gray-700 mb-4">
                "Investing in innovation has never been easier. The real-time
                insights and market trends are top-notch!"
              </p>
              <p className="font-bold text-blue-600">- Raju</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-800 text-white text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold mb-6"
        >
          Ready to Innovate?
        </motion.h2>
        <p className="text-lg mb-6">
          Join thousands of startups, researchers, and investors already using
          Innovation Central.
        </p>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      <footer className="bg-blue-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Innovation Central. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
