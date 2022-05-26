import { Dispatch, SetStateAction, useEffect, useState } from "react";

import axios from "axios";
import { RentProps } from "../utils/types";
import Router from "next/router";

/* This example requires Tailwind CSS v2.0+ */
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
type TableProps = {
  rentals: RentProps[];
  refreshRentals: () => Promise<void>;
  setDisplayRentForm: (value: SetStateAction<boolean>) => void;
  displayRentForm: boolean;
};
export default function Table({
  rentals,
  refreshRentals,
  setDisplayRentForm,
  displayRentForm,
}: TableProps) {
  const [currentRent, setCurrentRent] = useState<RentProps>({
    name: "",
    amount: 0,
    id: null,
  });
  const insertRent = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/rentals", {
        ...currentRent,
      });
      if (res.data) {
        refreshRentals();
        setDisplayRentForm(false);
        setCurrentRent({ name: "", amount: 0, id: null });
      } else {
        throw new Error("Something happened during insert");
      }
    } catch (error) {
      alert(`Something went wrong. Stacktrace: ${error}`);
    }
  };
  const removeRent = async (id: number) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/rentals/${id}`);
      if (res.data) {
        refreshRentals();
      } else {
        throw new Error("Something happened during delete");
      }
    } catch (error) {
      alert(`Something went wrong. Stacktrace: ${error}`);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Apartment
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Price
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayRentForm && (
              <tr className={"bg-indigo-100 border-b"}>
                <td
                  className={classNames(
                    "border-t border-transparent relative py-4 pl-4 sm:pl-6 pr-3 text-sm"
                  )}
                >
                  {/* <div className="font-medium text-gray-900">mockName</div> */}
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={currentRent.name}
                    onChange={(e) =>
                      setCurrentRent({ ...currentRent, name: e.target.value })
                    }
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden"></div>
                  <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                </td>

                <td
                  className={classNames(
                    "border-t border-gray-200 px-3 py-3.5 text-sm text-gray-500"
                  )}
                >
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    autoComplete="amount"
                    value={currentRent.amount}
                    onChange={(e) =>
                      setCurrentRent({
                        ...currentRent,
                        amount: parseInt(e.target.value),
                      })
                    }
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td
                  className={classNames(
                    " border-transparent relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium"
                  )}
                >
                  <div className="flex basis-100 justify-end">
                    <button
                      type="button"
                      className="basis-full flex justify-center items-center rounded-md border border-gray-300 text-white bg-indigo-500 px-3 py-2 text-sm font-medium leading-4  shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2  focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      disabled={!currentRent.name || !currentRent.amount}
                      onClick={() => insertRent()}
                    >
                      Add
                      <span className="sr-only">mockName</span>
                    </button>
                    <button
                      type="button"
                      className="basis-full flex justify-center items-center rounded-md border border-gray-300 bg-red-200 mx-2 px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      onClick={() => setDisplayRentForm(false)}
                    >
                      Skip
                      <span className="sr-only">mockName</span>
                    </button>
                  </div>
                  <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" />
                </td>
              </tr>
            )}
            {rentals.map((rental, planIdx) => (
              <tr key={rental.id} className={"bg-white"}>
                <td
                  className={classNames(
                    planIdx === 0 ? "" : "border-t border-transparent",
                    "relative py-4 pl-4 sm:pl-6 pr-3 text-sm"
                  )}
                >
                  <div className="font-medium text-gray-900">{rental.name}</div>
                  <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden"></div>
                  {planIdx !== 0 ? (
                    <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                  ) : null}
                </td>

                <td
                  className={classNames(
                    planIdx === 0 ? "" : "border-t border-gray-200",
                    "px-3 py-3.5 text-sm text-gray-500"
                  )}
                >
                  <div className="sm:hidden">{rental.amount}/mo</div>
                  <div className="hidden sm:block">{rental.amount}/month</div>
                </td>
                <td
                  className={classNames(
                    planIdx === 0 ? "" : "border-t border-transparent",
                    "flex justify-end relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium"
                  )}
                >
                  <button
                    type="button"
                    className="flex justify-center basis-full  items-center rounded-md border border-gray-300 text-white bg-indigo-500 px-3 py-2 text-sm font-medium leading-4  shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2  focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    onClick={() => Router.push(`/rentDetail/${rental.id}`)}
                  >
                    Detail
                    <span className="sr-only">, {rental.name}</span>
                  </button>
                  <button
                    type="button"
                    className=" flex justify-center basis-full items-center rounded-md border border-gray-300 bg-red-200 mx-2 px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    onClick={() => rental.id && removeRent(rental.id)}
                  >
                    Remove
                    <span className="sr-only">, {rental.name}</span>
                  </button>
                  {planIdx !== 0 ? (
                    <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
