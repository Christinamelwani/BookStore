export default function InputField({ id, name, type, placeholder, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
        {placeholder}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm transition duration-300 ease-in-out"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
