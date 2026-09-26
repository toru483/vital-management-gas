/**
 * 新しい年の管理シートを作成するスクリプト
 */
function createNewYearSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  
  // コピー元となるテンプレートシート名（「サンプル」シートを指定）
  var templateSheetName = "サンプル";
  var templateSheet = ss.getSheetByName(templateSheetName);
  
  if (!templateSheet) {
    ui.alert('エラー: テンプレート用のシート「' + templateSheetName + '」が見つかりません。');
    return;
  }
  
  // 作成したい「年」の入力ダイアログを表示
  var response = ui.prompt('新規年シート作成', '作成する年（例: 2027）を半角数字で入力してください:', ui.ButtonSet.OK_CANCEL);
  
  if (response.getSelectedButton() == ui.Button.OK) {
    var yearStr = response.getResponseText().trim();
    
    // 入力値の簡易チェック
    if (!yearStr.match(/^\d{4}$/)) {
      ui.alert('エラー: 4桁の西暦（例: 2027）を入力してください。');
      return;
    }
    
    var newSheetName = yearStr + "年";
    
    // 既に同名のシートが存在しないか確認
    if (ss.getSheetByName(newSheetName)) {
      ui.alert('エラー: シート「' + newSheetName + '」は既に存在します。');
      return;
    }
    
    // シートをコピーしてリネーム
    var newSheet = templateSheet.copyTo(ss);
    newSheet.setName(newSheetName);
    
    // コピーしたシート内のサンプルデータ（値のみ）をクリアしたい場合は以下のコメントを解除
    // newSheet.getRange("B4:J100").clearContent(); 
    
    // 作成したシートをアクティブ化
    ss.setActiveSheet(newSheet);
    ui.alert('完了: 「' + newSheetName + '」シートを作成しました。');
  }
}

/**
 * スプレッドシートを開いた時にカスタムメニューを追加する機能
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('バイタル管理機能')
    .addItem('新しい年のシートを作成', 'createNewYearSheet')
    .addToUi();
}