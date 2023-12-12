import react, { useState } from "react";
import Lottie from "lottie-react";
import qrannimate from "../Components/qrgif.json";
import axios from "axios";

const LandingPage = () => {
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
    // https://qrgen-yr8k.onrender.com
  };

  const handleDownload = () => {
    // Create a temporary link element
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCode;
    downloadLink.download = "qrcode.png"; // Specify the desired file name

    // Trigger a click event on the link to start the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <section>
        <div className="w-full relative pb-10 px-6 xl:px-0">
          <nav className="lg:hidden relative z-40">
            <div className="flex py-6 justify-between items-center px-4">
              <div>
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
              <div className="flex items-center"></div>
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
                <div className="pl-40"></div>
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
                  <>
                    <img
                      style={{
                        width: "250px",
                        height: "250px",
                        borderRadius: "20px",
                        margin: "auto",
                      }}
                      src={qrCode}
                      alt="Generated QR Code"
                    />
                    <button
                      type="button"
                      style={{ background: "#4338CA" }}
                      onClick={handleDownload}
                      className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      style={{ background: "#4338CA", marginLeft: "10px" }}
                      onClick={() => window.location.reload()}
                      className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      Regenerate
                    </button>
                  </>
                ) : (
                  <div style={{ marginTop: "50px" }}>
                    <div>
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
                    </div>

                    <br />
                    <button
                      type="button"
                      style={{ background: "#4338CA" }}
                      onClick={handleGenerateQRCode}
                      className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
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
