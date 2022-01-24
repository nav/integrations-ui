export default function Empty(props) {
  return (
    <div className="mx-auto max-w-lg border-2 border-gray-300 border-dashed rounded-lg p-12 mt-24 text-center">
      <svg
        className="mx-auto h-16 w-16 text-gray-400 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
      <span className="mt-2 block text-sm font-medium text-gray-900">
        {props.children}
      </span>
    </div>
  );
}
