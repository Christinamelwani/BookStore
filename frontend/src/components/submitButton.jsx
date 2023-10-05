export default function SubmitButton({ text, onSubmit }) {
  return (
    <button
      onClick={onSubmit}
      className="w-full py-3 text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
    >
      {text}
    </button>
  );
}
