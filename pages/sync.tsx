import { useEffect, useState } from "react";
import type { NextPage } from "next";
import DataStore from "../lib/storage";
import Header from "../components/Header";
import Sync from "../components/Sync";

const dataStore = new DataStore();

const SyncPage: NextPage = () => {
  const [integrationId, setIntegrationId] = useState("");
  const [localEntity, setLocalEntity] = useState(
    "urn:integration:local-entity:purchaseorder"
  );
  const [localEntityRef, setLocalEntityRef] = useState("");
  const [syncList, setSyncList] = useState(null);

  useEffect(() => {
    setIntegrationId(dataStore.getIntegrationId() || "");
  }, []);

  const onSubmit = (e) => {
    setSyncList(
      <Sync syncReq={{ integrationId, localEntity, localEntityRef }} />
    );
    e.preventDefault();
  };

  const form = (
    <form
      onSubmit={onSubmit}
      className="sm:flex sm:flex-row gap-6  justify-center"
    >
      <label className="hidden sm:block font-medium text-gray-700 sm:mt-px sm:pt-2">
        Entity
      </label>
      <select
        id="local-entity"
        name="local-entity"
        className="w-full block sm:w-96 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md placeholder-gray-300"
        value={localEntity}
        onChange={(e) => setLocalEntity(e.target.value)}
      >
        <option value="urn:integration:local-entity:purchaseorder">
          urn:integration:local-entity:purchaseorder
        </option>
        <option value="urn:integration:local-entity:payment">
          urn:integration:local-entity:payment
        </option>
        <option value="urn:integration:local-entity:bill">
          urn:integration:local-entity:bill
        </option>
      </select>

      <input
        type="text"
        name="local-entity-ref"
        id="local-entity-ref-id"
        className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:w-32 border-gray-300 rounded-md placeholder-gray-300"
        placeholder="Local Ref"
        value={localEntityRef}
        onClick={(e) => {
          e.target.select();
        }}
        onChange={(e) => setLocalEntityRef(e.target.value)}
      />

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Lookup
      </button>
    </form>
  );

  return (
    <div>
      <Header />
      <div className="w-auto mx-auto pt-24">
        <div className="pb-6 w-full border-b border-red-100">{form}</div>
        <div className="mt-12">{syncList}</div>
      </div>
    </div>
  );
};

export default SyncPage;
