
import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";

function SelectCategory() {
  const {userCourseInput, setUserCourseInput}=useContext(UserInputContext)
  const handleCategoryChange=(category)=>{
  setUserCourseInput(prev=>({
    ...prev,
    category:category
  }))
  }
  return (
      <div className="px-10 md:px-20">
        <h2 className="my-5">Select the Course Category</h2>
      
    <div className="grid grid-cols-3 gap-10 ">
      
      {CategoryList.map((item) => (
        <div className={`flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer
          ${userCourseInput?.category==item.name && 'border-primary bg-blue-50' }`} key={item.id}
        onClick={()=>handleCategoryChange(item.name)}
        > 
          <Image src={item.icon} width={50} height={50} alt={item.name} />
          <p>{item.name}</p> {/* Optional: Display category name */}
        </div>
      ))}
    </div>
    </div>
  );
}

export default SelectCategory;
