export default class DataStore {
  namespace: string = "integrations-datastore";

  getStorage() {
    if (typeof window === "undefined") {
      return;
    }
    const storage = window.sessionStorage.getItem(this.namespace);
    if (storage === null) {
      window.sessionStorage.setItem(this.namespace, JSON.stringify({}));
    }
    const value = window.sessionStorage.getItem(this.namespace);
    if (value === null) {
      return {};
    }
    return JSON.parse(value);
  }

  setStorage(storage: any) {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(this.namespace, JSON.stringify(storage));
  }

  getIntegrationId() {
    const storage = this.getStorage();
    return storage?.integrationId;
  }

  setIntegrationId(integrationId: string) {
    const storage = this.getStorage();
    storage["integrationId"] = integrationId;
    this.setStorage(storage);
  }

  deleteIntegrationId() {
    const storage = this.getStorage();
    delete storage["integrationId"];
    this.setStorage(storage);
  }
}
