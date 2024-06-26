"use client";
import { formatDate } from "@/lib";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image";

const Preview = () => {
  const [img, setImg] = useState("");
  const deliveryRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    const { items, ...data } = JSON.parse(
      localStorage.getItem("preview") as string
    );
    setData(data);
    setItems(items);
  }, []);

  const downloadAsImage = () => {
    const previewElement = deliveryRef.current;

    domtoimage.toJpeg(previewElement!, { quality: 1 }).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };

  const downloadAsPDF = () => {
    const previewElement = deliveryRef.current;

    domtoimage.toPng(previewElement!, { quality: 1 }).then(function (dataUrl) {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297);
      pdf.save("delivery_note.pdf");
    });
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <img src={img} alt="" />
      <div className="flex my-4 mx-auto gap-4 custom">
        <div className="border border-black/40">
          <div
            ref={deliveryRef}
            className={`w-[360px] max-h-[96vh] px-2 py-1 bg-white isolate`}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-[18px] text-[#0f1111] font-bold mb-2">
                Delivery Note
              </h1>
              <p className="text-[10px] text-[#0f1111] font-semibold">
                0053875
              </p>
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
              <span className="block h-[31px] border-b border-black/30">
                <span className="text-[14px] text-[#333] font-bold">From:</span>{" "}
                <span className="text-[14px] text-[#333] font-medium">
                  {data.from}
                </span>
              </span>
              <span className="text-[14px] text-[#333] font-medium block h-[31px] h-[31px] border-b border-black/30">
                {data._from}
              </span>
              <span className="text-[14px] text-[#333] font-bold block h-[31px] h-[31px] border-b border-black/30">
                <span className="text-[14px] text-[#333] font-bold">To:</span>{" "}
                <span className="text-[14px] text-[#333] font-medium">
                  {data.to}
                </span>
              </span>
              <span className="text-[14px] text-[#333] font-medium block h-[31px]">
                {data._to}
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
                  <span className="text-center text-[14px] text-[#333] font-medium">
                    {item.quantity}
                  </span>
                  <span className="text-center text-[14px] text-[#333] font-medium border-x-2 border-black/80">
                    {item.unit}
                  </span>
                  <span className="text-[14px] text-[#333] font-medium pl-1">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-1 p-1 border-2 border-black/80 rounded">
              <span className="text-[12px] text-[#333] font-medium w-full border-b border-black/40 mb-1 block">
                Signature:
                <span className="pl-1 text-[12px] font-bold">
                  {data.name.toUpperCase()}
                </span>
              </span>
              {data.sign && (
                <img src={data.sign} className="w-auto h-[96px] object-fit" />
              )}

              <span className="text-[12px] text-[#333] font-medium w-full">
                Received in Good Condition:
                <span className="pl-1 font-bold">
                  {data.receivedInGoodCondition ? "YES" : "NO"}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="w-[240px] flex flex-col items-start gap-2 custom-action">
          <Link
            href="/"
            className="text-[#0f1111] text-[14px] w-full cursor-pointer rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-1 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
          >
            Back
          </Link>
          <button
            onClick={downloadAsImage}
            className="text-left whitespace-nowrap text-[#0f1111] text-[14px] w-full cursor-pointer rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-1 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
          >
            Download as Image
          </button>
          <button
            onClick={downloadAsPDF}
            className="text-left whitespace-nowrap text-[#0f1111] text-[14px] w-full cursor-pointer rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-1 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
          >
            Download as PDF
          </button>
        </div>
      </div>
    </main>
  );
};

export default Preview;
