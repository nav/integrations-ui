import useSWR from "swr";
import { useState } from "react";
import { api, fetcher } from "../lib/api";
import Empty from "../components/empty";

const CREATED = "CREATED";
const IN_PROGRESS = "IN_PROGRESS";
const ERROR = "ERROR";
const COMPLETED = "COMPLETED";

function Icon(props: { status: string; className: string; message?: string }) {
  let icon;
  switch (props.status) {
    case CREATED:
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 mr-1.5 text-gray-500 ${props.className}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      );
      break;
    case COMPLETED:
      if (props.message?.indexOf("skipped") > -1) {
        icon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`flex-shrink-0 mr-1.5 text-yellow-300  ${props.className}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      } else {
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
      }
      break;
    case IN_PROGRESS:
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 mr-1.5 text-orange-500 animate-reverse-spin ${props.className}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
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

  return <div className="bg-white">{icon}</div>;
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
  const syncLogs = props.sync?.logs || [];

  const combinedLogs = {};
  syncLogs.map((log: any) => {
    const key = `${log.local_entity}:${log.local_entity_ref}`;
    if (combinedLogs.hasOwnProperty(key)) {
      combinedLogs[key].push(log);
    } else {
      combinedLogs[key] = [log];
    }
  });

  const logs = Object.keys(combinedLogs).map((key) => {
    const _logs = combinedLogs[key];
    const log = _logs[_logs.length - 1];
    const dateTime = new Date(log.created_at);
    return (
      <li key={log.id}>
        <div className="relative pb-8">
          <div className="relative flex space-x-3">
            <div>
              <Icon
                status={log.status}
                message={log.message}
                className="h-8 w-8"
              />
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
  const [syncIndex, setSyncIndex] = useState(0);

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
      setSyncIndex(0);
      setSyncs([]);
    },
  });

  if (syncs.length < 1) {
    return <Empty>No sync records found for this entity</Empty>;
  }

  const syncList = (
    <SyncList
      syncs={syncs}
      onSyncSelect={(index: number) => setSyncIndex(index)}
    />
  );

  const syncDetail =
    syncIndex >= 0 ? <SyncDetail sync={syncs[syncIndex]} /> : <></>;

  return (
    <div className="flex flex-row">
      <div className="basis-1/2">{syncList}</div>
      <div className="basis-1/2">{syncDetail}</div>
    </div>
  );
}
