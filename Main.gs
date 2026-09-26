function createNewYearSheet() {
  const uiManager = new UIManager();
  const sheetManager = new SheetManager();

  try {
    const year = uiManager.promptForYear();
    if (!year) return; // キャンセルされた場合

    if (!/^\d{4}$/.test(year)) {
      uiManager.showAlert(
        "エラー",
        "4桁の半角数字（例: 2027）を入力してください。",
      );
      return;
    }

    const sheetName = `${year}年`;
    if (sheetManager.isSheetExists(sheetName)) {
      uiManager.showAlert("エラー", `シート「${sheetName}」は既に存在します。`);
      return;
    }

    sheetManager.createSheetFromTemplate(CONFIG.TEMPLATE_SHEET_NAME, sheetName);
    uiManager.showAlert("完了", `「${sheetName}」シートを作成しました。`);
  } catch (error) {
    uiManager.showAlert("システムエラー", error.message);
  }
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("バイタル管理機能")
    .addItem("新しい年のシートを作成", "createNewYearSheet")
    .addToUi();
}
