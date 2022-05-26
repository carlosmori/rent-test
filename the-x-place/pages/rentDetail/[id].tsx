import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RentProps } from "../../utils/types";

function RentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [currentRent, setCurrentRent] = useState<RentProps>({
    name: "",
    amount: 0,
    id: null,
  });
  const fetchRentDetail = async (id: string | string[] | undefined) => {
    try {
      const res: any = await axios.get(
        `http://localhost:3000/api/rentals/${id}`
      );
      console.log(`res equals:`);
      console.log(res);
      if (res.data) {
        const rent = res.data;
        setCurrentRent({ name: rent.name, amount: rent.amount, id });
      } else {
        throw new Error("Something happened during get");
      }
    } catch (error) {
      alert(`Something went wrong. Stacktrace: ${error}`);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRentDetail(id);
    }
  }, [id]);

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="w-full h-screen items-start p-10 bg-gray-100">
      <div className="flex flex-col items-center">
        <a
          href="/dashboard"
          onClick={handleClick}
          className="self-baseline text-blue-800 underline"
        >
          Back
        </a>
        <h1 className="w-full text-center text-3xl py-6">
          Rental {currentRent.name}
        </h1>
        <Image
          src="/mockImage.jpeg"
          alt="Picture of the rental"
          layout="fixed"
          width={300}
          height={300}
        />
        <h3 className="bold py-2 text-xl">
          Amount per month ${currentRent.amount}
        </h3>
        <p className="italic">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ad
          obcaecati distinctio! Soluta veniam molestias, laboriosam nesciunt
          cupiditate beatae labore delectus eos praesentium ducimus quo debitis
          similique, sed omnis. Eos!
        </p>
      </div>
    </div>
  );
}

export default RentDetail;
