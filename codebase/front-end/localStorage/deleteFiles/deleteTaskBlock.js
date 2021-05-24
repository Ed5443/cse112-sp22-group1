export function deleteTaskBlockPouch(db, id, index, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const taskBlockArr = doc.userObject.taskBlocks.filter(taskBlock => taskBlock.id == id);
			const block = null;
			if (taskBlockArr != undefined) {
				block = taskBlockArr[0];
			}

			let userArr = [];
					Array.prototype.push.apply(userArr, doc.userObject.dailyLogs);
					Array.prototype.push.apply(userArr, doc.userObject.monthlyLogs);
					Array.prototype.push.apply(userArr, doc.userObject.futureLogs);
					Array.prototype.push.apply(userArr, doc.userObject.trackers);
					Array.prototype.push.apply(userArr, doc.userObject.collections);

			let parentArr = userArr.filter(object => object.id == parent);
			
			const parent = parentArr[0];
			const newContents = parent.contents.filter(obj => obj != id);

			const newTaskBlocks = doc.userObject.taskBlocks.filter(taskBlock => taskBlock.id != id);
			//try removing db.put and using doc.userObject.taskBlocks = newTaskBlocks;
			db.put({_id: "0000", _rev: doc._rev, taskBlocks: newTaskBlocks}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}
