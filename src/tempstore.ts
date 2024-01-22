class TempStore {
  private static instance: TempStore;
  private data: { [key: string]: any };

  private constructor() {
    this.data = {};
  }

  static getInstance(): TempStore {
    if (!TempStore.instance) {
      TempStore.instance = new TempStore();
    }
    return TempStore.instance;
  }

  set(name: string, value: any) {
    this.data[name] = value;
  }

  get(name: string) {
    return this.data[name];
  }

  getAll() {
    return this.data;
  }
}

const store = TempStore.getInstance();

export default store;
