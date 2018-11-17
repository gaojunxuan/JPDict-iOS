import Expo, { SQLite } from 'expo';

export class QueryHelper {
    static db = SQLite.openDatabase('dict.db');
    static prepareDb() {
        SQLite.openDatabase('dict.db');
        SQLite.openDatabase('kanji.db');
        SQLite.openDatabase('kanjirad.db');
        var noteDb = SQLite.openDatabase('note.db');
        noteDb.transaction(tx => {
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
        
        Expo.FileSystem.getInfoAsync(`${Expo.FileSystem.documentDirectory}SQLite/dict.db`).then(info => {
            if (info.exists == false || info.size < 100) {
                console.log(info.size);
                Expo.FileSystem.downloadAsync(
                    Expo.Asset.fromModule(require('../assets/dict.db')).uri,
                    `${Expo.FileSystem.documentDirectory}SQLite/dict.db`
                )
            }
        });
        Expo.FileSystem.getInfoAsync(`${Expo.FileSystem.documentDirectory}SQLite/kanji.db`).then(info => {
            if (info.exists == false || info.size < 100) {
                console.log(info.size);
                Expo.FileSystem.downloadAsync(
                    Expo.Asset.fromModule(require('../assets/kanji.db')).uri,
                    `${Expo.FileSystem.documentDirectory}SQLite/kanji.db`
                )
            }
        });
        Expo.FileSystem.getInfoAsync(`${Expo.FileSystem.documentDirectory}SQLite/kanjirad.db`).then(info => {
            if (info.exists == false || info.size < 100) {
                console.log(info.size);
                Expo.FileSystem.downloadAsync(
                    Expo.Asset.fromModule(require('../assets/kanjirad.db')).uri,
                    `${Expo.FileSystem.documentDirectory}SQLite/kanjirad.db`
                )
            }
        });
    }
    static fuzzyQuery(keyword, callback) {
        this.db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM Dict WHERE Keyword LIKE '${keyword}%';`,
              [],
              (_, { rows: { _array } }) => {
                  callback(_array.slice(0, 20));
              });
        });
    }
    static query(id, callback) {
        this.db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM Dict WHERE ItemId = ${id};`,
              [],
              (_, { rows: { _array } }) => {
                  callback(_array);
              });
        });
    }
    static kanjiDb = SQLite.openDatabase('kanji.db');
    static queryKanji(keyword, callback) {
        this.kanjiDb.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM Kanjidict WHERE Kanji = '${keyword}';`,
              [],
              (_, { rows: { _array } }) => {
                  callback(_array);
              });
        });
    }
    static radicalDb = SQLite.openDatabase("kanjirad.db");
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
    }
}