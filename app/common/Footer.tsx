"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer id="footer" className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-10">
        {/* Left - Logo + Email */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
           
            <span className="text-xl font-bold text-sky-500">TripTrek</span>
          </div>

          {/* Email Subscribe */}
          
        </div>

        {/* About */}
        <div>
          <h4 className="font-bold text-sky-500 mb-4">About</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">New</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold text-sky-500 mb-4">Company</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Partner with Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold text-sky-500 mb-4">Support</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#">Account</a></li>
            <li><a href="#">Support Center</a></li>
            <li><a href="#">Feedback</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-gray-500 text-sm">© 2025 TripTrek. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-500 hover:text-sky-500">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="#" className="text-gray-500 hover:text-sky-500">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="#" className="text-gray-500 hover:text-sky-500">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  );
}