import { useState } from "react";
import { SelectItemPopup } from "../widgets/SelectItem";

export const URLCard = () => {
  const [url, setUrl] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");

  const isMedia = true;

  const [changeFormatDefault, setChangeFormatDefault] = useState({
    value: "Original",
    submit: false,
  });
  const [changeFormatOpen, setChangeFormatOpen] = useState(false);
  const changeFormat = ["Original", "Video", "Audio"];

  const [audioFormatDefault, setAudioFormatDefault] = useState({
    value: "Original",
    submit: false,
  });
  const [audioFormatOpen, setAudioFormatOpen] = useState(false);
  const audioFormats = ["Original", "MP3", "WAV"];

  const [videoFormatDefault, setVideoFormatDefault] = useState({
    value: "Original",
    submit: false,
  });
  const [videoFormatOpen, setVideoFormatOpen] = useState(false);
  const videoFormats = ["Original", "MP4", "VOB"];

  const [qualityDefault, setQualityDefault] = useState({
    value: "SD",
    submit: false,
  });
  const [qualityOpen, setQualityOpen] = useState(false);
  const quality = ["Original", "Low", "SD", "720", "HD"];

  const submitURL = () => {
    const needConversion =
      (changeFormatDefault.value !== "Original" && changeFormatDefault.submit) ||
      (changeFormatDefault.value === "Audio" &&
        audioFormatDefault.value !== "Original") ||
      (changeFormatDefault.value === "Video" &&
        videoFormatDefault.value !== "Original") ||
      qualityDefault.value !== "Original";

    const conversionString = {
      command: "ffmpeg",
      outputExtension:
        changeFormatDefault.value === "Audio" &&
        changeFormatDefault.submit &&
        audioFormatDefault.submit
          ? audioFormatDefault.value
          : "Original",
    };

    const result = {
      url: url,
      // ... extend with conversion options
    };

    console.log("Submit:", result);
  };

  return (
    <form
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        submitURL();
      }}
    >
      {/* URL Input Section */}
      <div className="space-y-1.5">
        <label htmlFor="url-input" className="block text-sm font-medium text-gray-700">
          Media URL
        </label>
        <input
          id="url-input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/video.mp4"
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-shadow"
        />
      </div>

      {/* Media Options Grid */}
      {isMedia && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Change Format Selector */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
            <span className="text-sm font-medium text-gray-700">Format Type</span>
            <button
              type="button"
              onClick={() => setChangeFormatOpen(true)}
              className="text-sm bg-white px-4 py-1.5 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
            >
              {changeFormatDefault.value}
            </button>
            <SelectItemPopup
              items={changeFormat}
              selectedItem={changeFormatDefault}
              setSelectedItem={setChangeFormatDefault}
              isOpen={changeFormatOpen}
              setIsOpen={setChangeFormatOpen}
              unit="Type"
            />
          </div>

          {/* Output Format (Audio/Video) */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
            <span className="text-sm font-medium text-gray-700">Output Format</span>
            <button
              type="button"
              onClick={() =>
                changeFormatDefault.value === "Video"
                  ? setVideoFormatOpen(true)
                  : setAudioFormatOpen(true)
              }
              className="text-sm bg-white px-4 py-1.5 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
            >
              {changeFormatDefault.value === "Video"
                ? videoFormatDefault.value
                : audioFormatDefault.value}
            </button>
            <SelectItemPopup
              items={
                changeFormatDefault.value === "Video" ? videoFormats : audioFormats
              }
              selectedItem={
                changeFormatDefault.value === "Video"
                  ? videoFormatDefault
                  : audioFormatDefault
              }
              setSelectedItem={
                changeFormatDefault.value === "Video"
                  ? setVideoFormatDefault
                  : setAudioFormatDefault
              }
              isOpen={
                changeFormatDefault.value === "Video"
                  ? videoFormatOpen
                  : audioFormatOpen
              }
              setIsOpen={
                changeFormatDefault.value === "Video"
                  ? setVideoFormatOpen
                  : setAudioFormatOpen
              }
              unit={changeFormatDefault.value + " Format"}
            />
          </div>

          {/* Quality Selector */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
            <span className="text-sm font-medium text-gray-700">Quality</span>
            <button
              type="button"
              onClick={() => setQualityOpen(true)}
              className="text-sm bg-white px-4 py-1.5 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
            >
              {qualityDefault.value}
            </button>
            <SelectItemPopup
              items={quality}
              selectedItem={qualityDefault}
              setSelectedItem={setQualityDefault}
              isOpen={qualityOpen}
              setIsOpen={setQualityOpen}
              unit="Quality"
            />
          </div>

          {/* Time Range Inputs */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
            <span className="text-sm font-medium text-gray-700">Time Range</span>
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                placeholder="00:00"
                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-400"
              />
              <span className="text-gray-400">—</span>
              <input
                type="text"
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
                placeholder="03:40"
                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200"
      >
        Start Processing
      </button>
    </form>
  );
};