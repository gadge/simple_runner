(function(){

	describe("api get extensive looper", function(){
		var proxyquire =  require("proxyquire");
		var apiCaller, httpMock, requestMock, deasyncMock;

		beforeEach(function(){
			httpMock = jasmine.createSpyObj("http", ["request"]);
			requestMock = jasmine.createSpyObj("request", ["end"]);
			deasyncMock = jasmine.createSpyObj("deasync", ["loopWhile"]);
			httpMock.request.and.returnValue(requestMock);

			var ApiCaller = proxyquire("../../src/call-loop", { "http": httpMock, "deasync": deasyncMock  });
			apiCaller = new ApiCaller("localhost", 3000);
		});

		it("should call http request", function () {
			apiCaller.call();
			expect(httpMock.request).toHaveBeenCalled();
		});
		it("should have called deasync loop", function () {
			apiCaller.call();
			expect(deasyncMock.loopWhile).toHaveBeenCalled();
		});

	});

}());
