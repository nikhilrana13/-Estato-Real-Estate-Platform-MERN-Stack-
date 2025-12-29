
import { useFormContext } from "react-hook-form";

const FloorSelect = () => {
  const { register, setValue, watch } = useFormContext();

 
  return (
    <div className="flex items-center justify-between   py-3 rounded-md">

  {/* Total Floor */}
  <div className="flex flex-col   w-1/2 px-2">
    <span className="text-[#909098] font-[400] text-[0.7rem]">Total Floor</span>
    <input
      {...register("commercial.advancedDetails.totalFloor")}
      type="number"
      className="w-full bg-transparent outline-none border-b-2 border-[#eee] focus:border-purple-600 py-1 text-lg font-medium text-[#333] text-center"
    />
  </div>

  {/* Your Floor */}
  <div className="flex flex-col  w-1/2 px-2">
    <span className="text-[#909098] font-[400] text-[0.7rem]">Your Floor</span>
    <select
      {...register("commercial.advancedDetails.yourFloor")}
      className="w-full border-b-2 border-[#eee] focus:border-purple-600 py-1 bg-transparent text-lg font-medium text-[#333] text-center outline-none"
    >
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>

</div>
  );
};

export default FloorSelect;
