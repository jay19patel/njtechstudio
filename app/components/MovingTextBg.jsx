export default function MovingTextBg({ children, text = "YOUR TEXT HERE", textColor = "text-slate-300" }) {
  const repeatedText = Array(20).fill(text).join(" ");

  return (
    <div className="moving-text-bg">
      <div className="moving-text-container" aria-hidden="true">
        <div className={`moving-text-row ${textColor}`}>
          {repeatedText} {repeatedText}
        </div>
        <div className={`moving-text-row ${textColor}`}>
          {repeatedText} {repeatedText}
        </div>
        <div className={`moving-text-row ${textColor}`}>
          {repeatedText} {repeatedText}
        </div>
        <div className={`moving-text-row ${textColor}`}>
          {repeatedText} {repeatedText}
        </div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
