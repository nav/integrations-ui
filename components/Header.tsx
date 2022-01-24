import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import DataStore from "../lib/storage";

const dataStore = new DataStore();

export default function Header() {
  const router = useRouter();
  const [defaultBg, activeBg] = [
    "bg-stone-50 border-stone-200",
    "bg-indigo-50 border-indigo-400",
  ];
  const [integrationId, setIntegrationId] = useState("");
  const [headerBg, setHeaderBg] = useState(defaultBg);

  useEffect(() => {
    setIntegrationId(dataStore.getIntegrationId() || "");
    integrationId !== "" ? setHeaderBg(activeBg) : false;
  }, [integrationId, setIntegrationId, activeBg]);

  function reset() {
    dataStore.deleteIntegrationId();
    setIntegrationId("");
    setHeaderBg(defaultBg);
    router.push("/");
  }

  const integrationInfo = (
    <div className="flex flex-row gap-2 items-center justify-end">
      <span className="font-bold">Integration:</span>
      <span>{integrationId.substring(0, 8)}</span>
      <button
        className="ml-4 inline-flex items-center px-2 border border-gray-300 shadow-sm text-lg font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={reset}
      >
        &times;
      </button>
    </div>
  );

  const headerClass = `w-full fixed z-50 border-b-2 p-3 ${headerBg}`;

  return (
    <header className={headerClass}>
      <div className="flex flex-row gap-6 items-center">
        <div className="basis-1/2">
          <Link href="/">
            <a>
              <img src="/logo.png" className="w-48" alt="Integrations" />
            </a>
          </Link>
        </div>
        <div className="basis-1/2">
          {integrationId !== "" ? integrationInfo : ""}
        </div>
      </div>
    </header>
  );
}
