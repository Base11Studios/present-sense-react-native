export default class CommonDataManager {
  static myInstance = null;

  _iapModulePrepared = "";

  /**
   * @returns {CommonDataManager}
   */
  static getInstance() {
    if (CommonDataManager.myInstance == null) {
      CommonDataManager.myInstance = new CommonDataManager();
    }

    return CommonDataManager.myInstance;
  }

  getIapModulePrepared() {
    return this._iapModulePrepared;
  }

  setIapModulePrepared(id) {
    this._iapModulePrepared = id;
  }
}
