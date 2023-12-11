import react, { useState } from "react";
import Lottie from "lottie-react";
import qrannimate from "../Components/qrgif.json";

const LandingPage = () => {
  const [menu, setMenu] = useState(false);

  const [data, setData] = useState("");
  const [qrCode, setQRCode] = useState("");

  const handleGenerateQRCode = async () => {
    const generatedCode = await generateQRCode(data);
    setQRCode(generatedCode);
  };

  const generateQRCode = async (data) => {
    const response = await fetch(
      "https://qrgen-yr8k.onrender.com/qrcode/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );

    const result = await response.json();
    return result.qrCode;
  };

  return (
    <div>
      <section>
        <div className="w-full relative pb-10 px-6 xl:px-0">
          <img
            className="absolute w-full inset-0 h-full object-cover object-center"
            src="https://cdn.tuk.dev/assets/templates/weCare/hero2-bg.png"
            alt="we care family"
          />
          <nav className="lg:hidden relative z-40">
            <div className="flex py-6 justify-between items-center px-4">
              <div>
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg3.svg"
                  alt="logo"
                />
              </div>
              <div className="flex items-center">
                <ul
                  id="list"
                  className={`${
                    menu ? "" : "hidden"
                  } p-2 border-r bg-white absolute rounded top-0 left-0 right-0 shadow mt-16 md:mt-16`}
                >
                  <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                    <a href="javascript:void(0)">
                      <span className="ml-2 font-bold">Products</span>
                    </a>
                  </li>
                </ul>
                <div className="xl:hidden">
                  <img
                    id="open"
                    className={` ${menu ? "hidden" : ""} close-m-menu`}
                    onClick={() => setMenu(!menu)}
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg1.svg"
                    alt="menu"
                  />
                  <div
                    id="close"
                    className={` ${menu ? "" : "hidden"} close-m-menu`}
                    onClick={() => setMenu(!menu)}
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg2.svg"
                      alt="cross"
                    />
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <nav
            role="navigation"
            aria-label="Main"
            tabIndex="0"
            className="hidden relative z-10 w-full lg:flex justify-between items-center p-16"
          >
            <div className="w-1/6">
              <h1
                style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  color: "#4338CA",
                }}
              >
                QR Gen
              </h1>
            </div>
            <div className="w-5/6">
              <div className="flex items-center justify-end">
                <div className="pl-40">
                  <button
                    role="button"
                    aria-label="live chat"
                    className="focus:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-2 font-semibold rounded focus:outline-none"
                  >
                    Live Chat
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <div className="lg:flex items-center relative z-10 container mx-auto">
            <div className="w-full lg:w-1/2 h-full lg:pr-10 xl:pr-0">
              <div
                style={{ width: "300px", margin: "auto", marginTop: "20px" }}
              >
                <Lottie animationData={qrannimate} />
              </div>
            </div>
            <div role="contentinfo" className="w-full lg:w-1/2 h-full">
              <h1
                tabIndex="0"
                className="text-indigo-700 text-4xl lg:text-5xl font-black mb-8"
              >
                Generate QR code for any data
              </h1>
              <br />
              <br />
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  border: "1px solid black",
                  borderRadius: "20px",
                  boxShadow: "10px 10px 10px 10px lightGray",
                  margin: "auto",
                }}
              >
                {qrCode ? (
                  <img
                    style={{
                      width: "300px",
                      height: "290px",
                      borderRadius: "20px",
                    }}
                    src={qrCode}
                    alt="Generated QR Code"
                  />
                ) : (
                  <div style={{ marginTop: "50px" }}>
                    <label
                      for="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter the data
                    </label>
                    <textarea
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Paste here.."
                    ></textarea>
                    <br />
                    <button
                      type="button"
                      onClick={handleGenerateQRCode}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Generate QR Code
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
            /* Top menu */
            .top-100 {
                animation: slideDown 0.5s ease-in-out;
            }
            @keyframes slideDown {
                0% {
                    top: -50%;
                }
                100% {
                    top: 0;
                }
            }
            * {
                outline: none !important;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                -webkit-tap-highlight-color: transparent;
            }`}
      </style>
    </div>
  );
};
export default LandingPage;
