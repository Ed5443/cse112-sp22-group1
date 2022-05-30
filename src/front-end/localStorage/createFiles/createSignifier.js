import {makeid} from "./makeId.js";
let signifierObject = {};

/**
 * Creates and stores a new signifier created from the given parameters.
 * @memberof createFunctions
 * @param {database} db The local pouch database.
 * @param {String} meaning The meaning of the signifier.
 * @param {String} symbol The symbol of the signifier.
 * @param {doubleParameterCallback} callback Eihter sends the newly created signifier or an error if there is one to the callback.
 */
export function createSignifierPouch (db, meaning, symbol, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			console.log(doc);
			let id = makeid();
			let arrays = [];
			Array.prototype.push.apply(arrays, doc.dailyLogs);
			Array.prototype.push.apply(arrays, doc.monthlyLogs);
			Array.prototype.push.apply(arrays, doc.futureLogs);
			Array.prototype.push.apply(arrays, doc.collections);
			Array.prototype.push.apply(arrays, doc.trackers);
			Array.prototype.push.apply(arrays, doc.textBlocks);
			Array.prototype.push.apply(arrays, doc.tasks);
			Array.prototype.push.apply(arrays, doc.events);
			Array.prototype.push.apply(arrays, doc.signifiers);
			Array.prototype.push.apply(arrays, doc.imageBlocks);
			Array.prototype.push.apply(arrays, doc.audioBlocks);

			while (arrays.filter((element) => element.id === id).length > 0) {
				id = makeid();
			}
			signifierObject = {
				id: id,
				objectType: "signifier",
				meaning: meaning,
				symbol: symbol
			}

			doc.signifiers.push(signifierObject);

			return db.put({_id: "0000",
				_rev: doc._rev,
				email: doc.email,
				theme: doc.theme,
				index: doc.index,
				dailyLogs: doc.dailyLogs,
				monthlyLogs: doc.monthlyLogs,
				futureLogs: doc.futureLogs,
				collections: doc.collections,
				trackers: doc.trackers,
				imageBlocks: doc.imageBlocks,
				audioBlocks: doc.audioBlocks,
				textBlocks: doc.textBlocks,
				tasks: doc.tasks,
				events: doc.events,
				signifiers: doc.signifiers
			}).then((res) => {
				console.log(res);
			}).catch((error) => {
				console.log(error);
				callback(error, null);
			});
		}
	}).then((res) => {
		console.log(res);
		callback(null, signifierObject);
	});
}
