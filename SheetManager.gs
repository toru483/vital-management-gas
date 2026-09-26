class SheetManager {
  constructor() {
    this.ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  isSheetExists(sheetName) {
    return this.ss.getSheetByName(sheetName) !== null;
  }

  createSheetFromTemplate(templateName, newSheetName) {
    const template = this.ss.getSheetByName(templateName);
    if (!template) {
      throw new Error(
        `テンプレートシート「${templateName}」が見つかりません。`,
      );
    }
    const newSheet = template.copyTo(this.ss);
    newSheet.setName(newSheetName);
    this.ss.setActiveSheet(newSheet);
    return newSheet;
  }
}
