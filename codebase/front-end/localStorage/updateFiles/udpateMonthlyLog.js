export function updateMonthlyLogPouch (db, log, callback) {
	console.log(log);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			db.put({_id: "0000", _rev: doc._rev, dailyLogs: doc.monthlyLogs.push(log)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
