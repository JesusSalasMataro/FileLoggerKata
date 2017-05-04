function FileLogger(fileSystem, dateSystem) {
	this.log = function(message) {
		if(!fileSystem.fileExist()){
			fileSystem.create();
		}
		fileSystem.append(message);
	};
	
	this.fileName = function(){
		return 'log' + dateSystem.date() + '.txt';
	}
}