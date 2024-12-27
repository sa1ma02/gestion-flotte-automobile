import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Pagination from "@mui/material/Pagination";

import { filters } from "./FilterData";
import  VehiculeCard from "../VehiculeCard/VehiculeCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  findVehicules,
  // findVehiculesByCategory,
} from "../../../../Redux/Customers/Vehicule/Action";
import { deepPurple } from "@mui/material/colors";
import { Backdrop, CircularProgress } from "@mui/material";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Vehicule() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const param = useParams();
  const { customersVehicule } = useSelector((store) => store);
  const location = useLocation();
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  const handleLoderClose = () => {
    setIsLoaderOpen(false);
  };


  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const pageNumber = searchParams.get("page") || 1;
  const statut = searchParams.get("statut");
  const categoryName = searchParams.get("categoryName");



  const handleSortChange = (value) => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    const data = {
      categoryName: categoryName,
      pageNumber: pageNumber - 1,
      pageSize: 10,
      statut: statut || '' ,
    };
    console.log("Data sent to backend:", data); //
    dispatch(findVehicules(data));
  }, [
    categoryName,
    pageNumber,
    statut,
  ]);

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    let filterValues = searchParams.getAll(sectionId);

    if (filterValues.length > 0 && filterValues[0].split(",").includes(value)) {
      filterValues = filterValues[0]
        .split(",")
        .filter((item) => item !== value);
      if (filterValues.length === 0) {
        searchParams.delete(sectionId);
      }
      console.log("includes");
    } else {
 
      filterValues.push(value);
    }

    if (filterValues.length > 0)
      searchParams.set(sectionId, filterValues.join(","));


    const query = searchParams.toString();
    navigate({ search: `?${query}` });

   
  };

  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    if (customersVehicule.loading) {
      setIsLoaderOpen(true);
    } else {
      setIsLoaderOpen(false);
    }
  }, [customersVehicule.loading]);

  return (
    <div className="bg-white -z-10 ">
      <div>                     
        <main className="px-3 lg:px-14 ">
          <section aria-labelledby="products-heading" className="pb-20 ">
            <div>
              <h2 className="py-5 font-semibold opacity-60 text-lg">Filtres</h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-5">
      
                <form className="hidden lg:block border rounded-md p-4 h-96">
                  {filters.map((section) => (
                    <Disclosure
                    
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-300 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={() =>
                                      handleFilter(option.value, section.id)
                                    }
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                
                </form>

           
             <div className="lg:col-span-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 bg-white  py-1 rounded-md ">
              {customersVehicule?.vehicules?.map((item) => (
                <VehiculeCard key={item.id} vehicule={item} />
              ))}
            </div>
          </div>

              </div>
            </div>
          </section>
        </main>

     
        <section className="w-full px-[1rem]">
          <div className=" px-3 py-3 flex justify-center shadow-lg border rounded-md">
            <Pagination
              count={customersVehicule.vehicules?.totalPages}
              color="primary"
              className=""
              onChange={handlePaginationChange}
            />
          </div>
        </section>

        {/* <section>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoaderOpen}
            onClick={handleLoderClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </section> */}
      </div>
    </div>
  );
}
