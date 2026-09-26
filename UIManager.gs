class UIManager {
  constructor() {
    this.ui = SpreadsheetApp.getUi();
  }

  promptForYear() {
    const response = this.ui.prompt(
      "新規年シート作成",
      "作成する年（例: 2027）を半角数字で入力してください:",
      this.ui.ButtonSet.OK_CANCEL,
    );
    if (response.getSelectedButton() === this.ui.Button.OK) {
      return response.getResponseText().trim();
    }
    return null;
  }

  showAlert(title, message) {
    this.ui.alert(`${title}\n\n${message}`);
  }
}
