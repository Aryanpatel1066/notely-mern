import "../index.css"
import NotelyLogo from "../assets/Notely2.png"
function Footer() {
    return (
    <div className="boundary">
      <footer className="bg-gray-900 text-white p-6 md:p-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between text-center md:text-left">
          {/* Left Section - Links */}
          <div className="grid grid-cols-2 gap-6 text-sm md:text-base">
            <div className="space-y-2">
              <p>Notely Business</p>
              <p>Teach On Notely</p>
              <p>Get the App</p>
              <p>About Us</p>
              <p>Contact Us</p>
            </div>
            <div className="space-y-2">
              <p>Careers</p>
              <p>Blog</p>
              <p>Help & Support</p>
              <p>Affiliate</p>
              <p>Investors</p>
            </div>
          </div>
  
          {/* Right Section - Branding */}
          <div className="mt-6 md:mt-0">
            <img src={NotelyLogo} className="h-20 w-auto transition-transform duration-300 hover:scale-110" alt="Notely Logo"/>
            <p className="text-sm md:text-lg mt-2">&copy; 2025 Notely. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    );
  }
  export default Footer;