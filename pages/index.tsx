import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import DataStore from "../lib/storage";
import Header from "../components/Header";

const dataStore = new DataStore();

const HomePage: NextPage = () => {
  const router = useRouter();
  const [formIntegrationId, setFormIntegrationId] = useState("");

  const onSubmit = (e) => {
    dataStore.setIntegrationId(formIntegrationId);
    setFormIntegrationId("");
    router.push("/sync");
    e.preventDefault();
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl pt-32">
          Welcome to Integrations back office
        </h1>

        <form className="block flex flex-row gap-4" onSubmit={onSubmit}>
          <label
            htmlFor="integration-id"
            className="block font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Integration ID
          </label>
          <input
            type="search"
            name="integration-id"
            id="integration-id"
            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-sm border-gray-300 rounded-md placeholder-gray-300"
            pattern="\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b"
            placeholder="12021850-d533-4412-9b4d-6139999ff35f"
            value={formIntegrationId}
            onChange={(e) => {
              setFormIntegrationId(e.target.value);
            }}
          />
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
