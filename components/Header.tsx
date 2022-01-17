import { useState } from "react";

export default function Header(props: {
  onLookup: (
    integration_id: string,
    local_entity: string,
    local_entity_ref: string
  ) => void;
  onReset: () => void;
}) {
  const [integration, setIntegration] = useState("");
  const [integrationId, setIntegrationId] = useState("");
  const [localEntity, setLocalEntity] = useState("");
  const [localEntityRef, setLocalEntityRef] = useState("");

  const headerBg =
    integration === ""
      ? "bg-stone-50 border-stone-200"
      : "bg-stone-50 border-indigo-400";

  function reset() {
    setIntegration("");
    setIntegrationId("");
    setLocalEntity("");
    setLocalEntityRef("");

    props.onReset();
  }

  const integrationForm = (
    <>
      <div>
        <label
          htmlFor="integration-id"
          className="block font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Integration ID
        </label>
      </div>
      <input
        type="search"
        name="integration-id"
        id="integration-id"
        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-sm border-gray-300 rounded-md placeholder-gray-300"
        pattern="\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b"
        placeholder="12021850-d533-4412-9b4d-6139999ff35f"
        value={integrationId}
        onChange={(e) => setIntegrationId(e.target.value)}
      />
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={(e) => setIntegration(integrationId)}
      >
        Save
      </button>
    </>
  );

  const entityForm = (
    <>
      <select
        id="local-entity"
        name="local-entity"
        className="max-w-md block w-96 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md placeholder-gray-300"
        value={localEntity}
        onChange={(e) => setLocalEntity(e.target.value)}
      >
        <option value="">Select a local entity</option>
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
        className="max-w-xs block w-32 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-gray-300 rounded-md placeholder-gray-300"
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
        onClick={(e) =>
          props.onLookup(integrationId, localEntity, localEntityRef)
        }
      >
        Lookup
      </button>
    </>
  );

  const integrationInfo = (
    <div className="flex flex-row gap-2 items-center justify-end">
      <span className="font-bold">Integration:</span>
      <span>{integration.substring(0, 8)}</span>
      <button
        className="ml-4 inline-flex items-center px-2 border border-gray-300 shadow-sm text-lg font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={reset}
      >
        &times;
      </button>
    </div>
  );

  return (
    <header className={"w-full fixed z-50 border-b-2 p-6 " + headerBg}>
      <div className="flex flex-row gap-6 items-center">
        <div className="basis-1/6">
          <img src="/logo.png" />
        </div>
        <div className="basis-4/6">
          <div className="sm:flex flex-row justify-center gap-4">
            {integration === "" ? integrationForm : entityForm}
          </div>
        </div>
        <div className="basis-1/6">
          {integration === "" ? <></> : integrationInfo}
        </div>
      </div>
    </header>
  );
}
