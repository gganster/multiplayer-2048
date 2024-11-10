
export default function Bonus({item, onActivate}) {
  
  return (
    <div className="w-14 h-14 border-4 border-slate-800 rounded-lg bg-white opacity-80 " onClick={() => {
      if (!item?.uid) return;
      onActivate(item);
    }}>
      {item?.type === "fire" ? (
        <div className="">
          <img src={"/bonus/fire.png"} alt="fire" className="w-full h-full" />
        </div>
      ) : null}
      {item?.type === "ice" ? (
        <div className="">
          <img src={"/bonus/ice.png"} alt="ice" className="w-full h-full" />
        </div>
      ) : null}
      {item?.type === "blind" ? (
        <div className="">
          <img src={"/bonus/blind.png"} alt="blind" className="w-full h-full" />
        </div>
      ) : null}
    </div>
  );
}