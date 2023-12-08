import React from "react";

const ActionPane = () => {
  return (
    <>
      <div className="flex flex-col items-center p-5 border w-full ">
        <div className="flex justify-start items-center w-full space-x-1">
          <div className="px-3 py-1 bg-blue-500 text-white rounded-3xl text-xs">
            9:00
          </div>
          <p>8:50着</p>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <p className="text-2xl">沖縄 太郎さん</p>
          <div className="px-2 py-1 bg-gray-200 text-black rounded-full w-8">
            済
          </div>
        </div>
        <div className="flex justify-start items-center w-full space-x-1">
          <div className="px-3 py-1 bg-blue-500 text-white rounded-3xl text-xs">
            10:00
          </div>
          <p>10:15帰</p>
        </div>
      </div>

      <div className="flex flex-col items-center p-5 border w-full ">
        <div className="flex justify-start items-center w-full space-x-1">
          <div className="px-3 py-1 bg-blue-500 text-white rounded-3xl text-xs">
            13:00
          </div>
          <p>13:10着</p>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <p className="text-2xl">琉球 花子さん</p>
        </div>
        <div className="flex justify-start items-center w-full space-x-1">
          <div className="px-3 py-1 bg-blue-500 text-white rounded-3xl text-xs">
            15:00
          </div>
          <p>対応中・・・</p>
        </div>
      </div>
    </>
  );
};

export default ActionPane;
