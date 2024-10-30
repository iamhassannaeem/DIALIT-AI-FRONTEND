import { useState } from "react";

const TwoFA = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleVerify = () => {
        if (!code) {
            setError("Please enter the 6-digit code.");
        } else {
            setError("");

        }
    };

    return (
        <div className="flex mt-10 items-center justify-center gap-7">
            <div className="w-full bg-[#EEEEEE] dark:bg-[#1D2532] py-9 px-10 rounded-md md:w-[35%]">
                <div className="text-black dark:text-white font-normal text-2xl">Two Factor Authentication</div>
                <div className="text-[#75849B] dark:text-white">
                    Open your email to enter the code.
                </div>



                <div>
                    <input
                        className="w-full outline-none h-10 rounded-md mt-4 bg-white dark:bg-[#242E3E] pl-2"
                        type="number"
                        placeholder="Enter 6-digit code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="text-red-500 mt-2">{error}</div>
                )}

                <button
                    onClick={handleVerify}
                    disabled={!code}
                    className={`bg-white mt-4 py-2 font-medium dark:bg-[#242E3E] w-full ${!code ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default TwoFA;
