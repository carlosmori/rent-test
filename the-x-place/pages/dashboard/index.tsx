import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Table from "../../components/table";

const Dashboard: NextPage = () => {
  const [displayRentForm, setDisplayRentForm] = useState(false);
  const [rentals, setRentals] = useState<any[]>([]);
  const [visibleRentals, setVisibleRentals] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm === "") {
        setVisibleRentals(rentals);
      } else {
        const visible = rentals.filter((el) =>
          el.name.toLowerCase().includes(searchTerm)
        );
        setVisibleRentals(visible);
      }
      // Send Axios request here
      setLoading(false);
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, rentals]);
  async function refreshRentals() {
    const res = await axios.get("http://localhost:3000/api/rentals");
    setRentals(res.data.rentals);
    setVisibleRentals(res.data.rentals);
  }

  // Refresh rents on component mount
  useEffect(() => {
    refreshRentals();
  }, []);
  return (
    <div className="w-full h-screen items-start p-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Rentals</h1>
            <p className="mt-2 text-sm text-gray-700">Active Rentals</p>
          </div>

          {displayRentForm || (
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                onClick={() => setDisplayRentForm(true)}
              >
                Add new Rental
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-1/3 md:mx-6 mt-6 relative border border-gray-300 rounded-md py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label
          htmlFor="name"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >
          Search
        </label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Madero Harbor"
        />
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <Table
          rentals={visibleRentals}
          refreshRentals={refreshRentals}
          displayRentForm={displayRentForm}
          setDisplayRentForm={setDisplayRentForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
