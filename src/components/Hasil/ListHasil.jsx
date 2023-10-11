import "./ListHasil.css";
import { useState } from "react";

const Step1 = ({ onNext }) => {
  const [angka, setAngka] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Step 1</h2>
      <label>Angka Pertama</label>
      <input
        type="text"
        value={angka}
        onChange={(e) => setAngka(e.target.value)}
      />
      <button type="submit">Next</button>
    </form>
  );
};
const Step2 = ({ onPrevious, onNext }) => {
  const [angka2, setAngka2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Step 2</h2>
      <label>Angka Kedua</label>
      <input
        type="text"
        value={angka2}
        onChange={(e) => setAngka2(e.target.value)}
      />
      <button type="button" onClick={onPrevious}>
        Previous
      </button>
      <button type="submit">Next</button>
    </form>
  );
};

const ListHasil = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };
  const handlePrev = () => {
    setStep(step - 1);
  };

  return (
    <div className="ListHasil">
      <h1>Ini Halaman ListHasil</h1>
      <div>
        {step === 1 && <Step1 onNext={handleNext} />}
        {step === 2 && <Step2 onPrevious={handlePrev} onNext={handleNext} />}
      </div>
    </div>
  );
};

export default ListHasil;
