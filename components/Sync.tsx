import useSWR from "swr";
import { useState } from "react";
import { api, fetcher } from "../lib/api";

const CREATED = "CREATED";
const IN_PROGRESS = "IN_PROGRESS";
const ERROR = "ERROR";
const COMPLETED = "COMPLETED";

function Icon(props: { status: string; className: string }) {
  let icon;
  switch (props.status) {
    case CREATED:
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 mr-1.5 text-orange-500 ${props.className}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
      );
      break;
    case COMPLETED:
      icon = (
        <svg
          className={`flex-shrink-0 mr-1.5 text-green-500 ${props.className}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
      break;
    case IN_PROGRESS:
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 mr-1.5 text-orange-500 ${props.className}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
      );
      break;

    case ERROR:
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 mr-1.5 text-red-500 ${props.className}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
      break;
    default:
  }

  return <>{icon}</>;
}

type SyncReq = {
  integrationId: string;
  localEntity: string;
  localEntityRef: string;
};

function SyncList(props: {
  syncs: any[];
  onSyncSelect: (index: number) => void;
}) {
  const syncsRender = props.syncs.map((sync, syncIndex) => {
    const dateTime = new Date(sync.created_at);

    return (
      <li key={sync.created_at}>
        <a
          href="#"
          className="block hover:bg-gray-50 active:bg-gray-100"
          onClick={(e) => props.onSyncSelect(syncIndex)}
        >
          <div className="flex items-center px-4 py-4 sm:px-6 w-full">
            <div>
              <Icon status={sync.status} className="h-6 w-6" />
            </div>

            <div className="grow align-center mx-4">
              <p>
                Sync <span className="lowercase">{sync.status}</span> on{" "}
                <span className="font-bold">{dateTime.toDateString()}</span> at{" "}
                <span className="font-bold">
                  {dateTime.toLocaleTimeString()}
                </span>
              </p>
            </div>

            <div>
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </a>
      </li>
    );
  });

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md max-w-xl mx-auto">
      <ul role="list" className="divide-y divide-gray-200">
        {syncsRender}
      </ul>
    </div>
  );
}

function SyncDetail(props: { sync: any }) {
  const logs = props.sync.logs.map((log: any, index: number) => {
    const isLast = index === props.sync.logs.length - 1;
    const dateTime = new Date(log.created_at);

    if ((log.status === CREATED || log.status === IN_PROGRESS) && !isLast) {
      return null;
    }

    return (
      <li key={log.id}>
        <div className="relative pb-8">
          {!isLast ? (
            <span
              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
              aria-hidden="true"
            ></span>
          ) : (
            ""
          )}
          <div className="relative flex space-x-3">
            <div>
              <Icon status={log.status} className="text-white h-9 w-9 " />
            </div>
            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
              <div>
                <p className="text-sm whitespace-nowrap text-gray-500">
                  {dateTime.toDateString()} {dateTime.toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-500">{log.message}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="flow-root max-w-lg">
      <ul role="list" className="-mb-8">
        {logs}
      </ul>
    </div>
  );
}

export default function Sync(props: { syncReq: SyncReq }) {
  const [syncs, setSyncs] = useState<any[]>([]);
  const [syncIndex, setSyncIndex] = useState(-1);

  const endpoint = api.getEndpoint("sync:detail", {
    integrationId: props.syncReq.integrationId,
  });

  const url = `${endpoint}?entity=${props.syncReq.localEntity}&entity_ref=${props.syncReq.localEntityRef}`;

  useSWR(url, fetcher, {
    refreshInterval: 5000,
    onSuccess: (data: any) => {
      setSyncs(data);
    },
    onError: () => {
      setSyncIndex(-1);
      setSyncs([]);
    },
  });

  const syncList = (
    <SyncList
      syncs={syncs}
      onSyncSelect={(index: number) => setSyncIndex(index)}
    />
  );

  const syncDetail =
    syncIndex >= 0 ? (
      <SyncDetail sync={syncs[syncIndex]} />
    ) : (
      <div>Select a sync for details</div>
    );

  return (
    <div className="flex flex-row gap-6">
      <div>{syncList}</div>
      <div>{syncDetail}</div>
    </div>
  );
}
