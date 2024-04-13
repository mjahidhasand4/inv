"use client";
import { useClickOutside } from "@/hooks";
import { formatDate } from "@/lib";
import { ChangeEvent, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignaturePad from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Home = () => {
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState({
    date: new Date(),
    reference: "",
    from: "",
    to: "",
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

  const previewRef = useClickOutside(() => setPreview(false));

  const downloadAsImage = () => {
    setPreview(true);
    const previewElement = previewRef.current;
    if (previewElement) {
      html2canvas(previewElement).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "delivery_note.jpeg";
        link.click();
      });
    }
    setPreview(true);
  };

  const downloadAsPDF = () => {
    setPreview(true);
    const previewElement = previewRef.current;
    if (previewElement) {
      setTimeout(() => {
        html2canvas(previewElement).then((canvas) => {
          if (canvas.width > 0 && canvas.height > 0) {
            const pdf = new jsPDF("p", "mm", "a4");
            const imgData = canvas.toDataURL("image/png");
            pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
            pdf.save("delivery_note.pdf");
          } else {
            console.error(
              "Canvas dimensions are invalid. Unable to generate PDF."
            );
          }
        });
      }, 500);
    }

    setPreview(true);
  };

  console.log(data);

  return (
    <main className="max-w-[620px] mx-auto">
      <div className="mx-auto flex gap-4">
        <div className="max-w-[420px]">
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
                id="from"
                name="from"
                className={`text-[#0F1111] text-[13px] outline-none h-[31px] py-[3px] px-[7px] border rounded-[3px] border-[#a6a6a6] border-t-[#949494] shadow-[0_1px_0_rgba(255,255,255,.5),_0_1px_0_rgba(0,0,0,.07)_inset] focus:bg-[#F7FEFF] focus:border-[#00453e]`}
                onChange={onChange}
              />
            </label>
            <label htmlFor="to" className="flex flex-col gap-0.5 mb-[6px]">
              <span className="text-[12px] text-[#333] font-medium">To</span>
              <input
                id="to"
                name="to"
                className={`text-[#0F1111] text-[13px] outline-none h-[31px] py-[3px] px-[7px] border rounded-[3px] border-[#a6a6a6] border-t-[#949494] shadow-[0_1px_0_rgba(255,255,255,.5),_0_1px_0_rgba(0,0,0,.07)_inset] focus:bg-[#F7FEFF] focus:border-[#00453e]`}
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
                    canvasProps={{ style: { width: "100%", height: "100%" } }}
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
        <div className="mt-12 flex flex-col items-start">
          <button
            onClick={() => setPreview(true)}
            className="text-[#0f1111] text-[14px] w-full mt-2 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-1 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
          >
            Preview
          </button>
          <button
            onClick={downloadAsImage}
            className="text-[#0f1111] text-[14px] w-full mt-2 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-1 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
          >
            Download as Image
          </button>
          <button
            onClick={downloadAsPDF}
            className="text-[#0f1111] text-[14px] w-full mt-2 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-1 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
          >
            Download as PDF
          </button>
        </div>
      </div>

      <div className={`${preview ? "bg-black/30 absolute inset-0" : ""}`}>
        <div
          ref={previewRef}
          className={`${
            preview ? "" : "hidden"
          } w-[360px] max-h-[96vh] px-2 pb-1 border border-black/40 bg-white -translate-x-2/4 -translate-y-2/4 rounded shadow-lg absolute top-[50%] left-[50%]`}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-[18px] text-[#0f1111] font-bold">
              Delivery Note
            </h1>
            <p className="text-[10px] text-[#0f1111] font-semibold">0053875</p>
          </div>

          <div className="border-2 p-1 border-black/80 bg-[#ddd] rounded-lg flex items-center justify-between">
            <span className="text-[10px] text-[#333] font-semibold">
              Date: {formatDate(data.date)}
            </span>

            <span className="text-[10px] text-[#333] font-semibold">
              Reference No. {data.reference}
            </span>
          </div>

          <div className="mt-1 p-1 border-2 border-black/80 rounded">
            <span className="text-[14px] text-[#333] font-bold block h-[31px] border-b border-black/30">
              From:
            </span>
            <span className="text-[14px] text-[#333] font-medium block h-[31px] h-[31px] border-b border-black/30">
              {data.from}
            </span>
            <span className="text-[14px] text-[#333] font-bold block h-[31px] h-[31px] border-b border-black/30">
              To:
            </span>
            <span className="text-[14px] text-[#333] font-medium block h-[31px]">
              {data.to}
            </span>
          </div>

          <div className="mt-1 border-2 border-black/80 rounded">
            <div className="border-b-2 border-black/80 bg-[#ddd] grid grid-cols-[64px_64px_1fr]">
              <span className="text-[14px] text-[#333] font-bold text-center">
                Quantity
              </span>
              <span className="text-[14px] text-[#333] font-bold text-center border-x-2 border-black/80">
                Unit
              </span>
              <span className="text-[14px] text-[#333] font-bold text-center">
                Description
              </span>
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                className="h-[28px] border-b-2 border-black/80 grid grid-cols-[64px_64px_1fr]"
              >
                <span className="text-[14px] text-[#333] font-medium">
                  {item.quantity}
                </span>
                <span className="text-[14px] text-[#333] font-medium border-x-2 border-black/80">
                  {item.unit}
                </span>
                <span className="text-[14px] text-[#333] font-medium">
                  {item.description}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-1 p-1 border-2 border-black/80 rounded">
            <span className="text-[12px] text-[#333] font-medium w-full border-b border-black/40 block">
              Signature:
              <span className="pl-1 text-[12px] font-bold">
                {data.name.toUpperCase()}
              </span>
            </span>
            {data.sign && <img src={data.sign} className="w-auto h-[48px] object-fit" />}

            <span className="text-[12px] text-[#333] font-medium w-full">
              Received in Good Condition:
              <span className="pl-1 font-bold">
                {data.receivedInGoodCondition ? "YES" : "NO"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
