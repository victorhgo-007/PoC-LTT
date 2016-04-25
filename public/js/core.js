(function() {
    angular
        .module("Repo_Indi", [], function($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            })
        })
        .controller("MainController", MainController);

    MainController.$inject = ["$scope", "$http", "$location"];

    function MainController($scope, $http, $location) {
        $scope.tsec = {};
        $scope.move = {};
        $scope.moveheavier = {};
        $scope.delay = {};

        $scope.tsec.body = '{"authentication":{"consumerId":"00000000","authenticationType":"00","authenticationData":[{"authenticationData":["4fuUbLcftRaabA1/3gfZ61IjR6MuLSj4GafZTK5PHPBoWtp93IJVU8zQ5doT0p/b"],"idAuthenticationData":"iv_ticketService"}],"userId":"ADMINF","accessCode":"0017800035458458"},"userPreferences":{"language":"es"}}';
        //$scope.move.body = '{"message01":"abcde"}';
		$scope.move.body = 'abcde';
        //$scope.moveheavier.body = '{"msg0101":"MSG01................"}';
		$scope.moveheavier.body = 'MSG01................';
        //$scope.delay.body = '{"message01":"000000002"}';
		$scope.delay.body = '000000002';

        // $scope.tsec.valor = '';

        $scope.get_tsec = function() {
            console.log('Consultando... get_tsec');

            $http({
                method: "POST",
                url: "http://150.250.140.235:7500/TechArchitecture/mx/grantingTicket/V01",
                headers: {
                    'Content-Type': 'application / json'
                },
                data: JSON.parse($scope.tsec.body)
            }).then(function mySucces(response) {
                console.log(response);
                console.log(response.headers());
                $scope.tsec.respuesta = response.headers().tsec;
            }, function myError(response) {
                $scope.tsec.respuesta = response.statusText;
                console.log($scope.tsec.respuesta);
            });

            console.log('Terminado...');
        };

        $scope.get_move = function() {
            console.log('Consultando... get_move');
			var fdata='{"message01":"'+$scope.move.body+'"}';				
            $http({
                method: "POST",
                url: "http://150.250.140.235:7800/Testing/move/V01",
                headers: {
                    'Content-Type': 'application / json',
                    'tsec': $scope.tsec.respuesta
                },				 
                data: JSON.parse(fdata)				
            }).then(function mySucces(response) {                
				console.log(response);
                console.log(response.headers());
                console.log(response.data);
                $scope.move.respuesta = response.data;
				swal("Respuesta exitosa!", "Trucha Move", "success");				
            }, function myError(response) {
                console.log(response);
                $scope.move.respuesta = response.statusText;
                console.log($scope.move.respuesta);
				swal("Respuesta fallida!", "", "error");
            });

            console.log('Terminado...');
        };

        $scope.get_moveheavier = function() {
            console.log('Consultando... get_moveheavier');			
			var fdata='{"msg0101":"'+$scope.moveheavier.body+'"}';

            $http({
                method: "POST",
                url: "http://150.250.140.235:7800/Testing/moveHeavier/V01",
                headers: {
                    'Content-Type': 'application / json',
                    'tsec': $scope.tsec.respuesta
                },
                data: JSON.parse(fdata)
            }).then(function mySucces(response) {
                console.log(response);
                $scope.moveheavier.respuesta = response.data;
				swal("Respuesta exitosa!", "Trucha MoveHeavier", "success");
            }, function myError(response) {
                console.log(response);
                $scope.moveheavier.respuesta = response.statusText;
                console.log($scope.moveheavier.respuesta);
				swal("Respuesta fallida!", "", "error");
            });

            console.log('Terminado...');
        };

        $scope.get_delay = function() {
            console.log('Consultando... get_delay');
			var fdata='{"message01":"'+$scope.delay.body+'"}';

            $http({
                method: "POST",
                url: "http://150.250.140.235:7800/Testing/delay/V01",
                headers: {
                    'Content-Type': 'application / json',
                    'tsec': $scope.tsec.respuesta
                },
                data: JSON.parse(fdata)
            }).then(function mySucces(response) {
                console.log(response);
                $scope.delay.respuesta = response.status;
				swal("Respuesta exitosa!", "Trucha Delay", "success");
            }, function myError(response) {
                console.log(response);
                $scope.moveheavier.respuesta = response.statusText;
                console.log($scope.moveheavier.respuesta);
				swal("Respuesta fallida!", "", "error");
            });

            console.log('Terminado...');
        };
    };
})();
