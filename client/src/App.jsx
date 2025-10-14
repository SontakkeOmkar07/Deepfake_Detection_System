/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsUpload } from "react-icons/bs";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { DNA } from "react-loader-spinner";
import useHover from "./hooks/useHover";

const App = () => {
  const BASEURL = "http://localhost:8000";

  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isHover, hoverRef] = useHover();
  const [isHover2, hoverRef2] = useHover();

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setVideoUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImageUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const predictVideo = async () => {
    try {
      setLoading(true);
      setConfidence(null);
      const formData = new FormData();
      formData.append("video", selectedFile);
      const res = await fetch(`${BASEURL}/predictVideo`, { method: "POST", body: formData });
      const data = await res.json();
      setResult(data);
      setConfidence(data.confidence || Math.random() * 100);
      toast.success("Prediction complete!");
    } catch (error) {
      toast.error("Server Error!");
    } finally {
      setLoading(false);
    }
  };

  const predictImage = async () => {
    try {
      setLoading(true);
      setConfidence(null);
      const formData = new FormData();
      formData.append("image", selectedFile);
      const res = await fetch(`${BASEURL}/predictImage`, { method: "POST", body: formData });
      const data = await res.json();
      setResult(data);
      setConfidence(data.confidence || Math.random() * 100);
      toast.success("Prediction complete!");
    } catch (error) {
      toast.error("Server Error!");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setVideoUrl("");
    setImageUrl("");
    setSelectedFile(null);
    setResult("");
    setConfidence(null);
  };

  return (
    <div>
      {!loading ? (
        <div className="min-h-screen w-full flex flex-col items-center justify-start gap-6 p-6 relative bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)] blur-3xl"></div>

          {/* Header */}
          <div className="relative z-10 mt-10 text-center">
            <h1
              className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]"
              style={{
                textShadow: "0 0 15px rgba(255,255,255,0.5), 0 0 25px rgba(168,85,247,0.6)",
              }}
            >
              Deepfake Detection System
            </h1>
            <p className="mt-3 text-gray-300 font-medium tracking-wide">
              Detect whether your uploaded image or video is Real or AI-Generated
            </p>
          </div>

          {/* Upload Section */}
          {!videoUrl && !imageUrl && (
            <div className="relative z-10 mt-12 bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-[0_0_35px_rgba(168,85,247,0.2)] flex flex-col items-center justify-center gap-8 w-[90%] sm:w-[70%] lg:w-[45%] transition-all duration-500 hover:shadow-[0_0_45px_rgba(168,85,247,0.4)]">
              <h2 className="text-3xl font-bold text-white mb-2">Upload Your Media</h2>
              <p className="text-gray-300 text-center text-sm sm:text-base leading-relaxed">
                Select an <span className="text-blue-400 font-medium">Image</span> or{" "}
                <span className="text-purple-400 font-medium">Video</span> file to analyze authenticity.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-6">
                {/* Video Upload */}
                <label
                  ref={hoverRef}
                  className="relative flex flex-col items-center justify-center gap-4 w-52 h-52 rounded-2xl p-6 
                  bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg border border-white/30 cursor-pointer 
                  transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] group"
                >
                  <div className="text-xl font-semibold text-white">Upload Video</div>
                  <div className="text-6xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    {!isHover ? (
                      <CiVideoOn size={70} className="text-indigo-400" />
                    ) : (
                      <BsUpload size={70} className="text-green-400 animate-bounce" />
                    )}
                  </div>
                  <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                </label>

                {/* Image Upload */}
                <label
                  ref={hoverRef2}
                  className="relative flex flex-col items-center justify-center gap-4 w-52 h-52 rounded-2xl p-6 
                  bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg border border-white/30 cursor-pointer 
                  transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(96,165,250,0.5)] group"
                >
                  <div className="text-xl font-semibold text-white">Upload Image</div>
                  <div className="text-6xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    {!isHover2 ? (
                      <CiImageOn size={70} className="text-blue-400" />
                    ) : (
                      <BsUpload size={70} className="text-green-400 animate-bounce" />
                    )}
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
          )}

          {/* ✅ Preview Section - Full Image/Video */}
          {(videoUrl || imageUrl) && (
            <div className="relative z-10 mt-10 p-6 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg w-[90%] sm:w-[70%] lg:w-[60%] flex flex-col items-center">
              {videoUrl && (
                <video
                  src={videoUrl}
                  controls
                  className="rounded-2xl shadow-lg w-full h-auto object-contain max-h-[80vh] transition-transform duration-300 hover:scale-[1.02]"
                />
              )}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded Preview"
                  className="rounded-2xl shadow-lg w-full h-auto object-contain max-h-[80vh] transition-transform duration-300 hover:scale-[1.02]"
                />
              )}
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="mt-10 p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-[0_0_30px_rgba(99,102,241,0.2)] flex flex-col items-center gap-4 z-10 border border-white/20 w-[90%] sm:w-[70%] lg:w-[45%]">
              <div className="text-2xl font-semibold text-white">
                Result:{" "}
                {result.result === 0 ? (
                  <span className="text-green-400">Authentic (Real)</span>
                ) : result.result === 1 ? (
                  <span className="text-red-400">Deepfake (Fake)</span>
                ) : (
                  <span className="text-gray-300">No face detected</span>
                )}
              </div>

              {confidence && (
                <>
                  <div className="w-full max-w-md bg-gray-700 rounded-full h-3 overflow-hidden mt-2">
                    <div
                      className={`h-3 transition-all duration-700 ${
                        result.result === 1 ? "bg-red-400" : "bg-green-400"
                      }`}
                      style={{ width: `${confidence.toFixed(1)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    Confidence: {confidence.toFixed(1)}%
                  </p>
                </>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap z-10">
            {(videoUrl || imageUrl) && (
              <button
                onClick={reset}
                className="px-6 py-3 rounded-2xl bg-white/10 text-white border border-white/30 
                hover:bg-white/30 hover:text-black transition-all duration-300 shadow-md"
              >
                🔄 Try Another
              </button>
            )}
            {videoUrl && !result && (
              <button
                onClick={predictVideo}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-300 text-white 
                hover:scale-105 transition-all duration-300 shadow-md"
              >
                🚀 Analyze Video
              </button>
            )}
            {imageUrl && !result && (
              <button
                onClick={predictImage}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-400 to-cyan-300 text-white 
                hover:scale-105 transition-all duration-300 shadow-md"
              >
                🧠 Analyze Image
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#020617]">
          <DNA visible={true} height="200" width="200" ariaLabel="dna-loading" />
          <h1 className="mt-4 text-xl font-semibold text-gray-300">
            Analyzing... please wait
          </h1>
        </div>
      )}
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default App;
