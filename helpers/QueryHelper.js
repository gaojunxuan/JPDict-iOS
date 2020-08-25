import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import { AsyncStorage } from "react-native";
import { Asset } from "expo-asset";
import Constants from "expo-constants";

export class QueryHelper {
  static db = SQLite.openDatabase("dict.db");
  static sqliteDirectory = `${FileSystem.documentDirectory}/SQLite`;

  static prepareDb = async () => {
    SQLite.openDatabase("dict.db");
    SQLite.openDatabase("kanji.db");
    //SQLite.openDatabase('kanjirad.db');
    var noteDb = SQLite.openDatabase("note.db");
    noteDb.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE 'Note' (
          'Id'	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
          'ItemId'	INTEGER UNIQUE,
          'Definition'	TEXT,
          'Pos'	TEXT,
          'Keyword'	TEXT,
          'Reading'	TEXT,
          'Kanji'	TEXT,
          'LoanWord'	TEXT,
          'SeeAlso'	TEXT
      );`
      );
    });
    // Update database file if newly installed or updated
    var result = await AsyncStorage.getItem("version");
    if (result == null || result != Constants.nativeAppVersion) {
      console.log("Updating db");
      const sqliteDirectory = `${FileSystem.documentDirectory}/SQLite`;
      await FileSystem.downloadAsync(
        Asset.fromModule(require("../assets/db/dict.db")).uri,
        `${sqliteDirectory}/dict.db`
      );
      await FileSystem.downloadAsync(
        Asset.fromModule(require("../assets/db/kanji.db")).uri,
        `${sqliteDirectory}/kanji.db`
      );
      await AsyncStorage.setItem("version", Constants.nativeAppVersion);
    }
  };

  static fuzzyQuery(keyword, callback) {
    this.db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM Dict WHERE Keyword LIKE '${keyword}%';`,
        [],
        (_, { rows: { _array } }) => {
          callback(_array.slice(0, 20));
        },
        (a, b) => console.log(b)
      );
    });
  }

  static query(id, keyword, callback) {
    var queryStatement = `WHERE ItemId = ${id}`;
    if (keyword != "") queryStatement += ` AND Reading = '${keyword}'`;
    this.db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM Dict ${queryStatement};`,
        [],
        (_, { rows: { _array } }) => {
          callback(_array);
        }
      );
    });
  }

  static kanjiDb = SQLite.openDatabase("kanji.db");
  static queryKanji(keyword, callback) {
    this.kanjiDb.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM Kanjidict WHERE Kanji = '${keyword}';`,
        [],
        (_, { rows: { _array } }) => {
          callback(_array);
        }
      );
    });
  }
  // not implemented due to size limitation for assets file
  /*static radicalDb = SQLite.openDatabase("kanjirad.db");
    static queryRadical(keyword, callback) {
        this.radicalDb.transaction(tx => {
            tx.executeSql(
                `select * from KanjiRadical where Kanji = '${keyword}';`,
                [],
                (_, { rows: { _array } }) => {
                    callback(_array);
                }
            )
        });
    }*/
}
