function doPost(request) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  const sheet = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const output = sheet.getSheetByName("Polaris Output");
    JSON.parse(request.postData.contents).forEach((response) => {
      output.appendRow(response);
    });
    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: e })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  const sheet = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const config = sheet.getSheetByName("Polaris Config");
    const events = sheet.getSheetByName("Event Data");
    const response = {
      result: "success",
      sections: [],
      options: [],
      config: [],
      matches: [],
      teams: [],
    };
    response.sections = config
      .getRange("A2:B")
      .getDisplayValues()
      .filter((lst) => lst[0] != "");
    response.options = config
      .getRange(`BH2:${columnToLetter(config.getLastColumn())}`)
      .getDisplayValues()
      .filter((lst) => lst[0] != "");
    response.config = config.getRange("F1:BG10").getDisplayValues();
    response.matches = events.getRange("D32:K187").getValues();
    response.teams = events
      .getRange("D32:S")
      .getValues()
      .filter((lst) => lst[0] != "");

    return ContentService.createTextOutput(
      JSON.stringify(response)
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: e })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function columnToLetter(column) {
  let temp,
    letter = "";
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}
