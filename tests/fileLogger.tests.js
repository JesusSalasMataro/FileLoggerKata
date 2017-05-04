describe("log", function() {
	it("should append the message to the end of a log.txt file", function() {
		// ARRANGE
		var fileSystem = jasmine.createSpyObj('fileSystem', ['fileExist','create','append']);
		fileSystem.fileExist.and.callFake(function() { return true; });
		fileSystem.create.and.callFake(function() { });
		fileSystem.append.and.callFake(function() { });

		var fileLogger = new FileLogger(fileSystem);

		// ACT
		fileLogger.log("message");

		// ASSERT
		expect(fileSystem.append).toHaveBeenCalled();
	});

	it("If the file doesn't exist, create it", function(){
		//ARRANGE
		var fileSystem = jasmine.createSpyObj('fileSystem', ['fileExist','create','append']);
		fileSystem.fileExist.and.callFake(function() { return false; });
		fileSystem.create.and.callFake(function() { });
		fileSystem.append.and.callFake(function() { });
		var fileLogger = new FileLogger(fileSystem);

		//ACT
		fileLogger.log("message");

		//ASSERT
		expect(fileSystem.create).toHaveBeenCalled();
		expect(fileSystem.append).toHaveBeenCalled();
	})

	it("Writes file called logYYYMMDD.txt", function(){
		//ARRANGE
		var fileSystem = jasmine.createSpyObj('fileSystem', ['fileExist']);
		var dateSystem = jasmine.createSpyObj('dateSystem', ['date']);
		dateSystem.date.and.callFake(function() {return '20170504'; });

		var fileLogger = new FileLogger(fileSystem, dateSystem);

		//ACT
		var logFileName = fileLogger.fileName();
		
		//ASSERT
		expect(logFileName).toBe("log" + dateSystem.date() + ".txt");
	})
});