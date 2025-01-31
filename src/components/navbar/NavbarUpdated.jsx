import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";
import Image1 from "../../assets/logo.png";
import { ModeToggle } from "../ModeToggle";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import AOS from "aos";
import "aos/dist/aos.css";

const NavbarUpdated = () => {
  const [showLoans, setShowLoans] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: true,    // Whether animation should happen only once
    });
  }, []);

  return (
    <div>
      <nav>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img
                src={Image1}
                alt="Logo"
                className="h-10 mr-2 cursor-pointer"
                data-aos="fade-down" // Animation for logo
              />
            </Link>
          </div>
          <div className="hidden md:flex justify-center align-middle space-x-7">
            <Link to="#" className="content-center" data-aos="fade-down">
              Open Account
            </Link>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link" data-aos="fade-down">Loan</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-[900px] p-6 shadow-lg rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 border border-gray-300 rounded-lg">
                    <h2 className="text-2xl font-medium mb-4">Retail Loans</h2>
                    <hr className="mb-6 border-gray-300" />
                    <div>
                      <h3 className="text-lg font-medium mb-2 underline">
                        <Link to="/form" className="content-center">
                          Home Loan
                        </Link>
                      </h3>
                      <p className="mb-6">
                        Structured to facilitate homeownership, allowing you to
                        invest in your future while managing monthly payments
                        within your financial means.
                      </p>
                      <h3 className="text-lg font-medium mb-2 underline">
                        Auto Loans
                      </h3>
                      <p>
                        Tailored to provide flexible financing options, enabling
                        you to purchase your dream vehicle without straining
                        your budget or depleting your savings.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 border border-gray-300 rounded-lg">
                    <h2 className="text-2xl font-medium mb-4">
                      Corporate Loans
                    </h2>
                    <hr className="mb-6 border-gray-300" />
                    <div>
                      <h3 className="text-lg font-medium mb-2 underline">
                        Corporate Loans
                      </h3>
                      <p>
                        Designed to empower businesses with the necessary
                        capital to expand operations, seize growth
                        opportunities, and enhance cash flow without
                        compromising financial stability.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Link
                    to="/loans"
                    className="text-lg font-medium hover:underline"
                  >
                    View All Loans
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
            <Link to="#" className="content-center" data-aos="fade-down">
              Credit Cards
            </Link>
            <Link to="#" className="content-center" data-aos="fade-down">
              Insure
            </Link>
            <Link to="#" className="content-center" data-aos="fade-down">
              Bank with Us
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center space-x-2" data-aos="fade-down">
              <IoPersonOutline />
              <span>Open an Account</span>
            </Button>
            <Button className="flex items-center space-x-2" data-aos="fade-down">
              <CiLock />
              <span>Sign In</span>
            </Button>

            {/* Theme Switch  */}
            <ModeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              onClick={toggleMobileMenu}
              className="focus:outline-none md:hidden"
              data-aos="fade-down"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 p-4">
            <Link to="#">Accounts & Expenses</Link>
            <Link
              to="#"
              onMouseEnter={() => setShowLoans(true)}
              onMouseLeave={() => setShowLoans(false)}
            >
              Loan
            </Link>
            <Link to="#">Credit Cards</Link>
            <Link to="#">Insure</Link>
            <Link to="#">Bank with Us</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarUpdated;