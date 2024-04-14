"use client";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignaturePad from "react-signature-canvas";

const Home = () => {
  const [data, setData] = useState({
    date: new Date(),
    reference: "",
    from: "",
    _from: "",
    to: "",
    _to: "",
    sign: "",
    name: "",
    receivedInGoodCondition: true,
  });

  const [items, setItems] = useState([
    {
      id: 1,
      quantity: "",
      unit: "",
      description: "",
    },
    {
      id: 2,
      quantity: "",
      unit: "",
      description: "",
    },
    {
      id: 3,
      quantity: "",
      unit: "",
      description: "",
    },
    {
      id: 4,
      quantity: "",
      unit: "",
      description: "",
    },
    {
      id: 5,
      quantity: "",
      unit: "",
      description: "",
    },
    {
      id: 6,
      quantity: "",
      unit: "",
      description: "",
    },
    {
      id: 7,
      quantity: "",
      unit: "",
      description: "",
    },
    {
      id: 8,
      quantity: "",
      unit: "",
      description: "",
    },
    {
      id: 9,
      quantity: "",
      unit: "",
      description: "",
    },
    {
      id: 10,
      quantity: "",
      unit: "",
      description: "",
    },
  ]);

  const signPadRef = useRef<SignaturePad | null>(null);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onRadioChange = () => {
    setData((prev) => ({
      ...prev,
      receivedInGoodCondition: !prev.receivedInGoodCondition,
    }));
  };

  const addItem = () => {
    const newId = items.length + 1;

    setItems((prevState) => [
      ...prevState,
      {
        id: newId,
        quantity: "",
        unit: "",
        description: "",
      },
    ]);
  };

  const onItemChange = (index: number, field: string, value: string) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };
      return updatedItems;
    });
  };

  const onSignChange = () => {
    if (signPadRef.current) {
      const imageData = signPadRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setData((prev) => ({
        ...prev,
        sign: imageData,
      }));
    }
  };

  const onClear = () => {
    signPadRef.current?.clear();
    setData((prev) => ({ ...prev, sign: "" }));
  };

  useEffect(() => {
    localStorage.setItem("preview", JSON.stringify({ ...data, items }));
  }, [data, items]);

  return (
    <main className="max-w-[620px] mx-auto">
      <div className="mx-auto flex custom items-start gap-4">
        <div className="max-w-[420px] border border-black p-4 my-4">
          <div className="mt-2 flex items-center justify-between">
            <h1 className="text-[24px] text-[#0f1111] font-semibold">
              Delivery Note
            </h1>
            <p className="text-[14px] text-[#0f1111] font-medium">0053875</p>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex flex-col gap-0.5 mb-[6px]">
              <span className="text-[12px] text-[#333] font-medium">Date</span>
              <DatePicker
                className={`text-[#0F1111] text-[13px] outline-none h-[31px] py-[3px] px-[7px] border rounded-[3px] border-[#a6a6a6] border-t-[#949494] shadow-[0_1px_0_rgba(255,255,255,.5),_0_1px_0_rgba(0,0,0,.07)_inset] focus:bg-[#F7FEFF] focus:border-[#00453e]`}
                selected={data.date}
                onChange={(date) =>
                  setData((prev) => ({ ...prev, date: date! }))
                }
              />
            </label>
            <label className="flex flex-col gap-0.5 mb-[6px]">
              <span className="text-[12px] text-[#333] font-medium">
                Reference no
              </span>
              <input
                name="reference"
                className={`text-[#0F1111] text-[13px] outline-none h-[31px] py-[3px] px-[7px] border rounded-[3px] border-[#a6a6a6] border-t-[#949494] shadow-[0_1px_0_rgba(255,255,255,.5),_0_1px_0_rgba(0,0,0,.07)_inset] focus:bg-[#F7FEFF] focus:border-[#00453e]`}
                value={data.reference}
                onChange={onChange}
              />
            </label>
          </div>

          <div>
            <label htmlFor="from" className="flex flex-col gap-0.5 mb-[6px]">
              <span className="text-[12px] text-[#333] font-medium">From</span>
              <input
                name="from"
                className={`text-[#0F1111] text-[13px] outline-none h-[31px] py-[3px] px-[7px] border rounded-[3px] border-[#a6a6a6] border-t-[#949494] shadow-[0_1px_0_rgba(255,255,255,.5),_0_1px_0_rgba(0,0,0,.07)_inset] focus:bg-[#F7FEFF] focus:border-[#00453e]`}
                value={data.from}
                onChange={onChange}
              />
              <input
                name="_from"
                className={`text-[#0F1111] text-[13px] outline-none h-[31px] py-[3px] px-[7px] border rounded-[3px] border-[#a6a6a6] border-t-[#949494] shadow-[0_1px_0_rgba(255,255,255,.5),_0_1px_0_rgba(0,0,0,.07)_inset] focus:bg-[#F7FEFF] focus:border-[#00453e]`}
                value={data._from}
                onChange={onChange}
              />
            </label>
            <label htmlFor="to" className="flex flex-col gap-0.5 mb-[6px]">
              <span className="text-[12px] text-[#333] font-medium">To</span>
              <input
                name="to"
                className={`text-[#0F1111] text-[13px] outline-none h-[31px] py-[3px] px-[7px] border rounded-[3px] border-[#a6a6a6] border-t-[#949494] shadow-[0_1px_0_rgba(255,255,255,.5),_0_1px_0_rgba(0,0,0,.07)_inset] focus:bg-[#F7FEFF] focus:border-[#00453e]`}
                value={data.to}
                onChange={onChange}
              />
              <input
                name="_to"
                className={`text-[#0F1111] text-[13px] outline-none h-[31px] py-[3px] px-[7px] border rounded-[3px] border-[#a6a6a6] border-t-[#949494] shadow-[0_1px_0_rgba(255,255,255,.5),_0_1px_0_rgba(0,0,0,.07)_inset] focus:bg-[#F7FEFF] focus:border-[#00453e]`}
                value={data._to}
                onChange={onChange}
              />
            </label>
          </div>

          <div className="mt-4 border border-black/40 rounded p-1">
            <div className="border-b border-black/40 grid grid-cols-[64px_64px_1fr] gap-1">
              <span className="text-[14px] text-[#333] font-medium">
                Quantity
              </span>
              <span className="text-[14px] text-[#333] font-medium">Unit</span>
              <span className="text-[14px] text-[#333] font-medium">
                Description
              </span>
            </div>

            {items.map((item, index) => (
              <div
                key={item.id}
                className="mt-1 grid grid-cols-[64px_64px_1fr] gap-1"
              >
                <input
                  value={item.quantity}
                  onChange={(e) =>
                    onItemChange(index, "quantity", e.target.value)
                  }
                  className={`text-[#0F1111] text-[13px] outline-none h-[31px] py-[3px] px-[7px] border rounded-[3px] border-[#a6a6a6] border-t-[#949494] shadow-[0_1px_0_rgba(255,255,255,.5),_0_1px_0_rgba(0,0,0,.07)_inset] focus:bg-[#F7FEFF] focus:border-[#00453e]`}
                />
                <input
                  value={item.unit}
                  onChange={(e) => onItemChange(index, "unit", e.target.value)}
                  className={`text-[#0F1111] text-[13px] outline-none h-[31px] py-[3px] px-[7px] border rounded-[3px] border-[#a6a6a6] border-t-[#949494] shadow-[0_1px_0_rgba(255,255,255,.5),_0_1px_0_rgba(0,0,0,.07)_inset] focus:bg-[#F7FEFF] focus:border-[#00453e]`}
                />
                <input
                  value={item.description}
                  onChange={(e) =>
                    onItemChange(index, "description", e.target.value)
                  }
                  className={`text-[#0F1111] text-[13px] outline-none h-[31px] py-[3px] px-[7px] border rounded-[3px] border-[#a6a6a6] border-t-[#949494] shadow-[0_1px_0_rgba(255,255,255,.5),_0_1px_0_rgba(0,0,0,.07)_inset] focus:bg-[#F7FEFF] focus:border-[#00453e]`}
                />
              </div>
            ))}

            <button
              onClick={addItem}
              className="text-[#0f1111] text-[14px] w-full mt-2 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-1 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
            >
              Add Item
            </button>
          </div>

          <div>
            <div>
              <div className="mt-4 p-1 border border-black/40 rounded">
                <div>
                  <span className="text-[12px] text-[#333] font-medium w-full border-b border-black/40 block">
                    Your full name
                  </span>
                  <input
                    name="name"
                    className={`text-[#0F1111] text-[13px] outline-none w-full h-[31px] mt-2 py-[3px] px-[7px] border rounded-[3px] border-[#a6a6a6] border-t-[#949494] shadow-[0_1px_0_rgba(255,255,255,.5),_0_1px_0_rgba(0,0,0,.07)_inset] focus:bg-[#F7FEFF] focus:border-[#00453e]`}
                    value={data.name}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <span className="text-[12px] text-[#333] font-medium w-full border-b border-black/40 block">
                    Signature
                  </span>
                  <SignaturePad
                    ref={(ref) => {
                      signPadRef.current = ref;
                    }}
                    canvasProps={{ style: { width: "100%", height: "192px" } }}
                    clearOnResize={false}
                    onEnd={onSignChange}
                  />
                </div>
              </div>
              <button
                onClick={() => onClear()}
                className="text-[#0f1111] text-[14px] mt-1 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-1 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
              >
                Clear
              </button>
            </div>

            <div className="mb-4">
              <div className="mt-4 p-1 border border-black/40 rounded">
                <span className="text-[12px] text-[#333] font-medium w-full border-b border-black/40 block">
                  Received in Good Condition
                </span>
                <div>
                  <label htmlFor="yes">
                    <span>Yes</span>
                    <input
                      type="radio"
                      id="yes"
                      name="good-condition"
                      checked={data.receivedInGoodCondition}
                      onChange={onRadioChange}
                    />
                  </label>
                  <label htmlFor="No">
                    <span>No</span>
                    <input
                      type="radio"
                      id="yes"
                      name="good-condition"
                      checked={!data.receivedInGoodCondition}
                      onChange={onRadioChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link
          href="/preview"
          className="max-w-[420px] block mt-4 text-[#0f1111] text-[14px] w-full mt-2 cursor-pointer rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-1 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
        >
          Preview
        </Link>
      </div>
    </main>
  );
};

export default Home;
