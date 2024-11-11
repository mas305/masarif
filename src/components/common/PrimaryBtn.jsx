// import { handleNavigate } from "../../utils";

export function PrimaryBtn({ handleNavigate, path, text }) {
  return (
    <button
      onClick={() => {
        handleNavigate(path);
      }}
      className="bg-slate-500 py-7"
    >
      {text}
    </button>
  );
}
