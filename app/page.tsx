"use client";
import { FormEvent, useState } from "react";

export default function Home() {
  const [compliment, setCompliment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const nameInput = formData.get("name") as string;
    try {
      setCompliment("");
      const response = await fetch(
        "https://compliment-generator-api.thomas-development.workers.dev/ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: nameInput }),
        }
      );

      if (response.ok) {
        const data = (await response.json()) as { response: string };
        setCompliment(data.response);
      }
    } catch (error) {
      console.error(error);
      setCompliment("An error occurred while generating the compliment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center p-24 space-y-4">
      <h1 className="text-4xl font-bold">Compliment Generator</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            name="name"
            placeholder="Enter name to compliment"
            aria-label="compliment"
            id="moodInput"
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
      {compliment && <div className="mt-4 text-2xl">{compliment}</div>}
    </main>
  );
}
